"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold flex items-center">
            Finance Tracker
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link 
              href="/dashboard" 
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === '/dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/tasks" 
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === '/tasks' ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              Tasks
            </Link>
            <Link 
              href="/finances" 
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === '/finances' ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              Finances
            </Link>
            <Link 
              href="/notes" 
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === '/notes' ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              Notes
            </Link>
          </div>

          {/* Mobile Menu Button - You can add mobile menu functionality later */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-blue-700">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}