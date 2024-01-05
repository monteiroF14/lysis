import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from ".";

export const category = pgTable('category', {
  id: text('id').$default(() => createId()).primaryKey(),
  adminId: text('admin_id').notNull(), 
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const categoryRelations = relations(category, ({ one }) => ({
  admin_id: one(user, {
    fields: [category.adminId],
    references: [user.id]
  })
}))