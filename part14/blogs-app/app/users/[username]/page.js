import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogsByUsername } from "../../services/users"

const UserPage = async ({ params }) => {
  const { username } = await params
  const user = await getUserWithBlogsByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> — {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}
export default UserPage