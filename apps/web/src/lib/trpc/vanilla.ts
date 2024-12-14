import type { AppRouter } from "@edge-placeholder/api";
import { client as env } from "@edge-placeholder/env";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

/**
 * @description For plain tRPC calls.
 */
export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.NEXT_PUBLIC_API_HOST + "/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      transformer: superjson,
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from "@edge-placeholder/api";
