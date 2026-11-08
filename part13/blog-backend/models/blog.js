const mongoose = require("mongoose");

const MIN_YEAR = 1991;

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Url is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Likes must be an integer",
      },
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      validate: {
        validator: (value) => Number.isInteger(value) && value >= MIN_YEAR && value <= new Date().getFullYear(),
        message: () => `Year must be an integer between ${MIN_YEAR} and ${new Date().getFullYear()}`,
      },
    },
    // Id of the user who added the blog
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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

// blog.user - the user who added the blog (populate with `.populate("user", "name username")`)
blogSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

blogSchema.index({ likes: -1 });

module.exports = mongoose.model("Blog", blogSchema);
