import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';
import { Card } from '../../components/Card';
import { useUser } from '../../context/UserContext';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { user, updateUser } = useUser();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setName(user.username || '');
      setPhone(user.phone || '');
      // Email and address left empty by default, with placeholders shown instead
    }
  }, [user]);
  
  const textInputStyle = {
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    color: colors.text,
  };
  
  // Function to handle changing profile photo
  const handleChangePhoto = async () => {
    try {
      // Request permission to access the photo library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to your photo library to change your profile picture.');
        return;
      }
      
      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select an image. Please try again.');
    }
  };
  
  // Function to handle save button press
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Validate inputs if needed
      if (!name.trim()) {
        Alert.alert('Error', 'Name cannot be empty');
        return;
      }
      
      // In a real app, we would upload the profile image here
      // and get back a URL to store in the user object
      
      // Update user data
      await updateUser({
        username: name,
        email: email || undefined,
        // Phone number is typically not changed after verification
        // We'd need a re-verification flow to change phone
        // For now, we'll just keep it as is
      });
      
      // Show success message
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={colors.text}
          onPress={() => navigation.goBack()}
        />
        <Typography variant="h2">Edit Profile</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person" size={60} color={colors.primary} />
            )}
          </View>
          <TouchableOpacity 
            style={styles.changePhotoButton}
            onPress={handleChangePhoto}
          >
            <Typography variant="button" style={{ color: colors.primary }}>
              Change Photo
            </Typography>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Typography variant="body2" style={styles.inputLabel}>Full Name</Typography>
            <TextInput
              style={[styles.textInput, textInputStyle]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Typography variant="body2" style={styles.inputLabel}>Email</Typography>
            <TextInput
              style={[styles.textInput, textInputStyle]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email (e.g., johndoe@example.com)"
              keyboardType="email-address"
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Typography variant="body2" style={styles.inputLabel}>Phone Number</Typography>
            <TextInput
              style={[styles.textInput, textInputStyle, { opacity: 0.7 }]}
              value={phone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
              editable={false} // Phone can't be edited after verification
            />
            <Typography variant="caption" style={styles.helperText}>
              Phone number cannot be changed after verification
            </Typography>
          </View>
          
          <View style={styles.inputContainer}>
            <Typography variant="body2" style={styles.inputLabel}>Address</Typography>
            <TextInput
              style={[styles.textInput, textInputStyle]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address (e.g., 123 Main St, City)"
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
            />
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button, 
              styles.saveButton, 
              { backgroundColor: colors.primary },
              isLoading && { opacity: 0.7 }
            ]}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Typography variant="button" style={{ color: '#fff' }}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          >
            <Typography variant="button" style={{ color: colors.text }}>
              Cancel
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  changePhotoButton: {
    paddingVertical: 8,
  },
  formSection: {
    gap: 16,
    marginBottom: 24,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    marginLeft: 4,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  helperText: {
    marginLeft: 4,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    marginBottom: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  }
}); 