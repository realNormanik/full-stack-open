require("dotenv").config();

const mongoose = require("mongoose");

const Todo = require("./mongo/models/Todo");

const todosData = [
  { text: "Write code", done: true },
  { text: "Learn about containers", done: false },
  { text: "Connect the backend to MongoDB Atlas", done: true },
  { text: "Add Redis statistics", done: false },
  { text: "Deploy the application", done: false },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const mongoName = process.env.MONGODB_NAME;

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI in .env");
    };

    if (!mongoName) {
      throw new Error("Missing MONGODB_NAME in .env");
    };

    await mongoose.connect(mongoUri, { dbName: mongoName });

    console.log(`Connected to MongoDB database: ${mongoName}`);

    const todosCount = await Todo.countDocuments();

    if (todosCount > 0) {
      console.log(`Database already contains ${todosCount} todos. No changes made.`);
    } else {
      await Todo.insertMany(todosData);

      console.log(`Successfully imported ${todosData.length} todos.`);
    };
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    };
  };
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
