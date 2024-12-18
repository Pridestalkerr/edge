import z from "zod";
import { publicProcedure } from "../procedures";
import { router } from "../trpc";

export const testRouter = router({
  hello: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/test/hello",
        summary: "Say hello",
        description: "Say hello to the world",
        tags: ["test", "hello"],
      },
    })
    .input(z.object({ name: z.string() }))
    .output(z.object({ message: z.string() }))
    .query(({ input, ctx }) => {
      console.log(ctx.req.query);
      return { message: `Hello ${input.name}` };
    }),
});
