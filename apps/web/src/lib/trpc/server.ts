import type { AppRouter } from "@edge/api";
import { env } from "@edge/env";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { cookies } from "next/headers";
import superjson from "superjson";

export const api = createTRPCClient<AppRouter>({
  links: [
    // https://trpc.io/docs/client/links/loggerLink
    loggerLink({
      enabled: (opts) =>
        (env.NODE_ENV === "development" && typeof window !== "undefined") ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: env.NEXT_PUBLIC_API_HOST + env.NEXT_PUBLIC_API_ENDPOINT + "/trpc",
      // You can pass any HTTP headers you wish here
      // we use it to pass the auth token to the API in RSC
      async headers({ opList }) {
        const token = opList[0]?.context?.token ?? cookies().get("token")?.value;
        return {
          ...(token ? { Cookie: `token=${token}` } : {}),
        };
      },
      transformer: superjson,
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from "@edge/api";
