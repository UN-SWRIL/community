import React from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
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

type ModalAchievementRouteProp = RouteProp<RootStackParamList, 'ModalAchievement'>;

const ModalAchievement: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<RootStackScreenProps<'ModalAchievement'>['navigation']>();
  const route = useRoute<ModalAchievementRouteProp>();
  
  const { achievementId } = route.params;
  
  // Animation values
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    // Start the animation when the component mounts
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleViewDetails = () => {
    navigation.goBack();
    
    // Navigate to the achievements screen in the profile stack
    navigation.navigate('Main', {
      screen: 'Profile',
      params: {
        screen: 'Achievements',
      },
    });
  };

  // Mock achievement data (in a real app, this would come from a store or API)
  const achievement = {
    title: 'Urban Explorer',
    description: 'Completed surveys in 5 different neighborhoods',
    xpReward: 100,
    icon: 'map',
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
          <View style={styles.confettiContainer}>
            {/* Confetti effect would go here with a library like lottie-react-native */}
          </View>
          
          <Animated.View 
            style={[
              styles.achievementContainer,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              }
            ]}
          >
            <Card style={styles.card}>
              <Typography variant="h2" weight="bold" center style={styles.achievementTitle}>
                Achievement Unlocked!
              </Typography>
              
              <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Ionicons name={achievement.icon as any} size={64} color={theme.colors.primary} />
              </View>
              
              <Typography variant="h3" weight="bold" center style={styles.title}>
                {achievement.title}
              </Typography>
              
              <Typography variant="body" center style={styles.description}>
                {achievement.description}
              </Typography>
              
              <View style={[styles.xpContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Ionicons name="star" size={20} color={theme.colors.primary} />
                <Typography 
                  variant="subtitle" 
                  weight="bold" 
                  color={theme.colors.primary}
                  style={styles.xpText}
                >
                  +{achievement.xpReward} XP
                </Typography>
              </View>
              
              <Button
                title="View All Achievements"
                fullWidth
                onPress={handleViewDetails}
                style={styles.button}
              />
              
              <Button
                title="Continue"
                variant="outline"
                fullWidth
                onPress={handleClose}
                style={styles.continueButton}
              />
            </Card>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
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
    alignItems: 'center',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  achievementContainer: {
    width: '100%',
    maxWidth: 360,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  achievementTitle: {
    marginBottom: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 24,
    opacity: 0.7,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 32,
  },
  xpText: {
    marginLeft: 8,
  },
  button: {
    marginBottom: 16,
    width: '100%',
  },
  continueButton: {
    width: '100%',
  },
});

export default ModalAchievement; 