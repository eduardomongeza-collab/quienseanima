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
        <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-amber-400 text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🎲</div>
            <div className="absolute top-1/4 right-10 text-6xl">🌙</div>
            <div className="absolute bottom-20 left-1/4 text-7xl">🗽</div>
            <div className="absolute bottom-10 right-1/4 text-5xl">🎭</div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Turn Your Weekends Into
              <span className="block text-amber-300">Legendary Adventures</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
              A side quest generator for your friend group. 
              Every weekend is an episode. Every quest is a story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="btn-retro text-lg px-8 py-4">
                Start Playing 🎯
              </Link>
              <a href="#how-it-works" className="btn-retro btn-secondary text-lg px-8 py-4">
                How It Works
              </a>
            </div>

            {/* Sitcom-style tagline */}
            <div className="mt-12 p-4 bg-white/10 rounded-xl backdrop-blur-sm inline-block">
              <p className="episode-title text-lg text-amber-200">
                &ldquo;El finde que... todo cambió&rdquo;
              </p>
              <p className="text-purple-200 text-sm mt-1">
                Every quest begins with a story
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-800 mb-12">
              How It Works
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Thursday</h3>
                <p className="text-gray-600 text-sm">
                  A new quest is revealed. Decide if you&apos;re in by Friday 8 PM.
                </p>
              </div>

              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <Sparkles className="text-amber-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Weekend</h3>
                <p className="text-gray-600 text-sm">
                  Complete your quest somewhere in NYC. Capture the moment.
                </p>
              </div>

              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="text-green-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Sunday</h3>
                <p className="text-gray-600 text-sm">
                  Submit your proof. Earn points. Climb the leaderboard.
                </p>
              </div>

              <div className="quest-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="text-pink-600" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Season</h3>
                <p className="text-gray-600 text-sm">
                  Compete across Spring, Summer, Fall & Winter. Glory awaits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Quest Preview */}
        <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-800 mb-8">
              Sample Quest
            </h2>

            <div className="quest-card p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="difficulty-medium points-badge text-xs">
                  ☆ MEDIUM ☆
                </span>
                <span className="points-badge">25 PTS</span>
              </div>

              <h3 className="episode-title text-xl font-bold mb-4">
                &ldquo;El finde que... presentamos a alguien como quisimos&rdquo;
              </h3>

              <p className="text-gray-700 text-sm bg-white/50 rounded-lg p-4 border border-purple-100">
                Introduce your friend to strangers with a completely made-up identity. 
                They must play along for the entire conversation. 
                Bonus points if you get invited somewhere.
              </p>

              <div className="flex items-center gap-2 text-purple-600 mt-4">
                <Users size={18} />
                <span className="font-medium">Multiplayer (2 players)</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Play?
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              Your next adventure starts this weekend.
            </p>
            <Link href="/login" className="btn-retro text-lg px-8 py-4 bg-white text-purple-600 border-purple-300 shadow-none hover:bg-purple-50">
              Join the Game 🎮
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-purple-200 py-8 px-4 text-center">
        <p className="text-sm">
          &copy; 2026 Quien Se Anima • Made for friends who dare
        </p>
        <p className="text-purple-400 text-xs mt-2">
          Spring 2026 Season Now Active
        </p>
      </footer>
    </div>
  );
}
