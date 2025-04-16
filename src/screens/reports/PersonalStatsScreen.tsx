import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';
import { Card } from '../../components/Card';

export default function PersonalStatsScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={colors.text}
          onPress={() => navigation.goBack()}
        />
        <Typography variant="h2">Personal Statistics</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <View style={[styles.badgeIcon, { backgroundColor: 'rgba(52, 152, 219, 0.1)' }]}>
              <Ionicons name="star" size={24} color={colors.primary} />
            </View>
            <Typography variant="body2">Community Star</Typography>
          </View>
          
          <View style={styles.badge}>
            <View style={[styles.badgeIcon, { backgroundColor: 'rgba(46, 204, 113, 0.1)' }]}>
              <Ionicons name="earth" size={24} color={colors.success} />
            </View>
            <Typography variant="body2">Eco Warrior</Typography>
          </View>
          
          <View style={styles.badge}>
            <View style={[styles.badgeIcon, { backgroundColor: 'rgba(155, 89, 182, 0.1)' }]}>
              <Ionicons name="newspaper" size={24} color="#9b59b6" />
            </View>
            <Typography variant="body2">Informed Citizen</Typography>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h3">Engagement</Typography>
          
          <Card style={styles.statCard}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                <Typography variant="h3">12</Typography>
                <Typography variant="body2">Surveys Completed</Typography>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="chatbubble" size={24} color={colors.primary} />
                <Typography variant="h3">8</Typography>
                <Typography variant="body2">Service Reviews</Typography>
              </View>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Ionicons name="calendar" size={24} color={colors.primary} />
                <Typography variant="h3">3</Typography>
                <Typography variant="body2">Events Attended</Typography>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="document-text" size={24} color={colors.primary} />
                <Typography variant="h3">5</Typography>
                <Typography variant="body2">Reports Submitted</Typography>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Typography variant="h3">Activity History</Typography>
          
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="document-text" size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Typography variant="h4">Pothole Report Submitted</Typography>
                <Typography variant="body2" style={styles.activityDate}>2 days ago</Typography>
              </View>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="chatbubble" size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Typography variant="h4">Parks Department Rating</Typography>
                <Typography variant="body2" style={styles.activityDate}>1 week ago</Typography>
              </View>
              <Typography variant="h4">4.5/5</Typography>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="checkbox" size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Typography variant="h4">Transportation Survey</Typography>
                <Typography variant="body2" style={styles.activityDate}>2 weeks ago</Typography>
              </View>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Typography variant="h4">Community Clean-up Event</Typography>
                <Typography variant="body2" style={styles.activityDate}>1 month ago</Typography>
              </View>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            </View>
          </View>
        </View>
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
  section: {
    marginBottom: 24,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    marginTop: 8,
  },
  badge: {
    alignItems: 'center',
    gap: 8,
  },
  badgeIcon: {
    padding: 12,
    borderRadius: 40,
    marginBottom: 4,
  },
  statCard: {
    marginTop: 12,
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    width: '48%',
  },
  activityList: {
    marginTop: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityIcon: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityDate: {
    opacity: 0.6,
  }
}); 