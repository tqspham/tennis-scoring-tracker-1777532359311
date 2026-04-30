'use client';

import { useState } from 'react';
import { AlertCircle, Play } from 'lucide-react';
import { calculateScoreProgression } from '@/lib/tennis-scoring';
import ScoreProgression from './ScoreProgression';

export default function TennisScoreCalculator() {
  const [input, setInput] = useState<string>('');
  const [progression, setProgression] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setError(null);
    setProgression(null);

    if (!input.trim()) {
      setError('Please enter a ball sequence (e.g., ABABABABBB)');
      return;
    }

    // Validate input
    const upperInput = input.toUpperCase();
    if (!/^[AB]+$/.test(upperInput)) {
      setError('Invalid input. Only characters A and B are allowed.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate processing delay for UX
      await new Promise((resolve) => setTimeout(resolve, 100));

      const result = calculateScoreProgression(upperInput);
      setProgression(result);
    } catch (err) {
      setError('An error occurred while calculating the score progression.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError(null);
    setProgression(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Input Section */}
      <div className="mb-8">
        <label htmlFor="ballSequence" className="block text-sm font-semibold text-gray-700 mb-3">
          Ball Sequence
        </label>
        <textarea
          id="ballSequence"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter ball sequence (e.g., ABABABABBB)"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-mono text-lg resize-none"
          rows={4}
          aria-label="Ball sequence input"
          aria-describedby={error ? 'error-message' : undefined}
        />
        <p className="mt-2 text-sm text-gray-500">
          A = Player A wins ball, B = Player B wins ball
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div
          id="error-message"
          className="mb-6 flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded"
          role="alert"
        >
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full mb-8 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        aria-label="Calculate score progression"
      >
        <Play size={18} />
        {isLoading ? 'Calculating...' : 'Calculate Score'}
      </button>

      {/* Results Section */}
      {!progression && !error && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-base">
            Enter a ball sequence above to see the score progression
          </p>
        </div>
      )}

      {progression && <ScoreProgression scores={progression} />}
    </div>
  );
}
