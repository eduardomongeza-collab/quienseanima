'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { mockQuests, mockPlayers, mockCurrentSelection } from '@/lib/mock-data';
import {
  Users,
  CheckCircle,
  XCircle,
  RefreshCw,
  Edit3,
  Eye,
  Calendar,
  Award,
  UserPlus,
  Settings
} from 'lucide-react';

interface PlayerSession {
  name: string;
  nickname: string;
  isAdmin: boolean;
  id: string;
}

type AdminTab = 'thursday' | 'completions' | 'submissions' | 'players' | 'points';

export default function AdminPage() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerSession | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('thursday');
  const [proposedQuest, setProposedQuest] = useState(mockQuests[5]);
  const [questApproved, setQuestApproved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('player');
    if (!stored) {
      router.push('/login');
      return;
    }
    const p = JSON.parse(stored);
    if (!p.isAdmin) {
      router.push('/dashboard');
      return;
    }
    setPlayer(p);
  }, [router]);

  const handleApproveQuest = () => {
    setQuestApproved(true);
  };

  const handleRerollQuest = () => {
    // Pick a random quest
    const randomIndex = Math.floor(Math.random() * mockQuests.length);
    setProposedQuest(mockQuests[randomIndex]);
    setQuestApproved(false);
  };

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'thursday' as AdminTab, label: 'Thursday Preview', icon: Calendar },
    { id: 'completions' as AdminTab, label: 'Completions', icon: CheckCircle },
    { id: 'submissions' as AdminTab, label: 'Submissions', icon: Edit3 },
    { id: 'players' as AdminTab, label: 'Players', icon: Users },
    { id: 'points' as AdminTab, label: 'Points', icon: Award },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        playerName={player.nickname}
        isAdmin={player.isAdmin}
        isLoggedIn={true}
      />

      <main className="flex-1 px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Settings className="text-primary" size={28} />
            <div>
              <h1 className="text-2xl font-bold text-foreground font-serif">Admin Panel</h1>
              <p className="text-text-secondary text-sm">Manage quests, players, and approvals</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'tab-active' : 'tab-inactive'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Thursday Preview Tab */}
          {activeTab === 'thursday' && (
            <div className="space-y-6">
              <div className="quest-card p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 font-serif">
                  {questApproved ? 'Quest Approved for This Weekend' : 'Proposed Quest for This Weekend'}
                </h2>

                <div className="bg-white/40 rounded-lg p-4 border border-card-border mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      proposedQuest.difficulty === 'easy' ? 'bg-supporting-light text-supporting' :
                      proposedQuest.difficulty === 'medium' ? 'bg-secondary-light text-foreground' :
                      'bg-accent-light text-accent'
                    }`}>
                      {proposedQuest.difficulty.toUpperCase()} - {proposedQuest.base_points} PTS
                    </span>
                    <span className="text-xs text-text-secondary">
                      {proposedQuest.mode === 'multiplayer' ? `${proposedQuest.suggested_players} players` : 'Solo'}
                    </span>
                  </div>

                  <h3 className="episode-title text-lg font-bold mb-2">
                    &ldquo;{proposedQuest.title_es}&rdquo;
                  </h3>

                  <p className="text-text-secondary text-sm">
                    {proposedQuest.instructions_es}
                  </p>
                </div>

                {!questApproved ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleApproveQuest}
                      className="btn-retro flex-1 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>
                    <button
                      onClick={handleRerollQuest}
                      className="btn-retro btn-secondary flex-1 flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Reroll
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-supporting-light p-3 rounded-lg border border-supporting text-supporting text-sm text-center">
                      Quest locked in! Share to WhatsApp when ready.
                    </div>
                    <button
                      onClick={() => setQuestApproved(false)}
                      className="w-full py-2 text-text-secondary text-sm hover:text-foreground"
                    >
                      &larr; Change selection
                    </button>
                  </div>
                )}
              </div>

              {/* Edit Quest */}
              {questApproved && (
                <div className="quest-card p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Edit3 size={18} />
                    Edit Before Sending
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                      <input
                        type="text"
                        defaultValue={proposedQuest.title_es}
                        className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Instructions</label>
                      <textarea
                        defaultValue={proposedQuest.instructions_es}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none resize-none bg-white/50"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-foreground mb-1">Points</label>
                        <input
                          type="number"
                          defaultValue={proposedQuest.base_points}
                          className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none bg-white/50"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-foreground mb-1">Difficulty</label>
                        <select
                          defaultValue={proposedQuest.difficulty}
                          className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none bg-white/50"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                    </div>
                    <button className="btn-retro w-full">Save Changes</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Completions Tab */}
          {activeTab === 'completions' && (
            <div className="quest-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 font-serif">Pending Completions</h2>

              <div className="space-y-4">
                {/* Mock pending completion */}
                <div className="bg-white/40 rounded-lg p-4 border border-card-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-foreground">Mari</p>
                      <p className="text-text-secondary text-sm">Quest: &quot;El finde que... presentamos a alguien como quisimos&quot;</p>
                    </div>
                    <span className="bg-secondary-light text-foreground text-xs px-2 py-1 rounded-full">
                      Pending Review
                    </span>
                  </div>

                  {/* Mock photos */}
                  <div className="flex gap-2 mb-3">
                    <div className="w-20 h-20 bg-white/50 rounded-lg flex items-center justify-center text-text-secondary">
                      img
                    </div>
                    <div className="w-20 h-20 bg-white/50 rounded-lg flex items-center justify-center text-text-secondary">
                      img
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn-retro flex-1 text-sm py-2 flex items-center justify-center gap-1">
                      <CheckCircle size={16} />
                      Approve (25 pts)
                    </button>
                    <button className="flex-1 py-2 px-3 rounded-lg border border-card-border text-text-secondary font-medium text-sm flex items-center justify-center gap-1 hover:bg-white/30">
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                </div>

                <p className="text-text-secondary text-sm text-center py-4">
                  No other pending completions
                </p>
              </div>
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <div className="quest-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 font-serif">Quest Submissions</h2>

              <div className="space-y-4">
                {/* Mock submission */}
                <div className="bg-white/40 rounded-lg p-4 border border-card-border">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-text-secondary text-sm">Submitted by <span className="font-medium text-foreground">Carlitos</span></p>
                    <span className="bg-primary-light text-primary text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground mb-1 font-serif">
                    &quot;El finde que... retamos a un extraño a piedra papel o tijera&quot;
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">
                    Reta a 5 extraños diferentes a piedra papel o tijera. Si ganas, pides un favor pequeño. Si pierdes, haces lo que te pidan.
                  </p>

                  <div className="flex gap-2 text-xs text-text-secondary mb-3">
                    <span className="bg-secondary-light px-2 py-1 rounded">Medium</span>
                    <span className="bg-white/50 px-2 py-1 rounded">Solo</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn-retro flex-1 text-sm py-2">
                      Approve & Add to Pool
                    </button>
                    <button className="flex-1 py-2 px-3 rounded-lg border border-card-border text-text-secondary font-medium text-sm hover:bg-white/30">
                      Edit First
                    </button>
                  </div>
                </div>

                <p className="text-text-secondary text-sm text-center py-4">
                  No other pending submissions
                </p>
              </div>
            </div>
          )}

          {/* Players Tab */}
          {activeTab === 'players' && (
            <div className="space-y-6">
              <div className="quest-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground font-serif">Players</h2>
                  <button className="btn-retro text-sm py-2 px-4 flex items-center gap-2">
                    <UserPlus size={16} />
                    Add Player
                  </button>
                </div>

                <div className="space-y-3">
                  {mockPlayers.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-white/40 p-3 rounded-lg border border-card-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                          {p.nickname.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-text-secondary text-sm">@{p.nickname}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {p.is_admin && (
                          <span className="bg-primary-light text-primary text-xs px-2 py-1 rounded-full">
                            Admin
                          </span>
                        )}
                        <button className="text-text-secondary hover:text-foreground">
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Points Tab */}
          {activeTab === 'points' && (
            <div className="quest-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 font-serif">Manual Point Adjustment</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Player</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none bg-white/50">
                    {mockPlayers.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.nickname})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Points to Add/Remove</label>
                  <input
                    type="number"
                    placeholder="e.g., 10 or -5"
                    className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none bg-white/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Reason</label>
                  <input
                    type="text"
                    placeholder="e.g., Multiplayer split adjustment"
                    className="w-full px-3 py-2 rounded-lg border border-card-border focus:border-primary focus:outline-none bg-white/50"
                  />
                </div>

                <button className="btn-retro w-full">Apply Adjustment</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav isAdmin={player.isAdmin} />
    </div>
  );
}
