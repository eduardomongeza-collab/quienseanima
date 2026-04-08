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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header
          playerName={player.nickname}
          isAdmin={player.isAdmin}
          isLoggedIn={true}
        />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="quest-card p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-serif">Quest Submitted!</h2>
            <p className="text-text-secondary mb-6">
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        playerName={player.nickname}
        isAdmin={player.isAdmin}
        isLoggedIn={true}
      />

      <main className="flex-1 px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground font-serif">Submit a Quest</h1>
            <p className="text-text-secondary text-sm mt-1">
              Have an idea for a side quest? Submit it for review!
            </p>
          </div>

          {/* Tips */}
          <div className="bg-secondary-light border border-card-border rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-secondary-dark flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-foreground">
                <p className="font-medium mb-1">Quest Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
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
              <label className="block text-sm font-medium text-foreground mb-2">
                Quest Title (in Spanish)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-primary font-medium whitespace-nowrap">
                  El finde que...
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="hicimos algo epico"
                  className="flex-1 px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none bg-white/50"
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">
                Instructions (in Spanish)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Describe what the player(s) need to do to complete this quest..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none resize-none bg-white/50"
              />
            </div>

            {/* Difficulty */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">
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
                          ? 'bg-supporting text-white'
                          : d === 'medium'
                          ? 'bg-secondary text-white'
                          : 'bg-accent text-white'
                        : 'bg-white/50 text-text-secondary hover:bg-white/80'
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
              <label className="block text-sm font-medium text-foreground mb-2">
                Mode
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('single')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    mode === 'single'
                      ? 'bg-primary text-white'
                      : 'bg-white/50 text-text-secondary hover:bg-white/80'
                  }`}
                >
                  Single
                </button>
                <button
                  type="button"
                  onClick={() => setMode('multiplayer')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    mode === 'multiplayer'
                      ? 'bg-primary text-white'
                      : 'bg-white/50 text-text-secondary hover:bg-white/80'
                  }`}
                >
                  Multiplayer
                </button>
              </div>
            </div>

            {/* Player Count (if multiplayer) */}
            {mode === 'multiplayer' && (
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Suggested Players
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSuggestedPlayers(Math.max(2, suggestedPlayers - 1))}
                    className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold hover:bg-primary-lighter"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-foreground w-8 text-center">
                    {suggestedPlayers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSuggestedPlayers(Math.min(10, suggestedPlayers + 1))}
                    className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold hover:bg-primary-lighter"
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
