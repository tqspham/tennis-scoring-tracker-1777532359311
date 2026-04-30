import TennisScoreCalculator from '@/components/TennisScoreCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tennis Score Calculator</h1>
          <p className="text-gray-600">Track ball-by-ball progression through a tennis game</p>
        </div>
        <TennisScoreCalculator />
      </div>
    </main>
  );
}
