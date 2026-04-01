'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { mockQuests } from '@/lib/mock-data';
import { Quest } from '@/types';
import { CheckCircle, Clock, Lock, Users, User } from 'lucide-react';

interface PlayerSession {
  name: string;
  nickname: string;
  isAdmin: boolean;
  id: string;
}

export default function QuestLibraryPage() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerSession | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming'>('all');

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
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  // Mock: first 3 quests are "completed", rest are upcoming (only visible to admin)
  const completedQuests = mockQuests.slice(0, 3);
  const upcomingQuests = mockQuests.slice(3);

  const getDisplayQuests = () => {
    if (filter === 'completed') return completedQuests;
    if (filter === 'upcoming') return player.isAdmin ? upcomingQuests : [];
    // 'all' - show completed to everyone, upcoming only to admin
    return player.isAdmin ? mockQuests : completedQuests;
  };

  const displayQuests = getDisplayQuests();

  const getDifficultyBadge = (difficulty: string) => {
    const classes = {
      easy: 'bg-green-100 text-green-700 border-green-300',
      medium: 'bg-amber-100 text-amber-700 border-amber-300',
      hard: 'bg-red-100 text-red-700 border-red-300',
    }[difficulty] || '';
    return classes;
  };

  const isCompleted = (quest: Quest) => {
    return completedQuests.some(q => q.id === quest.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-amber-50">
      <Header 
        playerName={player.nickname} 
        isAdmin={player.isAdmin} 
        isLoggedIn={true} 
      />

      <main className="flex-1 px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-purple-800">Quest Library</h1>
            <p className="text-gray-600 text-sm mt-1">
              {player.isAdmin 
                ? 'View all quests and manage the pool' 
                : 'Browse completed quests from this season'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`py-2 px-4 rounded-lg font-medium whitespace-nowrap transition-all ${
                filter === 'all' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`py-2 px-4 rounded-lg font-medium whitespace-nowrap transition-all ${
                filter === 'completed' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Completed
            </button>
            {player.isAdmin && (
              <button
                onClick={() => setFilter('upcoming')}
                className={`py-2 px-4 rounded-lg font-medium whitespace-nowrap transition-all ${
                  filter === 'upcoming' ? 'tab-active' : 'tab-inactive'
                }`}
              >
                🔒 Upcoming
              </button>
            )}
          </div>

          {/* Quest Count */}
          <p className="text-gray-500 text-sm mb-4">
            {displayQuests.length} quest{displayQuests.length !== 1 ? 's' : ''}
          </p>

          {/* Quest List */}
          <div className="space-y-4">
            {displayQuests.map((quest) => (
              <div
                key={quest.id}
                className={`quest-card p-4 ${
                  !isCompleted(quest) && !player.isAdmin ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Status indicator */}
                    <div className="flex items-center gap-2 mb-2">
                      {isCompleted(quest) ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                          <CheckCircle size={14} />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                          {player.isAdmin ? (
                            <>
                              <Clock size={14} />
                              In Pool
                            </>
                          ) : (
                            <>
                              <Lock size={14} />
                              Locked
                            </>
                          )}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyBadge(quest.difficulty)}`}>
                        {quest.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-purple-800 text-sm sm:text-base leading-tight">
                      &ldquo;{quest.title_es}&rdquo;
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mt-2 text-gray-500 text-xs">
                      <span className="flex items-center gap-1">
                        {quest.mode === 'multiplayer' ? (
                          <Users size={12} />
                        ) : (
                          <User size={12} />
                        )}
                        {quest.mode === 'multiplayer' 
                          ? `${quest.suggested_players} players` 
                          : 'Solo'}
                      </span>
                      <span className="font-medium text-amber-600">
                        {quest.base_points} pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instructions (collapsed by default, could add expand) */}
                {isCompleted(quest) && (
                  <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                    {quest.instructions_es}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {displayQuests.length === 0 && (
            <div className="quest-card p-8 text-center">
              <span className="text-4xl mb-4 block">📚</span>
              <p className="text-gray-500">
                {filter === 'completed' 
                  ? 'No completed quests yet this season' 
                  : 'No quests to display'}
              </p>
            </div>
          )}

          {/* Admin note */}
          {!player.isAdmin && (
            <div className="bg-purple-50 rounded-lg p-4 mt-6 border border-purple-200">
              <p className="text-purple-700 text-sm text-center">
                🔒 Upcoming quests are hidden until they&apos;re selected
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav isAdmin={player.isAdmin} />
    </div>
  );
}
