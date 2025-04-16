import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { Card } from '../../components/Card';
import { useUser } from '../../context/UserContext';
import * as SecureStore from 'expo-secure-store';

// Define the key for profile image storage
const PROFILE_IMAGE_KEY = 'profile_image_uri';

export default function ProfileHomeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Load profile image if available
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const imageUri = await SecureStore.getItemAsync(PROFILE_IMAGE_KEY);
        if (imageUri) {
          setProfileImage(imageUri);
        }
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    };
    
    loadProfileImage();
  }, []);
  
  // Calculate membership duration
  const getMemberSince = () => {
    if (!user?.createdAt) return 'New City Resident';
    
    const createdAtDate = new Date(user.createdAt);
    const currentYear = new Date().getFullYear();
    const createdYear = createdAtDate.getFullYear();
    
    return `City Resident since ${createdYear}`;
  };

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <Typography variant="h1">Profile</Typography>
      </View>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Ionicons name="person" size={60} color={colors.primary} />
              )}
            </View>
          </View>
          <Typography variant="h2" style={styles.userName}>
            {user?.username || 'City Resident'}
          </Typography>
          <Typography variant="body1">
            {user?.phone ? `${user.phone} • ` : ''}{getMemberSince()}
          </Typography>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile' as never)}
          >
            <Typography variant="button" style={{ color: colors.primary }}>Edit Profile</Typography>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsSection}>
          <Card 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Settings' as never)}
          >
            <View style={styles.optionContent}>
              <Ionicons name="settings-outline" size={24} color={colors.primary} />
              <Typography variant="h3" style={styles.optionText}>Settings</Typography>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.text} />
          </Card>
          
          <Card 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Privacy' as never)}
          >
            <View style={styles.optionContent}>
              <Ionicons name="shield-outline" size={24} color={colors.primary} />
              <Typography variant="h3" style={styles.optionText}>Privacy</Typography>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.text} />
          </Card>
          
          <Card 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Achievements' as never)}
          >
            <View style={styles.optionContent}>
              <Ionicons name="trophy-outline" size={24} color={colors.primary} />
              <Typography variant="h3" style={styles.optionText}>Achievements</Typography>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.text} />
          </Card>
          
          <Card 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Help' as never)}
          >
            <View style={styles.optionContent}>
              <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
              <Typography variant="h3" style={styles.optionText}>Help & Support</Typography>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.text} />
          </Card>
          
          <Card 
            style={[styles.optionCard, styles.logoutCard]}
            onPress={() => {
              // In a real app, you would implement a logout confirmation dialog here
              // And then call the logout function from useUser()
              navigation.navigate('Auth' as never);
            }}
          >
            <View style={styles.optionContent}>
              <Ionicons name="log-out-outline" size={24} color="#F44336" />
              <Typography variant="h3" style={[styles.optionText, { color: '#F44336' }]}>Logout</Typography>
            </View>
          </Card>
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
    padding: 16,
    paddingBottom: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    marginBottom: 4,
  },
  editButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  optionsSection: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
  },
  logoutCard: {
    marginTop: 12,
    justifyContent: 'center',
  }
}); 