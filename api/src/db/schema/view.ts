import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { post } from "./post";

export const postViewEnum = pgEnum('post_view', ["daily", "weekly", "monthly", "total"])

export const view = pgTable('view', {
  id: text('id').$default(() => createId()).primaryKey(),
  postId: text('post_id').notNull(),
  count: integer('count').default(0),
  type: postViewEnum('type').default("total"),
  updatedAt: timestamp("updated_at").defaultNow()
})

export const viewRelations = relations(view, ({ one }) => ({
  post_id: one(post, {
    fields: [view.postId],
    references: [post.id]
  })
}))