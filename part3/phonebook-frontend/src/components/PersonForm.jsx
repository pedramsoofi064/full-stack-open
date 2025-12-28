import { useState } from "react";

const PersonForm = ({ persons, handleSetPersons, handleUpdatePerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName.length) return;

    const person = persons.find((item) => item.name === newName);
    if (person) {
      const isConfirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (isConfirm) {
        handleUpdatePerson({
          name: newName,
          number: newNumber,
          id: person.id,
        });
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    setNewName("");
    setNewNumber("");
    handleSetPersons({ newName, newNumber });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
