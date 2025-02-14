import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
function AnecdoteList() {
  const anecdotes = useSelector(state => state.anecdotes) // directly access anecdotes array
  const filter = useSelector(state => state.filter) 
  const dispatch = useDispatch()


   // Apply the filter first, then sort the anecdotes by votes
   const filteredAnecdotes = anecdotes
   .filter(anecdote =>
     anecdote.content.toLowerCase().includes(filter.toLowerCase()) // Filter case-insensitively
   )
   .sort((a, b) => b.votes - a.votes) // Sort after filtering by votes


  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    const votedAnecdote = anecdotes.find(a => a.id === id)
  if (votedAnecdote) {
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5))
  }
}

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
