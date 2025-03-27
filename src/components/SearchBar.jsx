// components/SearchBar.jsx
import React, { useState } from 'react';

const CONTENT_TYPES = [
  { id: 'any', label: 'Any Type' },
  { id: 'bill', label: 'Bill' },
  { id: 'news', label: 'News' },
  { id: 'executive-order', label: 'Executive Order' },
  { id: 'court-decision', label: 'Court Decision' }
];

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const [contentType, setContentType] = useState('any');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    onSubmit({
      query: query.trim(),
      type: contentType === 'any' ? null : contentType
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter a topic, bill name/number, or paste an article
          </label>
          <textarea
            id="search-input"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Enter a topic, bill name/number, or paste article text here..."
            rows="4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-auto">
            <label htmlFor="content-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content Type (Optional)
            </label>
            <select
              id="content-type"
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              {CONTENT_TYPES.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 sm:mt-0 w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:self-end"
          >
            Analyze
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
