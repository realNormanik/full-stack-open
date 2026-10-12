const mongoose = require("mongoose");

const password = process.argv[2];

if (!password) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
};

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
    // Display all entries
    console.log("phonebook:");
    
    Person.find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });
            mongoose.connection.close();
        })
        .catch(error => {
            console.error("Error fetching persons:", error.message);
            mongoose.connection.close();
        });
} else if (process.argv.length === 5) {
    // Add a new entry
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name,
        number,
    });

    person.save()
        .then(() => {
            console.log(`added ${name} number ${number} to phonebook`);
            mongoose.connection.close();
        })
        .catch(error => {
            console.error("Error saving person:", error.message);
            mongoose.connection.close();
        });
} else {
    console.log("Invalid number of arguments. Usage: node mongo.js <password> [name number]");
    mongoose.connection.close();
};