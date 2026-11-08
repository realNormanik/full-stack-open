const mongoose = require("mongoose");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      match: [EMAIL_REGEX, "Validation isEmail on username failed"],
    },
    // bcrypt hash, never the plain password
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    disabled: {
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
        delete returned.password;
        delete returned.disabled;
      },
    },
  }
);

// user.blogs - blogs added by the user (populate with `.populate("blogs")`)
userSchema.virtual("blogs", {
  ref: "Blog",
  localField: "_id",
  foreignField: "userId",
});

module.exports = mongoose.model("User", userSchema);
