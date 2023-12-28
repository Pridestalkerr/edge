import z from "zod";
import { publicProcedure } from "../procedures";

export const testRouter = publicProcedure
  .meta({})
  .input(z.object({ name: z.string() }))
  .query(({ input, ctx }) => {
    ctx.req;
    ctx.res;
    return { message: `Hello ${input.name}` };
  });
