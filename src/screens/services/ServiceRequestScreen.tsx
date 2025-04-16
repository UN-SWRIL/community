import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import IconButton from '../../components/common/IconButton';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { ServicesStackParamList } from '../../types/navigation';

type ServiceRequestScreenRouteProp = RouteProp<ServicesStackParamList, 'ServiceRequest'>;

const ServiceRequestScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { user } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<ServicesStackParamList>>();
  const route = useRoute<ServiceRequestScreenRouteProp>();
  const { serviceId, serviceName } = route.params;
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactPreference, setContactPreference] = useState('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    location?: string;
  }>({});

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: {
      title?: string;
      description?: string;
      location?: string;
    } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Request title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Request description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }
    
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // In a real app, this would send data to your API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Mock the request object that would be sent to the API
      const requestData = {
        serviceId,
        userId: user?.id,
        title,
        description,
        location,
        contactPreference,
        status: 'pending',
        submittedAt: new Date(),
      };
      
      console.log('Service request submitted:', requestData);
      
      // Show success message and navigate back
      Alert.alert(
        'Request Submitted',
        'Your service request has been submitted successfully. You will receive updates on its status.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      console.error('Error submitting request:', error);
      Alert.alert(
        'Submission Failed',
        'There was a problem submitting your request. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaContainer style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={isDarkMode ? theme.colors.dark.text : theme.colors.text}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Typography variant="h2" weight="bold" center>
          Request Service
        </Typography>
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.card}>
            <Typography variant="h3" weight="medium">
              {serviceName}
            </Typography>
            
            <Typography variant="body" style={styles.detailText}>
              Please provide the details for your service request
            </Typography>
            
            {/* Form fields */}
            <View style={styles.formGroup}>
              <Typography variant="bodySmall" weight="medium" style={styles.label}>
                Request Title
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.title 
                      ? theme.colors.error 
                      : isDarkMode 
                        ? theme.colors.dark.border 
                        : theme.colors.border,
                    color: isDarkMode ? theme.colors.dark.text : theme.colors.text,
                    backgroundColor: isDarkMode ? theme.colors.dark.cardBackground : theme.colors.cardBackground,
                  }
                ]}
                placeholder="Brief title for your request"
                placeholderTextColor={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  if (errors.title) {
                    setErrors({...errors, title: undefined});
                  }
                }}
              />
              {errors.title && (
                <Typography variant="caption" color={theme.colors.error} style={styles.errorText}>
                  {errors.title}
                </Typography>
              )}
            </View>
            
            <View style={styles.formGroup}>
              <Typography variant="bodySmall" weight="medium" style={styles.label}>
                Description
              </Typography>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    borderColor: errors.description 
                      ? theme.colors.error 
                      : isDarkMode 
                        ? theme.colors.dark.border 
                        : theme.colors.border,
                    color: isDarkMode ? theme.colors.dark.text : theme.colors.text,
                    backgroundColor: isDarkMode ? theme.colors.dark.cardBackground : theme.colors.cardBackground,
                  }
                ]}
                placeholder="Detailed description of your request"
                placeholderTextColor={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (errors.description) {
                    setErrors({...errors, description: undefined});
                  }
                }}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={5}
              />
              {errors.description && (
                <Typography variant="caption" color={theme.colors.error} style={styles.errorText}>
                  {errors.description}
                </Typography>
              )}
            </View>
            
            <View style={styles.formGroup}>
              <Typography variant="bodySmall" weight="medium" style={styles.label}>
                Location
              </Typography>
              <View style={styles.locationInputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.locationInput,
                    {
                      borderColor: errors.location 
                        ? theme.colors.error 
                        : isDarkMode 
                          ? theme.colors.dark.border 
                          : theme.colors.border,
                      color: isDarkMode ? theme.colors.dark.text : theme.colors.text,
                      backgroundColor: isDarkMode ? theme.colors.dark.cardBackground : theme.colors.cardBackground,
                    }
                  ]}
                  placeholder="Address or location details"
                  placeholderTextColor={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary}
                  value={location}
                  onChangeText={(text) => {
                    setLocation(text);
                    if (errors.location) {
                      setErrors({...errors, location: undefined});
                    }
                  }}
                />
                <IconButton
                  icon="my-location"
                  size={24}
                  color={theme.colors.primary}
                  onPress={() => {
                    // In a real app, this would use geolocation
                    setLocation('Current Location');
                  }}
                  style={styles.locationButton}
                />
              </View>
              {errors.location && (
                <Typography variant="caption" color={theme.colors.error} style={styles.errorText}>
                  {errors.location}
                </Typography>
              )}
            </View>
            
            <View style={styles.formGroup}>
              <Typography variant="bodySmall" weight="medium" style={styles.label}>
                Preferred Contact Method
              </Typography>
              <View style={styles.contactOptions}>
                <Button
                  title="Email"
                  icon="email"
                  variant={contactPreference === 'email' ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => setContactPreference('email')}
                  style={styles.contactButton}
                />
                <Button
                  title="Phone"
                  icon="phone"
                  variant={contactPreference === 'phone' ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => setContactPreference('phone')}
                  style={styles.contactButton}
                />
                <Button
                  title="SMS"
                  icon="sms"
                  variant={contactPreference === 'sms' ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => setContactPreference('sms')}
                  style={styles.contactButton}
                />
              </View>
            </View>
          </Card>
          
          <Typography variant="caption" style={styles.disclaimer} center>
            By submitting this request, you authorize the city to contact you regarding this service. Your information will be handled in accordance with our privacy policy.
          </Typography>
          
          <Button
            title="Submit Request"
            fullWidth
            onPress={handleSubmit}
            isLoading={isSubmitting}
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
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
  },
  backButtonPlaceholder: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 24,
  },
  detailText: {
    marginTop: 8,
    marginBottom: 24,
    opacity: 0.8,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInput: {
    flex: 1,
  },
  locationButton: {
    marginLeft: 8,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  errorText: {
    marginTop: 4,
  },
  disclaimer: {
    marginBottom: 24,
    opacity: 0.7,
  },
  submitButton: {
    marginBottom: 16,
  },
});

export default ServiceRequestScreen; 