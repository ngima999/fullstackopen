import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdote'  // Ensure the path is correct


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // Replace the entire state with the fetched anecdotes.
    setAnecdotes(state, action) {
      return action.payload
    },
    // Append a new anecdote to the state.
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    // Increase the vote count for a specific anecdote.
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote => 
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    }
  }
})

// Export the generated action creators.
export const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions

// Thunk for initializing the anecdotes from the backend.
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Thunk for creating a new anecdote on the backend and updating state.
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// Thunk for handling a vote (if you need to update the backend too)
export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id);
    if (!anecdote) return; // Prevent errors if anecdote is not found
    
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const savedAnecdote = await anecdoteService.update(id, updatedAnecdote);
    
    dispatch(voteAnecdote(savedAnecdote)); // Dispatch the full updated anecdote
  };
};




export default anecdoteSlice.reducer
