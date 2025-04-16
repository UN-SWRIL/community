import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaContainer } from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { CharacterScreenProps } from '../../types/navigation';

export default function CharacterEvolutionScreen() {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<CharacterScreenProps<'CharacterEvolution'>['navigation']>();
  const [activeStage, setActiveStage] = useState(2); // 0-based index (Teen = stage 2)
  
  // Character evolution stages
  const evolutionStages = [
    { 
      id: 'baby',
      name: 'Baby Fox',
      level: '1',
      description: 'Just starting your journey in the city.',
      abilities: ['Basic surveys', 'Simple feedback'],
      requiredXP: 0,
      icon: 'paw-outline',
    },
    { 
      id: 'child',
      name: 'Child Fox',
      level: '2-4',
      description: 'Growing and learning about the urban environment.',
      abilities: ['Location-based surveys', 'Community reports', 'Unlocks achievements'],
      requiredXP: 200,
      icon: 'paw',
    },
    { 
      id: 'teen',
      name: 'Teen Fox',
      level: '5-9',
      description: 'More aware of urban dynamics and community needs.',
      abilities: ['Advanced surveys', 'Insight generation', 'Direct feedback to city services'],
      requiredXP: 450,
      icon: 'footsteps-outline',
    },
    { 
      id: 'adult',
      name: 'Adult Fox',
      level: '10+',
      description: 'A fully evolved urban companion with deep city knowledge.',
      abilities: ['Expert analysis', 'Community leadership', 'Policy suggestions', 'Special visual effects'],
      requiredXP: 1000,
      icon: 'sparkles-outline',
    },
  ];

  // Animation values for the evolution glow effect
  const glowAnimation = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    // Create a looping animation for the glow effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glow = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Button 
          variant="text" 
          leftIcon="arrow-back" 
          title="Back" 
          onPress={() => navigation.goBack()} 
          style={styles.backButton} 
        />
        <Typography variant="h2" weight="bold">Evolution Path</Typography>
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <View style={styles.evolutionPath}>
        {evolutionStages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <TouchableOpacity
              onPress={() => setActiveStage(index)}
              style={styles.evolutionStepContainer}
            >
              <View 
                style={[
                  styles.evolutionStep, 
                  { 
                    backgroundColor: index <= activeStage 
                      ? theme.colors.primary 
                      : 'rgba(0, 0, 0, 0.1)' 
                  }
                ]}
              >
                {index < activeStage ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <Typography variant="caption" weight="bold" color="#fff">
                    {evolutionStages[index].level.split('-')[0]}
                  </Typography>
                )}
              </View>
              <Typography 
                variant="caption" 
                weight={index === activeStage ? "bold" : "regular"}
              >
                {stage.name.split(' ')[0]}
              </Typography>
            </TouchableOpacity>
            
            {index < evolutionStages.length - 1 && (
              <View 
                style={[
                  styles.connector, 
                  { 
                    backgroundColor: index < activeStage 
                      ? theme.colors.primary 
                      : 'rgba(0, 0, 0, 0.1)' 
                  }
                ]} 
              />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <Card style={styles.stageCard}>
          <View style={styles.stageCardHeader}>
            <Animated.View 
              style={[
                styles.iconContainer,
                { 
                  transform: [{ scale: activeStage === evolutionStages.length - 1 ? glow : 1 }],
                  backgroundColor: `${theme.colors.primary}20`,
                }
              ]}
            >
              <Ionicons 
                name={evolutionStages[activeStage].icon as any} 
                size={60} 
                color={theme.colors.primary} 
              />
            </Animated.View>
            
            <View style={styles.stageInfo}>
              <Typography variant="h2" weight="bold" style={styles.stageName}>
                {evolutionStages[activeStage].name}
              </Typography>
              <Typography variant="subtitle" style={styles.levelRange}>
                Level {evolutionStages[activeStage].level}
              </Typography>
              <Typography variant="body" style={styles.xpRequirement}>
                Required XP: {evolutionStages[activeStage].requiredXP}
              </Typography>
            </View>
          </View>
          
          <Typography variant="body" style={styles.stageDescription}>
            {evolutionStages[activeStage].description}
          </Typography>
          
          <Typography variant="h3" weight="bold" style={styles.abilitiesTitle}>
            Abilities
          </Typography>
          
          <View style={styles.abilitiesList}>
            {evolutionStages[activeStage].abilities.map((ability, index) => (
              <View key={index} style={styles.abilityItem}>
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                <Typography variant="body" style={styles.abilityText}>{ability}</Typography>
              </View>
            ))}
          </View>
        </Card>
        
        <Typography variant="h3" weight="bold" style={styles.sectionTitle}>
          Evolution Tips
        </Typography>
        
        <Card style={styles.tipsCard}>
          <View style={styles.tipItem}>
            <Ionicons name="document-text" size={24} color={theme.colors.primary} style={styles.tipIcon} />
            <View style={styles.tipContent}>
              <Typography variant="subtitle" weight="bold">Complete more surveys</Typography>
              <Typography variant="body">Participate in city surveys to gain XP and help your character evolve.</Typography>
            </View>
          </View>
          
          <View style={styles.tipItem}>
            <Ionicons name="star" size={24} color={theme.colors.primary} style={styles.tipIcon} />
            <View style={styles.tipContent}>
              <Typography variant="subtitle" weight="bold">Earn achievements</Typography>
              <Typography variant="body">Achievements provide significant XP bonuses that help your character evolve faster.</Typography>
            </View>
          </View>
          
          <View style={styles.tipItem}>
            <Ionicons name="location" size={24} color={theme.colors.primary} style={styles.tipIcon} />
            <View style={styles.tipContent}>
              <Typography variant="subtitle" weight="bold">Explore your city</Typography>
              <Typography variant="body">Visit different areas to unlock location-based surveys and special achievements.</Typography>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    alignItems: 'flex-start',
  },
  backButtonPlaceholder: {
    width: 70,
  },
  evolutionPath: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  evolutionStepContainer: {
    alignItems: 'center',
  },
  evolutionStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  connector: {
    width: 30,
    height: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stageCard: {
    padding: 16,
    marginBottom: 24,
  },
  stageCardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  stageName: {
    marginBottom: 4,
  },
  levelRange: {
    marginBottom: 4,
    opacity: 0.7,
  },
  xpRequirement: {
    opacity: 0.7,
  },
  stageDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  abilitiesTitle: {
    marginBottom: 12,
  },
  abilitiesList: {
    marginBottom: 8,
  },
  abilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityText: {
    marginLeft: 12,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  tipsCard: {
    padding: 16,
    marginBottom: 32,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tipIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  tipContent: {
    flex: 1,
  },
}); 