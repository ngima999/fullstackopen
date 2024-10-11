
import { useState } from 'react';

const App = () => {
  // Feedback state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handlers for updating state
  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  const total=good+neutral+bad;

// Calculate average score
const average = (good * 1 + neutral * 0 + bad * -1) / total || 0;

 //Calculate percentage of positive feedback
 const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <button style={{ marginRight: '10px' }} onClick={handleGood}>Good</button> 
      <button style={{ marginRight: '10px' }} onClick={handleNeutral}>Neutral</button>
      <button style={{ marginRight: '10px' }} onClick={handleBad}>Bad</button>



      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total}</p>
      <p>average: {average}</p>
      <p>positive: {positivePercentage} %</p>
    </div>
  );
}

export default App;
