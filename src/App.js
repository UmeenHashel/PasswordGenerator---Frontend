import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/generate-password', {
        params: {
          length: length,
          numbers: includeNumbers,
          symbols: includeSymbols
        }
      });
      setPassword(response.data.Password);
    } catch (error) {
      console.error('Error generating password:', error);
    }
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>
          Password Length:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <div>
        <label>
          Include Numbers:
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Include Symbols:
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      {password && (
        <div>
          <h2>Your Password:</h2>
          <p>{password}</p>
        </div>
      )}
    </div>
  );
}

export default App;