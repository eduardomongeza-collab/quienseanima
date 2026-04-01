'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Trophy, BookOpen, PlusCircle, Settings } from 'lucide-react';

interface BottomNavProps {
  isAdmin?: boolean;
}

export default function BottomNav({ isAdmin = false }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      icon: Sparkles,
      label: 'Quest',
      active: pathname === '/dashboard',
    },
    {
      href: '/dashboard/leaderboard',
      icon: Trophy,
      label: 'Ranks',
      active: pathname === '/dashboard/leaderboard',
    },
    {
      href: '/dashboard/quests',
      icon: BookOpen,
      label: 'Library',
      active: pathname === '/dashboard/quests',
    },
    {
      href: '/dashboard/submit',
      icon: PlusCircle,
      label: 'Submit',
      active: pathname === '/dashboard/submit',
    },
    ...(isAdmin
      ? [
          {
            href: '/admin',
            icon: Settings,
            label: 'Admin',
            active: pathname.startsWith('/admin'),
          },
        ]
      : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 shadow-lg md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
              item.active
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-purple-500'
            }`}
          >
            <item.icon size={22} strokeWidth={item.active ? 2.5 : 2} />
            <span className={`text-xs mt-1 ${item.active ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
