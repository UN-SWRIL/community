import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SurveyStackParamList } from '../types/navigation';

// Import screens
import SurveyListScreen from '../screens/surveys/SurveyListScreen';
import SurveyQuestionsScreen from '../screens/surveys/SurveyQuestionsScreen';
import SurveyCompleteScreen from '../screens/surveys/SurveyCompleteScreen';
import SurveyCategoriesScreen from '../screens/survey/SurveyCategoriesScreen';
import SurveyCategoryScreen from '../screens/survey/SurveyCategoryScreen';
import SurveyDetailScreen from '../screens/survey/SurveyDetailScreen';

const Stack = createNativeStackNavigator<SurveyStackParamList>();

export default function SurveyNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SurveyList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SurveyList" component={SurveyListScreen} />
      <Stack.Screen name="SurveyCategories" component={SurveyCategoriesScreen} />
      <Stack.Screen name="SurveyCategory" component={SurveyCategoryScreen} />
      <Stack.Screen name="SurveyDetail" component={SurveyDetailScreen} />
      <Stack.Screen name="SurveyQuestions" component={SurveyQuestionsScreen} />
      <Stack.Screen name="SurveyComplete" component={SurveyCompleteScreen} />
    </Stack.Navigator>
  );
} 