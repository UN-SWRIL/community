import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CharacterScreenProps } from '../../types/navigation';
import { SafeAreaContainer } from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function CharacterDetailScreen() {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<CharacterScreenProps<'CharacterDetail'>['navigation']>();

  const characterDetails = {
    name: 'Fox Runner',
    level: 5,
    evolution: 'Teen',
    achievements: [
      { id: '1', title: 'City Explorer', description: 'Explore 5 different areas of the city', icon: 'map-outline' },
      { id: '2', title: 'Survey Master', description: 'Complete 10 surveys', icon: 'document-text-outline' },
      { id: '3', title: 'Community Voice', description: 'Submit 20 feedback reports', icon: 'megaphone-outline' },
    ],
    stats: {
      xp: 450,
      xpToNextLevel: 600,
      surveys: 12,
      reports: 8,
      achievements: 3,
    }
  };

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
        <Typography variant="h2" weight="bold">Character Details</Typography>
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.characterCard}>
          <View style={styles.characterCardHeader}>
            <View style={styles.characterIconContainer}>
              <Ionicons name="paw" size={60} color={theme.colors.primary} />
            </View>
            <View style={styles.characterInfo}>
              <Typography variant="h2" weight="bold">{characterDetails.name}</Typography>
              <Typography variant="subtitle" style={styles.evolution}>
                {characterDetails.evolution} (Level {characterDetails.level})
              </Typography>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${(characterDetails.stats.xp / characterDetails.stats.xpToNextLevel) * 100}%`,
                        backgroundColor: theme.colors.primary,
                      }
                    ]} 
                  />
                </View>
                <Typography variant="caption">
                  {characterDetails.stats.xp}/{characterDetails.stats.xpToNextLevel} XP
                </Typography>
              </View>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="document-text-outline" size={24} color={theme.colors.primary} />
              <Typography variant="h3" weight="bold" style={styles.statValue}>{characterDetails.stats.surveys}</Typography>
              <Typography variant="caption">Surveys</Typography>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trophy-outline" size={24} color={theme.colors.primary} />
              <Typography variant="h3" weight="bold" style={styles.statValue}>{characterDetails.stats.achievements}</Typography>
              <Typography variant="caption">Achievements</Typography>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble-outline" size={24} color={theme.colors.primary} />
              <Typography variant="h3" weight="bold" style={styles.statValue}>{characterDetails.stats.reports}</Typography>
              <Typography variant="caption">Reports</Typography>
            </View>
          </View>
        </Card>
        
        <Typography variant="h3" weight="bold" style={styles.sectionTitle}>Achievements</Typography>
        
        {characterDetails.achievements.map(achievement => (
          <Card key={achievement.id} style={styles.achievementCard}>
            <View style={styles.achievementCardContent}>
              <View style={styles.achievementIconContainer}>
                <Ionicons name={achievement.icon as any} size={28} color={theme.colors.primary} />
              </View>
              <View style={styles.achievementInfo}>
                <Typography variant="h4" weight="bold">{achievement.title}</Typography>
                <Typography variant="body">{achievement.description}</Typography>
              </View>
            </View>
          </Card>
        ))}
        
        <Typography variant="h3" weight="bold" style={styles.sectionTitle}>Character Evolution</Typography>
        
        <Card style={styles.evolutionCard}>
          <View style={styles.evolutionSteps}>
            <View style={styles.evolutionStep}>
              <View style={[styles.evolutionCircle, { backgroundColor: theme.colors.primary }]}>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </View>
              <Typography variant="caption" weight="bold">Baby</Typography>
            </View>
            <View style={[styles.evolutionConnector, { backgroundColor: theme.colors.primary }]} />
            <View style={styles.evolutionStep}>
              <View style={[styles.evolutionCircle, { backgroundColor: theme.colors.primary }]}>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </View>
              <Typography variant="caption" weight="bold">Child</Typography>
            </View>
            <View style={[styles.evolutionConnector, { backgroundColor: theme.colors.primary }]} />
            <View style={styles.evolutionStep}>
              <View style={[styles.evolutionCircle, { backgroundColor: theme.colors.primary }]}>
                <Typography variant="caption" weight="bold" color="#fff">5</Typography>
              </View>
              <Typography variant="caption" weight="bold">Teen</Typography>
            </View>
            <View style={[styles.evolutionConnector, { backgroundColor: 'rgba(0, 0, 0, 0.1)' }]} />
            <View style={styles.evolutionStep}>
              <View style={[styles.evolutionCircle, { backgroundColor: 'rgba(0, 0, 0, 0.1)' }]}>
                <Typography variant="caption" weight="bold" color="#fff">10</Typography>
              </View>
              <Typography variant="caption">Adult</Typography>
            </View>
          </View>
          
          <Typography variant="body" style={styles.evolutionDescription}>
            Continue completing surveys and contributing to your city to evolve your character!
          </Typography>
          
          <Button 
            title="View Evolution Details" 
            variant="outline"
            onPress={() => navigation.navigate('CharacterEvolution')}
            style={styles.evolutionButton}
          />
        </Card>
        
        <View style={styles.actionsContainer}>
          <Button 
            title="Customize Character" 
            leftIcon="color-palette-outline"
            onPress={() => navigation.navigate('CharacterCustomization')}
            style={styles.customizeButton}
          />
        </View>
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  characterCard: {
    padding: 16,
    marginBottom: 24,
  },
  characterCardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  characterIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  characterInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  evolution: {
    marginTop: 4,
    opacity: 0.7,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
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
  sectionTitle: {
    marginTop: 8,
    marginBottom: 16,
  },
  achievementCard: {
    marginBottom: 12,
  },
  achievementCardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  achievementIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  evolutionCard: {
    padding: 16,
    marginBottom: 24,
  },
  evolutionSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  evolutionStep: {
    alignItems: 'center',
  },
  evolutionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  evolutionConnector: {
    height: 2,
    width: 40,
  },
  evolutionDescription: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 16,
  },
  evolutionButton: {
    alignSelf: 'center',
  },
  actionsContainer: {
    marginTop: 8,
    marginBottom: 40,
  },
  customizeButton: {
    marginBottom: 12,
  },
}); 