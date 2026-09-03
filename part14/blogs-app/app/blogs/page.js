import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({ searchParams }) => {
  const { filter } = await searchParams
  const term = filter ?? ""

  const allBlogs = await getBlogs()
  const sorted = [...allBlogs].sort((a, b) => b.likes - a.likes)
  const blogs = term
    ? sorted.filter((blog) =>
        blog.title.toLowerCase().includes(term.toLowerCase())
      )
    : sorted

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs">
        <input type="text" name="filter" defaultValue={term} placeholder="search by title" />
        <button type="submit">search</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} — {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs