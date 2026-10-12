import { useState, useEffect } from "react";
import personService from "./personService"; // Import the personService module

// Background
const Background = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    {/* Grid, fading out from the top */}
    <div className="background" />

    {/* Brand glows */}
    <div className="absolute left-1/2 top-0 h-80 w-176 -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand/20 blur-3xl" />
    <div className="absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
  </div>
);

// Filter Component
const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="relative">
      <label htmlFor="filter" className="sr-only">Search</label>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25" className="u2">
        <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
      </svg>
      <input
        id="filter"
        type="search"
        placeholder="Search contacts…"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

// PersonForm Component
const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleFormSubmit }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name">Name</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25" className="u2">
              <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
            </svg>
            <input
              id="name"
              placeholder="John Doe"
              value={newName}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25" className="u2">
              <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" />
            </svg>
            <input
              id="number"
              placeholder="040-1234567"
              value={newNumber}
              onChange={handleNumberChange}
              className="tabular-nums"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="add"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
          <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
        </svg>
        Add contact
      </button>
    </form>
  );
};

// Person Component
const Person = ({ person, handleDelete }) => {
  return (
    <li id={person._id}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-sm font-semibold text-brand">
        {person.name?.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{person.name}</p>

        <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs tabular-nums text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15" className="fill-muted">
              <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" />
            </svg>
          {person.number}
        </p>
      </div>

      <button
        onClick={() => handleDelete(person._id)}
        aria-label={`Delete ${person.name}`}
        className="delete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
          <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
        </svg>
      </button>
    </li>
  );
};

// Persons Component
const Persons = ({ filteredPersons, handleDelete }) => {
  if (filteredPersons.length === 0) {
    return (
      <div className="u1 px-6 py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft fill-brand">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
            <path d="M480 576L192 576C139 576 96 533 96 480L96 160C96 107 139 64 192 64L496 64C522.5 64 544 85.5 544 112L544 400C544 420.9 530.6 438.7 512 445.3L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L480 576zM192 448C174.3 448 160 462.3 160 480C160 497.7 174.3 512 192 512L448 512L448 448L192 448zM224 216C224 229.3 234.7 240 248 240L424 240C437.3 240 448 229.3 448 216C448 202.7 437.3 192 424 192L248 192C234.7 192 224 202.7 224 216zM248 288C234.7 288 224 298.7 224 312C224 325.3 234.7 336 248 336L424 336C437.3 336 448 325.3 448 312C448 298.7 437.3 288 424 288L248 288z" />
          </svg>
        </div>
        <p className="text-sm font-semibold">No contacts found</p>
        <p className="mt-1 text-sm text-muted">Try a different search or add a new contact.</p>
      </div>
    );
  }

  return (
    <ul>
      {filteredPersons.map(person => (
        <Person key={person._id} person={person} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

// App Component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null); // State for notification

  useEffect(() => {
    // Fetch initial data from the server
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setNotification("Error fetching data from server"); // Set error notification
        setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      // If the person already exists, ask for confirmation to update the number
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService.update(existingPerson._id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person._id !== existingPerson._id ? person : returnedPerson));
            setNewName(""); // Clear the input field for name
            setNewNumber(""); // Clear the input field for number
            setNotification(`Updated ${returnedPerson.name}"s number`); // Set notification
            setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
          })
          .catch(error => {
            console.error("Error updating person:", error);
            setNotification(`Error updating ${newName}. Person may have been deleted.`); // Set error notification
            setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
          });
      };
    } else if (newName && newNumber) {
      const newPerson = { name: newName, number: newNumber };

      // Use personService to add the new person
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)); // Add the new person to the list
          setNewName(""); // Clear the input field for name
          setNewNumber(""); // Clear the input field for number
          setNotification(`Added ${returnedPerson.name}`); // Set notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        })
        .catch(error => {
          console.error("Error adding person:", error);
          setNotification(`Error adding ${newName}. Please try again.`); // Set error notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        });
    };
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person._id !== id)); // Update the state to remove the deleted person
          setNotification("Person deleted"); // Set notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        })
        .catch(error => {
          console.error("Error deleting person:", error);
          setNotification("Error deleting person. Please try again."); // Set error notification
          setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
        });
    };
  };

  // Filter persons based on the search term
  const filteredPersons = persons.filter(person => person?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  // Styling only: error messages all start with "Error"
  const isError = notification?.startsWith("Error");

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 py-12">
      <Background />

      <div className="mx-auto w-full max-w-xl space-y-6">
        <div>
          <h2>Phonebook</h2>
          <div className="mt-3 h-1 w-12 origin-left rounded-full bg-brand motion-safe:animate-grow" />
        </div>

        {notification && (
          <div
            role="status"
            className={
              "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium backdrop-blur-md " +
              (isError ? 
                "border-red-500/30 bg-red-500/10 text-red-600/70 dark:text-red-400 fill-red-600/70 dark:fill-red-400"
                 : 
                "border-green-500/30 bg-green-500/10 text-green-600/70 dark:text-green-400 fill-green-600/70 dark:fill-green-400"
              )
            }
          >
            {isError ? 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z" />
              </svg>
               : 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z" />
              </svg>
            }

            <span>{notification}</span>
          </div>
        )}

        <section className="p-5">
          <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        </section>

        <section className="p-5">
          <h3 className="mb-4">Add a new contact</h3>

          <PersonForm
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            handleFormSubmit={handleFormSubmit}
          />
        </section>

        <section className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h3>Numbers</h3>
            <span className="rounded-full bg-soft px-2 py-1 text-xs font-medium tabular-nums text-muted">
              {filteredPersons.length}
            </span>
          </div>

          <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
        </section>

        {/* Footer */}
        <p className="py-3 mb-0 text-center text-sm text-muted">
          Built with React & Tailwind CSS
        </p>

        {/* GitHub */}
        <aside className="github">
          <div className="z-2 fixed w-50 h-50 right-0 bottom-0 overflow-hidden after:content-[''] after:block after:absolute after:left-0 after:right-0 after:bottom-0 after:z-0 after:border-t-[12.5rem] after:border-t-transparent after:border-l-[12.5rem] after:border-l-transparent after:border-b-[12.5rem] after:border-b-[#343535]">
            <div className="u1 z-1 w-full h-full top-0 right-0 absolute justify-end -rotate-45">
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="github-repo"
                href="https://github.com/realNormanik/full-stack-open/tree/main/part2/phonebook-frontend"
                className="u1 focus:text-g-100 hover:text-[#a6a6a6] text-white text-base font-mono no-underline px-6 pt-[.1875rem] pb-6 m-0 -mb-5 transition-colors duration-[150ms] ease-[cubic-bezier(1,-.115,.975,.855)]"
              >
                <p className="text-current font-normal text-base mt-4 mb-4">
                  View on GitHub
                </p>

                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" aria-hidden="true" width="35" height="35">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2.3z" />
                </svg>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;