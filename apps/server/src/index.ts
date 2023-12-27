import express from "express";
import { createServer } from "http";
import cors from "cors";
import { env } from "@edge/env";

const main = async () => {
  console.log(env, "XD");
  const app = express();
  app.use(
    cors({
      // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'
      origin: [env.CLIENT_HOST, /http:\/\/localhost:\d{4}\/?.*$/],
      credentials: true,
    }),
  );

  const server = createServer(app);
  server.listen(env.API_PORT, () => {
    console.log(`Listening on port ${env.API_PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
