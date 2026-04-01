'use client';

import { Quest } from '@/types';
import { Users, User, Clock } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  showActions?: boolean;
  optInDeadline?: string;
  completionDeadline?: string;
  onOptIn?: () => void;
  onDecline?: () => void;
  hasOptedIn?: boolean;
}

export default function QuestCard({
  quest,
  showActions = false,
  optInDeadline,
  completionDeadline,
  onOptIn,
  onDecline,
  hasOptedIn = false,
}: QuestCardProps) {
  const difficultyClass = {
    easy: 'difficulty-easy',
    medium: 'difficulty-medium',
    hard: 'difficulty-hard',
  }[quest.difficulty];

  const difficultyLabel = {
    easy: 'EASY',
    medium: 'MEDIUM',
    hard: 'HARD',
  }[quest.difficulty];

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="quest-card p-6 max-w-lg mx-auto">
      {/* Header with difficulty and points */}
      <div className="flex justify-between items-center mb-4">
        <span className={`${difficultyClass} points-badge text-xs`}>
          ☆ {difficultyLabel} ☆
        </span>
        <span className="points-badge">
          {quest.base_points} PTS
        </span>
      </div>

      {/* Episode Title */}
      <h2 className="episode-title text-xl sm:text-2xl font-bold mb-4 leading-tight">
        &ldquo;{quest.title_es}&rdquo;
      </h2>

      {/* Instructions */}
      <div className="bg-white/50 rounded-lg p-4 mb-4 border border-purple-100">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {quest.instructions_es}
        </p>
      </div>

      {/* Mode indicator */}
      <div className="flex items-center gap-2 text-purple-600 mb-4">
        {quest.mode === 'multiplayer' ? (
          <>
            <Users size={18} />
            <span className="font-medium">
              Multiplayer ({quest.suggested_players} players)
            </span>
          </>
        ) : (
          <>
            <User size={18} />
            <span className="font-medium">Single Player</span>
          </>
        )}
      </div>

      {/* Deadlines */}
      {(optInDeadline || completionDeadline) && (
        <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
          {optInDeadline && (
            <div className="flex items-center gap-2 text-amber-700 text-sm">
              <Clock size={14} />
              <span>Opt-in by: {formatDeadline(optInDeadline)}</span>
            </div>
          )}
          {completionDeadline && (
            <div className="flex items-center gap-2 text-amber-700 text-sm mt-1">
              <Clock size={14} />
              <span>Complete by: {formatDeadline(completionDeadline)}</span>
            </div>
          )}
        </div>
      )}

      {/* Point distribution for multiplayer */}
      {quest.mode === 'multiplayer' && quest.default_point_split && (
        <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
          <p className="text-purple-700 text-sm font-medium mb-1">Point Distribution:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(quest.default_point_split).map(([role, points]) => (
              <span key={role} className="text-purple-600 text-sm bg-white px-2 py-1 rounded">
                {role}: {points} pts
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      {showActions && !hasOptedIn && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={onOptIn}
            className="btn-retro flex-1 text-center"
          >
            I&apos;M IN! 🎯
          </button>
          <button
            onClick={onDecline}
            className="btn-retro btn-secondary flex-1 text-center"
          >
            Not This Week
          </button>
        </div>
      )}

      {/* Already opted in state */}
      {showActions && hasOptedIn && (
        <div className="mt-6 text-center">
          <div className="bg-green-100 text-green-700 rounded-lg p-4 border-2 border-green-300">
            <span className="text-2xl mb-2 block">✅</span>
            <p className="font-bold">You&apos;re in!</p>
            <p className="text-sm mt-1">Complete the quest and upload your proof by Sunday 6 PM</p>
          </div>
        </div>
      )}
    </div>
  );
}
