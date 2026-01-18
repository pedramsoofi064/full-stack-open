import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateAnecdote } from './services/anecdotes'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from './context/NotificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((item) => {
          if (item.id === newData.id) return newData

          return item
        }),
      )

      notificationDispatch({
        type: 'SHOW',
        payload: `You voted '${newData.content}'`,
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'HIDE',
        })
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    const payload = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    voteMutation.mutate(payload)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  })

  if (result.isLoading) return <div>loading data...</div>

  if (result.isError)
    return <div>anecdotes service not available due to problems is server</div>

  const anecdotes = result.data.sort((a , b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
