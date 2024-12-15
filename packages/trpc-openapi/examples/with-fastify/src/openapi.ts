import { generateOpenApiDocument } from 'trpc-to-openapi';

import { appRouter } from './router';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Example CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Fastify',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  docsUrl: 'https://github.com/mcampa/trpc-to-openapi',
  tags: ['auth', 'users', 'posts'],
});
