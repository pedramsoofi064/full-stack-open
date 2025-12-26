import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
      .catch(() => setPersons([]));
  }, []);

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
