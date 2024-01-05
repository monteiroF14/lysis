import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, } from "drizzle-orm/pg-core";
import { post } from './post';

export const userRoleEnum = pgEnum('user_role', ["APPLICATION_USER", "SUPER_ADMIN"])

export const user = pgTable('user', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  name: text('name').notNull(),
  role: userRoleEnum('role').default("APPLICATION_USER"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  imageUrl: text('image_url').notNull()
})

export const userRelations = relations(user, ({many}) => ({
  posts: many(post)
}))