import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, SimulationSession, Badge } from '../types';
import { availableBadges } from '../data/badges';
import { database } from '../utils/database';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentSession: SimulationSession | null;
  isDarkMode: boolean;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'START_SESSION'; payload: SimulationSession }
  | { type: 'UPDATE_SESSION'; payload: Partial<SimulationSession> }
  | { type: 'COMPLETE_SESSION'; payload: SimulationSession }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'LOAD_USER_DATA'; payload: { user: User; sessions: SimulationSession[]; badges: Badge[] } };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  currentSession: null,
  isDarkMode: false,
  isLoading: true,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  checkAndAwardBadges: (user: User) => Promise<Badge[]>;
  createUser: (userData: Omit<User, 'id' | 'badges' | 'sessions' | 'streak' | 'totalSimulations'>) => Promise<User>;
  loginUser: (email: string, password: string) => Promise<User | null>;
}>({
  state: initialState,
  dispatch: () => null,
  checkAndAwardBadges: async () => [],
  createUser: async () => ({} as User),
  loginUser: async () => null,
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        currentSession: null,
      };
    case 'START_SESSION':
      return {
        ...state,
        currentSession: action.payload,
      };
    case 'UPDATE_SESSION':
      return {
        ...state,
        currentSession: state.currentSession
          ? { ...state.currentSession, ...action.payload }
          : null,
      };
    case 'COMPLETE_SESSION':
      const updatedUser = state.user
        ? {
            ...state.user,
            sessions: [...state.user.sessions, action.payload],
            totalSimulations: state.user.totalSimulations + 1,
          }
        : null;
      return {
        ...state,
        user: updatedUser,
        currentSession: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case 'LOAD_USER_DATA':
      return {
        ...state,
        user: {
          ...action.payload.user,
          sessions: action.payload.sessions,
          badges: action.payload.badges,
        },
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user data on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedTheme = localStorage.getItem('roleswap-theme');
        if (savedTheme === 'dark') {
          dispatch({ type: 'TOGGLE_DARK_MODE' });
        }
        
        // Always load dummy user data
        const user = await database.getUserById('1');
        const sessions = await database.getSessionsByUser(user.id);
        const badges = await database.getBadgesByUser(user.id);
        dispatch({
          type: 'LOAD_USER_DATA',
          payload: { user, sessions, badges }
        });
      } catch (error) {
        console.error('Failed to load user data:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    loadUserData();
  }, []);

  // Save user data when user changes
  useEffect(() => {
    const saveUserData = async () => {
      if (state.user && !state.isLoading) {
        try {
          await database.updateUser(state.user);
        } catch (error) {
          console.error('Failed to save user data:', error);
        }
      }
    };
    saveUserData();
  }, [state.user, state.isLoading]);

  // Save theme preference and apply to document
  useEffect(() => {
    localStorage.setItem('roleswap-theme', state.isDarkMode ? 'dark' : 'light');
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  const createUser = async (userData: Omit<User, 'id' | 'badges' | 'sessions' | 'streak' | 'totalSimulations'>): Promise<User> => {
    try {
      const createdUser = await database.createUser(userData);
      return createdUser;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };

  const loginUser = async (email: string, password: string): Promise<User | null> => {
    try {
      // Always return dummy user for any credentials
      const user = await database.loginUser(email, password);
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
        return user;
      }
      return null;
    } catch (error) {
      console.error('Failed to login user:', error);
      return null;
    }
  };

  const checkAndAwardBadges = async (user: User): Promise<Badge[]> => {
    const newBadges: Badge[] = [];
    const existingBadgeIds = user.badges.map(b => b.id);

    for (const badge of availableBadges) {
      if (existingBadgeIds.includes(badge.id)) continue;

      let shouldAward = false;

      switch (badge.id) {
        case 'first-simulation':
          shouldAward = user.sessions.length >= 1;
          break;
        case 'five-simulations':
          const uniqueRoles = new Set(user.sessions.map(s => s.roleId));
          shouldAward = uniqueRoles.size >= 5;
          break;
        case 'high-scorer':
          shouldAward = user.sessions.some(s => s.scoreReport.fitScore >= 85);
          break;
        case 'perfect-score':
          shouldAward = user.sessions.some(s => s.scoreReport.fitScore === 100);
          break;
        case 'streak-master':
          shouldAward = user.streak >= 7;
          break;
        case 'all-rounder':
          const availableRoles = 16;
          const completedRoles = new Set(user.sessions.map(s => s.roleId));
          shouldAward = completedRoles.size >= availableRoles;
          break;
        case 'dedicated-learner':
          shouldAward = user.sessions.length >= 20;
          break;
      }

      if (shouldAward) {
        const newBadge = {
          ...badge,
          unlockedAt: new Date().toISOString(),
        };
        newBadges.push(newBadge);

        try {
          await database.createBadge({ ...newBadge, userId: user.id });
        } catch (error) {
          console.error('Failed to save badge:', error);
        }
      }
    }

    return newBadges;
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      dispatch, 
      checkAndAwardBadges, 
      createUser, 
      loginUser 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};