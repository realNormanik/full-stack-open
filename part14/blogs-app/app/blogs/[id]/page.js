import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog } from "../../actions/blogs"

const BlogPage = async ({ params }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>author: {blog.author}</p>
      <p>
        url: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  )
}

export default BlogPage