import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';

type RouteParams = {
  insightId: string;
  insightTitle: string;
};

export default function InsightDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  
  // Get params with a fallback in case they're not provided
  const { insightId = '1', insightTitle = 'Insight Details' } = 
    (route.params as RouteParams) || {};

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={colors.text}
          onPress={() => navigation.goBack()}
        />
        <Typography variant="h2">{insightTitle}</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Typography variant="h3">Summary</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            This insight provides key information about {insightTitle.toLowerCase()}. 
            Data is collected from community surveys and municipal service records.
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h3">Key Metrics</Typography>
          <View style={styles.metricContainer}>
            <View style={styles.metric}>
              <Ionicons name="trending-up" size={24} color={colors.success} />
              <Typography variant="h4">85%</Typography>
              <Typography variant="body2">Satisfaction</Typography>
            </View>
            <View style={styles.metric}>
              <Ionicons name="people" size={24} color={colors.primary} />
              <Typography variant="h4">1,240</Typography>
              <Typography variant="body2">Participants</Typography>
            </View>
            <View style={styles.metric}>
              <Ionicons name="calendar" size={24} color={colors.warning} />
              <Typography variant="h4">Q2 2023</Typography>
              <Typography variant="body2">Time Period</Typography>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h3">Findings</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            The data shows a positive trend in community engagement and satisfaction with municipal services.
            Residents particularly appreciate the improved response times and accessibility of information.
          </Typography>
          <Typography variant="body1" style={styles.paragraph}>
            Areas for improvement include more transparent communication about upcoming infrastructure projects 
            and better integration of digital services.
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
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
  }
}); 