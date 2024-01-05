import { faker } from "@faker-js/faker";
import chalk from "chalk";
import { db } from "./connection";
import { category, post, user, view } from "./schema";

/**
 * Reset database
 */
await db.delete(category);
await db.delete(post);
await db.delete(user);
await db.delete(view);

console.log(chalk.yellow("✔ Database reset"));

/**
 * Create users
 */
const [user1] = await db
	.insert(user)
	.values([
		{
			name: faker.person.fullName(),
			imageUrl: faker.image.avatarGitHub(),
			role: "APPLICATION_USER",
		},
	])
	.returning();

console.log(chalk.yellow("✔ Created users"));

/**
 * Create super admin
 */
const [admin] = await db
	.insert(user)
	.values({
		name: faker.person.fullName(),
		imageUrl: "./assets/admin.png",
		role: "SUPER_ADMIN",
	})
	.returning();

console.log(chalk.yellow("✔ Created admin"));

/**
 * Create category
 */
const [category1, category2] = await db
	.insert(category)
	.values([
		{
			name: Object.getOwnPropertyNames(faker)[Math.random()],
			description: faker.lorem.paragraph(),
			adminId: admin.id,
		},
		{
			name: Object.getOwnPropertyNames(faker)[Math.random()],
			description: faker.lorem.paragraph(),
			adminId: admin.id,
		},
	])
	.returning();

console.log(chalk.yellow("✔ Created category"));

/**
 * Create posts
 */
const allPosts = await db
	.insert(post)
	.values([
		{
			title: faker.commerce.productName(),
			authorId: admin.id,
			synopsis: faker.lorem.sentence(),
			body: faker.lorem.paragraphs(),
			thumbnail: faker.image.urlPlaceholder(),
			// add category here
			// add views here
		},
		{
			title: faker.commerce.productName(),
			authorId: admin.id,
			synopsis: faker.lorem.sentence(),
			body: faker.lorem.paragraphs(),
			thumbnail: faker.image.urlPlaceholder(),
			// add category here
			// add views here
		},
		{
			title: faker.commerce.productName(),
			authorId: admin.id,
			synopsis: faker.lorem.sentence(),
			body: faker.lorem.paragraphs(),
			thumbnail: faker.image.urlPlaceholder(),
			// add category here
			// add views here
		},
		{
			title: faker.commerce.productName(),
			authorId: admin.id,
			synopsis: faker.lorem.sentence(),
			body: faker.lorem.paragraphs(),
			thumbnail: faker.image.urlPlaceholder(),
			// add category here
			// add views here
		},
	])
	.returning();

console.log(chalk.yellow("✔ Created posts"));

/**
 * Create post view
 */

// TODO add the missing fields, which are relation fields
// TODO add the view table seeds

console.log(chalk.greenBright("Database seeded successfully!"));

process.exit();
