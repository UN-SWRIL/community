import React from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { RootStackParamList, RootStackScreenProps } from '../../types/navigation';

type ModalSurveyRouteProp = RouteProp<RootStackParamList, 'ModalSurvey'>;

const ModalSurvey: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<RootStackScreenProps<'ModalSurvey'>['navigation']>();
  const route = useRoute<ModalSurveyRouteProp>();
  
  const { surveyId } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  const handleStartSurvey = () => {
    navigation.goBack();
    
    // Navigate to the survey details screen in the survey stack
    navigation.navigate('Main', {
      screen: 'Surveys',
      params: {
        screen: 'SurveyDetail',
        params: { surveyId },
      },
    });
  };

  return (
    <SafeAreaContainer style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons 
            name="close" 
            size={24} 
            color={isDarkMode ? theme.colors.dark.text : theme.colors.text}
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="document-text-outline" size={32} color={theme.colors.primary} />
            </View>
            
            <Typography variant="h2" weight="bold" center style={styles.title}>
              New Survey Available
            </Typography>
            
            <Typography variant="body" center style={styles.description}>
              Help improve your community by providing feedback on local transportation options.
            </Typography>
            
            <View style={styles.detailsContainer}>
              <DetailItem 
                icon="time-outline" 
                text="5 minutes" 
                label="Estimated Time" 
              />
              <DetailItem 
                icon="star-outline" 
                text="50 XP" 
                label="Reward" 
              />
            </View>
            
            <Button
              title="Start Survey"
              fullWidth
              onPress={handleStartSurvey}
              style={styles.button}
            />
            
            <Button
              title="Remind Me Later"
              variant="outline"
              fullWidth
              onPress={handleClose}
              style={styles.reminderButton}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

interface DetailItemProps {
  icon: string;
  text: string;
  label: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, text, label }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={styles.detailItem}>
      <Ionicons 
        name={icon as any} 
        size={24} 
        color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
        style={styles.detailIcon}
      />
      <Typography variant="body" weight="medium">
        {text}
      </Typography>
      <Typography variant="caption" style={styles.detailLabel}>
        {label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 32,
    opacity: 0.7,
    paddingHorizontal: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 32,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailIcon: {
    marginBottom: 8,
  },
  detailLabel: {
    marginTop: 4,
    opacity: 0.6,
  },
  button: {
    marginBottom: 16,
    width: '80%',
  },
  reminderButton: {
    width: '80%',
  },
});

export default ModalSurvey; 