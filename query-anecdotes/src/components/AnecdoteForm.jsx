import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../context/NotificationContext'
import axios from 'axios'

const createAnecdote = async (newAnecdote) => {
  const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote)
  return response.data
}

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => [...oldData, newAnecdote])
      dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote added: "${newAnecdote.content}"` })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Error: Anecdote must be at least 5 characters long' })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })
  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    event.target.anecdote.value = ''
  
    if (content.length < 5) {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Error: Anecdote must be at least 5 characters long' })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
      return
    }
  
    mutation.mutate({ content, votes: 0 })
  }
  

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
