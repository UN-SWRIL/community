import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { CharacterScreenProps } from '../../types/navigation';

const CharacterHomeScreen: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<CharacterScreenProps<'CharacterHome'>['navigation']>();
  
  // Mock character data
  const character = {
    name: 'Fox Runner',
    level: 5,
    xp: 450,
    xpToNextLevel: 600,
    achievements: 8,
    surveysCompleted: 14,
    lastEvolution: '3 days ago',
  };
  
  const handleEvolutionPress = () => {
    navigation.navigate('CharacterEvolution');
  };
  
  const handleCustomizationPress = () => {
    navigation.navigate('CharacterCustomization');
  };
  
  const handleDetailPress = () => {
    navigation.navigate('CharacterDetail');
  };

  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Typography variant="h2" weight="bold">
          Your City Companion
        </Typography>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.characterCard}>
          <View style={styles.characterInfo}>
            <View style={styles.characterImageContainer}>
              {/* Replace with actual character image */}
              <View style={styles.characterImagePlaceholder}>
                <Ionicons name="logo-octocat" size={80} color={theme.colors.primary} />
              </View>
            </View>
            
            <View style={styles.characterStats}>
              <Typography variant="h3" weight="bold">
                {character.name}
              </Typography>
              
              <View style={styles.levelContainer}>
                <Typography variant="body" weight="medium">
                  Level {character.level}
                </Typography>
                <View style={styles.xpBarContainer}>
                  <View 
                    style={[
                      styles.xpBarFill, 
                      { 
                        width: `${(character.xp / character.xpToNextLevel) * 100}%`,
                        backgroundColor: theme.colors.primary 
                      }
                    ]} 
                  />
                </View>
                <Typography variant="caption">
                  {character.xp}/{character.xpToNextLevel} XP
                </Typography>
              </View>
            </View>
          </View>
          
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Ionicons name="trophy-outline" size={24} color={theme.colors.primary} />
              <Typography variant="h3" weight="bold" style={styles.statValue}>
                {character.achievements}
              </Typography>
              <Typography variant="caption" style={styles.statLabel}>
                Achievements
              </Typography>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="document-text-outline" size={24} color={theme.colors.primary} />
              <Typography variant="h3" weight="bold" style={styles.statValue}>
                {character.surveysCompleted}
              </Typography>
              <Typography variant="caption" style={styles.statLabel}>
                Surveys
              </Typography>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={24} color={theme.colors.primary} />
              <Typography variant="caption" style={styles.statLabel}>
                Last Evolution
              </Typography>
              <Typography variant="caption" weight="medium">
                {character.lastEvolution}
              </Typography>
            </View>
          </View>
        </Card>
        
        <View style={styles.actionCards}>
          <TouchableOpacity
            onPress={handleEvolutionPress}
            activeOpacity={0.8}
            style={styles.actionCardTouch}
          >
            <Card style={styles.actionCard}>
              <Ionicons name="flash-outline" size={32} color={theme.colors.primary} />
              <Typography variant="subtitle" weight="bold" style={styles.actionTitle}>
                Evolution
              </Typography>
              <Typography variant="caption" style={styles.actionDescription}>
                Unlock new abilities and appearances by completing surveys
              </Typography>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleCustomizationPress}
            activeOpacity={0.8}
            style={styles.actionCardTouch}
          >
            <Card style={styles.actionCard}>
              <Ionicons name="color-palette-outline" size={32} color={theme.colors.primary} />
              <Typography variant="subtitle" weight="bold" style={styles.actionTitle}>
                Customization
              </Typography>
              <Typography variant="caption" style={styles.actionDescription}>
                Change your character's appearance and accessories
              </Typography>
            </Card>
          </TouchableOpacity>
        </View>
        
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle-outline" size={24} color={theme.colors.primary} />
            <Typography variant="subtitle" weight="bold" style={styles.infoTitle}>
              How It Works
            </Typography>
          </View>
          
          <Typography variant="body" style={styles.infoText}>
            Your character evolves as you contribute to your city through surveys and reports. 
            Complete more activities to earn XP and unlock new abilities and appearances!
          </Typography>
          
          <Button
            title="Learn More"
            onPress={handleDetailPress}
            variant="outline"
            style={styles.infoButton}
          />
        </Card>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  scrollContent: {
    padding: 16,
  },
  characterCard: {
    padding: 16,
    marginBottom: 16,
  },
  characterInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  characterImageContainer: {
    marginRight: 16,
  },
  characterImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterStats: {
    flex: 1,
    justifyContent: 'center',
  },
  levelContainer: {
    marginTop: 8,
  },
  xpBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    paddingTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    marginVertical: 4,
  },
  statLabel: {
    opacity: 0.6,
    textAlign: 'center',
  },
  actionCards: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionCardTouch: {
    flex: 1,
  },
  actionCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    height: 160,
  },
  actionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  actionDescription: {
    opacity: 0.6,
    textAlign: 'center',
  },
  infoCard: {
    padding: 16,
    marginBottom: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    marginLeft: 8,
  },
  infoText: {
    opacity: 0.8,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoButton: {
    alignSelf: 'flex-start',
  },
});

export default CharacterHomeScreen; 