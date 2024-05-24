// components/ThemeToggleButton.js
import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Animated, Easing } from 'react-native';

const CustomToggleSwitch = ({ toggleTheme, isDarkMode }) => {
  const [animationValue] = useState(new Animated.Value(isDarkMode ? 1 : 0));

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isDarkMode ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isDarkMode, animationValue]);

  const handleToggle = () => {
    toggleTheme();
  };

  const backgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f0f0f0', '#333']
  });

  const circlePosition = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22]
  });

  const iconRotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const iconColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000', '#fff']
  });

  return (
    <TouchableWithoutFeedback onPress={handleToggle}>
      <Animated.View style={[styles.toggleContainer, { backgroundColor }]}>
        <Animated.View style={[styles.circle, { left: circlePosition }]}>
          <Animated.Text style={[styles.icon, { transform: [{ rotate: iconRotation }], color: iconColor }]}>
            ☀️
          </Animated.Text>
          <Animated.Text style={[styles.icon, { transform: [{ rotate: iconRotation }], color: iconColor }]}>
            🌙
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 50,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    fontSize: 16,
  },
});

export default CustomToggleSwitch;
