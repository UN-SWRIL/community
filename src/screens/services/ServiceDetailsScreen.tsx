import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { useTheme } from '../../hooks/useTheme';
import { ServicesStackParamList } from '../../types/navigation';
import { Button } from '../../components/Button';

type ServiceDetailsRouteProp = RouteProp<ServicesStackParamList, 'ServiceDetails'>;

// Define actions that can be performed on this service
const serviceActions = [
  { id: 'pay', title: 'Pay Bill', icon: 'payment' },
  { id: 'request', title: 'Request Service', icon: 'engineering' },
  { id: 'report', title: 'Report Issue', icon: 'report-problem' },
  { id: 'schedule', title: 'Schedule', icon: 'event' },
];

export const ServiceDetailsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ServicesStackParamList>>();
  const route = useRoute<ServiceDetailsRouteProp>();
  const { serviceId, serviceName } = route.params;
  const service = route.params.service;
  
  // Handle action press
  const handleActionPress = (actionId: string) => {
    console.log(`Action pressed: ${actionId} for service: ${serviceId}`);
    // Navigate to specific action screens based on actionId
    if (actionId === 'request') {
      navigation.navigate('ServiceRequest', {
        serviceId,
        serviceName
      });
    }
  };

  return (
    <SafeAreaContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Service Image Banner */}
        <View style={[styles.imageContainer, { backgroundColor: theme.colors.primaryLight }]}>
          <View style={styles.imagePlaceholder}>
            <MaterialIcons 
              name="business" 
              size={60} 
              color={theme.colors.primary} 
            />
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.contentContainer}>
          <Typography variant="h1" style={{ color: theme.colors.text }}>
            {serviceName}
          </Typography>
          
          <Typography 
            variant="body1" 
            style={{ color: theme.colors.textSecondary, marginTop: 8 }}
          >
            {service?.description || "Manage and access city services efficiently through our digital platform."}
          </Typography>

          {/* Available Actions */}
          <View style={styles.sectionContainer}>
            <Typography variant="h2" style={{ color: theme.colors.text, marginBottom: 16 }}>
              Available Actions
            </Typography>
            
            <View style={styles.actionsContainer}>
              {serviceActions.map((action) => (
                <TouchableOpacity 
                  key={action.id}
                  style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground }]}
                  onPress={() => handleActionPress(action.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.actionIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                    <MaterialIcons name={action.icon as any} size={24} color={theme.colors.primary} />
                  </View>
                  <Typography variant="body1" style={{ color: theme.colors.text, marginTop: 8, textAlign: 'center' }}>
                    {action.title}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Service Information */}
          <View style={styles.sectionContainer}>
            <Typography variant="h2" style={{ color: theme.colors.text, marginBottom: 16 }}>
              Service Information
            </Typography>
            
            <Card style={{ padding: 16 }}>
              <View style={styles.infoRow}>
                <MaterialIcons name="phone" size={20} color={theme.colors.textSecondary} />
                <Typography variant="body1" style={{ color: theme.colors.text, marginLeft: 12 }}>
                  (555) 123-4567
                </Typography>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="email" size={20} color={theme.colors.textSecondary} />
                <Typography variant="body1" style={{ color: theme.colors.text, marginLeft: 12 }}>
                  support@citypulse.example
                </Typography>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="schedule" size={20} color={theme.colors.textSecondary} />
                <Typography variant="body1" style={{ color: theme.colors.text, marginLeft: 12 }}>
                  Mon-Fri: 9:00 AM - 5:00 PM
                </Typography>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="location-on" size={20} color={theme.colors.textSecondary} />
                <Typography 
                  variant="body1" 
                  style={{ color: theme.colors.text, marginLeft: 12, flex: 1 }}
                >
                  123 Main Street, City Center
                </Typography>
              </View>
            </Card>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <Button 
              title="Request Service" 
              onPress={() => navigation.navigate('ServiceRequest', { serviceId, serviceName })} 
              variant="primary"
              fullWidth
              style={styles.actionButton}
            />
            <Button 
              title="View All Requests" 
              onPress={() => navigation.navigate('ServiceRequests')} 
              variant="outline"
              fullWidth
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginTop: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonsContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
}); 