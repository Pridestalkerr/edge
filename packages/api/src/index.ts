import { generateOpenApiDocument } from "@edge-placeholder/trpc-openapi";
import type { AppRouter, RouterInputs, RouterOutputs } from "./root";
import { appRouter } from "./root";
import { createTRPCContext } from "./trpc";

export type { RouterInputs, RouterOutputs };

export type { AppRouter };

export { appRouter };

export { createTRPCContext };

/**
 * @description Generate OpenAPI document. You can add more params to this function depending on your needs.
 */
export const openApiDocument = (baseUrl: string) => {
  return generateOpenApiDocument(appRouter, {
    title: "Edge API",
    version: "1.0.0",
    baseUrl,
    docsUrl: "https://github.com/jlalmes/trpc-openapi",
  });
};
