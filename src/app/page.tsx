'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { Sparkles, Trophy, Users, Calendar } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={false} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🎲</div>
            <div className="absolute top-1/4 right-10 text-6xl">🌙</div>
            <div className="absolute bottom-20 left-1/4 text-7xl">🗽</div>
            <div className="absolute bottom-10 right-1/4 text-5xl">🎭</div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight font-serif">
              Turn Your Weekends Into
              <span className="block text-secondary-light">Legendary Adventures</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              A side quest generator for your friend group.
              Every weekend is an episode. Every quest is a story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="btn-retro text-lg px-8 py-4">
                Start Playing
              </Link>
              <a href="#how-it-works" className="btn-retro btn-secondary text-lg px-8 py-4">
                How It Works
              </a>
            </div>

            {/* Sitcom-style tagline */}
            <div className="mt-12 p-4 bg-white/10 rounded-xl inline-block">
              <p className="episode-title text-lg text-secondary-light">
                &ldquo;El finde que... todo cambió&rdquo;
              </p>
              <p className="text-white/60 text-sm mt-1">
                Every quest begins with a story
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12 font-serif">
              How It Works
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
                  <Calendar className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2 font-serif">Thursday</h3>
                <p className="text-text-secondary text-sm">
                  A new quest is revealed. Decide if you&apos;re in by Friday 8 PM.
                </p>
              </div>

              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary-light rounded-full flex items-center justify-center">
                  <Sparkles className="text-secondary-dark" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2 font-serif">Weekend</h3>
                <p className="text-text-secondary text-sm">
                  Complete your quest somewhere in NYC. Capture the moment.
                </p>
              </div>

              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-supporting-light rounded-full flex items-center justify-center">
                  <Trophy className="text-supporting" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2 font-serif">Sunday</h3>
                <p className="text-text-secondary text-sm">
                  Submit your proof. Earn points. Climb the leaderboard.
                </p>
              </div>

              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-light rounded-full flex items-center justify-center">
                  <Users className="text-accent" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2 font-serif">Season</h3>
                <p className="text-text-secondary text-sm">
                  Compete across Spring, Summer, Fall & Winter. Glory awaits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Quest Preview */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-8 font-serif">
              Sample Quest
            </h2>

            <div className="quest-card p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="difficulty-medium points-badge text-xs">
                  MEDIUM
                </span>
                <span className="points-badge">25 PTS</span>
              </div>

              <h3 className="episode-title text-xl font-bold mb-4">
                &ldquo;El finde que... presentamos a alguien como quisimos&rdquo;
              </h3>

              <p className="text-text-secondary text-sm bg-white/40 rounded-lg p-4 border border-card-border">
                Introduce your friend to strangers with a completely made-up identity.
                They must play along for the entire conversation.
                Bonus points if you get invited somewhere.
              </p>

              <div className="flex items-center gap-2 text-primary mt-4">
                <Users size={18} />
                <span className="font-medium">Multiplayer (2 players)</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
              Ready to Play?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Your next adventure starts this weekend.
            </p>
            <Link href="/login" className="btn-retro text-lg px-8 py-4 bg-secondary border-none hover:bg-secondary-dark">
              Join the Game
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark text-white/70 py-8 px-4 text-center">
        <p className="text-sm">
          &copy; 2026 Quien Se Anima &middot; Made for friends who dare
        </p>
        <p className="text-white/40 text-xs mt-2">
          Spring 2026 Season Now Active
        </p>
      </footer>
    </div>
  );
}
