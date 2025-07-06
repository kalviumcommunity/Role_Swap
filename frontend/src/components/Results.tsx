import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Trophy, TrendingUp, Target, ArrowRight, Home, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { roles } from '../data/roles';

export default function Results() {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();
  const { state, dispatch, checkAndAwardBadges } = useApp();

  const role = roles.find(r => r.id === roleId);
  const lastSession = state.user?.sessions.find(s => s.roleId === roleId && s.completed);

  useEffect(() => {
    if (!role || !lastSession || !state.user) {
      navigate('/dashboard');
      return;
    }

    // Check for new badges
    const newBadges = checkAndAwardBadges(state.user);
    if (newBadges.length > 0) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          badges: [...state.user.badges, ...newBadges],
        },
      });
    }
  }, [role, lastSession, state.user, navigate, checkAndAwardBadges, dispatch]);

  if (!role || !lastSession) {
    return <div>Loading...</div>;
  }

  const { scoreReport } = lastSession;
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 55) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 85) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-blue-500 to-cyan-500';
    if (score >= 55) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-24 h-24 bg-gradient-to-r ${getScoreGradient(scoreReport.fitScore)} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulation Complete!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Here's how you performed as a {role.name}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold ${getScoreColor(scoreReport.fitScore)} mb-2`}>
              {scoreReport.fitScore}%
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">Career Fit Score</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
              <div
                className={`bg-gradient-to-r ${getScoreGradient(scoreReport.fitScore)} h-3 rounded-full transition-all duration-1000`}
                style={{ width: `${scoreReport.fitScore}%` }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Strengths</h2>
              </div>
              <ul className="space-y-3">
                {scoreReport.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200/50 dark:border-green-700/50"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Areas */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Growth Areas</h2>
              </div>
              <ul className="space-y-3">
                {scoreReport.growthAreas.map((area, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200/50 dark:border-blue-700/50"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Our Recommendation</h2>
          <p className="text-lg leading-relaxed text-purple-100">
            {scoreReport.recommendation}
          </p>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/dashboard"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 text-center group transition-all duration-300"
          >
            <Home className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Back to Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">View your career journal</p>
          </Link>

          <button
            onClick={() => navigate(`/simulation/${roleId}`)}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 text-center group transition-all duration-300"
          >
            <RefreshCw className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Try Again</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Retake this simulation</p>
          </button>

          <Link
            to="/roles"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl p-6 text-center group transition-all duration-300"
          >
            <ArrowRight className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Try Another Role</h3>
            <p className="text-sm text-purple-100">Explore more careers</p>
          </Link>
        </div>
      </div>
    </div>
  );
}