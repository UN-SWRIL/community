import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { IconButton } from '../../components/IconButton';
import { useTheme } from '../../hooks/useTheme';
import { ServicesStackParamList } from '../../types/navigation';

type ServiceListScreenRouteProp = RouteProp<ServicesStackParamList, 'ServiceList'>;

type Service = {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  category: string;
};

// Mock data for services
const allServices: Record<string, Service[]> = {
  utilities: [
    { id: 'water', name: 'Water Bills', description: 'Pay or review your water utility bills', icon: 'water-drop', category: 'Utilities' },
    { id: 'electricity', name: 'Electricity', description: 'Pay or report issues with electricity service', icon: 'bolt', category: 'Utilities' },
    { id: 'gas', name: 'Natural Gas', description: 'Manage gas utility service and payments', icon: 'local-fire-department', category: 'Utilities' },
    { id: 'internet', name: 'Internet Services', description: 'City-provided internet services and support', icon: 'wifi', category: 'Utilities' },
  ],
  waste: [
    { id: 'garbage', name: 'Garbage Collection', description: 'Schedule and manage garbage pickup', icon: 'delete', category: 'Waste Management' },
    { id: 'recycling', name: 'Recycling Program', description: 'Information about recycling guidelines and collection', icon: 'recycling', category: 'Waste Management' },
    { id: 'bulky', name: 'Bulky Item Pickup', description: 'Schedule special pickup for large items', icon: 'chair', category: 'Waste Management' },
    { id: 'hazardous', name: 'Hazardous Waste', description: 'Safe disposal of hazardous materials', icon: 'warning', category: 'Waste Management' },
  ],
  permits: [
    { id: 'business', name: 'Business License', description: 'Apply for or renew a business license', icon: 'store', category: 'Permits & Licenses' },
    { id: 'building', name: 'Building Permits', description: 'Permits for construction and renovation', icon: 'construction', category: 'Permits & Licenses' },
    { id: 'events', name: 'Event Permits', description: 'Apply for permits to host public events', icon: 'event', category: 'Permits & Licenses' },
    { id: 'parking', name: 'Parking Permits', description: 'Residential and special parking permits', icon: 'local-parking', category: 'Permits & Licenses' },
  ],
  transportation: [
    { id: 'bus', name: 'Bus Schedule', description: 'City bus routes and schedule information', icon: 'directions-bus', category: 'Transportation' },
    { id: 'roads', name: 'Road Maintenance', description: 'Report potholes or road issues', icon: 'commute', category: 'Transportation' },
    { id: 'bikeshare', name: 'Bike Share Program', description: 'City bike sharing locations and pricing', icon: 'pedal-bike', category: 'Transportation' },
    { id: 'traffic', name: 'Traffic Updates', description: 'Real-time traffic information and road closures', icon: 'traffic', category: 'Transportation' },
  ],
  health: [
    { id: 'clinics', name: 'Public Health Clinics', description: 'Locations and services of city health clinics', icon: 'local-hospital', category: 'Health & Safety' },
    { id: 'safety', name: 'Safety Inspections', description: 'Schedule safety inspections for properties', icon: 'health-and-safety', category: 'Health & Safety' },
    { id: 'emergency', name: 'Emergency Services', description: 'Non-urgent communication with emergency services', icon: 'emergency', category: 'Health & Safety' },
    { id: 'vaccination', name: 'Vaccination Programs', description: 'Information on city vaccination programs', icon: 'vaccines', category: 'Health & Safety' },
  ],
};

export const ServiceListScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ServicesStackParamList>>();
  const route = useRoute<ServiceListScreenRouteProp>();
  const { categoryId, categoryName, highlightServiceId } = route.params;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  
  useEffect(() => {
    // Get services for this category from our mock data
    setServices(allServices[categoryId] || []);
    
    // Set the screen title
    navigation.setOptions({
      headerTitle: categoryName || 'Services',
      headerShown: true,
      headerLeft: () => (
        <IconButton
          icon="arrow-back"
          onPress={() => navigation.goBack()}
          color={theme.colors.text}
        />
      ),
    });
  }, [categoryId, categoryName, navigation, theme]);
  
  // Filter services based on search query
  const filteredServices = searchQuery.trim() === '' 
    ? services 
    : services.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleServicePress = (service: Service) => {
    navigation.navigate('ServiceDetails', { 
      serviceId: service.id,
      serviceName: service.name,
      service: service
    });
  };

  const renderService = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={[styles.serviceCard, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => handleServicePress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
        <MaterialIcons name={item.icon} size={28} color={theme.colors.primary} />
      </View>
      <Typography variant="h3" style={{ color: theme.colors.text, marginTop: 12 }}>
        {item.name}
      </Typography>
      <Typography 
        variant="body2" 
        style={{ color: theme.colors.textSecondary, marginTop: 4, textAlign: 'center' }}
        numberOfLines={2}
      >
        {item.description}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        {/* Search bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.inputBackground }]}>
          <MaterialIcons name="search" size={24} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search services..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        {filteredServices.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={64} color={theme.colors.textSecondary} />
            <Typography 
              variant="h3" 
              style={{ color: theme.colors.text, marginTop: 16, textAlign: 'center' }}
            >
              No services found
            </Typography>
            <Typography 
              variant="body1" 
              style={{ color: theme.colors.textSecondary, marginTop: 8, textAlign: 'center' }}
            >
              Try a different search term or category
            </Typography>
          </View>
        ) : (
          <FlatList
            data={filteredServices}
            renderItem={renderService}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
}); 