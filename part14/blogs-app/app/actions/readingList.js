"use server"

import { and, eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUser } from "../services/session"

export const addToReadingList = async (blogId) => {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const existing = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)),
  })
  if (existing) return

  await db.insert(readingList).values({ userId: user.id, blogId })
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}