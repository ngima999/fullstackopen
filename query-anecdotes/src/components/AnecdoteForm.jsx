import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const createAnecdote = async (newAnecdote) => {
  const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote)
  return response.data
}

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // Update cache with the new anecdote
      queryClient.setQueryData(['anecdotes'], (oldData) => [...oldData, newAnecdote])
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    event.target.anecdote.value = ''

    if (content.length < 5) {
      console.log('Anecdote must be at least 5 characters long!')
      return
    }

    mutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
