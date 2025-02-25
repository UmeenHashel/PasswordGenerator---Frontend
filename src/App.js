import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  const generatePassword = async () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setError('Please select at least one character set.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get('http://127.0.0.1:5000/generate-password', {
        params: {
          length: length,
          numbers: includeNumbers,
          symbols: includeSymbols,
          uppercase: includeUppercase,
          lowercase: includeLowercase,
          exclude_similar: excludeSimilar,
        },
      });
      setPassword(response.data.Password);
      setIsCopied(false);
    } catch (error) {
      console.error('Error generating password:', error);
      setError('Failed to generate password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Password Generator
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password Length: <span className="font-semibold text-white">{length}</span>
          </label>
          <input
            type="range"
            min="8"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500 bg-gray-700"
            />
            <span className="text-sm text-gray-300">Include Uppercase Letters</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500 bg-gray-700"
            />
            <span className="text-sm text-gray-300">Include Lowercase Letters</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500 bg-gray-700"
            />
            <span className="text-sm text-gray-300">Include Numbers</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500 bg-gray-700"
            />
            <span className="text-sm text-gray-300">Include Symbols</span>
          </label>
        </div>

        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500 bg-gray-700"
            />
            <span className="text-sm text-gray-300">Exclude Similar Characters (e.g., O vs. 0, l vs. 1)</span>
          </label>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={generatePassword}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Generating...' : 'Generate Password'}
        </button>

        {password && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg relative">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Your Password:
            </h2>
            <p className="text-xl font-mono text-white break-all">
              {password}
            </p>
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-500 transition duration-300"
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

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;