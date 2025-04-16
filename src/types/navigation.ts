import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { Character, QoLCategory, Survey } from '.';

// Auth Stack Navigation
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  OTPVerification: { phoneNumber: string };
  OnboardingName: undefined;
  OnboardingPreferences: undefined;
  OnboardingCharacter: undefined;
};

// Main Tab Navigation
export type MainTabParamList = {
  Home: undefined;
  Surveys: undefined;
  Character: undefined;
  Reports: undefined;
  Profile: undefined;
  Services: undefined;
};

// Home Stack Navigation
export type HomeStackParamList = {
  HomeScreen: undefined;
  Notification: undefined;
  Achievement: { achievementId: string };
};

// Services Stack Navigation
export type ServicesStackParamList = {
  ServicesHome: undefined;
  ServiceList: {
    categoryId: string;
    categoryName: string;
    highlightServiceId?: string;
  };
  ServiceDetails: {
    serviceId: string;
    serviceName: string;
    service?: {
      id: string;
      name: string;
      description: string;
      icon: string;
      [key: string]: any;
    };
  };
  ServiceRequest: {
    serviceId: string;
    serviceName: string;
  };
  ServiceRequests: undefined;
};

// Survey Stack Navigation
export type SurveyStackParamList = {
  SurveyList: undefined;
  SurveyCategories: undefined;
  SurveyCategory: { category: QoLCategory };
  SurveyDetail: { surveyId: string };
  SurveyQuestions: { survey: Survey };
  SurveyComplete: { surveyId: string; xpEarned: number };
};

// Character Stack Navigation
export type CharacterStackParamList = {
  CharacterHome: undefined;
  CharacterDetail: { characterId: string };
  CharacterEvolution: { character: Character };
  CharacterCustomization: { characterId: string };
};

// Reports Stack Navigation
export type ReportsStackParamList = {
  ReportsDashboard: undefined;
  InsightDetails: { insightId: string };
  CityOverview: undefined;
  PersonalStats: undefined;
};

// Profile Stack Navigation
export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Privacy: undefined;
  Achievements: undefined;
  Help: undefined;
};

// Root Stack Navigation (combines Auth and Main)
export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  ModalSurvey: { surveyId: string };
  ModalAchievement: { achievementId: string };
  ModalCharacterEvolution: { characterId: string };
};

// Helper types for screen props
export type AuthScreenProps<T extends keyof AuthStackParamList> = 
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type HomeScreenProps<T extends keyof HomeStackParamList> = 
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    MainTabScreenProps<'Home'>
  >;

export type ServicesScreenProps<T extends keyof ServicesStackParamList> = 
  CompositeScreenProps<
    NativeStackScreenProps<ServicesStackParamList, T>,
    MainTabScreenProps<'Services'>
  >;

export type SurveyScreenProps<T extends keyof SurveyStackParamList> = 
  CompositeScreenProps<
    NativeStackScreenProps<SurveyStackParamList, T>,
    MainTabScreenProps<'Surveys'>
  >;

export type CharacterScreenProps<T extends keyof CharacterStackParamList> = 
  CompositeScreenProps<
    NativeStackScreenProps<CharacterStackParamList, T>,
    MainTabScreenProps<'Character'>
  >;

export type ReportsScreenProps<T extends keyof ReportsStackParamList> = 
  CompositeScreenProps<
    NativeStackScreenProps<ReportsStackParamList, T>,
    MainTabScreenProps<'Reports'>
  >;
  
export type ProfileScreenProps<T extends keyof ProfileStackParamList> = 
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    MainTabScreenProps<'Profile'>
  >;

// Root navigation type used with useNavigation hook
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

export type CharacterParamList = {
  CharacterHome: undefined;
  CharacterDetail: undefined;
  CharacterEvolution: undefined;
  CharacterCustomization: undefined;
};

export type CharacterScreenProps<T extends keyof CharacterParamList> = NativeStackScreenProps<
  CharacterParamList,
  T
>; 