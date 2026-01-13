import { useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdotes(anecdote));

    dispatch(showNotification(`You created '${anecdote}'`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5_000);
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
