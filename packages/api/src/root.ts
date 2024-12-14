import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { testRouter } from "./router/test";
import { router } from "./trpc";

const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export { appRouter };
