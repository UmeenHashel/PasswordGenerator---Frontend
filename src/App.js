import { useState } from "react";
import "./styles.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGeneratePassword = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/generate-password?length=${Number(length)}&numbers=${numbers}&symbols=${symbols}`
      );
      const data = await response.json();
      setPassword(data.password);
      console.log(data);
      setCopied(false);
    } catch (error) {
      console.error("Error fetching password:", error);
      setPassword("Error fetching password. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Error copying to clipboard", err));
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <label>Password Length: </label>
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        min="4"
        max="50"
      />

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
        <div className="password-container">
        <input type="text" value={password} readOnly className="password-box" placeholder="Generated password will appear here" />
        <button className="copy-btn" onClick={handleCopy} disabled={!password}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      )}
    </div>
  );
}

export default App;
