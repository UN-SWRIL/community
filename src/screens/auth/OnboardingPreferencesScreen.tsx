import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { AuthScreenProps } from '../../types/navigation';

const OnboardingPreferencesScreen: React.FC = () => {
  const { theme, isDarkMode, toggleColorScheme } = useTheme();
  const navigation = useNavigation<AuthScreenProps<'OnboardingPreferences'>['navigation']>();
  const { user, updatePreferences } = useUser();
  
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    notifications: true,
    locationTracking: true,
    darkMode: isDarkMode,
    dataSharing: {
      anonymous: true,
      identifiable: false,
    },
  });

  const handleToggleSwitch = (key: string) => {
    if (key === 'darkMode') {
      toggleColorScheme();
      setPreferences(prev => ({
        ...prev,
        darkMode: !prev.darkMode,
      }));
    } else if (key === 'anonymous' || key === 'identifiable') {
      setPreferences(prev => ({
        ...prev,
        dataSharing: {
          ...prev.dataSharing,
          [key]: !prev.dataSharing[key as keyof typeof prev.dataSharing],
        },
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev],
      }));
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
      
      // Update user preferences
      await updatePreferences(preferences);
      
      // Navigate to character selection screen
      navigation.navigate('OnboardingCharacter');
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaContainer style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? theme.colors.dark.text : theme.colors.text}
          />
        </TouchableOpacity>
        
        <View style={styles.progress}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: '66%', backgroundColor: theme.colors.primary }
              ]} 
            />
          </View>
          <Typography variant="caption" style={styles.progressText}>
            Step 2 of 3
          </Typography>
        </View>
        
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Typography variant="h1" weight="bold" style={styles.title}>
            Your Preferences
          </Typography>
          
          <Typography variant="body" style={styles.subtitle}>
            Customize your experience to get the most out of City Pulse
          </Typography>
          
          <Card style={styles.card}>
            <PreferenceItem
              title="Enable Notifications"
              description="Receive updates about new surveys and insights"
              isEnabled={preferences.notifications}
              onToggle={() => handleToggleSwitch('notifications')}
            />
            
            <View style={styles.divider} />
            
            <PreferenceItem
              title="Location Tracking"
              description="Allow location data to better contextualize your feedback"
              isEnabled={preferences.locationTracking}
              onToggle={() => handleToggleSwitch('locationTracking')}
            />
            
            <View style={styles.divider} />
            
            <PreferenceItem
              title="Dark Mode"
              description="Use dark theme throughout the app"
              isEnabled={preferences.darkMode}
              onToggle={() => handleToggleSwitch('darkMode')}
            />
          </Card>
          
          <Card style={styles.card}>
            <Typography variant="h3" weight="medium" style={styles.cardTitle}>
              Data Sharing
            </Typography>
            
            <PreferenceItem
              title="Anonymous Data"
              description="Share feedback without personal identifiers"
              isEnabled={preferences.dataSharing.anonymous}
              onToggle={() => handleToggleSwitch('anonymous')}
            />
            
            <View style={styles.divider} />
            
            <PreferenceItem
              title="Identifiable Data"
              description="Allow city planners to contact you for follow-up"
              isEnabled={preferences.dataSharing.identifiable}
              onToggle={() => handleToggleSwitch('identifiable')}
            />
          </Card>
          
          <Button
            title="Next"
            fullWidth
            onPress={handleNext}
            isLoading={isLoading}
            style={styles.nextButton}
          />
          
          <Typography variant="caption" center style={styles.footerText}>
            You can change these settings at any time in your profile
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

interface PreferenceItemProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const PreferenceItem: React.FC<PreferenceItemProps> = ({
  title,
  description,
  isEnabled,
  onToggle,
}) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={styles.preferenceItem}>
      <View style={styles.preferenceTextContainer}>
        <Typography variant="subtitle" weight="medium">
          {title}
        </Typography>
        <Typography variant="bodySmall" style={styles.preferenceDescription}>
          {description}
        </Typography>
      </View>
      
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{ 
          false: isDarkMode ? '#333333' : '#E0E0E0', 
          true: theme.colors.primary 
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={isDarkMode ? '#333333' : '#E0E0E0'}
      />
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
    padding: 8,
    width: 40,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  progress: {
    flex: 1,
    paddingHorizontal: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    marginTop: 4,
    textAlign: 'center',
    opacity: 0.6,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 32,
    opacity: 0.7,
  },
  card: {
    marginBottom: 24,
  },
  cardTitle: {
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  preferenceDescription: {
    marginTop: 4,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    opacity: 0.5,
  },
  nextButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  footerText: {
    opacity: 0.5,
  },
});

export default OnboardingPreferencesScreen; 