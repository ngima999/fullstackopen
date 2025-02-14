import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from './context/NotificationContext'
import axios from 'axios'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'

const getAnecdotes = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, updatedAnecdote)
  return updatedAnecdote
}

const App = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const { data: anecdotes, error, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const mutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) =>
        oldData.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )

      dispatch({ type: 'SET_NOTIFICATION', payload: `You voted for "${updatedAnecdote.content}"` })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })

  if (isLoading) return <p>Loading anecdotes...</p>
  if (error) return <p style={{ color: 'red' }}>Anecdote service not available</p>

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          {anecdote.content} <strong>has {anecdote.votes} votes</strong>
          <button onClick={() => mutation.mutate(anecdote)}>Vote</button>
        </div>
      ))}
    </div>
  )
}

export default App
