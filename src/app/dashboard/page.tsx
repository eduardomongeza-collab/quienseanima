'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import QuestCard from '@/components/QuestCard';
import { mockCurrentSelection, mockPlayers } from '@/lib/mock-data';
import { Clock, Users } from 'lucide-react';

interface PlayerSession {
  name: string;
  nickname: string;
  isAdmin: boolean;
  id: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerSession | null>(null);
  const [hasOptedIn, setHasOptedIn] = useState(false);
  const [participants, setParticipants] = useState<string[]>(['Mari', 'Carlitos']);

  useEffect(() => {
    // Check for logged in player
    const stored = localStorage.getItem('player');
    if (!stored) {
      router.push('/login');
      return;
    }
    setPlayer(JSON.parse(stored));
  }, [router]);

  const handleOptIn = () => {
    setHasOptedIn(true);
    if (player) {
      setParticipants([...participants, player.nickname]);
    }
  };

  const handleDecline = () => {
    // In real app, this would record the decline
    alert("No worries! There's always next weekend. 🎲");
  };

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  const quest = mockCurrentSelection.quest!;
  const now = new Date();
  const optInDeadline = new Date(mockCurrentSelection.opt_in_deadline);
  const isOptInPhase = now < optInDeadline;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-amber-50">
      <Header 
        playerName={player.nickname} 
        isAdmin={player.isAdmin} 
        isLoggedIn={true} 
      />

      <main className="flex-1 px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Status Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex items-center gap-3">
              <Clock size={24} />
              <div>
                <p className="font-bold">
                  {isOptInPhase ? "This Weekend's Quest" : 'Quest In Progress'}
                </p>
                <p className="text-purple-100 text-sm">
                  {isOptInPhase 
                    ? 'Decide if you\'re in by Friday 8 PM' 
                    : 'Complete by Sunday 6 PM'}
                </p>
              </div>
            </div>
          </div>

          {/* Quest Card */}
          <QuestCard
            quest={quest}
            showActions={isOptInPhase}
            optInDeadline={mockCurrentSelection.opt_in_deadline}
            completionDeadline={mockCurrentSelection.completion_deadline}
            onOptIn={handleOptIn}
            onDecline={handleDecline}
            hasOptedIn={hasOptedIn}
          />

          {/* Participants */}
          {participants.length > 0 && (
            <div className="quest-card p-4 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Users size={18} className="text-purple-600" />
                <h3 className="font-bold text-purple-800">Who&apos;s In</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {participants.map((name) => (
                  <span
                    key={name}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Upload Section (shown after opt-in) */}
          {hasOptedIn && (
            <div className="quest-card p-6 mt-6">
              <h3 className="font-bold text-purple-800 mb-4">Submit Your Proof</h3>
              <p className="text-gray-600 text-sm mb-4">
                Upload photos as evidence of your completed quest. 
                The admin will review and award points.
              </p>
              <label className="block">
                <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <span className="text-4xl mb-2 block">📸</span>
                  <span className="text-purple-600 font-medium">
                    Tap to upload photos
                  </span>
                  <span className="text-gray-400 text-sm block mt-1">
                    JPG, PNG up to 10MB each
                  </span>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple />
              </label>
            </div>
          )}

          {/* WhatsApp Share (for admin) */}
          {player.isAdmin && (
            <div className="quest-card p-4 mt-6 bg-green-50 border-green-200">
              <h3 className="font-bold text-green-800 mb-2">📱 Share to WhatsApp</h3>
              <p className="text-green-700 text-sm mb-3">
                Copy this message to announce the quest:
              </p>
              <div className="bg-white p-3 rounded-lg border border-green-200 text-sm text-gray-700 mb-3">
                🎲 *SIDE QUEST ALERT* 🎲{'\n\n'}
                This weekend&apos;s quest:{'\n'}
                &quot;{quest.title_es}&quot;{'\n\n'}
                Difficulty: {quest.difficulty.toUpperCase()} ({quest.base_points} pts){'\n'}
                Mode: {quest.mode === 'multiplayer' ? `Multiplayer (${quest.suggested_players} players)` : 'Single Player'}{'\n\n'}
                👉 Opt in by Friday 8 PM:{'\n'}
                https://quienseanima.com/quest/{mockCurrentSelection.id}
              </div>
              <button className="btn-retro w-full bg-green-500 border-green-600 shadow-green-700">
                Copy & Share 📋
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav isAdmin={player.isAdmin} />
    </div>
  );
}
