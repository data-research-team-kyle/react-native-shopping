import React, { useEffect } from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';

import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, images } from '../constants';

type Nav = {
  navigate: (value: string) => void;
}

const Onboarding1 = () => {
  const { navigate } = useNavigation<Nav>();

  useEffect(() => {
    const timeout = setTimeout(() => (
      navigate('onboarding2')
    ), 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={images.backgroundAvatar2}
      style={styles.area}>
      <LinearGradient
        colors={['transparent', COLORS.greyScale800]}
        style={styles.background}>
        <Text style={styles.greetingText}>Welcome to 👋</Text>
        <Text style={styles.logoName}>Expo Solution</Text>
        <Text style={styles.subtitle}>Your solution for all your expo needs</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1
  },
  background: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 270,
    paddingHorizontal: 16
  },
  greetingText: {
    fontSize: 40,
    color: COLORS.white,
    fontFamily: 'bold',
    marginVertical: 12
  },
  logoName: {
    fontSize: 76,
    color: COLORS.white,
    fontFamily: 'extraBold',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 12,
    fontFamily: "semiBold",
  }
});

export default Onboarding1;
