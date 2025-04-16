import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface CustomSliderProps {
  minimumValue: number;
  maximumValue: number;
  value: number;
  step?: number;
  onValueChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  minimumValue,
  maximumValue,
  value,
  step = 1,
  onValueChange,
  style,
  minimumTrackTintColor = '#007AFF',
  maximumTrackTintColor = '#DDDDDD',
  thumbTintColor = '#007AFF',
}) => {
  const [width, setWidth] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Store the current position when the user starts dragging
        thumbPosition.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        // Calculate new position based on drag
        let newWidth = gestureState.dx;
        
        // Constrain to the slider width
        newWidth = Math.max(0, Math.min(newWidth, width));
        
        // Calculate the new value based on position
        const newValue = calculateValue(newWidth);
        
        // Update the thumb position
        thumbPosition.setValue(calculatePosition(newValue));
        
        // Call the onValueChange callback
        onValueChange(newValue);
      },
      onPanResponderRelease: () => {
        // Save the offset when the user releases
        thumbPosition.flattenOffset();
      },
    })
  ).current;

  // Animated value for the thumb position
  const thumbPosition = useRef(new Animated.Value(0)).current;

  // Update thumb position when value or dimensions change
  useEffect(() => {
    if (width > 0) {
      thumbPosition.setValue(calculatePosition(value));
    }
  }, [value, width]);

  // Calculate the position on the slider based on value
  const calculatePosition = (val: number): number => {
    const range = maximumValue - minimumValue;
    const percentage = (val - minimumValue) / range;
    return percentage * width;
  };

  // Calculate the value based on position
  const calculateValue = (position: number): number => {
    const range = maximumValue - minimumValue;
    let percentage = position / width;
    
    // Constrain percentage to [0, 1]
    percentage = Math.max(0, Math.min(percentage, 1));
    
    // Calculate raw value
    let rawValue = percentage * range + minimumValue;
    
    // Apply step if provided
    if (step) {
      rawValue = Math.round(rawValue / step) * step;
    }
    
    // Ensure the value is within bounds
    return Math.max(minimumValue, Math.min(maximumValue, rawValue));
  };

  // Handle layout changes to get the width of the slider
  const onLayout = (event: LayoutChangeEvent) => {
    const { width: newWidth } = event.nativeEvent.layout;
    setWidth(newWidth);
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {/* Background track */}
      <View
        style={[
          styles.track,
          {
            backgroundColor: maximumTrackTintColor,
          },
        ]}
      />
      
      {/* Filled track */}
      <Animated.View
        style={[
          styles.filledTrack,
          {
            backgroundColor: minimumTrackTintColor,
            width: thumbPosition,
          },
        ]}
      />
      
      {/* Thumb */}
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: thumbTintColor,
            transform: [{ translateX: Animated.subtract(thumbPosition, 10) }], // 10 is half the thumb width
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  filledTrack: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default CustomSlider; 