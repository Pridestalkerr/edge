// import { TRPCError } from "@trpc/server";
// import { trpc } from "../trpc";

// export const baseProtectedProcedureMiddleware = trpc.middleware(async ({ ctx, next }) => {
//   if (!ctx.auth.session || !ctx.auth.user) {
//     throw new TRPCError({ message: "Unauthorized. You must be logged in.", code: "UNAUTHORIZED" });
//   }

//   return next({
//     ctx: {
//       ...ctx,
//       // infers the session as non-nullable
//       auth: ctx.auth,
//     },
//   });
// });
