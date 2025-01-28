import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
function AnecdoteList() {
    const anecdotes = useSelector(state => state)

    // sort by votes
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch( voteAnecdote(id) )
      console.log('vote', id)
    }

  return (
    <div>
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}</div>
  )
}

export default AnecdoteList