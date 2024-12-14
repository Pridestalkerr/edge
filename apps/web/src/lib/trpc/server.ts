import type { AppRouter } from "@edge-placeholder/api";
import { client, server } from "@edge-placeholder/env";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { cookies } from "next/headers";
import superjson from "superjson";

export const api = createTRPCClient<AppRouter>({
  links: [
    // https://trpc.io/docs/client/links/loggerLink
    loggerLink({
      enabled: (opts) =>
        (server.NODE_ENV === "development" && typeof window !== "undefined") ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: client.NEXT_PUBLIC_API_HOST + client.NEXT_PUBLIC_API_ENDPOINT + "/trpc",
      // You can pass any HTTP headers you wish here
      // we use it to pass the auth token to the API in RSC
      async headers({ opList }) {
        const token = opList[0]?.context?.token ? (await cookies()).get("token")?.value : undefined;
        return {
          ...(token ? { Cookie: `token=${token}` } : {}),
        };
      },
      transformer: superjson,
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from "@edge-placeholder/api";
