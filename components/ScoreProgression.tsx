'use client';

import { CheckCircle } from 'lucide-react';

interface ScoreProgressionProps {
  scores: string[];
}

export default function ScoreProgression({ scores }: ScoreProgressionProps) {
  const finalScore = scores[scores.length - 1];
  const isGameWon = finalScore.includes('wins the game');

  return (
    <div className="border-t-2 border-gray-200 pt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Score Progression</h2>
      <div className="space-y-2">
        {scores.map((score, index) => {
          const isFinal = index === scores.length - 1;
          const isWinningScore = isFinal && isGameWon;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg text-base font-mono transition-colors ${
                isWinningScore
                  ? 'bg-green-100 border-2 border-green-500 text-green-900'
                  : 'bg-gray-50 border border-gray-200 text-gray-700'
              }`}
              role="listitem"
              aria-label={`Score ${index + 1}: ${score}`}
            >
              <div className="flex items-center gap-3">
                {isWinningScore && <CheckCircle size={20} className="text-green-600 flex-shrink-0" />}
                <span>{score}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Total balls played:</span> {scores.length - 1}
        </p>
      </div>
    </div>
  );
}
