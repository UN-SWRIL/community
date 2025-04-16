import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { SurveyStackParamList, SurveyScreenProps } from '../../types/navigation';
import { QoLCategory, Survey } from '../../types';

type SurveyDetailScreenRouteProp = RouteProp<SurveyStackParamList, 'SurveyDetail'>;

// Helper function to get icon and color for category
const getCategoryMeta = (category: QoLCategory) => {
  switch(category) {
    case 'Transportation':
      return { icon: 'bus-outline', color: '#2196F3' };
    case 'Safety':
      return { icon: 'shield-checkmark-outline', color: '#F44336' };
    case 'Environment':
      return { icon: 'leaf-outline', color: '#4CAF50' };
    case 'Healthcare':
      return { icon: 'medkit-outline', color: '#9C27B0' };
    case 'Education':
      return { icon: 'school-outline', color: '#FF9800' };
    case 'Housing':
      return { icon: 'home-outline', color: '#795548' };
    case 'Recreation':
      return { icon: 'football-outline', color: '#00BCD4' };
    case 'Community':
      return { icon: 'people-outline', color: '#673AB7' };
    case 'Economy':
      return { icon: 'cash-outline', color: '#009688' };
    default:
      return { icon: 'help-outline', color: '#757575' };
  }
};

// Mock surveys data
const mockSurveys: Survey[] = [
  {
    id: 'survey-1',
    title: 'Public Transportation Usage',
    description: 'Help us understand how you use public transportation in your city',
    category: 'Transportation',
    questions: [],
    xpReward: 150,
    estimatedTimeMinutes: 5,
    isLocationRequired: false,
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'survey-2',
    title: 'Cycling Infrastructure',
    description: 'Share your thoughts on bike lanes and cycling infrastructure',
    category: 'Transportation',
    questions: [],
    xpReward: 120,
    estimatedTimeMinutes: 4,
    isLocationRequired: true,
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: 'survey-3',
    title: 'Traffic Congestion',
    description: 'Tell us about traffic issues in your neighborhood',
    category: 'Transportation',
    questions: [],
    xpReward: 100,
    estimatedTimeMinutes: 3,
    isLocationRequired: true,
    createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: 'survey-4',
    title: 'Pedestrian Safety',
    description: 'Help improve pedestrian safety in your community',
    category: 'Safety',
    questions: [],
    xpReward: 200,
    estimatedTimeMinutes: 7,
    isLocationRequired: false,
    createdAt: new Date(Date.now() - 345600000),
  },
  {
    id: 'survey-5',
    title: 'Park Accessibility',
    description: 'Share your experience with parks and green spaces',
    category: 'Environment',
    questions: [],
    xpReward: 180,
    estimatedTimeMinutes: 6,
    isLocationRequired: true,
    createdAt: new Date(Date.now() - 432000000),
  },
];

const SurveyDetailScreen: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<SurveyScreenProps<'SurveyDetail'>['navigation']>();
  const route = useRoute<SurveyDetailScreenRouteProp>();
  
  const { surveyId } = route.params;
  const survey = mockSurveys.find(s => s.id === surveyId);
  
  if (!survey) {
    return (
      <SafeAreaContainer style={styles.container}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#888" />
          <Typography variant="body" center style={styles.errorText}>
            Survey not found
          </Typography>
          <Button 
            title="Go Back" 
            onPress={() => navigation.goBack()} 
            style={styles.errorButton}
          />
        </View>
      </SafeAreaContainer>
    );
  }
  
  const categoryMeta = getCategoryMeta(survey.category);
  const categoryTitle = survey.category.charAt(0).toUpperCase() + survey.category.slice(1);
  
  const handleStartSurvey = () => {
    navigation.navigate('SurveyQuestions', { survey });
  };
  
  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? theme.colors.dark.text : theme.colors.text}
          />
        </TouchableOpacity>
        
        <Typography variant="h3" weight="bold">
          Survey Details
        </Typography>
        
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.surveyCard}>
          <View style={styles.surveyHeader}>
            <View style={[styles.categoryTag, { backgroundColor: `${categoryMeta.color}20` }]}>
              <Ionicons name={categoryMeta.icon as any} size={16} color={categoryMeta.color} />
              <Typography variant="caption" style={[styles.categoryName, { color: categoryMeta.color }]}>
                {categoryTitle}
              </Typography>
            </View>
            
            <View style={styles.dateContainer}>
              <Typography variant="caption" style={styles.dateText}>
                {survey.createdAt.toLocaleDateString()}
              </Typography>
            </View>
          </View>
          
          <Typography variant="h2" weight="bold" style={styles.title}>
            {survey.title}
          </Typography>
          
          <Typography variant="body" style={styles.description}>
            {survey.description}
          </Typography>
          
          <View style={styles.rewardContainer}>
            <Card style={[styles.rewardCard, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="star" size={28} color={theme.colors.primary} />
              <View style={styles.rewardTextContainer}>
                <Typography variant="h3" weight="bold" color={theme.colors.primary}>
                  {survey.xpReward} XP
                </Typography>
                <Typography variant="caption" color={theme.colors.primary}>
                  Completion Reward
                </Typography>
              </View>
            </Card>
          </View>
          
          <View style={styles.metaSection}>
            <Typography variant="subtitle" weight="bold" style={styles.metaSectionTitle}>
              Survey Information
            </Typography>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons 
                  name="time-outline" 
                  size={20} 
                  color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
                />
                <View style={styles.metaTextContainer}>
                  <Typography variant="body" weight="medium">
                    {survey.estimatedTimeMinutes} minutes
                  </Typography>
                  <Typography variant="caption" style={styles.metaSubtext}>
                    Estimated time
                  </Typography>
                </View>
              </View>
              
              <View style={styles.metaItem}>
                <Ionicons 
                  name={survey.isLocationRequired ? "location" : "location-outline"} 
                  size={20} 
                  color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
                />
                <View style={styles.metaTextContainer}>
                  <Typography variant="body" weight="medium">
                    {survey.isLocationRequired ? "Required" : "Not required"}
                  </Typography>
                  <Typography variant="caption" style={styles.metaSubtext}>
                    Location access
                  </Typography>
                </View>
              </View>
              
              <View style={styles.metaItem}>
                <Ionicons 
                  name="help-circle-outline" 
                  size={20} 
                  color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
                />
                <View style={styles.metaTextContainer}>
                  <Typography variant="body" weight="medium">
                    {survey.questions.length || 10} questions
                  </Typography>
                  <Typography variant="caption" style={styles.metaSubtext}>
                    Survey length
                  </Typography>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.disclaimerContainer}>
            <Ionicons 
              name="information-circle-outline" 
              size={20} 
              color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
            />
            <Typography variant="caption" style={styles.disclaimerText}>
              Your answers help improve urban planning. Data is collected anonymously and used for city improvement initiatives.
            </Typography>
          </View>
        </Card>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Start Survey" 
          fullWidth
          onPress={handleStartSurvey}
        />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90, // Space for button
  },
  surveyCard: {
    padding: 20,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryName: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
  dateContainer: {
    opacity: 0.6,
  },
  dateText: {
    fontSize: 12,
  },
  title: {
    marginBottom: 12,
  },
  description: {
    opacity: 0.8,
    lineHeight: 22,
    marginBottom: 20,
  },
  rewardContainer: {
    marginBottom: 24,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  rewardTextContainer: {
    marginLeft: 12,
  },
  metaSection: {
    marginBottom: 20,
  },
  metaSectionTitle: {
    marginBottom: 12,
  },
  metaContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    padding: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaTextContainer: {
    marginLeft: 12,
  },
  metaSubtext: {
    opacity: 0.6,
    fontSize: 12,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    padding: 16,
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 12,
    opacity: 0.7,
    lineHeight: 18,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 24,
    opacity: 0.6,
  },
  errorButton: {
    width: '50%',
  },
});

export default SurveyDetailScreen; 