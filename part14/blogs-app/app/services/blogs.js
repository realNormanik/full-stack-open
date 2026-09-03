const blogs = [
  { id: 1, title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
  { id: 2, title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://...", likes: 5 },
  { id: 3, title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://...", likes: 12 },
]

let nextId = 4

export const getBlogs = () => blogs

export const getBlogById = (id) => blogs.find((blog) => blog.id === id)

export const addBlog = (title, author, url) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const incrementLikes = (id) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes += 1
  }
}