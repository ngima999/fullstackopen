import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
    dispatch(voteAnecdote(id))
    console.log('vote', id)
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
