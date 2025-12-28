import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import personsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showNotification = (message, type) => {
    setMessage(message);
    setMessageType(type);

    if (!message) return;
    setTimeout(() => {
      showNotification('', '');
    }, 5_000);
  };

  const handleSetPersons = ({ newName, newNumber }) => {
    personsServices
      .create({ name: newName, number: newNumber })
      .then((response) => {
        showNotification(`Added ${newName}`, "success");
        setPersons(persons.concat(response.data));
      });
  };

  const handleFilterChange = (filterKey) => {
    const filteredPersons = persons.filter((item) =>
      item.name.toLowerCase().includes(filterKey.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  const handleRemovePerson = (person) => {
    const isConfirm = window.confirm(`Delete ${person.name} ?`);
    if (isConfirm) {
      personsServices
        .remove({ id: person.id })
        .then(() => {
          const newPersons = persons.filter((item) => item.id !== person.id);
          setPersons(newPersons);
        })
        .catch((e) => {
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            "error"
          );
        });
    }
  };

  const handleUpdatePerson = ({ name, number, id }) => {
    personsServices
      .update({ id, name, number })
      .then((res) => {
        const newPersons = persons.map((item) => {
          if (item.id === res.data.id) {
            return res.data;
          }
          return item;
        });
        setPersons(newPersons);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    personsServices
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch(() => setPersons([]));
  }, []);

  useEffect(() => {
    setFilteredPersons(persons.concat());
  }, [persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />

      <Filter handleFilterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        handleSetPersons={handleSetPersons}
        handleUpdatePerson={handleUpdatePerson}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        handleRemovePerson={handleRemovePerson}
      ></Persons>
    </div>
  );
};

export default App;
