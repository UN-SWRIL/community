import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { QoLCategory } from '../../types';
import { SurveyScreenProps } from '../../types/navigation';

// Mock category data with UI colors and icons
const categories: {
  id: string;
  title: string;
  description: string;
  category: QoLCategory;
  icon: string;
  color: string;
  count: number;
}[] = [
  {
    id: '1',
    title: 'Transportation',
    description: 'Public transit, roads, bike lanes, and more',
    category: 'Transportation',
    icon: 'bus-outline',
    color: '#2196F3', // Blue
    count: 3,
  },
  {
    id: '2',
    title: 'Safety',
    description: 'Crime, emergency services, and public safety',
    category: 'Safety',
    icon: 'shield-checkmark-outline',
    color: '#F44336', // Red
    count: 2,
  },
  {
    id: '3',
    title: 'Environment',
    description: 'Parks, pollution, and sustainability initiatives',
    category: 'Environment',
    icon: 'leaf-outline',
    color: '#4CAF50', // Green
    count: 4,
  },
  {
    id: '4',
    title: 'Healthcare',
    description: 'Hospitals, clinics, and health services',
    category: 'Healthcare',
    icon: 'medkit-outline',
    color: '#9C27B0', // Purple
    count: 1,
  },
  {
    id: '5',
    title: 'Education',
    description: 'Schools, libraries, and learning resources',
    category: 'Education',
    icon: 'school-outline',
    color: '#FF9800', // Orange
    count: 2,
  },
  {
    id: '6',
    title: 'Housing',
    description: 'Affordability, development, and housing policies',
    category: 'Housing',
    icon: 'home-outline',
    color: '#795548', // Brown
    count: 1,
  },
  {
    id: '7',
    title: 'Recreation',
    description: 'Entertainment, sports, and leisure activities',
    category: 'Recreation',
    icon: 'football-outline',
    color: '#00BCD4', // Cyan
    count: 3,
  },
  {
    id: '8',
    title: 'Community',
    description: 'Civic engagement, events, and local culture',
    category: 'Community',
    icon: 'people-outline',
    color: '#673AB7', // Deep Purple
    count: 2,
  },
  {
    id: '9',
    title: 'Economy',
    description: 'Jobs, business development, and economic growth',
    category: 'Economy',
    icon: 'cash-outline',
    color: '#009688', // Teal
    count: 1,
  }
];

const SurveyCategoriesScreen: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<SurveyScreenProps<'SurveyCategories'>['navigation']>();
  
  const handleCategoryPress = (category: QoLCategory) => {
    navigation.navigate('SurveyCategory', { category });
  };
  
  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => {
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.category)}
        activeOpacity={0.8}
      >
        <Card style={styles.categoryCard}>
          <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
            <Ionicons name={item.icon as any} size={24} color={item.color} />
          </View>
          
          <View style={styles.categoryContent}>
            <Typography variant="h3" weight="medium">
              {item.title}
            </Typography>
            
            <Typography variant="body" style={styles.description}>
              {item.description}
            </Typography>
            
            <View style={styles.surveyCountContainer}>
              <Typography variant="caption" style={styles.surveyCount}>
                {item.count} {item.count === 1 ? 'survey' : 'surveys'} available
              </Typography>
            </View>
          </View>
          
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary}
          />
        </Card>
      </TouchableOpacity>
    );
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
        
        <Typography variant="h2" weight="bold">
          Survey Categories
        </Typography>
        
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <Typography variant="body" style={styles.subtitle}>
        Choose a category to find surveys related to specific aspects of urban life
      </Typography>
      
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  subtitle: {
    paddingHorizontal: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  listContainer: {
    padding: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  description: {
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 8,
  },
  surveyCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  surveyCount: {
    opacity: 0.6,
  },
});

export default SurveyCategoriesScreen; 