import TennisScoreCalculator from '@/components/TennisScoreCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-3">Tennis Score Calculator</h1>
          <p className="text-lg text-slate-600 leading-relaxed">Track ball-by-ball progression through a tennis game</p>
        </div>
        <TennisScoreCalculator />
      </div>
    </main>
  );
}
