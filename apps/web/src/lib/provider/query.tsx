"use client";

import { client as env } from "@edge-placeholder/env";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import type { ReactNode } from "react";
import superjson from "superjson";
import { api } from "../trpc/client";

export const QueryProvider = (props: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          // onError: errorHandler
        }),
        mutationCache: new MutationCache({
          // onError: errorHandler
        }),
      }),
  );
  const [trpcClient] = useState(() =>
    api.createClient({
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
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  );
};
