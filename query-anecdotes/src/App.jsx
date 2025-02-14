import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getAnecdotes = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const App = () => {
  const { data: anecdotes, error, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false // prevent retries for testing error state
  })

  if (isLoading) return <p>Loading anecdotes...</p>
  if (error) return <p style={{ color: 'red' }}>Anecdote service not available</p>

  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          {anecdote.content} <strong>has {anecdote.votes} votes</strong>
        </div>
      ))}
    </div>
  )
}

export default App
