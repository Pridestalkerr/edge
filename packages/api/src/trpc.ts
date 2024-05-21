import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { env } from "@edge/env";
import type { Request, Response } from "express";
import type { OpenApiMeta } from "trpc-openapi";
import { lucia } from "@edge/auth";

interface Auth {
  session: Awaited<ReturnType<typeof lucia.validateSession>>["session"];
  user: Awaited<ReturnType<typeof lucia.validateSession>>["user"];
}

export interface Context {
  auth: Auth;
  req: Request;
  res: Response;
  cookie: Response["cookie"];
  cookies: Record<string, string>;
}

export const createTRPCContext = async ({
  req,
  res,
}: CreateExpressContextOptions): Promise<Context> => {
  // https://lucia-auth.com/guides/validate-session-cookies/
  // NOTE: if you don't need validation on every request, move this to the `baseProtectedProcedureMiddleware` middleware
  const cookies = req.cookies as Record<string, string>;
  const token = cookies.token;

  const def = {
    req,
    res,
    cookie: res.cookie.bind(res),
    cookies,
  };

  if (!token) {
    return {
      ...def,
      auth: { session: null, user: null },
    };
  }

  // this refreshes automatically when needed
  const { user, session } = await lucia.validateSession(token);
  if (!session) {
    return {
      ...def,
      auth: { session: null, user: null },
    };
  }

  if (session.fresh) {
    // set the new cookie on the client
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.cookie(sessionCookie.name, sessionCookie.serialize(), sessionCookie.attributes);
  }

  return {
    auth: {
      session,
      user,
    },
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
      if (error.code === "INTERNAL_SERVER_ERROR" && env.NODE_ENV === "production") {
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
