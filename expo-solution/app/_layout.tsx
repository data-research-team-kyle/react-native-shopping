import React, { useEffect } from 'react';
import { LogBox } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font'

import { FONTS } from '@/constants/fonts';
import { ThemeProvider } from '@/theme/ThemeProvider';

SplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const RootLayout = () => {
  const [loaded] = useFonts(FONTS);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      {/*<NavigationContainer>*/}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding2" />
          <Stack.Screen name="onboarding3" />
          <Stack.Screen name="onboarding4" />
          <Stack.Screen name="onboarding5" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="welcome" />
        </Stack>
      {/*</NavigationContainer>*/}
    </ThemeProvider>
  )
}

export default RootLayout;