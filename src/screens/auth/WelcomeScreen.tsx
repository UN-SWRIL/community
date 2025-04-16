import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { AuthScreenProps } from '../../types/navigation';

const WelcomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<AuthScreenProps<'Welcome'>['navigation']>();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1565C0', '#42A5F5']}
        style={styles.backgroundGradient}
      >
        <SafeAreaContainer style={styles.content} edges={['bottom']}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Ionicons name="pulse" size={60} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Typography variant="h1" weight="bold" color="#FFFFFF" center>
              City Pulse
            </Typography>
            <Typography variant="subtitle" color="#FFFFFF" center style={styles.subtitle}>
              Help shape your city by sharing your experiences and insights
            </Typography>
          </View>

          <View style={styles.featureContainer}>
            <FeatureItem 
              title="Share Your Voice" 
              description="Provide feedback on your urban experience that matters to city planners" 
            />
            <FeatureItem 
              title="Collect & Evolve" 
              description="Engage with gamified elements while making a real difference" 
            />
            <FeatureItem 
              title="See Impact" 
              description="Visualize how your data transforms into actionable city intelligence" 
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Get Started"
              size="large"
              fullWidth
              style={styles.button}
              onPress={handleGetStarted}
            />
          </View>
        </SafeAreaContainer>
      </LinearGradient>
    </View>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => {
  return (
    <View style={styles.featureItem}>
      <Typography variant="h4" weight="bold" color="#FFFFFF">
        {title}
      </Typography>
      <Typography variant="bodySmall" color="#FFFFFF" style={styles.featureDescription}>
        {description}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  subtitle: {
    marginTop: 12,
    opacity: 0.8,
  },
  featureContainer: {
    marginTop: 40,
    gap: 24,
  },
  featureItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  featureDescription: {
    marginTop: 4,
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
  },
});

export default WelcomeScreen; 