import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleSetPersons = ({ newName, newNumber }) => {
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setFilteredPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const handleFilterChange = (filterKey) => {
    const filteredPersons = persons.filter((item) =>
      item.name.toLowerCase().includes(filterKey.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        handleSetPersons={handleSetPersons}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}></Persons>
    </div>
  );
};

export default App;
