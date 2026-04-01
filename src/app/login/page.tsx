'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function LoginPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // For prototype: simple validation and redirect
    if (!firstName.trim() || !lastName.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate login - in production this would call Supabase auth
    // For prototype, we'll store in localStorage and redirect
    const playerName = `${firstName.trim()} ${lastName.trim()}`;
    
    // Mock: check if admin (you can change this name for testing)
    const isAdmin = playerName.toLowerCase() === 'juan martinez';
    
    localStorage.setItem('player', JSON.stringify({
      name: playerName,
      nickname: firstName,
      isAdmin,
      id: '1',
    }));

    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-amber-50">
      <Header isLoggedIn={false} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="quest-card p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-5xl mb-4 block">🎲</span>
              <h1 className="text-2xl font-bold text-purple-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Martinez"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-retro w-full text-center disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#FFFBF5] text-gray-500">New player?</span>
              </div>
            </div>

            {/* Contact admin */}
            <p className="text-center text-gray-600 text-sm">
              Ask the admin to add you to the game
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link href="/" className="text-purple-600 hover:text-purple-800 text-sm">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
