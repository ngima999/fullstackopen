
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

  return (
    <div>
      <h1>Give feedback</h1>
      <button style={{ marginRight: '10px' }} onClick={handleGood}>Good</button> 
      <button style={{ marginRight: '10px' }} onClick={handleNeutral}>Neutral</button>
      <button style={{ marginRight: '10px' }} onClick={handleBad}>Bad</button>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  );
}

export default App;
