import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity
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

const OnboardingNameScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<AuthScreenProps<'OnboardingName'>['navigation']>();
  const { user, updateUser } = useUser();
  
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (text: string) => {
    setName(text);
    setError(null);
  };

  const validateName = (): boolean => {
    if (!name.trim()) {
      setError('Please enter your name');
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateName()) return;

    try {
      setIsLoading(true);
      
      // Update user's name
      await updateUser({ username: name });
      
      // Navigate to preferences screen
      navigation.navigate('OnboardingPreferences');
    } catch (error) {
      console.error('Error updating user name:', error);
      setError('Failed to save your name. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPreferences');
  };

  return (
    <SafeAreaContainer style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.progress}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: '33%', backgroundColor: theme.colors.primary }
                  ]} 
                />
              </View>
              <Typography variant="caption" style={styles.progressText}>
                Step 1 of 3
              </Typography>
            </View>
            
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Typography 
                variant="bodySmall" 
                weight="medium" 
                color={theme.colors.primary}
              >
                Skip
              </Typography>
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <Typography variant="h1" weight="bold" style={styles.title}>
              What should we call you?
            </Typography>
            
            <Typography variant="body" style={styles.subtitle}>
              Your name helps personalize your experience
            </Typography>
            
            <Card style={styles.card}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: error 
                        ? theme.colors.error 
                        : isDarkMode 
                          ? theme.colors.dark.border 
                          : theme.colors.border,
                      color: isDarkMode ? theme.colors.dark.text : theme.colors.text,
                    },
                  ]}
                  placeholder="Your Name"
                  placeholderTextColor={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary}
                  value={name}
                  onChangeText={handleNameChange}
                  autoFocus
                />
                
                {error && (
                  <Typography variant="caption" color={theme.colors.error} style={styles.errorText}>
                    {error}
                  </Typography>
                )}
              </View>
            </Card>
            
            <Button
              title="Next"
              fullWidth
              onPress={handleNext}
              isLoading={isLoading}
              disabled={isLoading || !name.trim()}
              style={styles.nextButton}
            />
          </View>
          
          <View style={styles.footer}>
            <Typography variant="caption" center style={styles.footerText}>
              This information helps us personalize your experience and is stored securely
            </Typography>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progress: {
    flex: 1,
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
    opacity: 0.6,
  },
  skipButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 32,
    opacity: 0.7,
  },
  card: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    marginTop: 8,
  },
  nextButton: {
    marginBottom: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footerText: {
    opacity: 0.5,
  },
});

export default OnboardingNameScreen; 