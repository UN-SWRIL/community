import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Platform
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
import { CharacterType } from '../../types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = 16;

interface CharacterOption {
  id: string;
  name: string;
  type: CharacterType;
  description: string;
  imageSource: React.ReactNode | any;
}

const characterOptions: CharacterOption[] = [
  {
    id: '1',
    name: 'Urban Fox',
    type: 'Animal',
    description: 'Clever and adaptable, your fox will evolve as you help your city grow smarter.',
    imageSource: <Ionicons name="paw" size={80} color="#f57c00" />,
  },
  {
    id: '2',
    name: 'CityBot',
    type: 'Robot',
    description: 'A technological marvel that upgrades with every insight you provide.',
    imageSource: <Ionicons name="hardware-chip" size={80} color="#0288d1" />,
  },
  {
    id: '3',
    name: 'Urban Sprout',
    type: 'Plant',
    description: 'Watch your plant grow and flourish as you contribute to sustainable city growth.',
    imageSource: <Ionicons name="leaf" size={80} color="#43a047" />,
  },
  {
    id: '4',
    name: 'City Spirit',
    type: 'Fantasy',
    description: 'A magical being that transforms as your community insights build a better city.',
    imageSource: <Ionicons name="planet" size={80} color="#9c27b0" />,
  },
];

const OnboardingCharacterScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<AuthScreenProps<'OnboardingCharacter'>['navigation']>();
  const { completeOnboarding } = useUser();
  
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectCharacter = (character: CharacterOption) => {
    setSelectedCharacter(character);
  };

  const handleComplete = async () => {
    if (!selectedCharacter) return;

    try {
      setIsLoading(true);
      
      // TODO: Save selected character to backend when implemented
      console.log('Selected character:', selectedCharacter);
      
      // Mark onboarding as complete
      await completeOnboarding();
      
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
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
                { width: '100%', backgroundColor: theme.colors.primary }
              ]} 
            />
          </View>
          <Typography variant="caption" style={styles.progressText}>
            Step 3 of 3
          </Typography>
        </View>
        
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Typography variant="h1" weight="bold" style={styles.title}>
            Choose Your Character
          </Typography>
          
          <Typography variant="body" style={styles.subtitle}>
            Your character will evolve as you contribute quality-of-life data to your city
          </Typography>
          
          <FlatList
            data={characterOptions}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.characterList}
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            decelerationRate="fast"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                isSelected={selectedCharacter?.id === item.id}
                onSelect={handleSelectCharacter}
              />
            )}
          />
          
          <Button
            title="Get Started"
            fullWidth
            onPress={handleComplete}
            isLoading={isLoading}
            disabled={isLoading || !selectedCharacter}
            style={styles.completeButton}
          />
          
          <Typography variant="caption" center style={styles.footerText}>
            You can unlock more characters as you level up!
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

interface CharacterCardProps {
  character: CharacterOption;
  isSelected: boolean;
  onSelect: (character: CharacterOption) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSelected, onSelect }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onSelect(character)}
      style={[
        styles.characterCard,
        {
          borderColor: isSelected ? theme.colors.primary : 'transparent',
          backgroundColor: isDarkMode ? theme.colors.dark.card : theme.colors.card,
        },
      ]}
    >
      <View style={styles.characterImageContainer}>
        {typeof character.imageSource === 'object' 
          ? character.imageSource 
          : <Image
              source={character.imageSource}
              style={styles.characterImage}
              resizeMode="contain"
            />
        }
      </View>
      
      <View style={styles.characterInfo}>
        <Typography variant="h3" weight="bold" center>
          {character.name}
        </Typography>
        
        <View style={[styles.characterType, { backgroundColor: theme.colors.primaryLight }]}>
          <Typography variant="caption" color={theme.colors.primaryDark} weight="medium">
            {character.type}
          </Typography>
        </View>
        
        <Typography variant="bodySmall" center style={styles.characterDescription}>
          {character.description}
        </Typography>
      </View>
      
      {isSelected && (
        <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
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
  characterList: {
    paddingLeft: (width - CARD_WIDTH) / 2 - 24,
    paddingRight: (width - CARD_WIDTH) / 2 - 24 + CARD_SPACING,
    marginBottom: 32,
  },
  characterCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: 16,
    marginRight: CARD_SPACING,
    borderWidth: 3,
    padding: 16,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  characterImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    width: CARD_WIDTH * 0.7,
    height: CARD_WIDTH * 0.7,
  },
  characterInfo: {
    alignItems: 'center',
  },
  characterType: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  characterDescription: {
    opacity: 0.7,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButton: {
    marginBottom: 16,
  },
  footerText: {
    opacity: 0.5,
  },
});

export default OnboardingCharacterScreen; 