import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserWithBlogsByUsername = async (username) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}