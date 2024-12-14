import z from "zod";
import { publicProcedure } from "../procedures";
import { router } from "../trpc";

export const testRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ message: z.string() }))
    .query(({ input, ctx }) => {
      console.log(ctx.req);
      console.log(ctx.res);
      return { message: `Hello ${input.name}` };
    }),
});
