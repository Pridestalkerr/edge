import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    API_PORT: z.coerce.number(),
    DATABASE_URI: z.string().url(),
    POSTGRESQL_USERNAME: z.string(),
    POSTGRESQL_PASSWORD: z.string(),
    POSTGRESQL_DATABASE: z.string(),
    CLIENT_HOST: z.string().url(),
    API_HOST: z.string().url(),
    API_ENDPOINT: z.string(),
  },
  runtimeEnv: process.env,
});
