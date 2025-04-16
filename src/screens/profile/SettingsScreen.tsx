import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';
import { Card } from '../../components/Card';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();
  
  // Setting states
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);
  const [dataSharing, setDataSharing] = useState(true);
  
  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toggleTheme();
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
        <Typography variant="h2">Settings</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Notifications</Typography>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                <Typography variant="body1">Push Notifications</Typography>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={'#f4f3f4'}
              />
            </View>
          </Card>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="mail-outline" size={24} color={colors.primary} />
                <Typography variant="body1">Email Notifications</Typography>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={'#f4f3f4'}
              />
            </View>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>App Preferences</Typography>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="location-outline" size={24} color={colors.primary} />
                <Typography variant="body1">Location Services</Typography>
              </View>
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={'#f4f3f4'}
              />
            </View>
          </Card>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="moon-outline" size={24} color={colors.primary} />
                <Typography variant="body1">Dark Mode</Typography>
              </View>
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={'#f4f3f4'}
              />
            </View>
          </Card>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="share-social-outline" size={24} color={colors.primary} />
                <Typography variant="body1">Data Sharing</Typography>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={'#f4f3f4'}
              />
            </View>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>About</Typography>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
                <Typography variant="body1">App Version</Typography>
              </View>
              <Typography variant="body2">1.0.0</Typography>
            </View>
          </Card>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="document-text-outline" size={24} color={colors.primary} />
                <Typography variant="body1">Terms of Service</Typography>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.text} />
            </View>
          </Card>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
                <Typography variant="body1">Privacy Policy</Typography>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.text} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    marginLeft: 4,
  },
  settingCard: {
    marginBottom: 8,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  }
}); 