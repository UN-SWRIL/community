import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, LayoutChangeEvent, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../hooks/useTheme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CustomSliderProps {
  minimumValue: number;
  maximumValue: number;
  step?: number;
  value: number;
  minLabel?: string;
  maxLabel?: string;
  onValueChange: (value: number) => void;
  showValueBubble?: boolean;
  valueFormatter?: (value: number) => string;
  sliderWidth?: number | string;
}

const CustomSlider = ({
  minimumValue,
  maximumValue,
  step = 1,
  value,
  minLabel,
  maxLabel,
  onValueChange,
  showValueBubble = true,
  valueFormatter = (val) => val.toString(),
  sliderWidth = '100%',
}: CustomSliderProps) => {
  const { colors } = useTheme();
  const [sliderDimensions, setSliderDimensions] = useState({ width: 0 });
  const bubbleTranslateX = useSharedValue(0);
  const [currentValue, setCurrentValue] = useState(value);

  // Calculate bubble position based on slider width and current value
  useEffect(() => {
    if (sliderDimensions.width) {
      const position = ((value - minimumValue) / (maximumValue - minimumValue)) * (sliderDimensions.width - 30);
      bubbleTranslateX.value = position;
    }
  }, [value, sliderDimensions.width, minimumValue, maximumValue, bubbleTranslateX]);

  const bubbleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(bubbleTranslateX.value) }],
    };
  });

  const handleValueChange = (val: number) => {
    setCurrentValue(val);
    onValueChange(val);
    
    if (sliderDimensions.width) {
      const position = ((val - minimumValue) / (maximumValue - minimumValue)) * (sliderDimensions.width - 30);
      bubbleTranslateX.value = position;
    }
  };

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderDimensions({ width });
    
    // Initialize position
    const position = ((value - minimumValue) / (maximumValue - minimumValue)) * (width - 30);
    bubbleTranslateX.value = position;
  };

  return (
    <View style={styles.container}>
      {showValueBubble && (
        <View style={styles.bubbleContainer} onLayout={handleLayoutChange}>
          <Animated.View 
            style={[
              styles.bubble, 
              { backgroundColor: colors.primary },
              bubbleStyle
            ]}
          >
            <Text style={styles.bubbleText}>{valueFormatter(currentValue)}</Text>
          </Animated.View>
        </View>
      )}
      
      <Slider
        style={[styles.slider, { width: sliderWidth }]}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#D1D1D6"
        thumbTintColor={colors.primary}
        thumbStyle={styles.thumbStyle}
        tapToSeek={true}
      />
      
      <View style={styles.labelsContainer}>
        <Text style={[styles.labelText, { color: colors.textLight }]}>
          {minLabel || minimumValue}
        </Text>
        <Text style={[styles.labelText, { color: colors.textLight }]}>
          {maxLabel || maximumValue}
        </Text>
      </View>

      {/* Tick marks for better visual reference */}
      <View style={styles.tickContainer}>
        {Array.from({ length: Math.ceil((maximumValue - minimumValue) / step) + 1 }).map((_, index) => {
          const tickValue = minimumValue + index * step;
          const isHighlighted = tickValue <= currentValue;
          
          // Only show a subset of ticks if there are too many
          const shouldShow = (maximumValue - minimumValue) / step <= 10 || 
            index % Math.ceil(((maximumValue - minimumValue) / step) / 10) === 0 ||
            tickValue === minimumValue || tickValue === maximumValue;
          
          if (!shouldShow) return null;
          
          return (
            <View 
              key={`tick-${index}`}
              style={[
                styles.tick,
                isHighlighted ? { backgroundColor: colors.primary } : { backgroundColor: '#D1D1D6' }
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 8,
    position: 'relative',
  },
  slider: {
    height: 40,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  labelText: {
    fontSize: 14,
  },
  bubbleContainer: {
    position: 'relative',
    height: 30,
    marginBottom: 8,
  },
  bubble: {
    position: 'absolute',
    top: 0,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  bubbleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  thumbStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  tickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  tick: {
    width: 2,
    height: 8,
    borderRadius: 1,
  },
});

export default CustomSlider; 