import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaContainer } from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { CharacterScreenProps } from '../../types/navigation';
import { useUser } from '../../context/UserContext';
import * as SecureStore from 'expo-secure-store';

// Key for storing character customization data
const CHARACTER_CUSTOMIZATION_KEY = 'character_customization';

// Type for our customization data
interface CharacterCustomization {
  primaryColor: string;
  secondaryColor: string;
  costume: string | null;
  accessory: string | null;
}

// Component to render a color option button
const ColorOption = ({ color, selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.colorOptionTouchable}>
    <View 
      style={[
        styles.colorOption, 
        { backgroundColor: color },
        selected && styles.selectedColorOption
      ]} 
    />
  </TouchableOpacity>
);

// Component to render a costume option button
const CostumeOption = ({ name, icon, selected, onPress, locked }) => (
  <TouchableOpacity 
    onPress={locked ? null : onPress} 
    style={[
      styles.costumeOption,
      selected && styles.selectedCostumeOption,
      { opacity: locked ? 0.7 : 1 }
    ]}
    disabled={locked}
  >
    {locked && (
      <View style={styles.lockedOverlay}>
        <Ionicons name="lock-closed" size={20} color="#FFF" />
      </View>
    )}
    <Ionicons name={icon} size={32} color={selected ? '#fff' : '#000'} />
    <Typography 
      variant="caption" 
      weight="medium" 
      color={selected ? '#fff' : '#000'}
      style={styles.costumeLabel}
    >
      {name}
    </Typography>
  </TouchableOpacity>
);

export default function CharacterCustomizationScreen() {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<CharacterScreenProps<'CharacterCustomization'>['navigation']>();
  const { user, updateUser } = useUser();
  
  // State for customization options
  const [primaryColor, setPrimaryColor] = useState('#FD9B28'); // Default orange
  const [secondaryColor, setSecondaryColor] = useState('#FFFFFF'); // Default white
  const [selectedCostume, setSelectedCostume] = useState('none');
  const [selectedAccessory, setSelectedAccessory] = useState('none');
  const [isSaving, setIsSaving] = useState(false);
  
  // Load saved customizations when component mounts
  useEffect(() => {
    const loadCustomizations = async () => {
      try {
        const savedCustomizationsStr = await SecureStore.getItemAsync(CHARACTER_CUSTOMIZATION_KEY);
        
        if (savedCustomizationsStr) {
          const savedCustomizations = JSON.parse(savedCustomizationsStr) as CharacterCustomization;
          
          setPrimaryColor(savedCustomizations.primaryColor);
          setSecondaryColor(savedCustomizations.secondaryColor);
          setSelectedCostume(savedCustomizations.costume || 'none');
          setSelectedAccessory(savedCustomizations.accessory || 'none');
        }
      } catch (error) {
        console.error('Error loading customizations:', error);
      }
    };
    
    loadCustomizations();
  }, []);
  
  // Available customization options
  const colorOptions = [
    { id: 'orange', color: '#FD9B28' },
    { id: 'red', color: '#F44336' },
    { id: 'blue', color: '#2196F3' },
    { id: 'green', color: '#4CAF50' },
    { id: 'purple', color: '#9C27B0' },
    { id: 'cyan', color: '#00BCD4' },
  ];
  
  const secondaryColorOptions = [
    { id: 'white', color: '#FFFFFF' },
    { id: 'cream', color: '#FFFDD0' },
    { id: 'light-blue', color: '#E3F2FD' },
    { id: 'light-green', color: '#E8F5E9' },
    { id: 'light-pink', color: '#FCE4EC' },
    { id: 'light-yellow', color: '#FFFDE7' },
  ];
  
  // Define which items are unlocked (would typically be based on user progress)
  const costumeOptions = [
    { id: 'none', name: 'None', icon: 'close-circle-outline', locked: false },
    { id: 'hero', name: 'Hero', icon: 'flash-outline', locked: false }, // Only one unlocked
    { id: 'worker', name: 'Worker', icon: 'construct-outline', locked: true },
    { id: 'explorer', name: 'Explorer', icon: 'compass-outline', locked: true },
    { id: 'student', name: 'Student', icon: 'school-outline', locked: true },
  ];
  
  const accessoryOptions = [
    { id: 'none', name: 'None', icon: 'close-circle-outline', locked: false },
    { id: 'hat', name: 'Hat', icon: 'umbrella-outline', locked: false }, // Only one unlocked
    { id: 'glasses', name: 'Glasses', icon: 'glasses-outline', locked: true },
    { id: 'scarf', name: 'Scarf', icon: 'ribbon-outline', locked: true },
    { id: 'badge', name: 'Badge', icon: 'shield-outline', locked: true },
  ];
  
  const saveCustomizations = async () => {
    try {
      setIsSaving(true);
      
      // Create customization object
      const customizationData: CharacterCustomization = {
        primaryColor,
        secondaryColor,
        costume: selectedCostume === 'none' ? null : selectedCostume,
        accessory: selectedAccessory === 'none' ? null : selectedAccessory,
      };
      
      // Save to secure storage
      await SecureStore.setItemAsync(
        CHARACTER_CUSTOMIZATION_KEY, 
        JSON.stringify(customizationData)
      );
      
      // Update user data to indicate character was customized
      // This is used to refresh the character on the home screen
      if (user) {
        await updateUser({ 
          lastActive: new Date(),
          // Add a character customization timestamp to trigger UI updates
          characterLastCustomized: new Date()
        });
      }
      
      console.log('Customizations saved:', customizationData);
      
      // Navigate back
      navigation.goBack();
    } catch (error) {
      console.error('Error saving customizations:', error);
    } finally {
      setIsSaving(false);
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
        <Typography variant="h2" weight="bold">Customize</Typography>
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Card style={styles.previewCard}>
          <Typography variant="h3" weight="bold" center>Character Preview</Typography>
          
          <View style={styles.previewContainer}>
            <View style={[styles.characterPreview, { backgroundColor: primaryColor }]}>
              <Ionicons name="paw" size={48} color={secondaryColor} />
            </View>
            
            {selectedCostume && selectedCostume !== 'none' && (
              <View style={styles.costumePreview}>
                <Ionicons 
                  name={costumeOptions.find(c => c.id === selectedCostume)?.icon} 
                  size={24} 
                  color="#fff" 
                />
              </View>
            )}
            
            {selectedAccessory && selectedAccessory !== 'none' && (
              <View style={styles.accessoryPreview}>
                <Ionicons 
                  name={accessoryOptions.find(a => a.id === selectedAccessory)?.icon} 
                  size={24} 
                  color="#fff" 
                />
              </View>
            )}
          </View>
        </Card>
        
        <Typography variant="h3" weight="bold" style={styles.sectionTitle}>Primary Color</Typography>
        <Card style={styles.optionsCard}>
          <View style={styles.colorOptionsContainer}>
            {colorOptions.map(option => (
              <ColorOption 
                key={option.id}
                color={option.color}
                selected={primaryColor === option.color}
                onPress={() => setPrimaryColor(option.color)}
              />
            ))}
          </View>
        </Card>
        
        <Typography variant="h3" weight="bold" style={styles.sectionTitle}>Secondary Color</Typography>
        <Card style={styles.optionsCard}>
          <View style={styles.colorOptionsContainer}>
            {secondaryColorOptions.map(option => (
              <ColorOption 
                key={option.id}
                color={option.color}
                selected={secondaryColor === option.color}
                onPress={() => setSecondaryColor(option.color)}
              />
            ))}
          </View>
        </Card>
        
        <Typography variant="h3" weight="bold" style={styles.sectionTitle}>Costume</Typography>
        <Card style={styles.optionsCard}>
          <View style={styles.costumeOptionsContainer}>
            {costumeOptions.map(option => (
              <CostumeOption 
                key={option.id}
                name={option.name}
                icon={option.icon}
                selected={selectedCostume === option.id}
                onPress={() => setSelectedCostume(option.id)}
                locked={option.locked}
              />
            ))}
          </View>
          <Typography variant="caption" style={styles.unlockHint}>
            Complete surveys to unlock more costumes!
          </Typography>
        </Card>
        
        <Typography variant="h3" weight="bold" style={styles.sectionTitle}>Accessories</Typography>
        <Card style={styles.optionsCard}>
          <View style={styles.costumeOptionsContainer}>
            {accessoryOptions.map(option => (
              <CostumeOption 
                key={option.id}
                name={option.name}
                icon={option.icon}
                selected={selectedAccessory === option.id}
                onPress={() => setSelectedAccessory(option.id)}
                locked={option.locked}
              />
            ))}
          </View>
          <Typography variant="caption" style={styles.unlockHint}>
            Complete surveys to unlock more accessories!
          </Typography>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Save Changes" 
            onPress={saveCustomizations}
            style={styles.saveButton}
            isLoading={isSaving}
          />
          <Button 
            title="Cancel" 
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            disabled={isSaving}
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
  previewCard: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  previewContainer: {
    marginTop: 16,
    position: 'relative',
  },
  characterPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  costumePreview: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#F44336',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessoryPreview: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  optionsCard: {
    padding: 16,
    marginBottom: 8,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -8,
  },
  colorOptionTouchable: {
    margin: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#000',
  },
  costumeOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -4,
  },
  costumeOption: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Lighter background to make items more visible
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    position: 'relative',
  },
  selectedCostumeOption: {
    backgroundColor: '#2196F3',
  },
  costumeLabel: {
    marginTop: 4,
    textAlign: 'center',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  unlockHint: {
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
  saveButton: {
    marginBottom: 12,
  },
  cancelButton: {
    marginBottom: 12,
  },
}); 