// Lucia DOCS: https://lucia-auth.com/getting-started/

import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db, schemas } from "@edge/db";

const adapter = new DrizzlePostgreSQLAdapter(db, schemas.sessions, schemas.users);

export const lucia = new Lucia(adapter, {
  // https://lucia-auth.com/basics/configuration
  sessionCookie: {
    // TODO: add this to ENV
    name: "token",
    attributes: {
      secure: true,
      sameSite: "strict",
      domain: "example.com",
    },
  },
  // IMPORTANT! Do not expose sensitive information here, as it might leak to the client.
  getUserAttributes: (attributes) => ({
    email: attributes.email,
  }),
});

// IMPORTANT! https://lucia-auth.com/basics/users
// Note: Regarding User Attributes, I suggest storing most of the data in a separate table (profile).
type DatabaseUserAttributes = Omit<typeof schemas.users.$inferSelect, "id">;
declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    // this is redundant, but it's required in case you change the type of the id
    UserId: typeof schemas.users.$inferSelect.id;
  }
}
