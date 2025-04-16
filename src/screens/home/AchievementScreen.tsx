import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { HomeStackParamList } from '../../types/navigation';

type AchievementScreenRouteProp = RouteProp<HomeStackParamList, 'Achievement'>;

const AchievementScreen: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<AchievementScreenRouteProp>();
  
  const { achievementId } = route.params;
  
  // In a real app, this would fetch the achievement from a store or context
  // For now, we'll use mock data
  const achievement = {
    id: achievementId,
    title: 'City Explorer',
    description: 'You have explored 5 different neighborhoods in your city',
    category: 'Exploration',
    icon: 'map',
    xpReward: 100,
    progress: 100,
    totalRequired: 100,
    unlockedAt: new Date(),
  };
  
  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? theme.colors.dark.text : theme.colors.text} />
        </TouchableOpacity>
        <Typography variant="h3" weight="bold">Achievement</Typography>
        <View style={styles.backButton} />
      </View>
      
      <ScrollView>
        <View style={styles.content}>
          {/* Achievement Card */}
          <Card style={styles.achievementCard}>
            <View style={styles.achievementHeader}>
              <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Ionicons 
                  name={achievement.icon as any} 
                  size={40} 
                  color={theme.colors.primary} 
                />
              </View>
              <Typography variant="h2" weight="bold" style={styles.title}>
                {achievement.title}
              </Typography>
              <Typography variant="body" style={styles.description}>
                {achievement.description}
              </Typography>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailsContainer}>
              <DetailItem 
                label="Category" 
                value={achievement.category} 
                icon="folder-outline" 
              />
              <DetailItem 
                label="XP Reward" 
                value={`${achievement.xpReward} XP`} 
                icon="star-outline" 
              />
              <DetailItem 
                label="Unlocked On" 
                value={achievement.unlockedAt.toLocaleDateString()} 
                icon="calendar-outline" 
              />
            </View>
            
            <View style={styles.badgeContainer}>
              <Typography variant="subtitle" weight="bold" center>
                Achievement Unlocked!
              </Typography>
              <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                <Ionicons name="trophy" size={60} color="#FFFFFF" />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

interface DetailItemProps {
  label: string;
  value: string;
  icon: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon }) => {
  const { isDarkMode, theme } = useTheme();
  
  return (
    <View style={styles.detailItem}>
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={theme.colors.primary} 
        style={styles.detailIcon} 
      />
      <View>
        <Typography variant="caption" style={styles.detailLabel}>
          {label}
        </Typography>
        <Typography variant="body" weight="medium">
          {value}
        </Typography>
      </View>
    </View>
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
  content: {
    padding: 16,
  },
  achievementCard: {
    padding: 24,
  },
  achievementHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailLabel: {
    opacity: 0.6,
    marginBottom: 2,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  badge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default AchievementScreen; 