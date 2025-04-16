import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Share,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { SurveyStackParamList } from '../../navigation/SurveyNavigator';
import { colors } from '../../styles/colors';

type SurveyCompleteScreenProps = {
  navigation: StackNavigationProp<SurveyStackParamList, 'SurveyComplete'>;
  route: RouteProp<SurveyStackParamList, 'SurveyComplete'>;
};

const SurveyCompleteScreen: React.FC<SurveyCompleteScreenProps> = ({ navigation, route }) => {
  const { surveyTitle } = route.params;
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just completed the "${surveyTitle}" survey on City Pulse! Help improve our city by sharing your voice too.`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  const handleReturnToSurveys = () => {
    // Navigate back to the surveys list
    navigation.navigate('SurveyList');
  };
  
  const handleViewDashboard = () => {
    // Navigate to the dashboard (future feature)
    // For now, just return to surveys
    navigation.navigate('SurveyList');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Success Image/Icon */}
      <View style={styles.imageContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={120} color={colors.success} />
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Thank You!</Text>
        
        <Text style={styles.description}>
          Your feedback for "{surveyTitle}" has been submitted successfully. Your input helps make our city better for everyone!
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Survey Completed</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>20</Text>
            <Text style={styles.statLabel}>Community Points</Text>
          </View>
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleReturnToSurveys}
        >
          <Text style={styles.primaryButtonText}>Return to Surveys</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={18} color={colors.primary} />
          <Text style={styles.secondaryButtonText}>Share Your Participation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tertiaryButton}
          onPress={handleViewDashboard}
        >
          <Text style={styles.tertiaryButtonText}>View Community Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green background
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
  },
  actionsContainer: {
    padding: 24,
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tertiaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  tertiaryButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SurveyCompleteScreen; 