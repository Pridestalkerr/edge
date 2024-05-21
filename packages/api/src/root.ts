import type { AnyProcedure, inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { authRouter } from "./router/auth";
import { testRouter } from "./router/test";
import { router } from "./trpc";

const appRouter = router({
  test: testRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

// NOTE: this is entirely optional so you can remove it
// its a temporary compatibility layer for tRPC v11 and a DX improvement
const procedures = appRouter._def.procedures;
Object.keys(procedures).forEach((key) => {
  const def = (procedures[key as keyof typeof procedures] as unknown as AnyProcedure)?._def;
  // @ts-expect-error: internal API
  if (def?.meta?.openapi) {
    switch (def.type) {
      case "query":
        // @ts-expect-error: unstable support for tRPC v11
        def.query = true;
        break;
      case "mutation":
        // @ts-expect-error: unstable support for tRPC v11
        def.mutation = true;
        break;
      case "subscription":
        // @ts-expect-error: unstable support for tRPC v11
        def.subscription = true;
        break;
    }

    // @ts-expect-error: hack to make all openapi procedures have an ANY output schema unless explictitly defined (DX improvement)
    if (!def.output) {
      // @ts-expect-error: see above
      def.output = z.any();
    }
  }
});

export { appRouter };
