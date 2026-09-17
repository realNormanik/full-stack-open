import { notFound } from "next/navigation"
import { eq, and } from "drizzle-orm"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getBlogById } from "../../services/blogs"
import { getCurrentUser } from "../../services/session"
import { likeBlog, addToReadingList } from "../../actions/blogs"

const BlogPage = async ({ params }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()

  let alreadyOnList = false
  if (user) {
    const existing = await db.query.readingList.findFirst({
      where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blog.id)),
    })
    alreadyOnList = Boolean(existing)
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>author: {blog.author}</p>
      <p>
        url: <a href={blog.id}>{blog.url}</a>
      </p>
      <p>likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
      {user && blog.userId !== user.id && !alreadyOnList && (
        <form action={addToReadingList.bind(null, blog.id)}>
          <button type="submit">add to reading list</button>
        </form>
      )}
    </div>
  )
}

export default BlogPage