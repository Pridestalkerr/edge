// https://lucia-auth.com/guides/email-and-password/basics

import { lucia } from "@edge/auth";
import { db, schemas } from "@edge/db";
import { hash, verify } from "@node-rs/argon2";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { publicProcedure } from "../procedures";
import { router } from "../trpc";

const a2Options = {
  // recommended minimum parameters
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const authRouter = router({
  signUp: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/sign-up",
        summary: "Sign up",
        description: "Sign up for an account",
        tags: ["auth", "sign-up"],
      },
    })
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .output(z.void())
    .mutation(async ({ input, ctx }) => {
      if (ctx.auth.session) {
        throw new TRPCError({
          message: "You are already signed in",
          code: "BAD_REQUEST",
        });
      }
      try {
        const [user] = await db
          .insert(schemas.users)
          .values({
            email: input.email,
            passwordHash: await hash(input.password, a2Options),
          })
          .returning();

        if (!user) {
          throw new TRPCError({
            message: "Failed to create user",
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        const session = await lucia.createSession(user.id, {});

        // you can also set the cookie immediately if you don't require verification
        const sessionCookie = lucia.createSessionCookie(session.id);
        ctx.cookie(sessionCookie.name, sessionCookie.serialize(), sessionCookie.attributes);
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          message: "Failed to create user",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  signIn: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/sign-in",
        summary: "Sign in",
        description: "Sign in to your account",
        tags: ["auth", "sign-in"],
      },
    })
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .output(z.void())
    .mutation(async ({ input, ctx }) => {
      if (ctx.auth.session) {
        throw new TRPCError({
          message: "You are already signed in",
          code: "BAD_REQUEST",
        });
      }
      const [user] = await db
        .select()
        .from(schemas.users)
        .where(eq(schemas.users.email, input.email))
        .limit(1);

      if (!user) {
        throw new TRPCError({
          message: "User not found",
          code: "NOT_FOUND",
        });
      }

      const validPassword = await verify(user.passwordHash, input.password, a2Options);

      if (!validPassword) {
        throw new TRPCError({
          message: "Invalid password",
          code: "UNAUTHORIZED",
        });
      }

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      ctx.cookie(sessionCookie.name, sessionCookie.serialize(), sessionCookie.attributes);
    }),

  me: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/auth/me",
        summary: "Get current user",
        description: "Get the current user",
        tags: ["auth", "me"],
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      // this never fails
      return {
        me: ctx.auth.user,
      };
    }),
});
