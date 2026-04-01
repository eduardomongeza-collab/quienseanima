'use client';

import { LeaderboardEntry } from '@/types';
import { Trophy, Star, Flame } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  title?: string;
  showSeason?: boolean;
  seasonName?: string;
}

export default function LeaderboardTable({
  entries,
  title = 'Leaderboard',
  showSeason = true,
  seasonName = 'Spring 2026',
}: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-amber-500" size={24} />;
      case 2:
        return <Star className="text-gray-400" size={24} />;
      case 3:
        return <Flame className="text-orange-400" size={24} />;
      default:
        return <span className="text-gray-500 font-bold text-lg">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-100 to-amber-50 border-l-amber-500';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 border-l-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-50 border-l-orange-400';
      default:
        return 'bg-gradient-to-r from-purple-50 to-white border-l-purple-300';
    }
  };

  if (entries.length === 0) {
    return (
      <div className="quest-card p-6 text-center">
        <p className="text-gray-500">No players on the leaderboard yet.</p>
        <p className="text-gray-400 text-sm mt-2">Complete quests to earn points!</p>
      </div>
    );
  }

  return (
    <div className="quest-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4">
        <h2 className="text-white font-bold text-xl flex items-center gap-2">
          <Trophy size={24} />
          {title}
        </h2>
        {showSeason && (
          <p className="text-purple-200 text-sm mt-1">{seasonName}</p>
        )}
      </div>

      {/* Entries */}
      <div className="divide-y divide-purple-100">
        {entries.map((entry) => (
          <div
            key={entry.player.id}
            className={`flex items-center p-4 border-l-4 ${getRankStyle(entry.rank)}`}
          >
            {/* Rank */}
            <div className="w-12 flex justify-center">
              {getRankIcon(entry.rank)}
            </div>

            {/* Player info */}
            <div className="flex-1 ml-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold">
                  {entry.player.nickname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{entry.player.nickname}</p>
                  <p className="text-gray-500 text-sm">
                    {entry.quests_completed} quest{entry.quests_completed !== 1 ? 's' : ''} completed
                  </p>
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="text-right">
              <span className="points-badge text-lg">
                {entry.total_points}
              </span>
              <p className="text-gray-400 text-xs mt-1">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
