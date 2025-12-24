import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const VoteHolder = ({ vote }) => {
  return <p>has {vote} votes</p>;
};

const MostVotetAnecdote = ({ anecdotes, votes }) => {
  let max = 0;
  let anecdote = anecdotes[0];

  for (const [key, vote] of Object.entries(votes)) {
    if (vote > max) {
      max = vote;
      anecdote = anecdotes[key];
    }
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>

      {anecdote}
      <br />
      <VoteHolder vote={max} />
    </div>
  );
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [currentAnecdoteIndex, setCurrentAnecdoteIndex] = useState(0);

  const selectRandomAnecdote = () => {
    const randomNumber = getRandomNumber(anecdotes.length - 1);
    setCurrentAnecdoteIndex(randomNumber)
    setSelected(randomNumber)
  }

  const [votes, setVotes] = useState(
    anecdotes.reduce((acc, item, index) => {
      acc[index] = 0;
      return acc;
    }, {})
  );

  const onVoteClickHanlder = () => {
    setVotes({
      ...votes,
      [selected]: votes[selected] + 1,
    });
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <VoteHolder vote={votes[currentAnecdoteIndex]}></VoteHolder>
      <Button text="vote" onClick={onVoteClickHanlder}></Button>
      <Button
        text="next anecdotes"
        onClick={selectRandomAnecdote}
      ></Button>
      <br />
      <MostVotetAnecdote
        anecdotes={anecdotes}
        votes={votes}
      ></MostVotetAnecdote>
    </div>
  );
};

export default App;
