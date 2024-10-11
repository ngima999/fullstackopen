import { useState } from 'react';

// Component to display a single statistic
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Component to display all statistics
const Statistics = ({ good, neutral, bad, total, average, positivePercentage }) => {
  
  
  if (total === 0) {
    return <p>No feedback given</p>; // Display message if no feedback has been collected
  }
 

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average.toFixed(2)} />
        <StatisticLine text="Positive" value={`${positivePercentage.toFixed(2)} %`} />
      </tbody>
    </table>
  );
};

// Main App component
const App = () => {
  // Feedback state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handlers for updating state
  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  // Calculate total feedback and statistics
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total || 0;
  const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <button style={{ marginRight: '10px' }} onClick={handleGood}>Good</button> 
      <button style={{ marginRight: '10px' }} onClick={handleNeutral}>Neutral</button>
      <button style={{ marginRight: '10px' }} onClick={handleBad}>Bad</button>

      <h2>statistics</h2>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        average={average} 
        positivePercentage={positivePercentage} 
      />
    </div>
  );
}

export default App;
