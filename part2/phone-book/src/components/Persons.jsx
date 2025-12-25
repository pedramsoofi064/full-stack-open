const Person = ({ persons }) => {
  return persons.map((person) => (
    <h4 key={person.name}>
      {person.name} {person.number}
    </h4>
  ));
};

export default Person;
