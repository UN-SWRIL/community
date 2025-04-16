import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { useTheme } from '../../hooks/useTheme';
import { ServicesStackParamList } from '../../types/navigation';

type ServiceCategory = {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  image: string;
  description: string;
};

type FeaturedService = {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  category: string;
  categoryId: string;
};

const serviceCategories: ServiceCategory[] = [
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'electrical-services',
    image: 'https://images.unsplash.com/photo-1507668339897-8a035aa9527d?q=80&w=400',
    description: 'Water, electricity, gas and telecommunications services'
  },
  {
    id: 'waste',
    name: 'Waste Management',
    icon: 'delete',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400',
    description: 'Garbage collection, recycling and waste disposal services'
  },
  {
    id: 'permits',
    name: 'Permits & Licenses',
    icon: 'description',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400',
    description: 'Business permits, construction licenses and more'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: 'directions-bus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400',
    description: 'Public transit, road services and transportation infrastructure'
  },
  {
    id: 'health',
    name: 'Health & Safety',
    icon: 'health-and-safety',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=400',
    description: 'Public health services, safety inspections and emergency services'
  },
];

// Featured services shown at the top
const featuredServices: FeaturedService[] = [
  { id: 'water', name: 'Water Bills', icon: 'water-drop', category: 'Utilities', categoryId: 'utilities' },
  { id: 'garbage', name: 'Garbage Collection', icon: 'delete', category: 'Waste', categoryId: 'waste' },
  { id: 'business', name: 'Business License', icon: 'store', category: 'Permits', categoryId: 'permits' },
  { id: 'bus', name: 'Bus Schedule', icon: 'directions-bus', category: 'Transportation', categoryId: 'transportation' },
];

export const ServicesHomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ServicesStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (category: ServiceCategory) => {
    navigation.navigate('ServiceList', { 
      categoryId: category.id,
      categoryName: category.name
    });
  };

  const handleFeaturedServicePress = (service: FeaturedService) => {
    // Navigate first to the service category, then we could auto-scroll to this service
    // Or ideally navigate directly to service details if we had that capability
    navigation.navigate('ServiceList', {
      categoryId: service.categoryId,
      categoryName: service.category,
      highlightServiceId: service.id
    });
  };

  const renderCategory = ({ item }: { item: ServiceCategory }) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <Card style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.categoryImage}
        />
        <View style={styles.overlay} />
        <View style={styles.categoryContent}>
          <MaterialIcons name={item.icon} size={28} color="#FFFFFF" />
          <Typography variant="h3" style={styles.categoryName}>
            {item.name}
          </Typography>
          <Typography variant="body2" style={styles.categoryDescription}>
            {item.description}
          </Typography>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderFeaturedService = ({ item }: { item: FeaturedService }) => (
    <TouchableOpacity
      style={[styles.featuredServiceCard, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => handleFeaturedServicePress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
        <MaterialIcons name={item.icon} size={24} color={theme.colors.primary} />
      </View>
      <Typography 
        variant="body2" 
        style={{ color: theme.colors.text, textAlign: 'center', marginTop: 8 }}
      >
        {item.name}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <SafeAreaContainer>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Typography variant="h1" style={{ color: theme.colors.text }}>
                  City Services
                </Typography>
                <Typography variant="body1" style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
                  Access and request municipal services
                </Typography>
              </View>
              <TouchableOpacity 
                style={[styles.myRequestsButton, { backgroundColor: theme.colors.primaryLight }]}
                onPress={() => navigation.navigate('ServiceRequests')}
              >
                <MaterialIcons name="list-alt" size={20} color={theme.colors.primary} />
                <Typography 
                  variant="bodySmall" 
                  weight="medium" 
                  style={{ color: theme.colors.primary, marginLeft: 4 }}
                >
                  My Requests
                </Typography>
              </TouchableOpacity>
            </View>
            
            {/* Search Bar */}
            <View style={[styles.searchContainer, { backgroundColor: theme.colors.cardBackground }]}>
              <MaterialIcons name="search" size={24} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search for services..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            {/* Featured Services */}
            <View style={styles.featuredSection}>
              <Typography variant="h2" style={{ color: theme.colors.text, marginBottom: 16 }}>
                Popular Services
              </Typography>
              <FlatList
                horizontal
                data={featuredServices}
                renderItem={renderFeaturedService}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredList}
              />
            </View>
            
            <Typography variant="h2" style={{ color: theme.colors.text, marginHorizontal: 16, marginTop: 24, marginBottom: 8 }}>
              All Categories
            </Typography>
          </>
        }
        data={serviceCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  featuredSection: {
    paddingHorizontal: 16,
  },
  featuredList: {
    paddingBottom: 8,
  },
  featuredServiceCard: {
    width: 100,
    height: 110,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  card: {
    overflow: 'hidden',
    padding: 0,
    borderRadius: 12,
  },
  categoryImage: {
    height: 160,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  categoryContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  categoryName: {
    color: '#FFFFFF',
    marginTop: 8,
  },
  categoryDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  myRequestsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
}); 