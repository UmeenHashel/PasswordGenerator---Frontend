import { useState } from "react";
import "./styles.css";


function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const handleGeneratePassword = async () => {

  };

  return (
    <div class="container">
      <h1>Password Generator</h1>

      <label>Password Length: </label>
      <input
        type="number"
        value={length}
        onChangeCapture={(e) => setLength(e.target.value)} 
        min="4" max="50"/>

      <div>
        <label>
          <input
            type="checkbox"
            checked={numbers}
            onChange={() => setNumbers(!numbers)}
          />
          Include Numbers
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
          />
          Include Special Symbols
        </label>
      </div>

      <button onClick={handleGeneratePassword}>Generate Password</button>

      {password && (
        <div>
          <h2>Password</h2>
          <div>{password}</div>
        </div>
      )}

    </div>
  );
}

export default App;
