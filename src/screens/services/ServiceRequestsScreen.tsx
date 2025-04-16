import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Card from '../../components/common/Card';
import IconButton from '../../components/common/IconButton';
import Button from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { ServicesStackParamList } from '../../types/navigation';

// Define a type for service requests
type ServiceRequest = {
  id: string;
  serviceId: string;
  serviceName: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  submittedAt: Date;
  lastUpdatedAt?: Date;
  location: string;
  contactPreference: string;
};

// Mock data for service requests
const mockRequests: ServiceRequest[] = [
  {
    id: 'req1',
    serviceId: 'water',
    serviceName: 'Water Bills',
    title: 'Water Leak on Main Street',
    description: 'There is a significant water leak in front of 123 Main Street that needs immediate attention.',
    status: 'in_progress',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    location: '123 Main Street',
    contactPreference: 'email',
  },
  {
    id: 'req2',
    serviceId: 'garbage',
    serviceName: 'Garbage Collection',
    title: 'Missed Garbage Collection',
    description: 'Our garbage was not collected on the scheduled day (Tuesday) this week.',
    status: 'completed',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    lastUpdatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    location: '456 Oak Avenue',
    contactPreference: 'phone',
  },
  {
    id: 'req3',
    serviceId: 'roads',
    serviceName: 'Road Maintenance',
    title: 'Pothole Repair Needed',
    description: 'Large pothole forming at the intersection of Elm Street and Pine Road. Becoming a hazard for vehicles.',
    status: 'pending',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    location: 'Intersection of Elm and Pine',
    contactPreference: 'sms',
  },
  {
    id: 'req4',
    serviceId: 'electricity',
    serviceName: 'Electricity',
    title: 'Street Light Out',
    description: 'Street light at the corner of Maple and 10th has been out for over a week.',
    status: 'cancelled',
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    lastUpdatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    location: 'Corner of Maple and 10th',
    contactPreference: 'email',
  },
];

// Status configuration for UI
const statusConfig = {
  pending: {
    label: 'Pending',
    color: '#F59E0B', // Amber
    icon: 'pending',
  },
  in_progress: {
    label: 'In Progress',
    color: '#3B82F6', // Blue
    icon: 'handyman',
  },
  completed: {
    label: 'Completed',
    color: '#10B981', // Green
    icon: 'check-circle',
  },
  cancelled: {
    label: 'Cancelled',
    color: '#EF4444', // Red
    icon: 'cancel',
  },
};

const ServiceRequestsScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { user } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<ServicesStackParamList>>();
  
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter requests based on search query and status filter
  const filteredRequests = requests.filter(request => {
    const matchesSearch = searchQuery.trim() === '' || 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort requests by submission date (newest first)
  const sortedRequests = [...filteredRequests].sort(
    (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
  );
  
  const handleRequestPress = (request: ServiceRequest) => {
    // Navigate to request details when implemented
    console.log(`Viewing details for request: ${request.id}`);
    // navigation.navigate('ServiceRequestDetails', { requestId: request.id });
  };
  
  const handleNewRequest = () => {
    navigation.navigate('ServicesHome');
  };
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
  };
  
  const renderStatusBadge = (status: 'pending' | 'in_progress' | 'completed' | 'cancelled') => {
    const { label, color, icon } = statusConfig[status];
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
        <MaterialIcons name={icon as any} size={16} color={color} style={styles.statusIcon} />
        <Typography variant="caption" style={{ color }}>
          {label}
        </Typography>
      </View>
    );
  };
  
  const renderFilterButton = (status: string | null, label: string, color: string, icon: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: statusFilter === status ? `${color}20` : isDarkMode ? theme.colors.dark.cardBackground : theme.colors.cardBackground,
          borderColor: statusFilter === status ? color : isDarkMode ? theme.colors.dark.border : theme.colors.border,
        }
      ]}
      onPress={() => setStatusFilter(status === statusFilter ? null : status)}
    >
      <MaterialIcons 
        name={icon as any} 
        size={18} 
        color={statusFilter === status ? color : isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
      />
      <Typography 
        variant="caption" 
        style={{ 
          color: statusFilter === status ? color : isDarkMode ? theme.colors.dark.text : theme.colors.text,
          marginLeft: 4
        }}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
  
  const renderRequest = ({ item }: { item: ServiceRequest }) => (
    <TouchableOpacity
      style={[
        styles.requestCard,
        { backgroundColor: isDarkMode ? theme.colors.dark.cardBackground : theme.colors.cardBackground }
      ]}
      onPress={() => handleRequestPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.requestHeader}>
        <Typography variant="h3" style={{ color: isDarkMode ? theme.colors.dark.text : theme.colors.text, flex: 1 }}>
          {item.title}
        </Typography>
        {renderStatusBadge(item.status)}
      </View>
      
      <Typography variant="bodySmall" style={{ color: isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary, marginTop: 4 }}>
        {item.serviceName}
      </Typography>
      
      <Typography 
        variant="body" 
        style={{ 
          color: isDarkMode ? theme.colors.dark.text : theme.colors.text, 
          marginTop: 12,
          marginBottom: 16
        }}
        numberOfLines={2}
      >
        {item.description}
      </Typography>
      
      <View style={styles.requestFooter}>
        <View style={styles.footerItem}>
          <MaterialIcons 
            name="access-time" 
            size={16} 
            color={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary} 
          />
          <Typography 
            variant="caption" 
            style={{ 
              color: isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary,
              marginLeft: 4
            }}
          >
            Submitted {formatRelativeTime(item.submittedAt)}
          </Typography>
        </View>
        
        <View style={styles.footerItem}>
          <MaterialIcons 
            name="location-on" 
            size={16} 
            color={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary} 
          />
          <Typography 
            variant="caption" 
            style={{ 
              color: isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary,
              marginLeft: 4
            }}
            numberOfLines={1}
          >
            {item.location}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons 
        name="inbox" 
        size={64} 
        color={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary} 
      />
      <Typography 
        variant="h3" 
        style={{ 
          color: isDarkMode ? theme.colors.dark.text : theme.colors.text,
          marginTop: 16
        }}
        center
      >
        No requests found
      </Typography>
      <Typography 
        variant="body" 
        style={{ 
          color: isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary,
          marginTop: 8,
          marginBottom: 24
        }}
        center
      >
        {searchQuery.trim() !== '' || statusFilter
          ? 'Try adjusting your filters'
          : 'Start by creating a new service request'}
      </Typography>
      
      <Button
        title="Create New Request"
        icon="add"
        onPress={handleNewRequest}
        size="medium"
      />
    </View>
  );

  return (
    <SafeAreaContainer style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={isDarkMode ? theme.colors.dark.text : theme.colors.text}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Typography variant="h2" weight="bold">
          My Requests
        </Typography>
        <View style={styles.backButtonPlaceholder} />
      </View>
      
      <View style={styles.content}>
        {/* Search bar */}
        <View style={[
          styles.searchContainer,
          { backgroundColor: isDarkMode ? theme.colors.dark.inputBackground : theme.colors.inputBackground }
        ]}>
          <MaterialIcons 
            name="search" 
            size={24} 
            color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? theme.colors.dark.text : theme.colors.text }
            ]}
            placeholder="Search requests..."
            placeholderTextColor={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons 
                name="close" 
                size={24} 
                color={isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Filters */}
        <View style={styles.filtersContainer}>
          <Typography variant="bodySmall" weight="medium" style={{ marginRight: 10 }}>
            Filter:
          </Typography>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScrollContent}
          >
            {renderFilterButton('pending', 'Pending', statusConfig.pending.color, statusConfig.pending.icon)}
            {renderFilterButton('in_progress', 'In Progress', statusConfig.in_progress.color, statusConfig.in_progress.icon)}
            {renderFilterButton('completed', 'Completed', statusConfig.completed.color, statusConfig.completed.icon)}
            {renderFilterButton('cancelled', 'Cancelled', statusConfig.cancelled.color, statusConfig.cancelled.icon)}
          </ScrollView>
        </View>
        
        {/* Requests list */}
        <FlatList
          data={sortedRequests}
          renderItem={renderRequest}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
        
        {/* FAB for creating new request */}
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={handleNewRequest}
        >
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filtersScrollContent: {
    paddingRight: 16,
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Extra space for FAB
  },
  requestCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusIcon: {
    marginRight: 4,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: 400,
  },
});

export default ServiceRequestsScreen; 