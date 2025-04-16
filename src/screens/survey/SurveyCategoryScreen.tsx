import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { SurveyStackParamList, SurveyScreenProps } from '../../types/navigation';
import { QoLCategory, Survey } from '../../types';

type SurveyCategoryScreenRouteProp = RouteProp<SurveyStackParamList, 'SurveyCategory'>;

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

const SurveyCategoryScreen: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<SurveyScreenProps<'SurveyCategory'>['navigation']>();
  const route = useRoute<SurveyCategoryScreenRouteProp>();
  
  const { category } = route.params;
  const categoryMeta = getCategoryMeta(category);
  
  // Filter surveys by category
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const surveys = mockSurveys.filter(survey => survey.category === category);
  
  const handleSurveyPress = (survey: Survey) => {
    navigation.navigate('SurveyDetail', { surveyId: survey.id });
  };
  
  const renderSurveyItem = ({ item }: { item: Survey }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSurveyPress(item)}
        activeOpacity={0.8}
      >
        <Card style={styles.surveyCard}>
          <View style={styles.surveyContent}>
            <View style={styles.surveyHeader}>
              <View style={[styles.categoryTag, { backgroundColor: `${categoryMeta.color}20` }]}>
                <Ionicons name={categoryMeta.icon as any} size={14} color={categoryMeta.color} />
                <Typography variant="caption" style={[styles.categoryName, { color: categoryMeta.color }]}>
                  {categoryTitle}
                </Typography>
              </View>
              
              <View style={styles.xpContainer}>
                <Ionicons name="star" size={14} color="#FFC107" />
                <Typography variant="caption" weight="bold" style={styles.xpText}>
                  {item.xpReward} XP
                </Typography>
              </View>
            </View>
            
            <Typography variant="h3" weight="bold" style={styles.title}>
              {item.title}
            </Typography>
            
            <Typography variant="body" style={styles.description}>
              {item.description}
            </Typography>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} />
                <Typography variant="caption" style={styles.metaText}>
                  {item.estimatedTimeMinutes} min
                </Typography>
              </View>
              
              {item.isLocationRequired && (
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={14} color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} />
                  <Typography variant="caption" style={styles.metaText}>
                    Location required
                  </Typography>
                </View>
              )}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={60} color="#888" />
      <Typography variant="body" center style={styles.emptyText}>
        No surveys available in this category yet
      </Typography>
    </View>
  );
  
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
        
        <View style={styles.headerTitle}>
          <Typography variant="h2" weight="bold" center>
            {categoryTitle} Surveys
          </Typography>
        </View>
        
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <FlatList
        data={surveys}
        renderItem={renderSurveyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
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
  headerTitle: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  surveyCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  surveyContent: {
    padding: 16,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryName: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    marginLeft: 4,
    color: '#FFC107',
  },
  title: {
    marginBottom: 8,
  },
  description: {
    opacity: 0.7,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 4,
    opacity: 0.6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    opacity: 0.6,
  },
});

export default SurveyCategoryScreen; 