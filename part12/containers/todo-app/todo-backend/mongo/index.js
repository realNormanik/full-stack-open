const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { MONGODB_URI, MONGODB_NAME } = require("../util/config");

if (MONGODB_URI && !mongoose.connection.readyState) {
  mongoose
    .connect(MONGODB_URI, { dbName: MONGODB_NAME })
    .then(() => console.log(`Connected to MongoDB database: ${MONGODB_NAME}`))
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message)
      process.exit(1)
    });
};

module.exports = {
  Todo
};
