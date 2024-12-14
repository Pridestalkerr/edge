"use client";

import type { AppRouter } from "@edge-placeholder/api";
import { createTRPCReact } from "@trpc/react-query";

/**
 * @description React query integration. Client-side only.
 */
export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@edge-placeholder/api";
