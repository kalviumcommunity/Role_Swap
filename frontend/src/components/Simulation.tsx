import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { roles } from '../data/roles';
import { generateAIFeedback } from '../utils/aiSimulation';
import { database } from '../utils/database';

export default function Simulation() {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [choices, setChoices] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const role = roles.find(r => r.id === roleId);
  
  useEffect(() => {
    if (!role || !state.user) {
      navigate('/roles');
      return;
    }

    // Initialize session
    const session = {
      id: Date.now().toString(),
      userId: state.user.id,
      roleName: role.name,
      roleId: role.id,
      choices: [],
      scoreReport: { fitScore: 0, strengths: [], growthAreas: [], recommendation: '' },
      date: new Date().toISOString(),
      completed: false,
    };

    dispatch({ type: 'START_SESSION', payload: session });
    setIsTimerActive(true);
  }, [role, state.user, dispatch, navigate]);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selectedOption === null) {
      // Auto-select random option if time runs out
      const randomChoice = Math.floor(Math.random() * 3);
      handleOptionSelect(randomChoice);
    }
  }, [timeLeft, isTimerActive, selectedOption]);

  if (!role) {
    return <div>Loading...</div>;
  }

  const currentScenario = role.scenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === role.scenarios.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setIsTimerActive(false);
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    const newChoices = [...choices, selectedOption];
    setChoices(newChoices);

    if (isLastScenario) {
      // Complete simulation and generate feedback
      const feedback = generateAIFeedback(role.name, newChoices, role.scenarios.length);
      
      const completedSession = {
        ...state.currentSession!,
        choices: newChoices,
        scoreReport: feedback,
        completed: true,
      };

      try {
        // Save session to mock database
        await database.createSession(completedSession);
        
        // Update user's total simulations
        if (state.user) {
          const updatedUser = {
            ...state.user,
            totalSimulations: state.user.totalSimulations + 1,
          };
          await database.updateUser(updatedUser);
        }

        dispatch({ type: 'COMPLETE_SESSION', payload: completedSession });
        navigate(`/results/${role.id}`);
      } catch (error) {
        console.error('Failed to save session:', error);
        // Still navigate to results even if save fails
        dispatch({ type: 'COMPLETE_SESSION', payload: completedSession });
        navigate(`/results/${role.id}`);
      }
    } else {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOption(null);
      setTimeLeft(30);
      setIsTimerActive(true);
    }
  };

  const progress = ((currentScenarioIndex + 1) / role.scenarios.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{role.name} Simulation</h1>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-5 h-5" />
              <span className={`font-mono text-lg ${timeLeft <= 10 ? 'text-red-600 dark:text-red-400' : ''}`}>
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Scenario {currentScenarioIndex + 1} of {role.scenarios.length}
          </p>
        </div>

        {/* Scenario */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Scenario</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
            {currentScenario.situation}
          </p>

          {/* Options */}
          <div className="space-y-4">
            {currentScenario.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                  selectedOption === index
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
                    : selectedOption !== null
                    ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer bg-white/50 dark:bg-gray-700/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    selectedOption === index
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <p className="flex-1 text-gray-900 dark:text-gray-100">{option}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        {selectedOption !== null && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
            >
              <span>{isLastScenario ? 'Complete Simulation' : 'Next Scenario'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}