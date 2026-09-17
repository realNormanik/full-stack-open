import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const GET = async (req) => {
  const header = req.headers.get("authorization")
  if (!header?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "token missing" }, { status: 401 })
  }

  const token = header.substring(7)
  const user = await db.query.users.findFirst({ where: eq(users.token, token) })
  if (!user) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 })
  }

  return NextResponse.json({ id: user.id, username: user.username, name: user.name })
}