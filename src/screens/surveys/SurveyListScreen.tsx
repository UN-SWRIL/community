import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useNavigation } from '@react-navigation/native';

const SurveyListScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  
  // Placeholder survey data
  const placeholderSurveys = [
    { 
      id: 'un-qol-survey', 
      title: 'Quality of Life Survey', 
      description: 'Help improve your city by sharing your experiences and quality of life insights.', 
      status: 'Available',
      type: 'official'
    },
    { 
      id: '1', 
      title: 'Community Safety', 
      description: 'Rate the safety level in your neighborhood', 
      status: 'Available' 
    },
    { 
      id: '2', 
      title: 'Public Transportation', 
      description: 'Share your experience with public transit', 
      status: 'Available' 
    },
    { 
      id: '3', 
      title: 'Green Spaces', 
      description: 'Rate the quality of parks in your area', 
      status: 'Completed' 
    }
  ];
  
  const handleSurveySelection = (survey: any) => {
    if (survey.id === 'un-qol-survey') {
      navigation.navigate('SurveyQuestions', { surveyId: survey.id });
    } else {
      // Handle other surveys
      alert('This survey will be available soon!');
    }
  };
  
  const renderSurveyItem = ({ item }: { item: any }) => (
    <Card style={[
      styles.surveyCard, 
      item.type === 'official' ? styles.officialSurveyCard : {}
    ]}>
      {item.type === 'official' && (
        <View style={styles.officialBadge}>
          <Typography variant="caption" color="#FFFFFF" weight="bold">
            OFFICIAL
          </Typography>
        </View>
      )}
      <Typography variant="h3" weight="bold">
        {item.title}
      </Typography>
      <Typography variant="body" style={styles.description}>
        {item.description}
      </Typography>
      <View style={styles.footer}>
        <Typography 
          variant="caption" 
          style={item.status === 'Completed' ? styles.completedStatus : styles.availableStatus}
        >
          {item.status}
        </Typography>
        <Button 
          title={item.status === 'Completed' ? 'View Results' : 'Take Survey'} 
          onPress={() => handleSurveySelection(item)}
          size="small"
        />
      </View>
    </Card>
  );
  
  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.header}>
        <Typography variant="h1" weight="bold">
          Surveys
        </Typography>
        <Typography variant="body" style={styles.subheader}>
          Help improve your city by completing surveys
        </Typography>
      </View>
      <FlatList
        data={placeholderSurveys}
        renderItem={renderSurveyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  subheader: {
    marginTop: 5,
    opacity: 0.7,
  },
  listContent: {
    padding: 15,
  },
  surveyCard: {
    padding: 15,
    marginBottom: 15,
    position: 'relative',
  },
  officialSurveyCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  officialBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  description: {
    marginTop: 8,
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  availableStatus: {
    color: '#4CAF50',
  },
  completedStatus: {
    color: '#9E9E9E',
  },
});

export default SurveyListScreen; 