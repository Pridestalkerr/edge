import { baseProtectedProcedureMiddleware } from "./middleware";
import { trpc } from "./trpc";

// NOTE: Consider rate limiting the public procedure.
// TODO: example
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(baseProtectedProcedureMiddleware);
