import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as feedbackSchema from "../schema/feedback"
import { eq } from "drizzle-orm"
import dotenv from "dotenv"
import path from "path"

// Load env vars manually since we are running a script
dotenv.config({ path: path.resolve(__dirname, "../.env") })

const connectionString = process.env.DATABASE_URL!
const client = neon(connectionString)
const db = drizzle(client, { schema: { ...feedbackSchema } })

async function main() {
  const slug = "features"
  console.log(`Checking board with slug: ${slug}`)
  
  const found = await db.select().from(feedbackSchema.board).where(eq(feedbackSchema.board.slug, slug))
  
  console.log("Found boards:", JSON.stringify(found, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
