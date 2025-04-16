import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  Easing, 
  Dimensions, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { UN_QUALITY_OF_LIFE_SURVEY, SurveyQuestion } from '../../types/survey';

const { width, height } = Dimensions.get('window');

// Game constants
const GAME_GRAVITY = 1.5;
const GAME_BASE_SPEED = 1.0;
const GAME_SPEED_INCREMENT = 0.1;
const OBSTACLE_FREQUENCY = 1500;
const GROUND_HEIGHT = 80;
const CHARACTER_SIZE = 70;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 50;
const MAX_SPEED = 8;
const JUMP_HEIGHT = 120;

const HomeScreen: React.FC = () => {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation();
  
  // Game state
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(GAME_BASE_SPEED);
  const [lastGameSpeed, setLastGameSpeed] = useState(GAME_BASE_SPEED);
  const [characterY, setCharacterY] = useState(height - GROUND_HEIGHT - CHARACTER_SIZE);
  const [isJumping, setIsJumping] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  
  // For tracking position values safely without _value
  const [characterX, setCharacterX] = useState(width * 0.2);
  const [obstacleX, setObstacleX] = useState(width);
  
  // Character animations
  const characterPosition = useRef(new Animated.ValueXY({ x: width * 0.2, y: height - GROUND_HEIGHT - CHARACTER_SIZE })).current;
  const characterJumping = useRef(false);
  const characterVelocity = useRef(0);
  
  // Obstacle animations
  const obstaclePosition = useRef(new Animated.Value(width)).current;
  const obstacleHeight = useRef(OBSTACLE_HEIGHT);
  
  // Background animation
  const backgroundPosition = useRef(new Animated.Value(0)).current;
  
  // Add listeners for animated values
  useEffect(() => {
    const characterXListener = characterPosition.x.addListener(({ value }) => {
      setCharacterX(value);
    });
    
    const characterYListener = characterPosition.y.addListener(({ value }) => {
      setCharacterY(value);
    });
    
    const obstacleListener = obstaclePosition.addListener(({ value }) => {
      setObstacleX(value);
    });
    
    return () => {
      characterPosition.x.removeListener(characterXListener);
      characterPosition.y.removeListener(characterYListener);
      obstaclePosition.removeListener(obstacleListener);
    };
  }, []);
  
  // Get a subset of questions from the UN survey
  const surveyQuestions = UN_QUALITY_OF_LIFE_SURVEY.questions.slice(0, 10);
  const currentQuestion = surveyQuestions[questionIndex];
  
  // Start or continue game
  const startGame = () => {
    if (isGameActive) return;
    
    // If this is a new game, start at base speed; otherwise resume from last speed
    if (gameScore === 0) {
      setGameSpeed(GAME_BASE_SPEED);
    } else {
      setGameSpeed(lastGameSpeed);
    }
    
    setIsGameActive(true);
    setShowQuestion(true);
    createObstacle();
  };
  
  // End game
  const endGame = () => {
    setIsGameActive(false);
    // Save the last game speed for resuming
    setLastGameSpeed(gameSpeed);
  };
  
  // Create a new obstacle
  const createObstacle = () => {
    obstaclePosition.setValue(width);
    obstacleHeight.current = Math.random() * 30 + OBSTACLE_HEIGHT;
    
    Animated.timing(obstaclePosition, {
      toValue: -OBSTACLE_WIDTH,
      duration: (width + OBSTACLE_WIDTH) / gameSpeed * 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && isGameActive) {
        setGameScore(gameScore + 1);
        createObstacle();
      }
    });
  };
  
  // Handle character jumping
  const jump = () => {
    if (!characterJumping.current && isGameActive) {
      characterJumping.current = true;
      characterVelocity.current = -15;
    }
  };
  
  // Handle answering a question
  const answerQuestion = (answer: any) => {
    // In a real implementation, we'd save the answer
    console.log(`Answered question ${currentQuestion.id} with:`, answer);
    
    // Move to the next question or loop back
    const nextIndex = (questionIndex + 1) % surveyQuestions.length;
    setQuestionIndex(nextIndex);
    
    // Show next question immediately
    setShowQuestion(true);
    
    // Increment speed when answering questions
    if (gameSpeed < MAX_SPEED) {
      setGameSpeed(prevSpeed => prevSpeed + GAME_SPEED_INCREMENT);
      setLastGameSpeed(prevSpeed => prevSpeed + GAME_SPEED_INCREMENT);
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
    
    // Make the character jump after answering
    jump();
  };
  
  // Game loop using requestAnimationFrame
  useEffect(() => {
    if (!isGameActive) return;
    
    let animationFrameId: number;
    
    const updateGameState = () => {
      // Apply gravity to the character
      if (characterJumping.current) {
        characterVelocity.current += GAME_GRAVITY;
        
        const newY = characterY + characterVelocity.current;
        const groundY = height - GROUND_HEIGHT - CHARACTER_SIZE;
        
        if (newY >= groundY) {
          characterPosition.setValue({ 
            x: characterX, 
            y: groundY 
          });
          characterJumping.current = false;
          characterVelocity.current = 0;
        } else {
          characterPosition.setValue({ 
            x: characterX, 
            y: newY 
          });
        }
      }
      
      // Check for collision
      const characterLeft = characterX;
      const characterRight = characterLeft + CHARACTER_SIZE;
      const characterTop = characterY;
      const characterBottom = characterTop + CHARACTER_SIZE;
      
      const obstacleLeft = obstacleX;
      const obstacleRight = obstacleLeft + OBSTACLE_WIDTH;
      const obstacleTop = height - GROUND_HEIGHT - obstacleHeight.current;
      const obstacleBottom = height - GROUND_HEIGHT;
      
      if (
        characterRight > obstacleLeft &&
        characterLeft < obstacleRight &&
        characterBottom > obstacleTop &&
        characterTop < obstacleBottom
      ) {
        // Collision detected, game over
        endGame();
      }
      
      // Scroll background (this uses modulo which is safe)
      backgroundPosition.setValue((backgroundPosition._value - gameSpeed) % width);
      
      animationFrameId = requestAnimationFrame(updateGameState);
    };
    
    animationFrameId = requestAnimationFrame(updateGameState);
    
    // Show survey question if one isn't showing already
    if (!showQuestion) {
      setShowQuestion(true);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isGameActive, gameScore, gameSpeed, characterX, characterY, obstacleX]);
  
  // Render a basic radio question UI
  const renderQuestionUI = () => {
    if (!showQuestion || !currentQuestion) return null;
    
    if (currentQuestion.type === 'radio') {
      return (
        <Animated.View style={styles.questionContainer}>
          <Typography variant="h3" weight="bold" style={styles.questionText}>
            {currentQuestion.text}
          </Typography>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.slice(0, 3).map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => answerQuestion(option.value)}
              >
                <Typography variant="body">{option.text}</Typography>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      );
    }
    
    // Default simple yes/no for other question types
    return (
      <Animated.View style={styles.questionContainer}>
        <Typography variant="h3" weight="bold" style={styles.questionText}>
          {currentQuestion.text}
        </Typography>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => answerQuestion('yes')}
          >
            <Typography variant="body">Yes</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => answerQuestion('no')}
          >
            <Typography variant="body">No</Typography>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };
  
  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Game header */}
      <View style={styles.header}>
        <Typography variant="h3" weight="bold">{`Score: ${gameScore}`}</Typography>
        <Typography variant="h3" weight="bold">{`Speed: ${gameSpeed.toFixed(1)}x`}</Typography>
      </View>
      
      {isGameActive ? (
        // Game content
        <View style={styles.gameContainer}>
          {/* Background */}
          <Animated.View 
            style={[
              styles.background,
              { transform: [{ translateX: backgroundPosition }] }
            ]}
          />
          
          {/* Ground */}
          <View
            style={[
              styles.ground,
              { backgroundColor: isDarkMode ? '#333' : '#8bc34a' }
            ]}
          />
          
          {/* Character */}
          <Animated.View
            style={[
              styles.character,
              characterPosition.getLayout()
            ]}
          >
            <Ionicons
              name="person"
              size={CHARACTER_SIZE}
              color={isDarkMode ? '#fff' : '#333'}
            />
          </Animated.View>
          
          {/* Obstacle */}
          <Animated.View
            style={[
              styles.obstacle,
              {
                height: obstacleHeight.current,
                transform: [{ translateX: obstaclePosition }]
              }
            ]}
          />
          
          {/* Jump button */}
          <TouchableOpacity
            style={styles.jumpButton}
            onPress={jump}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-up" size={30} color="#fff" />
          </TouchableOpacity>
          
          {/* Survey question overlay - Now always shows during gameplay */}
          {renderQuestionUI()}
        </View>
      ) : (
        // Start screen
        <View style={styles.startContainer}>
          <Typography variant="h1" weight="bold" center>
            City Run
          </Typography>
          
          <Typography variant="body" center style={styles.startDescription}>
            Answer survey questions to help your character run faster and jump higher!
          </Typography>
          
          <Button
            title="Start Game"
            onPress={startGame}
            style={styles.startButton}
          />
        </View>
      )}
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  gameContainer: {
    flex: 1,
    position: 'relative',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startDescription: {
    marginTop: 20,
    marginBottom: 40,
    opacity: 0.7,
    textAlign: 'center',
  },
  startButton: {
    width: '70%',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 2,
    height: height,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: GROUND_HEIGHT,
  },
  character: {
    position: 'absolute',
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
  },
  obstacle: {
    position: 'absolute',
    bottom: GROUND_HEIGHT,
    width: OBSTACLE_WIDTH,
    backgroundColor: '#ff6b6b',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  jumpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  questionContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: '48%',
    alignItems: 'center',
  },
});

export default HomeScreen; 