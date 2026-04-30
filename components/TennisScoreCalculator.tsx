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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
      {/* Input Section */}
      <div className="mb-8">
        <label htmlFor="ballSequence" className="block text-sm font-semibold text-slate-900 mb-3">
          Ball Sequence
        </label>
        <textarea
          id="ballSequence"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter ball sequence (e.g., ABABABABBB)"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono text-base resize-none transition-colors duration-200 placeholder-slate-400"
          rows={4}
          aria-label="Ball sequence input"
          aria-describedby={error ? 'error-message' : undefined}
        />
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          A = Player A wins ball, B = Player B wins ball
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div
          id="error-message"
          className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
        >
          <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} strokeWidth={2} />
          <p className="text-red-700 text-sm leading-relaxed">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full mb-8 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
        aria-label="Calculate score progression"
      >
        <Play size={18} strokeWidth={2} />
        {isLoading ? 'Calculating...' : 'Calculate Score'}
      </button>

      {/* Results Section */}
      {!progression && !error && !isLoading && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-base leading-relaxed">
            Enter a ball sequence above to see the score progression
          </p>
        </div>
      )}

      {progression && <ScoreProgression scores={progression} />}
    </div>
  );
}
