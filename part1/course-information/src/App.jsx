const App = () => {
  
  const Header = (props) => (<h1>{props.course.name}</h1>)
  const Part = (props) => (<p>{props.part.name} {props.part.exercises}</p>);
  const Content = (props) => {
    return props.course.parts.map((item , index) => (<Part part={item} key={index}></Part>))
  }
  const Total = (props) => (<p>Number of exercises {props.course.parts.reduce((acc , item) => acc += item.exercises , 0)}</p>)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }

  return (
   <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App