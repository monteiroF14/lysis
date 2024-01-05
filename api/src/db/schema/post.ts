import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from ".";
import { category } from "./category";
import { view } from "./view";

export const postVisibilityEnum = pgEnum('post_visibility', ["public", "private"])

export const post = pgTable('post', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  authorId: text('author_id').notNull(),
  title: text('title').notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  thumbnail: text('thumbnail').notNull(),
  body: text('body'),
  visibility: postVisibilityEnum('visibility').default("public"),
  synopsis: text("synopsis").notNull()
})

export const postRelations = relations(post, ({ many, one }) => ({
  category: many(category),
  views: many(view),
  author: one(user, {
    fields: [post.authorId],
    references: [user.id]
  })
}))