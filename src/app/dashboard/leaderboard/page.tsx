'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import LeaderboardTable from '@/components/LeaderboardTable';
import { mockLeaderboard, mockSeason } from '@/lib/mock-data';

interface PlayerSession {
  name: string;
  nickname: string;
  isAdmin: boolean;
  id: string;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerSession | null>(null);
  const [activeTab, setActiveTab] = useState<'seasonal' | 'alltime'>('seasonal');

  useEffect(() => {
    const stored = localStorage.getItem('player');
    if (!stored) {
      router.push('/login');
      return;
    }
    setPlayer(JSON.parse(stored));
  }, [router]);

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  // Mock all-time data (higher numbers)
  const allTimeLeaderboard = mockLeaderboard.map((entry, index) => ({
    ...entry,
    total_points: entry.total_points * 4 + (index * 20),
    quests_completed: entry.quests_completed * 4,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        playerName={player.nickname}
        isAdmin={player.isAdmin}
        isLoggedIn={true}
      />

      <main className="flex-1 px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('seasonal')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                activeTab === 'seasonal'
                  ? 'tab-active'
                  : 'tab-inactive'
              }`}
            >
              Seasonal
            </button>
            <button
              onClick={() => setActiveTab('alltime')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                activeTab === 'alltime'
                  ? 'tab-active'
                  : 'tab-inactive'
              }`}
            >
              All-Time
            </button>
          </div>

          {/* Leaderboard */}
          {activeTab === 'seasonal' ? (
            <LeaderboardTable
              entries={mockLeaderboard}
              title="Seasonal Leaderboard"
              seasonName={mockSeason.name}
            />
          ) : (
            <LeaderboardTable
              entries={allTimeLeaderboard}
              title="All-Time Leaderboard"
              showSeason={false}
            />
          )}

          {/* Season Info */}
          {activeTab === 'seasonal' && (
            <div className="quest-card p-4 mt-6 text-center">
              <p className="text-text-secondary text-sm">
                <span className="font-bold text-primary">{mockSeason.name}</span>
                {' \u2022 '}
                {new Date(mockSeason.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {' - '}
                {new Date(mockSeason.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <p className="text-text-secondary text-xs mt-2">
                Players with 0 points are not shown
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav isAdmin={player.isAdmin} />
    </div>
  );
}
