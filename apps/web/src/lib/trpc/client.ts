"use client";

import type { AppRouter } from "@edge/api";
import { env } from "@edge/env";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

export const api = createTRPCReact<AppRouter>();

export const apiVanilla = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.NEXT_PUBLIC_API_HOST + env.NEXT_PUBLIC_API_ENDPOINT + "/trpc",
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

export { type RouterInputs, type RouterOutputs } from "@edge/api";
