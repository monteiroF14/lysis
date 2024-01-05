import * as schema from 'db/schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from "env"
import postgres from 'postgres'

const client = postgres(env.DB_URL)

export const db = drizzle(client, { schema })
