import type { AppRouter, RouterInputs, RouterOutputs } from "./root";
import { appRouter } from "./root";
import { createTRPCContext } from "./trpc";

export type { RouterInputs, RouterOutputs };

export type { AppRouter };

export { appRouter };

export { createTRPCContext };
