import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Image,
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

type ModalCharacterEvolutionRouteProp = RouteProp<RootStackParamList, 'ModalCharacterEvolution'>;

const ModalCharacterEvolution: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<RootStackScreenProps<'ModalCharacterEvolution'>['navigation']>();
  const route = useRoute<ModalCharacterEvolutionRouteProp>();
  
  const { characterId } = route.params;
  
  // Animation values
  const [showNewForm, setShowNewForm] = useState(false);
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityOldForm = React.useRef(new Animated.Value(1)).current;
  const opacityNewForm = React.useRef(new Animated.Value(0)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  // Start the evolution animation after a brief delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      startEvolutionAnimation();
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  const startEvolutionAnimation = () => {
    // Sequence of animations for the evolution effect
    Animated.sequence([
      // Glow effect
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Rotate and scale
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      // Cross-fade between forms
      Animated.parallel([
        Animated.timing(opacityOldForm, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityNewForm, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Final scale adjustment
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animation complete
      setShowNewForm(true);
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glow = glowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1],
  });

  const handleClose = () => {
    navigation.goBack();
  };

  const handleViewCharacter = () => {
    navigation.goBack();
    
    // Navigate to the character detail screen in the character stack
    navigation.navigate('Main', {
      screen: 'Character',
      params: {
        screen: 'CharacterDetail',
        params: { characterId },
      },
    });
  };
  
  // Mock character evolution data (in a real app, this would come from a store or API)
  const character = {
    name: 'Urban Fox',
    oldState: 'Baby',
    newState: 'Child',
    description: 'Your Urban Fox has evolved to the Child stage! It can now track more complex city patterns.',
    oldImage: <Ionicons name="paw-outline" size={100} color="#ff9800" />,
    newImage: <Ionicons name="paw" size={120} color="#ff9800" />,
    newAttributes: {
      intelligence: 3,
      adaptability: 4
    }
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
          <Typography variant="h1" weight="bold" center style={styles.evolutionTitle}>
            Evolution!
          </Typography>
          
          <View style={styles.stagesContainer}>
            <View style={styles.stageItem}>
              <Typography variant="body" center>
                {character.oldState}
              </Typography>
              <View style={[styles.stageIndicator, { backgroundColor: theme.colors.primaryLight }]} />
            </View>
            
            <View style={styles.stageConnector}>
              <View style={[styles.connector, { backgroundColor: theme.colors.primary }]} />
            </View>
            
            <View style={styles.stageItem}>
              <Typography 
                variant="body" 
                weight="bold" 
                color={theme.colors.primary} 
                center
              >
                {character.newState}
              </Typography>
              <View style={[styles.stageIndicator, styles.activeStage, { backgroundColor: theme.colors.primary }]} />
            </View>
          </View>
          
          <View style={styles.characterContainer}>
            <Animated.View
              style={[
                styles.glowContainer,
                {
                  transform: [
                    { rotate: spin },
                    { scale: glow },
                  ],
                  opacity: glowAnim,
                }
              ]}
            >
              <View style={[styles.glow, { backgroundColor: theme.colors.primaryLight }]} />
            </Animated.View>
            
            <Animated.View
              style={[
                styles.characterImageWrapper,
                {
                  transform: [
                    { scale: scaleAnim },
                  ],
                }
              ]}
            >
              <Animated.View
                style={[
                  styles.characterImageContainer,
                  { opacity: opacityOldForm }
                ]}
              >
                {character.oldImage}
              </Animated.View>
              
              <Animated.View
                style={[
                  styles.characterImageContainer,
                  styles.newCharacterImage,
                  { opacity: opacityNewForm }
                ]}
              >
                {character.newImage}
              </Animated.View>
            </Animated.View>
          </View>
          
          <Card style={styles.card}>
            <Typography variant="h2" weight="bold" center style={styles.title}>
              {character.name} Evolved!
            </Typography>
            
            <Typography variant="body" center style={styles.description}>
              {character.description}
            </Typography>
            
            {showNewForm && (
              <>
                <View style={styles.attributesContainer}>
                  <Typography variant="subtitle" weight="medium" style={styles.attributesTitle}>
                    New Attributes:
                  </Typography>
                  
                  {Object.entries(character.newAttributes).map(([key, value]) => (
                    <View key={key} style={styles.attributeRow}>
                      <Typography variant="body" style={styles.attributeName}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </Typography>
                      <View style={styles.attributeValueContainer}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.attributeDot,
                              {
                                backgroundColor: i < (value as number) 
                                  ? theme.colors.primary 
                                  : isDarkMode ? '#333333' : '#E0E0E0',
                              }
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
                
                <Button
                  title="View Character"
                  fullWidth
                  onPress={handleViewCharacter}
                  style={styles.button}
                />
              </>
            )}
          </Card>
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
  },
  evolutionTitle: {
    marginBottom: 24,
  },
  stagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stageItem: {
    alignItems: 'center',
  },
  stageIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  activeStage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  stageConnector: {
    width: 60,
    height: 20,
    justifyContent: 'center',
  },
  connector: {
    height: 2,
    width: '100%',
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 32,
  },
  glowContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.5,
  },
  characterImageWrapper: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  newCharacterImage: {
    position: 'absolute',
  },
  card: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 24,
    opacity: 0.7,
  },
  attributesContainer: {
    width: '100%',
    marginBottom: 24,
  },
  attributesTitle: {
    marginBottom: 12,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  attributeName: {
    flex: 1,
  },
  attributeValueContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  attributeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  button: {
    width: '100%',
  },
});

export default ModalCharacterEvolution; 