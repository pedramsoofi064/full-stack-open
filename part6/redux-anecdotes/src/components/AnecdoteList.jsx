import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filterKey = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    const filteredList = filterKey
      ? state.anecdotes.filter((item) => item.content.includes(filterKey))
      : state.anecdotes;

    return [...filteredList].sort((a, b) => b.votes - a.votes);
  });

  const vote = (id) => {
    dispatch(voteForAnecdote(id));

    const targetAnecdote = anecdotes.find((item) => item.id === id);
    dispatch(setNotification(`You voted '${targetAnecdote.content}'`, 5));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
