
const personsRouter = require("express").Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

if (!dbName) {
  throw new Error("Missing MONGODB_NAME environment variable");
}

// Jeden klient na instancję aplikacji
const client = new MongoClient(uri);

let dbPromise;

async function getDb() {
  if (!dbPromise) {
    dbPromise = client.connect()
      .then(() => {
        console.log("Connected to MongoDB Atlas");
        return client.db(dbName);
      })
      .catch((err) => {
        dbPromise = null;
        console.error("MongoDB connection failed:", err.message);
        throw err;
      });
  }

  return dbPromise;
}

// GET /api/persons
personsRouter.get("/", async (req, res) => {
  try {
    const db = await getDb();
    const persons = await db.collection("persons").find({}).toArray();
    res.json(persons);
  } catch (error) {
    console.error("GET persons failed:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/persons/:id
personsRouter.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const db = await getDb();
    const person = await db.collection("persons").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    console.error("GET person failed:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/persons/:id
personsRouter.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const db = await getDb();
    const result = await db.collection("persons").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    console.error("DELETE person failed:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/persons
personsRouter.post("/", async (req, res) => {
  try {
    const { name, number } = req.body;

    if (!name || !number) {
      return res.status(400).json({
        error: "name or number is missing"
      });
    }

    const db = await getDb();
    const collection = db.collection("persons");

    const existingPerson = await collection.findOne({ name });

    if (existingPerson) {
      return res.status(400).json({
        error: "name must be unique"
      });
    }

    const newPerson = { name, number };
    const result = await collection.insertOne(newPerson);

    res.status(201).json({
      ...newPerson,
      _id: result.insertedId
    });
  } catch (error) {
    console.error("POST person failed:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/persons/:id
personsRouter.put("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const { name, number } = req.body;

    if (!name || !number) {
      return res.status(400).json({
        error: "name and number are required"
      });
    }

    const db = await getDb();
    const collection = db.collection("persons");
    const id = new ObjectId(req.params.id);

    const result = await collection.updateOne(
      { _id: id },
      { $set: { name, number } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Person not found" });
    }

    const updatedPerson = await collection.findOne({ _id: id });
    res.json(updatedPerson);
  } catch (error) {
    console.error("PUT person failed:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = personsRouter;