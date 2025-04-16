import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/common/Card';

// Mock notification data
const notifications = [
  {
    id: '1',
    title: 'New Survey Available',
    body: 'A new survey about transportation is now available. Complete it to earn XP!',
    type: 'Survey',
    read: false,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '2',
    title: 'Achievement Unlocked',
    body: 'Congratulations! You\'ve earned the "City Explorer" achievement.',
    type: 'Achievement',
    read: false,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '3',
    title: 'Character Evolution',
    body: 'Your character has evolved to the next stage! Check it out.',
    type: 'Evolution',
    read: true,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: '4',
    title: 'Survey Results',
    body: 'The results of the recent community survey are now available.',
    type: 'Insight',
    read: true,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: '5',
    title: 'Welcome to City Pulse',
    body: 'Welcome to City Pulse! Start answering surveys to improve your city.',
    type: 'System',
    read: true,
    createdAt: new Date(Date.now() - 604800000), // 7 days ago
  },
];

const NotificationScreen: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation();
  
  const getIconForNotificationType = (type: string) => {
    switch (type) {
      case 'Survey':
        return 'document-text';
      case 'Achievement':
        return 'trophy';
      case 'Evolution':
        return 'sparkles';
      case 'Insight':
        return 'analytics';
      case 'System':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };
  
  const getColorForNotificationType = (type: string) => {
    switch (type) {
      case 'Survey':
        return '#2196F3'; // Blue
      case 'Achievement':
        return '#FFC107'; // Amber
      case 'Evolution':
        return '#9C27B0'; // Purple
      case 'Insight':
        return '#4CAF50'; // Green
      case 'System':
        return '#757575'; // Gray
      default:
        return '#F44336'; // Red
    }
  };
  
  const handleNotificationPress = (notification: typeof notifications[0]) => {
    // Navigate based on notification type
    switch (notification.type) {
      case 'Survey':
        // Navigate to survey
        break;
      case 'Achievement':
        navigation.navigate('Achievement', { achievementId: '1' });
        break;
      case 'Evolution':
        // Navigate to character
        break;
      case 'Insight':
        // Navigate to insights
        break;
      default:
        // Do nothing
    }
  };
  
  const renderNotificationItem = ({ item }: { item: typeof notifications[0] }) => {
    const iconName = getIconForNotificationType(item.type);
    const iconColor = getColorForNotificationType(item.type);
    
    return (
      <TouchableOpacity
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}
      >
        <Card 
          style={[
            styles.notificationCard, 
            !item.read && { borderLeftColor: iconColor, borderLeftWidth: 4 }
          ]}
        >
          <View style={styles.notificationContent}>
            <View 
              style={[
                styles.iconContainer, 
                { backgroundColor: `${iconColor}20` } // 20% opacity
              ]}
            >
              <Ionicons name={iconName} size={20} color={iconColor} />
            </View>
            
            <View style={styles.textContainer}>
              <View style={styles.headerRow}>
                <Typography 
                  variant="subtitle" 
                  weight={item.read ? 'regular' : 'bold'} 
                  style={styles.title}
                >
                  {item.title}
                </Typography>
                
                <Typography variant="caption" style={styles.time}>
                  {formatTime(item.createdAt)}
                </Typography>
              </View>
              
              <Typography variant="body" style={styles.body}>
                {item.body}
              </Typography>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };
  
  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? theme.colors.dark.text : theme.colors.text} />
        </TouchableOpacity>
        <Typography variant="h3" weight="bold">Notifications</Typography>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="checkmark-done" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off" size={60} color="#888" />
            <Typography variant="body" center style={styles.emptyText}>
              No notifications yet
            </Typography>
          </View>
        }
      />
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  notificationCard: {
    marginBottom: 12,
    overflow: 'hidden',
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  time: {
    opacity: 0.6,
  },
  body: {
    opacity: 0.8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    opacity: 0.6,
  },
});

export default NotificationScreen; 