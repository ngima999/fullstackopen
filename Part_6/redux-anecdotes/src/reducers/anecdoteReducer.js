import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer' // Import notification thunk

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => Number((100000 * Math.random()).toFixed(0))

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote: (state, action) => {
      state.push(action.payload) // Fix: Correctly push the entire anecdote object
    },
    voteAnecdote: (state, action) => {
      const anecdote = state.find(a => a.id === action.payload)
      if (anecdote) {
        anecdote.votes += 1
      }
    }
  }
})

// Export reducer actions
export const { addAnecdote, voteAnecdote } = anecdoteSlice.actions

// Thunks
export const createAnecdote = (content) => {
  return (dispatch) => {
    const newAnecdote = { content, id: getId(), votes: 0 }
    dispatch(addAnecdote(newAnecdote)) // Fix: Correct action name
    dispatch(showNotification(`You added "${content}"`))
  }
}

export const voteForAnecdote = (id) => {
  return (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`You voted for "${anecdote.content}"`))
  }
}

// Export reducer
export default anecdoteSlice.reducer
