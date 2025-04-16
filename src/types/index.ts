// User related types
export interface User {
  id: string;
  deviceId: string;
  username?: string;
  email?: string;
  phone?: string;
  xp: number;
  level: number;
  createdAt: Date;
  lastActive: Date;
  hasCompletedOnboarding: boolean;
  preferences: UserPreferences;
  characterLastCustomized?: Date;
}

export interface UserPreferences {
  notifications: boolean;
  locationTracking: boolean;
  darkMode: boolean;
  dataSharing: {
    anonymous: boolean;
    identifiable: boolean;
  };
}

// Character/Avatar related types
export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  level: number;
  xp: number;
  state: CharacterState;
  attributes: CharacterAttributes;
  evolutions: Evolution[];
  unlockedAt: Date;
  isActive: boolean;
}

export type CharacterType = 'Animal' | 'Robot' | 'Plant' | 'Fantasy';

export type CharacterState = 'Egg' | 'Baby' | 'Child' | 'Teen' | 'Adult' | 'Elder';

export interface CharacterAttributes {
  strength: number;
  intelligence: number;
  happiness: number;
  energy: number;
  health: number;
}

export interface Evolution {
  id: string;
  name: string;
  state: CharacterState;
  requiredXP: number;
  requiredLevel: number;
  attributes: Partial<CharacterAttributes>;
  isUnlocked: boolean;
}

// Survey/Question related types
export interface Survey {
  id: string;
  title: string;
  description: string;
  category: QoLCategory;
  questions: Question[];
  xpReward: number;
  estimatedTimeMinutes: number;
  expiresAt?: Date;
  isLocationRequired: boolean;
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  isRequired: boolean;
  metadata?: {
    minValue?: number;
    maxValue?: number;
    step?: number;
    allowMultiple?: boolean;
  };
}

export type QuestionType = 
  | 'MultipleChoice' 
  | 'Checkbox' 
  | 'Slider' 
  | 'Rating' 
  | 'Text' 
  | 'Location' 
  | 'Photo' 
  | 'Audio';

export interface QuestionOption {
  id: string;
  text: string;
  value: string | number;
}

// Response types
export interface SurveyResponse {
  id: string;
  userId: string;
  surveyId: string;
  answers: Answer[];
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  completedAt: Date;
  syncedAt?: Date;
  isAnonymous: boolean;
}

export interface Answer {
  questionId: string;
  value: string | number | string[] | number[] | null;
  skipped: boolean;
  mediaUrl?: string;
}

// Achievement related types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  progress: number;
  totalRequired: number;
  unlockedAt?: Date;
}

export type AchievementCategory = 
  | 'Surveys' 
  | 'Character' 
  | 'Community' 
  | 'Location' 
  | 'Streak';

// Quality of Life categories
export type QoLCategory = 
  | 'Transportation' 
  | 'Safety' 
  | 'Environment' 
  | 'Healthcare' 
  | 'Education' 
  | 'Housing' 
  | 'Recreation' 
  | 'Community' 
  | 'Economy';

// Report/Insight types
export interface Insight {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: QoLCategory;
  metrics: InsightMetric[];
  createdAt: Date;
  expiresAt?: Date;
  isShared: boolean;
}

export interface InsightMetric {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}

export type NotificationType = 
  | 'Survey' 
  | 'Achievement' 
  | 'Evolution' 
  | 'Insight' 
  | 'System'; 