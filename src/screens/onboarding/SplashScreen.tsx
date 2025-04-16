import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  SafeAreaView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

// Key to track if onboarding has been completed
const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

interface SplashScreenContentProps {
  title: string;
  description: string;
  image: React.ReactNode;
  ctaText: string;
}

// Define styles first
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    width: '100%',
  },
  imageContainer: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cityImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: width * 0.8,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  unLogoPlaceholder: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  unLogoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cityImage: {
    width: width * 0.8,
    height: height * 0.3,
  },
  unLogo: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.3,
    height: 30,
    opacity: 0.8,
  },
  voiceImageContainer: {
    width: '100%',
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceImage: {
    width: width * 0.8,
    height: height * 0.3,
  },
  characterImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  characterImage: {
    width: width * 0.8,
    height: height * 0.3,
  },
  gameImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameImage: {
    width: width * 0.8,
    height: height * 0.3,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 40,
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    width: '100%',
    zIndex: 100,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 100,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});

// Then define the splash screens
const splashScreens: SplashScreenContentProps[] = [
  {
    title: "Shape Your City's Future",
    description: "Join a global initiative with UN-Habitat to improve urban life through your feedback.",
    image: (
      <View style={styles.cityImageContainer}>
        <View style={[styles.placeholderImage, { backgroundColor: '#e0f7fa' }]}>
          <Ionicons name="business-outline" size={80} color="#00acc1" />
          <Text style={styles.placeholderText}>City Skyline</Text>
        </View>
        <View style={styles.unLogoPlaceholder}>
          <Text style={styles.unLogoText}>UN-Habitat</Text>
        </View>
      </View>
    ),
    ctaText: "Discover How"
  },
  {
    title: "Your Voice Matters",
    description: "Answer questions about your city experience and see real changes happen in your community.",
    image: (
      <View style={styles.voiceImageContainer}>
        <View style={[styles.placeholderImage, { backgroundColor: '#fff8e1' }]}>
          <Ionicons name="people-outline" size={80} color="#ffa000" />
          <Text style={styles.placeholderText}>Citizen Voices</Text>
        </View>
      </View>
    ),
    ctaText: "Tell Me More"
  },
  {
    title: "Meet Your City Companion",
    description: "Your character evolves as you contribute insights, unlocking new abilities and appearances.",
    image: (
      <View style={styles.characterImageContainer}>
        <View style={[styles.placeholderImage, { backgroundColor: '#e8f5e9' }]}>
          <Ionicons name="bug-outline" size={80} color="#43a047" />
          <Text style={styles.placeholderText}>Character Evolution</Text>
        </View>
      </View>
    ),
    ctaText: "I'm Excited!"
  },
  {
    title: "Run, Answer, Evolve!",
    description: "Complete surveys to help your character run faster and jump higher in this playful city adventure.",
    image: (
      <View style={styles.gameImageContainer}>
        <View style={[styles.placeholderImage, { backgroundColor: '#e8eaf6' }]}>
          <Ionicons name="game-controller-outline" size={80} color="#3949ab" />
          <Text style={styles.placeholderText}>Game Mechanics</Text>
        </View>
      </View>
    ),
    ctaText: "Let's Start!"
  }
];

const SplashScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<RootStackScreenProps<'Auth'>['navigation']>();
  
  const slideRef = useRef<any>(null);

  // Check if onboarding is completed
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      // Always return false to show splash screen
      // Comment out the original code
      /*
      const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      
      if (value === 'true') {
        // Onboarding already completed, navigate to Auth 
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      }
      */
      
      // If you want to clear any existing onboarding status
      await AsyncStorage.removeItem(ONBOARDING_COMPLETE_KEY);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  const markOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < splashScreens.length - 1) {
      // Move to next screen
      setCurrentIndex(currentIndex + 1);
      slideRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    } else {
      // Last screen, complete onboarding
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await markOnboardingComplete();
    
    // Navigate to Auth navigator (login/welcome)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleSkip = () => {
    // Skip to the end
    handleComplete();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Skip button */}
      {currentIndex < splashScreens.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Animated Dots */}
      <View style={styles.dotContainer}>
        {splashScreens.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          
          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                { 
                  width: dotWidth,
                  opacity: dotOpacity,
                  backgroundColor: index === currentIndex ? '#007AFF' : '#ccc' 
                },
              ]}
            />
          );
        })}
      </View>

      {/* Horizontal Scroll View */}
      <Animated.ScrollView
        ref={slideRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        scrollEnabled={false}
      >
        {splashScreens.map((screen, index) => (
          <View key={index} style={styles.slide}>
            {/* Content */}
            <View style={styles.slideContent}>
              {/* Image/Animation */}
              <View style={styles.imageContainer}>
                {screen.image}
              </View>
              
              {/* Text Content */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{screen.title}</Text>
                <Text style={styles.description}>{screen.description}</Text>
              </View>
              
              {/* Button */}
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>{screen.ctaText}</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default SplashScreen; 