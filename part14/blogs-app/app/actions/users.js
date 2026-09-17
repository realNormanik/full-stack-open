"use server"

import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"

export const registerUser = async (prevState, formData) => {
  const username = (formData.get("username") ?? "").trim()
  const name = (formData.get("name") ?? "").trim()
  const password = formData.get("password") ?? ""
  const passwordConfirm = formData.get("passwordConfirm") ?? ""

  const errors = {}
  if (username.length < 4) errors.username = "Username must be at least 4 characters"
  if (password.length < 4) errors.password = "Password must be at least 4 characters"
  if (password !== passwordConfirm) errors.passwordConfirm = "Passwords do not match"

  const existing = await db.query.users.findFirst({ where: eq(users.username, username) })
  if (existing) errors.username = "Username already taken"

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })
  redirect("/login")
}