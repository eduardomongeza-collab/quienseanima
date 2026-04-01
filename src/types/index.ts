export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestMode = 'single' | 'multiplayer';
export type QuestStatus = 'active' | 'selected' | 'completed' | 'expired' | 'pending';
export type SelectionStatus = 'pending_approval' | 'accepting' | 'in_progress' | 'completed' | 'expired';

export interface Player {
  id: string;
  name: string;
  nickname: string;
  avatar_url: string | null;
  is_admin: boolean;
  first_quest_completed: boolean;
  created_at: string;
}

export interface Season {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface Quest {
  id: string;
  title_es: string;
  instructions_es: string;
  difficulty: Difficulty;
  base_points: number;
  mode: QuestMode;
  suggested_players: number;
  default_point_split: Record<string, number> | null;
  status: QuestStatus;
  season_id: string | null;
  created_by: string | null;
  created_at: string;
}

export interface QuestSelection {
  id: string;
  quest_id: string;
  season_id: string;
  selected_at: string;
  opt_in_deadline: string;
  completion_deadline: string;
  status: SelectionStatus;
  quest?: Quest;
}

export interface QuestParticipation {
  id: string;
  quest_selection_id: string;
  player_id: string;
  opted_in: boolean;
  opted_in_at: string | null;
  completed: boolean;
  points_awarded: number;
  approved_by_admin: boolean;
  approved_at: string | null;
  player?: Player;
}

export interface Photo {
  id: string;
  participation_id: string;
  url: string;
  uploaded_at: string;
}

export interface QuestSubmission {
  id: string;
  submitted_by: string;
  title_es: string;
  instructions_es: string;
  difficulty: Difficulty;
  mode: QuestMode;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  created_at: string;
  player?: Player;
}

export interface LeaderboardEntry {
  player: Player;
  total_points: number;
  quests_completed: number;
  rank: number;
}

export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 25,
  hard: 50,
};

export const FEDERAL_HOLIDAYS_2026 = [
  '2026-01-01', // New Year's Day
  '2026-01-19', // MLK Day
  '2026-02-16', // Presidents' Day
  '2026-05-25', // Memorial Day
  '2026-06-19', // Juneteenth
  '2026-07-04', // Independence Day (observed July 3)
  '2026-09-07', // Labor Day
  '2026-10-12', // Columbus Day
  '2026-11-11', // Veterans Day
  '2026-11-26', // Thanksgiving
  '2026-12-25', // Christmas
];
