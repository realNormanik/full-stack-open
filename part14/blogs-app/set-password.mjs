import { config } from "dotenv"
config({ path: ".env.local" })
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

const setPassword = async (username, password) => {
  const { db } = await import("./db/index.js")
  const { users } = await import("./db/schema.js")
  const hash = await bcrypt.hash(password, 10)
  await db.update(users).set({ passwordHash: hash }).where(eq(users.username, username))
  console.log(`Password set for user: ${username}`)
}

const [, , username, password] = process.argv
if (!username || !password) {
  console.log("Usage: node set-password.mjs <username> <password>")
  process.exit(1)
}

setPassword(username, password).then(() => process.exit(0))