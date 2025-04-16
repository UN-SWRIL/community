import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../components/Typography';
import { SafeAreaContainer } from '../../components/SafeAreaContainer';
import { IconButton } from '../../components/IconButton';
import { Card } from '../../components/Card';

export default function HelpScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  // Track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Toggle FAQ item expansion
  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // FAQ data
  const faqItems = [
    {
      id: '1',
      question: 'How do I report an issue in my city?',
      answer: 'You can report issues by going to the Services tab, selecting "Report an Issue", and following the steps to provide details about the problem you\'ve encountered.'
    },
    {
      id: '2',
      question: 'How can I track my submitted reports?',
      answer: 'All your submitted reports can be found in the Reports tab under "My Reports". There you can see the status of each report and any updates from city officials.'
    },
    {
      id: '3',
      question: 'How do I participate in city surveys?',
      answer: 'City surveys can be accessed from the Surveys tab. Active surveys will be displayed on the main screen, and you can also browse surveys by category.'
    },
    {
      id: '4',
      question: 'What is the character feature for?',
      answer: 'The character feature represents your digital city resident. As you engage with the app and your community, your character will evolve and earn rewards, reflecting your contribution to the city.'
    },
    {
      id: '5',
      question: 'How do I update my notification preferences?',
      answer: 'You can manage your notification settings by going to Profile > Settings > Notifications, where you can customize which types of alerts you\'d like to receive.'
    },
  ];

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          size={24}
          color={colors.text}
          onPress={() => navigation.goBack()}
        />
        <Typography variant="h2">Help & Support</Typography>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contactSection}>
          <Card style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={24} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Typography variant="h3">Email Support</Typography>
                <Typography variant="body2">support@citypulse.example.com</Typography>
              </View>
            </View>
          </Card>
          
          <Card style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={24} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Typography variant="h3">Call Center</Typography>
                <Typography variant="body2">(555) 123-4567</Typography>
              </View>
            </View>
          </Card>
          
          <Card style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Ionicons name="chatbubbles-outline" size={24} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Typography variant="h3">Live Chat</Typography>
                <Typography variant="body2">Available 9am-5pm, Monday-Friday</Typography>
              </View>
            </View>
          </Card>
        </View>
        
        <View style={styles.faqSection}>
          <Typography variant="h3" style={styles.sectionTitle}>Frequently Asked Questions</Typography>
          
          {faqItems.map((item) => (
            <Card key={item.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleItem(item.id)}
              >
                <Typography variant="h4">{item.question}</Typography>
                <Ionicons 
                  name={expandedItems[item.id] ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color={colors.text} 
                />
              </TouchableOpacity>
              
              {expandedItems[item.id] && (
                <View style={styles.faqAnswer}>
                  <Typography variant="body1">{item.answer}</Typography>
                </View>
              )}
            </Card>
          ))}
        </View>
        
        <View style={styles.resourcesSection}>
          <Typography variant="h3" style={styles.sectionTitle}>Resources</Typography>
          
          <Card style={styles.resourceCard}>
            <View style={styles.resourceItem}>
              <Ionicons name="document-text-outline" size={24} color={colors.primary} />
              <Typography variant="h4" style={styles.resourceText}>User Guide</Typography>
              <Ionicons name="arrow-forward" size={20} color={colors.primary} />
            </View>
          </Card>
          
          <Card style={styles.resourceCard}>
            <View style={styles.resourceItem}>
              <Ionicons name="videocam-outline" size={24} color={colors.primary} />
              <Typography variant="h4" style={styles.resourceText}>Tutorial Videos</Typography>
              <Ionicons name="arrow-forward" size={20} color={colors.primary} />
            </View>
          </Card>
          
          <Card style={styles.resourceCard}>
            <View style={styles.resourceItem}>
              <Ionicons name="globe-outline" size={24} color={colors.primary} />
              <Typography variant="h4" style={styles.resourceText}>City Website</Typography>
              <Ionicons name="arrow-forward" size={20} color={colors.primary} />
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
  contactSection: {
    marginBottom: 24,
  },
  contactCard: {
    marginBottom: 8,
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    marginLeft: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    marginLeft: 4,
  },
  faqSection: {
    marginBottom: 24,
  },
  faqCard: {
    marginBottom: 8,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  resourcesSection: {
    marginBottom: 24,
  },
  resourceCard: {
    marginBottom: 8,
    padding: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceText: {
    flex: 1,
    marginLeft: 16,
  }
}); 