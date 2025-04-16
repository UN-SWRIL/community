import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';
import { Card } from '../../components/Card';

export default function CityOverviewScreen() {
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
        <Typography variant="h2">City Overview</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Typography variant="h3">Key City Metrics</Typography>
          
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: 'rgba(52, 152, 219, 0.1)' }]}>
              <Ionicons name="people-outline" size={24} color={colors.primary} />
              <Typography variant="h4">215,000</Typography>
              <Typography variant="body2">Population</Typography>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: 'rgba(46, 204, 113, 0.1)' }]}>
              <Ionicons name="leaf-outline" size={24} color={colors.success} />
              <Typography variant="h4">42</Typography>
              <Typography variant="body2">Parks</Typography>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: 'rgba(241, 196, 15, 0.1)' }]}>
              <Ionicons name="business-outline" size={24} color={colors.warning} />
              <Typography variant="h4">12,450</Typography>
              <Typography variant="body2">Businesses</Typography>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: 'rgba(231, 76, 60, 0.1)' }]}>
              <Ionicons name="school-outline" size={24} color={colors.error} />
              <Typography variant="h4">85</Typography>
              <Typography variant="body2">Schools</Typography>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h3">Service Performance</Typography>
          
          <Card style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Ionicons name="trash-outline" size={24} color={colors.primary} />
              <Typography variant="h4">Waste Management</Typography>
            </View>
            <View style={styles.performanceStats}>
              <View style={styles.performanceStat}>
                <Typography variant="body2">Efficiency</Typography>
                <Typography variant="h4">92%</Typography>
              </View>
              <View style={styles.performanceStat}>
                <Typography variant="body2">Recycling Rate</Typography>
                <Typography variant="h4">68%</Typography>
              </View>
              <View style={styles.performanceStat}>
                <Typography variant="body2">Satisfaction</Typography>
                <Typography variant="h4">4.2/5</Typography>
              </View>
            </View>
          </Card>
          
          <Card style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Ionicons name="car-outline" size={24} color={colors.primary} />
              <Typography variant="h4">Transportation</Typography>
            </View>
            <View style={styles.performanceStats}>
              <View style={styles.performanceStat}>
                <Typography variant="body2">Public Transport</Typography>
                <Typography variant="h4">78%</Typography>
              </View>
              <View style={styles.performanceStat}>
                <Typography variant="body2">Road Quality</Typography>
                <Typography variant="h4">3.8/5</Typography>
              </View>
              <View style={styles.performanceStat}>
                <Typography variant="body2">Avg Commute</Typography>
                <Typography variant="h4">28 min</Typography>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Typography variant="h3">Recent Developments</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            The city has recently completed the revitalization of the downtown area,
            with improved pedestrian access and new green spaces.
          </Typography>
          <Typography variant="body1" style={styles.paragraph}>
            Upcoming projects include expanding the bike lane network and upgrading
            the water treatment facility to improve sustainability.
          </Typography>
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
    gap: 8,
  },
  paragraph: {
    marginTop: 8,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  performanceCard: {
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceStat: {
    alignItems: 'center',
  }
}); 