import React from 'react';
import { supabase } from '../services/supabaseClient';

interface NavbarProps {
  userEmail: string | undefined;
  clickCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ userEmail, clickCount }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">TaskEarn</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Completed</span>
                <span className="text-sm font-bold text-indigo-600">{clickCount} Tasks</span>
             </div>
             
             <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 hidden sm:block truncate max-w-[150px]">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;