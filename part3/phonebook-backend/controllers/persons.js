const personsRouter = require("express").Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const dbName = process.env.MONGODB_NAME;

let db;

client.connect()
  .then(() => {
    db = client.db(dbName);
    console.log("Connected to persons database");
  })
  .catch(err => console.error("Error connecting to persons database:", err));

const getCollection = () => db.collection("persons");

// GET /api/persons
personsRouter.get("/", async (req, res) => {
  try {
    const persons = await getCollection().find({}).toArray();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/persons/:id
personsRouter.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const person = await getCollection().findOne({
      _id: new ObjectId(req.params.id)
    });

    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/persons/:id
personsRouter.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const result = await getCollection().deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
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

    const existingPerson = await getCollection().findOne({ name });

    if (existingPerson) {
      return res.status(400).json({
        error: "name must be unique"
      });
    }

    const newPerson = { name, number };
    const result = await getCollection().insertOne(newPerson);

    res.status(201).json({
      ...newPerson,
      _id: result.insertedId
    });
  } catch (error) {
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

    const result = await getCollection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, number } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Person not found" });
    }

    const updatedPerson = await getCollection().findOne({
      _id: new ObjectId(req.params.id)
    });

    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = personsRouter;