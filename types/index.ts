export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  level?: number;
  carbonScore?: number;
  achievements?: Achievement[];
  goals?: Goal[];
  totalEmissions?: number;
  streak?: number;
  badges?: string[];
  joinDate?: string;
  isDemo?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: 'on-track' | 'behind' | 'at-risk';
  targetDate?: string;
  completedDate?: string;
}

export interface EducationContent {
  id: string;
  title: string;
  description: string;
  category: 'Energy' | 'Transport' | 'Diet' | 'Waste' | 'Science' | 'Technology';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isDemo?: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}
