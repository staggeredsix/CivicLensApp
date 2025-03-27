// components/SummaryPanel.jsx
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { ExternalLinkIcon, InformationCircleIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function SummaryPanel({ data }) {
  const [showTrace, setShowTrace] = useState(false);
  
  if (!data) return null;
  
  const { summary, raw_facts, sources = [], trace = { steps: [], tokens_used: 0 } } = data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Analysis Results</h2>
          <button
            type="button"
            onClick={() => setShowTrace(!showTrace)}
            className={classNames(
              "inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md",
              showTrace 
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            <InformationCircleIcon className="h-4 w-4 mr-1.5" />
            {showTrace ? "Hide Trace" : "Trace It"}
          </button>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-medium leading-5 rounded-md',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white dark:bg-gray-800 shadow text-blue-700 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/[0.12] hover:text-gray-900'
                )
              }
            >
              Plain English Summary
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-medium leading-5 rounded-md',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white dark:bg-gray-800 shadow text-blue-700 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/[0.12] hover:text-gray-900'
                )
              }
            >
              Raw Facts View
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className={classNames('rounded-xl p-3', 'focus:outline-none')}>
              <div className="prose dark:prose-invert prose-blue max-w-none">
                {summary ? (
                  <div className="whitespace-pre-line">{summary}</div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No summary available</p>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl p-3', 'focus:outline-none')}>
              <div className="prose dark:prose-invert prose-blue max-w-none">
                {raw_facts ? (
                  <div className="whitespace-pre-line">{raw_facts}</div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No raw facts available</p>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {/* Sources Section */}
        {sources.length > 0 && (
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Sources</h3>
            <ul className="space-y-2">
              {sources.map((source, idx) => (
                <li key={idx} className="flex items-start">
                  <ExternalLinkIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <a 
                    href={source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trace Section */}
        {showTrace && (
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Trace</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tokens used: {trace.tokens_used}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
              {trace.steps.length > 0 ? (
                <ol className="space-y-4 list-decimal list-inside">
                  {trace.steps.map((step, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300">
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No trace steps available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryPanel;
