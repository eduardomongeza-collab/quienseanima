'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Trophy, Sparkles, Users, BookOpen, LogOut } from 'lucide-react';

interface HeaderProps {
  playerName?: string;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}

export default function Header({ playerName, isAdmin = false, isLoggedIn = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎲</span>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
              Quien Se Anima
            </span>
            <span className="text-white font-bold text-lg tracking-tight sm:hidden">
              QSA
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Sparkles size={18} />
                <span>This Weekend</span>
              </Link>
              <Link
                href="/dashboard/leaderboard"
                className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Trophy size={18} />
                <span>Leaderboard</span>
              </Link>
              <Link
                href="/dashboard/quests"
                className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <BookOpen size={18} />
                <span>Quest Library</span>
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 text-amber-200 hover:text-amber-100 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Users size={18} />
                  <span>Admin</span>
                </Link>
              )}
            </nav>
          )}

          {/* User Info & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {isLoggedIn && playerName && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  {playerName.charAt(0).toUpperCase()}
                </div>
                <span className="text-white/90 text-sm">{playerName}</span>
              </div>
            )}
            
            {isLoggedIn && (
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
            
            {!isLoggedIn && (
              <Link
                href="/login"
                className="btn-retro text-sm py-2 px-4"
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isLoggedIn && (
          <nav className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={20} />
                <span>This Weekend&apos;s Quest</span>
              </Link>
              <Link
                href="/dashboard/leaderboard"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Trophy size={20} />
                <span>Leaderboard</span>
              </Link>
              <Link
                href="/dashboard/quests"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen size={20} />
                <span>Quest Library</span>
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 text-amber-200 hover:bg-white/10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users size={20} />
                  <span>Admin Panel</span>
                </Link>
              )}
              <hr className="border-white/20 my-2" />
              <button
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
