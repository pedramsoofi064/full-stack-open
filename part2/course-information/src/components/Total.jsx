const Total = ({ course }) => {
  const total = course.parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);
  return <b>total of {total} exercises</b>;
};

export default Total;
