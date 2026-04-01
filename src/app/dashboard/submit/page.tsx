'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Difficulty, QuestMode } from '@/types';
import { Send, Lightbulb } from 'lucide-react';

interface PlayerSession {
  name: string;
  nickname: string;
  isAdmin: boolean;
  id: string;
}

export default function SubmitQuestPage() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerSession | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [mode, setMode] = useState<QuestMode>('single');
  const [suggestedPlayers, setSuggestedPlayers] = useState(2);

  useEffect(() => {
    const stored = localStorage.getItem('player');
    if (!stored) {
      router.push('/login');
      return;
    }
    setPlayer(JSON.parse(stored));
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !instructions.trim()) {
      alert('Please fill in the title and instructions');
      return;
    }

    // In production, this would save to Supabase
    console.log('Submitting quest:', {
      title: `El finde que... ${title}`,
      instructions,
      difficulty,
      mode,
      suggestedPlayers: mode === 'multiplayer' ? suggestedPlayers : 1,
    });

    setSubmitted(true);
  };

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-amber-50">
        <Header 
          playerName={player.nickname} 
          isAdmin={player.isAdmin} 
          isLoggedIn={true} 
        />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="quest-card p-8 text-center max-w-md">
            <span className="text-6xl mb-4 block">🎉</span>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">Quest Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your quest idea has been sent to the admin for review. 
              If approved, it&apos;ll be added to the quest pool!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setInstructions('');
                setDifficulty('medium');
                setMode('single');
              }}
              className="btn-retro"
            >
              Submit Another
            </button>
          </div>
        </main>
        <BottomNav isAdmin={player.isAdmin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-amber-50">
      <Header 
        playerName={player.nickname} 
        isAdmin={player.isAdmin} 
        isLoggedIn={true} 
      />

      <main className="flex-1 px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-purple-800">Submit a Quest</h1>
            <p className="text-gray-600 text-sm mt-1">
              Have an idea for a side quest? Submit it for review!
            </p>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Quest Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-amber-700">
                  <li>Make it doable in NYC over a weekend</li>
                  <li>Social interaction = more fun</li>
                  <li>Clear success criteria</li>
                  <li>Safe & legal (but a little chaotic)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="quest-card p-6">
            {/* Title */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quest Title (in Spanish)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-medium whitespace-nowrap">
                  El finde que...
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="hicimos algo epico"
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions (in Spanish)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Describe what the player(s) need to do to complete this quest..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Difficulty */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <div className="flex gap-2">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium capitalize transition-all ${
                      difficulty === d
                        ? d === 'easy'
                          ? 'bg-green-500 text-white'
                          : d === 'medium'
                          ? 'bg-amber-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {d}
                    <span className="block text-xs opacity-80">
                      {d === 'easy' ? '10 pts' : d === 'medium' ? '25 pts' : '50 pts'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('single')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    mode === 'single'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🧑 Single
                </button>
                <button
                  type="button"
                  onClick={() => setMode('multiplayer')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    mode === 'multiplayer'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  👥 Multiplayer
                </button>
              </div>
            </div>

            {/* Player Count (if multiplayer) */}
            {mode === 'multiplayer' && (
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggested Players
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSuggestedPlayers(Math.max(2, suggestedPlayers - 1))}
                    className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold hover:bg-purple-200"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-purple-800 w-8 text-center">
                    {suggestedPlayers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSuggestedPlayers(Math.min(10, suggestedPlayers + 1))}
                    className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold hover:bg-purple-200"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn-retro w-full flex items-center justify-center gap-2">
              <Send size={18} />
              Submit for Review
            </button>
          </form>
        </div>
      </main>

      <BottomNav isAdmin={player.isAdmin} />
    </div>
  );
}
