export interface User {
  id: string;
  name: string;
  email: string;
  badges: Badge[];
  sessions: SimulationSession[];
  streak: number;
  totalSimulations: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
  scenarios: Scenario[];
  color: string;
}

export interface Scenario {
  id: string;
  situation: string;
  options: string[];
  correctAnswer?: number;
}

export interface SimulationSession {
  id: string;
  userId: string;
  roleName: string;
  roleId: string;
  choices: number[];
  scoreReport: FeedbackReport;
  date: string;
  completed: boolean;
}

export interface FeedbackReport {
  fitScore: number;
  strengths: string[];
  growthAreas: string[];
  recommendation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}