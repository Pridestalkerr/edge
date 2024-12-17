import { server } from "@edge-placeholder/env";
import type { OpenApiMeta } from "@edge-placeholder/trpc-openapi";
import { initTRPC } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { Request, Response } from "express";
import superjson from "superjson";
import { ZodError } from "zod";

export type { OpenApiMeta };

export interface Context {
  req: Request;
  res: Response;
  cookie: Response["cookie"];
  cookies: Record<string, string>;
}

export const createTRPCContext = async ({
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/require-await
}: CreateExpressContextOptions): Promise<Context> => {
  const cookies = req.cookies as Record<string, string>;

  return {
    req,
    res,
    cookie: res.cookie.bind(res),
    cookies,
  };
};

export const trpc = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      if (error.code === "INTERNAL_SERVER_ERROR" && server.NODE_ENV === "production") {
        return {
          ...shape,
          message: "An unknown error occurred",
        };
      }
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError: error.cause instanceof ZodError ? error.cause.flatten() : undefined,
        },
      };
    },
  });

export const router = trpc.router;
