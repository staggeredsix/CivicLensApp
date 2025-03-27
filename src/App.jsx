import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SummaryPanel from './components/SummaryPanel';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (searchData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching summary:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold dark:text-white text-gray-800">CivicLens</h1>
              <ThemeToggle />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Clear, fact-based summaries of government actions
            </p>
          </header>

          <main>
            <SearchBar onSubmit={handleSubmit} />
            
            {loading && (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-6">
                {error}
              </div>
            )}
            
            {result && !loading && <SummaryPanel data={result} />}
          </main>

          <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} CivicLens - Nonpartisan government information
            </p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
