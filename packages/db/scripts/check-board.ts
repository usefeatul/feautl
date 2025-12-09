
import { db } from "../index"
import { board } from "../schema/feedback"
import { eq } from "drizzle-orm"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../.env") })

async function main() {
  const slug = "features"
  console.log(`Checking board with slug: ${slug}`)
  
  const found = await db.select().from(board).where(eq(board.slug, slug))
  
  console.log("Found boards:", JSON.stringify(found, null, 2))
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
