import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { Card } from '../../components/Card';

export default function ReportsDashboardScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <Typography variant="h1">Reports & Insights</Typography>
      </View>
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card 
          style={styles.card}
          onPress={() => navigation.navigate('CityOverview' as never)}
        >
          <Ionicons name="analytics-outline" size={24} color={colors.primary} />
          <Typography variant="h3" style={styles.cardTitle}>City Overview</Typography>
          <Typography variant="body2" style={styles.cardDescription}>
            View key metrics and data about city services and performance
          </Typography>
        </Card>

        <Card 
          style={styles.card}
          onPress={() => navigation.navigate('PersonalStats' as never)}
        >
          <Ionicons name="person-outline" size={24} color={colors.primary} />
          <Typography variant="h3" style={styles.cardTitle}>Personal Statistics</Typography>
          <Typography variant="body2" style={styles.cardDescription}>
            Track your engagement and contribution to the community
          </Typography>
        </Card>

        <Card 
          style={styles.card}
          onPress={() => navigation.navigate('InsightDetails' as never, { insightId: '1', insightTitle: 'Community Satisfaction' })}
        >
          <Ionicons name="bar-chart-outline" size={24} color={colors.primary} />
          <Typography variant="h3" style={styles.cardTitle}>Latest Insights</Typography>
          <Typography variant="body2" style={styles.cardDescription}>
            Recent surveys and community feedback results
          </Typography>
        </Card>
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
    gap: 16,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  card: {
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    marginTop: 8,
  },
  cardDescription: {
    opacity: 0.7,
  }
}); 