import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

export default function GradientTabBar(props) {
  return (
    <LinearGradient
      colors={['#ff9966', '#ff5e62']} // Border gradient
      style={styles.border}
    >
      <LinearGradient
        colors={['#4e54c8', '#8f94fb']} // Background gradient
        style={styles.background}
      >
        <BottomTabBar {...props} />
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  border: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 3, // Border thickness
  },
  background: {
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    overflow: 'hidden',
  },
});
