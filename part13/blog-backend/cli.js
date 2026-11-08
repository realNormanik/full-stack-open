const { Blog } = require("./models");
const { connect, disconnect } = require("./utils/db");

// Prints all blogs from the database, e.g.:
//   Dan Abramov: 'On let vs const', 0 likes
async function main() {
  await connect();

  console.log("Executing (default): db.blogs.find()");

  const blogs = await Blog.find().sort({ _id: 1 });

  blogs.forEach((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
  });
};

main()
  .catch((error) => {
    console.error("CLI failed:", error);
    process.exitCode = 1;
  })
  .finally(disconnect);
