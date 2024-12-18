import { createServer } from "http";
import { appRouter, createTRPCContext, openApiDocument } from "@edge-placeholder/api";
import { server as env } from "@edge-placeholder/env";
import { createOpenApiExpressMiddleware } from "@edge-placeholder/trpc-openapi";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import swagger from "swagger-ui-express";

// eslint-disable-next-line @typescript-eslint/require-await
const main = async () => {
  const app = express();
  app.use(
    cors({
      // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'
      origin: [env.CLIENT_HOST, /http:\/\/localhost:\d{4}\/?.*$/],
      credentials: true,
    }),
  );

  app.use(cookieParser());

  const trpcEP = env.API_ENDPOINT + "/trpc";
  const restEP = env.API_ENDPOINT + "/rest";
  const swaggerEP = env.API_ENDPOINT + "/swagger";

  app.use(
    trpcEP,
    createExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext,
    }),
  );

  // TODO: you MUST implement CSRF protection for all exposed GET endpoints!
  app.use(
    restEP,
    createOpenApiExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext,
    }),
  );

  app.use(swaggerEP, swagger.serve);
  app.get(swaggerEP, swagger.setup(openApiDocument(restEP)));

  // const server = createServer(app);

  app.listen(env.API_PORT, () => {
    console.log(`Express: \n\t http://localhost:${env.API_PORT}`);
    console.log(`tRPC: \n\t http://localhost:${env.API_PORT}${trpcEP}`);
    console.log(`REST interface: \n\t http://localhost:${env.API_PORT}${restEP}`);
    console.log(`Swagger: \n\t http://localhost:${env.API_PORT}${swaggerEP}`);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
