import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';
import { Card } from '../../components/Card';

export default function PrivacyScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={colors.text}
          onPress={() => navigation.goBack()}
        />
        <Typography variant="h2">Privacy</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Typography variant="h3">Privacy Overview</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            Your privacy is important to us. This page outlines what data we collect,
            how it's used, and the controls you have over your information.
          </Typography>
        </View>
        
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-outline" size={24} color={colors.primary} />
            <Typography variant="h3">Data Collection</Typography>
          </View>
          <Typography variant="body1" style={styles.paragraph}>
            We collect information to provide better services to our users. This includes:
          </Typography>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Profile information you provide
            </Typography>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Usage data to improve app performance
            </Typography>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Location data for local services (when enabled)
            </Typography>
          </View>
        </Card>
        
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
            <Typography variant="h3">How We Use Your Data</Typography>
          </View>
          <Typography variant="body1" style={styles.paragraph}>
            Your data helps us provide and improve the City Pulse services, including:
          </Typography>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Personalizing your experience
            </Typography>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Improving city services based on feedback
            </Typography>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Communicating about events and surveys
            </Typography>
          </View>
        </Card>
        
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="settings-outline" size={24} color={colors.primary} />
            <Typography variant="h3">Your Controls</Typography>
          </View>
          <Typography variant="body1" style={styles.paragraph}>
            You have control over your data. You can:
          </Typography>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Update your profile information at any time
            </Typography>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Manage notification preferences
            </Typography>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Typography variant="body1" style={styles.listItemText}>
              Request a copy of your data or deletion
            </Typography>
          </View>
        </Card>
        
        <View style={styles.contactSection}>
          <Typography variant="h3">Questions or Concerns?</Typography>
          <Typography variant="body1" style={styles.paragraph}>
            If you have any questions about your privacy in City Pulse,
            please contact our privacy team at privacy@citypulse.example.com
          </Typography>
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
  paragraph: {
    marginTop: 8,
    lineHeight: 22,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingLeft: 8,
  },
  listItemText: {
    marginLeft: 8,
    flex: 1,
  },
  contactSection: {
    marginTop: 8,
    marginBottom: 24,
  }
}); 