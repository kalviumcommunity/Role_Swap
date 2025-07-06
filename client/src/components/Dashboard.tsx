import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, TrendingUp, Play, Award, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { state } = useApp();

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const user = state.user!;
  const recentSessions = user.sessions.slice(-3).reverse();
  const averageScore = user.sessions.length > 0 
    ? Math.round(user.sessions.reduce((sum, session) => sum + session.scoreReport.fitScore, 0) / user.sessions.length)
    : 0;

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-purple-100">Ready to explore more careers and unlock new achievements?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Simulations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.totalSimulations}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-3">
                <Play className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageScore}%</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.streak} days</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/50 rounded-lg p-3">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Badges Earned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.badges.length}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-3">
                <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Simulations</h2>
                <Link
                  to="/roles"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  New Simulation
                </Link>
              </div>

              {recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-700/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{session.roleName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {session.scoreReport.fitScore}%
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fit Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Play className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No simulations yet. Start exploring careers!</p>
                  <Link
                    to="/roles"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    Start Your First Simulation
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Badges</h2>
            
            {user.badges.length > 0 ? (
              <div className="space-y-4">
                {user.badges.slice(-3).reverse().map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getBadgeRarityColor(badge.rarity)} rounded-lg flex items-center justify-center`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{badge.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Trophy className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No badges yet. Complete simulations to earn achievements!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}