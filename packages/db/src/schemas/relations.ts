import { relations } from "drizzle-orm";
import { sessions, users } from "./common";

export const usersRelations = relations(users, ({ many }) => {
  return {
    sessions: many(sessions),
  };
});

export const sessionsRelations = relations(sessions, ({ one }) => {
  return {
    user: one(users, {
      fields: [sessions.userId],
      references: [users.id],
    }),
  };
});
