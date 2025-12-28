const Person = ({ persons, handleRemovePerson }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}{" "}
            <button
              onClick={() => {
                handleRemovePerson(person);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Person;
