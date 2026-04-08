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
        return <Trophy className="text-secondary" size={24} />;
      case 2:
        return <Star className="text-text-secondary" size={24} />;
      case 3:
        return <Flame className="text-accent" size={24} />;
      default:
        return <span className="text-text-secondary font-bold text-lg">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-secondary-light border-l-secondary';
      case 2:
        return 'bg-[#F0EBE0] border-l-text-secondary';
      case 3:
        return 'bg-[#F0E2D0] border-l-accent';
      default:
        return 'bg-primary-lighter border-l-primary-light';
    }
  };

  if (entries.length === 0) {
    return (
      <div className="quest-card p-6 text-center">
        <p className="text-text-secondary">No players on the leaderboard yet.</p>
        <p className="text-text-secondary text-sm mt-2">Complete quests to earn points!</p>
      </div>
    );
  }

  return (
    <div className="quest-card overflow-hidden">
      {/* Header */}
      <div className="bg-primary p-4">
        <h2 className="text-white font-bold text-xl flex items-center gap-2 font-serif">
          <Trophy size={24} />
          {title}
        </h2>
        {showSeason && (
          <p className="text-white/70 text-sm mt-1">{seasonName}</p>
        )}
      </div>

      {/* Entries */}
      <div className="divide-y divide-card-border">
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
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                  {entry.player.nickname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-foreground">{entry.player.nickname}</p>
                  <p className="text-text-secondary text-sm">
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
              <p className="text-text-secondary text-xs mt-1">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
