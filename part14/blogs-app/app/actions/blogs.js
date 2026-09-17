"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { eq, and } from "drizzle-orm"
import { addBlog, incrementLikes } from "../services/blogs"
import { getCurrentUser } from "../services/session"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"

export const createBlog = async (prevState, formData) => {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const title = formData.get("title") ?? ""
  const author = formData.get("author") ?? ""
  const url = formData.get("url") ?? ""

  const errors = {}
  if (title.trim().length < 5) errors.title = "Title must be at least 5 characters"
  if (author.trim().length < 5) errors.author = "Author must be at least 5 characters"
  if (url.trim().length < 5) errors.url = "Url must be at least 5 characters"

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } }
  }

  const [blog] = await db.insert(blogs).values({ title, author, url, userId: user.id }).returning()
  await db.insert(readingList).values({ userId: user.id, blogId: blog.id })

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData) => {
  const id = Number(formData.get("id"))
  await incrementLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

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

export const markAsRead = async (id) => {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  await db.update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, user.id)))

  revalidatePath("/me")
}