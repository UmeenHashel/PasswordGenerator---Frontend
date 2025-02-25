import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/generate-password', {
        params: {
          length: length,
          numbers: includeNumbers,
          symbols: includeSymbols,
        },
      });
      setPassword(response.data.Password);
      setIsCopied(false); // Reset copied state when a new password is generated
    } catch (error) {
      console.error('Error generating password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Hide the prompt after 2 seconds
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Password Generator
        </h1>

        {/* Password Length Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="8"
            max="50"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Include Numbers Checkbox */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Include Numbers</span>
          </label>
        </div>

        {/* Include Symbols Checkbox */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Include Symbols</span>
          </label>
        </div>

        {/* Generate Password Button */}
        <button
          onClick={generatePassword}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Generating...' : 'Generate Password'}
        </button>

        {/* Display Generated Password */}
        {password && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg relative">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Your Password:
            </h2>
            <p className="text-xl font-mono text-gray-900 break-all">
              {password}
            </p>
            {/* Copy to Clipboard Button */}
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-blue-600 transition duration-300"
              title="Copy to Clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Copy Prompt */}
        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;