'use client';

import { CheckCircle } from 'lucide-react';

interface ScoreProgressionProps {
  scores: string[];
}

export default function ScoreProgression({ scores }: ScoreProgressionProps) {
  const finalScore = scores[scores.length - 1];
  const isGameWon = finalScore.includes('wins the game');

  return (
    <div className="border-t border-slate-200 pt-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Score Progression</h2>
      <div className="space-y-3">
        {scores.map((score, index) => {
          const isFinal = index === scores.length - 1;
          const isWinningScore = isFinal && isGameWon;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg text-base font-mono transition-colors duration-200 ${
                isWinningScore
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                  : 'bg-slate-50 border border-slate-200 text-slate-700'
              }`}
              role="listitem"
              aria-label={`Score ${index + 1}: ${score}`}
            >
              <div className="flex items-center gap-3">
                {isWinningScore && <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" strokeWidth={2} />}
                <span>{score}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-900">Total balls played:</span> {scores.length - 1}
        </p>
      </div>
    </div>
  );
}
