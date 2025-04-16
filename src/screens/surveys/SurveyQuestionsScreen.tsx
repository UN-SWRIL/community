import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { 
  UN_QUALITY_OF_LIFE_SURVEY, 
  SurveyQuestion, 
  SurveyAnswer,
  RadioQuestion,
  CheckboxQuestion,
  SliderQuestion,
  YesNoQuestion,
  MatrixQuestion
} from '../../types/survey';
import { SurveyStackParamList } from '../../navigation/SurveyNavigator';
import { colors } from '../../styles/colors';
import CustomSlider from '../../components/CustomSlider';

type SurveyQuestionsScreenProps = {
  navigation: StackNavigationProp<SurveyStackParamList, 'SurveyQuestions'>;
  route: RouteProp<SurveyStackParamList, 'SurveyQuestions'>;
};

const SurveyQuestionsScreen: React.FC<SurveyQuestionsScreenProps> = ({ navigation, route }) => {
  const { surveyId } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // For now we're using the UN survey, but in the future this could fetch the survey from an API
  const survey = UN_QUALITY_OF_LIFE_SURVEY;
  const questions = survey.questions;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Check if the current question has been answered
  const findAnswerForCurrentQuestion = () => {
    return answers.find(a => a.questionId === currentQuestion.id);
  };
  
  const currentAnswer = findAnswerForCurrentQuestion();
  
  // Handle moving to the next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitSurvey();
    }
  };
  
  // Handle moving to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Handle submitting the survey
  const handleSubmitSurvey = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Here you would typically send the answers to your backend
      // For now, we'll just simulate a delay and then navigate to completion
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('SurveyComplete', { 
          surveyId: surveyId,
          surveyTitle: survey.title 
        });
      }, 1500);
    } catch (err) {
      setError('Failed to submit survey. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Update answer for the current question
  const updateAnswer = (value: any) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { 
        questionId: currentQuestion.id, 
        value 
      };
    } else {
      newAnswers.push({ 
        questionId: currentQuestion.id, 
        value 
      });
    }
    
    setAnswers(newAnswers);
  };
  
  // Check if we can proceed to the next question
  const canProceed = () => {
    if (!currentQuestion.required) return true;
    const answer = findAnswerForCurrentQuestion();
    
    if (!answer) return false;
    
    if (Array.isArray(answer.value) && answer.value.length === 0) return false;
    if (answer.value === null || answer.value === undefined) return false;
    if (typeof answer.value === 'object' && Object.keys(answer.value).length === 0) return false;
    
    return true;
  };
  
  // Render different question types
  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'radio':
        return renderRadioQuestion(currentQuestion as RadioQuestion);
      case 'checkbox':
        return renderCheckboxQuestion(currentQuestion as CheckboxQuestion);
      case 'slider':
        return renderSliderQuestion(currentQuestion as SliderQuestion);
      case 'yesno':
        return renderYesNoQuestion(currentQuestion as YesNoQuestion);
      case 'matrix':
        return renderMatrixQuestion(currentQuestion as MatrixQuestion);
      default:
        return <Text style={styles.errorText}>Unsupported question type</Text>;
    }
  };
  
  const renderRadioQuestion = (question: RadioQuestion) => {
    const selectedValue = currentAnswer?.value as string;
    
    return (
      <View style={styles.optionsContainer}>
        {question.options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.radioOption,
              selectedValue === option.value ? styles.selectedOption : null
            ]}
            onPress={() => updateAnswer(option.value)}
          >
            <View style={styles.radioCircle}>
              {selectedValue === option.value && (
                <View style={styles.selectedRadioCircle} />
              )}
            </View>
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const renderCheckboxQuestion = (question: CheckboxQuestion) => {
    const selectedValues = (currentAnswer?.value as string[]) || [];
    
    return (
      <View style={styles.optionsContainer}>
        {question.options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.checkboxOption,
              selectedValues.includes(option.value.toString()) ? styles.selectedOption : null
            ]}
            onPress={() => {
              const newValue = [...selectedValues];
              const valueStr = option.value.toString();
              
              if (newValue.includes(valueStr)) {
                const index = newValue.indexOf(valueStr);
                newValue.splice(index, 1);
              } else {
                newValue.push(valueStr);
              }
              
              updateAnswer(newValue);
            }}
          >
            <View style={styles.checkbox}>
              {selectedValues.includes(option.value.toString()) && (
                <Ionicons name="checkmark" size={16} color={colors.primary} />
              )}
            </View>
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const renderSliderQuestion = (question: SliderQuestion) => {
    const value = currentAnswer?.value as number || question.minValue;
    
    return (
      <View style={styles.sliderContainer}>
        <CustomSlider
          minimumValue={question.minValue}
          maximumValue={question.maxValue}
          step={question.step || 1}
          value={value}
          minLabel={question.minLabel}
          maxLabel={question.maxLabel}
          onValueChange={(val) => updateAnswer(val)}
          showValueBubble={true}
          valueFormatter={(val) => val.toString()}
        />
      </View>
    );
  };
  
  const renderYesNoQuestion = (question: YesNoQuestion) => {
    const selectedValue = currentAnswer?.value as string;
    
    return (
      <View style={styles.yesNoContainer}>
        <TouchableOpacity
          style={[
            styles.yesNoButton,
            selectedValue === 'yes' ? styles.selectedYesNoButton : null
          ]}
          onPress={() => updateAnswer('yes')}
        >
          <Text style={[
            styles.yesNoButtonText,
            selectedValue === 'yes' ? styles.selectedYesNoButtonText : null
          ]}>Yes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.yesNoButton,
            selectedValue === 'no' ? styles.selectedYesNoButton : null
          ]}
          onPress={() => updateAnswer('no')}
        >
          <Text style={[
            styles.yesNoButtonText,
            selectedValue === 'no' ? styles.selectedYesNoButtonText : null
          ]}>No</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.yesNoButton,
            selectedValue === 'no_answer' ? styles.selectedYesNoButton : null
          ]}
          onPress={() => updateAnswer('no_answer')}
        >
          <Text style={[
            styles.yesNoButtonText,
            selectedValue === 'no_answer' ? styles.selectedYesNoButtonText : null
          ]}>Prefer not to answer</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderMatrixQuestion = (question: MatrixQuestion) => {
    const matrixAnswers = (currentAnswer?.value as Record<string, string>) || {};
    
    return (
      <View style={styles.matrixContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Header row with column labels */}
            <View style={styles.matrixRow}>
              <View style={styles.matrixEmptyCell} />
              {question.columns.map(column => (
                <View key={column.id} style={styles.matrixHeaderCell}>
                  <Text style={styles.matrixHeaderText}>{column.text}</Text>
                </View>
              ))}
            </View>
            
            {/* Matrix rows */}
            {question.rows.map(row => (
              <View key={row.id} style={styles.matrixRow}>
                <View style={styles.matrixRowLabelCell}>
                  <Text style={styles.matrixRowLabelText}>{row.text}</Text>
                </View>
                
                {question.columns.map(column => (
                  <TouchableOpacity
                    key={`${row.id}-${column.id}`}
                    style={[
                      styles.matrixCell,
                      matrixAnswers[row.id] === column.value.toString() ? styles.matrixCellSelected : null
                    ]}
                    onPress={() => {
                      const newMatrixAnswers = { ...matrixAnswers };
                      newMatrixAnswers[row.id] = column.value.toString();
                      updateAnswer(newMatrixAnswers);
                    }}
                  >
                    {matrixAnswers[row.id] === column.value.toString() && (
                      <View style={styles.matrixCellDot} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  
  // Render the progress bar
  const renderProgressBar = () => {
    const progress = (currentQuestionIndex / (questions.length - 1)) * 100;
    
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{survey.title}</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Progress Bar */}
      {renderProgressBar()}
      
      {/* Question Counter */}
      <View style={styles.questionCounter}>
        <Text style={styles.questionCounterText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </View>
      
      {/* Question Container */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Question Text */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          {currentQuestion.description && (
            <Text style={styles.questionDescription}>{currentQuestion.description}</Text>
          )}
        </View>
        
        {/* Question Content */}
        {renderQuestionContent()}
        
        {/* Error Message */}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={[
            styles.previousButtonText,
            currentQuestionIndex === 0 ? styles.disabledButtonText : null
          ]}>
            Previous
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            !canProceed() ? styles.disabledButton : null
          ]}
          onPress={handleNext}
          disabled={!canProceed() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E5E5',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  questionCounter: {
    padding: 12,
    alignItems: 'center',
  },
  questionCounterText: {
    fontSize: 14,
    color: colors.textLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 40,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  questionDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F2F2F7',
  },
  selectedOption: {
    backgroundColor: '#E1E5FF',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedRadioCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F2F2F7',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  sliderContainer: {
    marginVertical: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sliderMinLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  sliderMaxLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  yesNoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  yesNoButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedYesNoButton: {
    backgroundColor: colors.primary,
  },
  yesNoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  selectedYesNoButtonText: {
    color: '#ffffff',
  },
  matrixContainer: {
    marginBottom: 24,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  matrixEmptyCell: {
    width: 160,
    padding: 8,
  },
  matrixHeaderCell: {
    width: 100,
    padding: 8,
    alignItems: 'center',
  },
  matrixHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
    textAlign: 'center',
  },
  matrixRowLabelCell: {
    width: 160,
    padding: 8,
  },
  matrixRowLabelText: {
    fontSize: 14,
    color: colors.text,
  },
  matrixCell: {
    width: 100,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    margin: 2,
  },
  matrixCellSelected: {
    backgroundColor: '#E1E5FF',
    borderColor: colors.primary,
  },
  matrixCellDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  previousButton: {
    padding: 12,
  },
  previousButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: colors.textLight,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D1D6',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginVertical: 8,
    fontSize: 14,
  },
});

export default SurveyQuestionsScreen; 