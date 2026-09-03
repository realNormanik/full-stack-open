"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementLikes } from "../services/blogs"

export const createBlog = async (formData) => {
  const title = formData.get("title")
  const author = formData.get("author")
  const url = formData.get("url")

  addBlog(title, author, url)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData) => {
  const id = Number(formData.get("id"))
  incrementLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}