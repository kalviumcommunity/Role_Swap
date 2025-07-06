// Mock database implementation for RoleSwap
// This replaces all backend calls with dummy data

import { User, SimulationSession, Badge } from '../types';

// Dummy user data
const dummyUser: User = {
  id: '1',
  name: 'User 1',
  email: 'user1@gmail.com',
  badges: [],
  sessions: [],
  streak: 0,
  totalSimulations: 0,
};

// Mock sessions storage
let mockSessions: SimulationSession[] = [];
let mockBadges: Badge[] = [];

export const database = {
  // User operations
  async createUser(user: Omit<User, 'id' | 'badges' | 'sessions' | 'streak' | 'totalSimulations'>) {
    // Return the dummy user for any email
    return {
      ...dummyUser,
      ...user,
    };
  },

  async getUserById(id: string) {
    // Always return dummy user
    return {
      ...dummyUser,
      sessions: mockSessions,
      badges: mockBadges,
    };
  },

  async getUserByEmail(email: string) {
    // Always return dummy user for any email
    return {
      ...dummyUser,
      email,
      sessions: mockSessions,
      badges: mockBadges,
    };
  },

  async updateUser(user: User) {
    // Update local mock data
    Object.assign(dummyUser, user);
    return dummyUser;
  },

  // Session operations
  async createSession(session: SimulationSession) {
    mockSessions.push(session);
    return session;
  },

  async getSessionsByUser(userId: string) {
    return mockSessions;
  },

  // Badge operations
  async awardBadge(badge: Badge) {
    mockBadges.push(badge);
    return badge;
  },

  async createBadge(badge: Badge) {
    mockBadges.push(badge);
    return badge;
  },

  async getBadgesByUser(userId: string) {
    return mockBadges;
  },

  // Auth - simplified to always return dummy user
  async loginUser(email: string, password: string) {
    // Always return dummy user for any credentials
    return {
      ...dummyUser,
      email,
      sessions: mockSessions,
      badges: mockBadges,
    };
  },
};