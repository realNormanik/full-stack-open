"use server"

import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "../services/session"

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  await db.update(users)
    .set({ token: crypto.randomUUID() })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}