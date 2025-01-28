import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

function AnecdoteForm() {
    const dispatch = useDispatch();

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        console.log('Creating anecdote:', content);  // Debugging
        event.target.anecdote.value = '';  // Reset the input field after submission
        dispatch(createAnecdote(content));  // Dispatch the action
    };

    return (
        <div>
            <h2>Create New Anecdote</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );
}

export default AnecdoteForm;
