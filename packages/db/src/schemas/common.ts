import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", {
    length: 255,
  })
    .unique()
    .notNull(),
  passwordHash: varchar("password_hash", {
    length: 32, // according to argon2 hash outputLen parameter, change as needed
  }).notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
