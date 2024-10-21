const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => (
  <form onSubmit={addPerson}>
    <div style={{ marginBottom: '10px' }}>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div style={{ marginBottom: '10px' }}>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <button type="submit" style={{ marginTop: '10px' }}>add</button>
  </form>
);

export default PersonForm;
