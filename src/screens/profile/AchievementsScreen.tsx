import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';
import { Card } from '../../components/Card';

export default function AchievementsScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  // Achievement data - in a real app, this would come from an API or state management
  const achievements = [
    {
      id: '1',
      title: 'Community Star',
      description: 'Complete 5 surveys to help improve city services',
      icon: 'star',
      color: '#4285F4',
      progress: 100, // percentage
      unlocked: true,
    },
    {
      id: '2',
      title: 'Eco Warrior',
      description: 'Participate in 3 environmental initiatives',
      icon: 'leaf',
      color: '#34A853',
      progress: 66, // 2/3 complete
      unlocked: false,
    },
    {
      id: '3',
      title: 'Informed Citizen',
      description: 'Stay updated by reading 10 city news articles',
      icon: 'newspaper',
      color: '#9C27B0',
      progress: 90, // 9/10 complete
      unlocked: false,
    },
    {
      id: '4',
      title: 'Feedback Champion',
      description: 'Provide feedback on 5 different city services',
      icon: 'chatbubbles',
      color: '#FBBC05',
      progress: 60, // 3/5 complete
      unlocked: false,
    },
    {
      id: '5',
      title: 'Digital Explorer',
      description: 'Use all major features of the City Pulse app',
      icon: 'compass',
      color: '#EA4335',
      progress: 40, // 2/5 complete
      unlocked: false,
    },
    {
      id: '6',
      title: 'City Expert',
      description: 'Earn 10 other achievements',
      icon: 'ribbon',
      color: '#FF6D00',
      progress: 10, // 1/10 complete
      unlocked: false,
    },
  ];

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={colors.text}
          onPress={() => navigation.goBack()}
        />
        <Typography variant="h2">Achievements</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Typography variant="h3">1</Typography>
          <Typography variant="body2">Unlocked</Typography>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Typography variant="h3">5</Typography>
          <Typography variant="body2">In Progress</Typography>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Typography variant="h3">6</Typography>
          <Typography variant="body2">Total</Typography>
        </View>
      </View>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {achievements.map((achievement) => (
          <Card key={achievement.id} style={styles.achievementCard}>
            <View style={styles.achievementContent}>
              <View 
                style={[
                  styles.achievementIcon, 
                  { 
                    backgroundColor: `${achievement.color}20`, // 20% opacity
                    borderColor: achievement.unlocked ? achievement.color : 'transparent',
                  }
                ]}
              >
                <Ionicons 
                  name={achievement.icon as any} 
                  size={28} 
                  color={achievement.color} 
                />
                {achievement.unlocked && (
                  <View style={[styles.checkmark, { backgroundColor: achievement.color }]}>
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  </View>
                )}
              </View>
              
              <View style={styles.achievementDetails}>
                <Typography variant="h3">{achievement.title}</Typography>
                <Typography variant="body2" style={styles.achievementDescription}>
                  {achievement.description}
                </Typography>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBackground}>
                    <View 
                      style={[
                        styles.progressBarFill, 
                        { 
                          width: `${achievement.progress}%`,
                          backgroundColor: achievement.color,
                        }
                      ]} 
                    />
                  </View>
                  <Typography variant="body2" style={styles.progressText}>
                    {achievement.progress}%
                  </Typography>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  achievementCard: {
    marginBottom: 12,
    padding: 16,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    position: 'relative',
  },
  checkmark: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementDetails: {
    flex: 1,
  },
  achievementDescription: {
    marginTop: 4,
    marginBottom: 12,
    opacity: 0.7,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    width: 40,
    textAlign: 'right',
  }
}); 