const mongoose = require("mongoose");
const Comment = require("./comment");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  author: { type: String, required: true },
  url: { type: String, required: true },
  comments: [Comment.schema]
});

blogSchema.methods.toJSON = function() {
  const blogObject = this.toObject();
  delete blogObject.__v;

  if (blogObject.user) {
    blogObject.user = {
      _id: blogObject.user._id,
      username: blogObject.user.username,
      name: blogObject.user.name
    };
  }

  if (blogObject.comments) {
    blogObject.comments = blogObject.comments.map(comment => {
      return {
        _id: comment._id,
        content: comment.content,
        createdAt: comment.createdAt
      };
    });
  };

  return blogObject;
};

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;