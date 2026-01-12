import { useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdotes(anecdote));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
