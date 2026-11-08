const mongoose = require("mongoose");

// Join collection between users and blogs (many-to-many) with the `read` flag.
const readingListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
      virtuals: true,
      transform: (document, returned) => {
        returned.id = returned._id.toString();

        delete returned._id;
        delete returned.__v;
      },
    },
  }
);

// A blog can be on a user's reading list only once
readingListSchema.virtual("user", { ref: "User", localField: "userId", foreignField: "_id", justOne: true });
readingListSchema.virtual("blog", { ref: "Blog", localField: "blogId", foreignField: "_id", justOne: true });

readingListSchema.index({ userId: 1, blogId: 1 }, { unique: true });

module.exports = mongoose.model("ReadingList", readingListSchema);
