import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Trophy, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RS</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              RoleSwap
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {state.isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4" />
              <span>{state.user?.name}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Trophy className="w-4 h-4" />
              <span>{state.user?.badges.length} badges</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}