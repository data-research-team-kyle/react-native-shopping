import React from 'react';
import { View, Text, Platform } from 'react-native';

import { Image } from 'expo-image';
import { Tabs } from 'expo-router'; 

import { useTheme } from '@/theme/ThemeProvider'
import { COLORS, icons, FONTS, SIZES } from '../../constants';

const TabLayout = () => {
  const { dark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS !== 'ios',
        tabBarStyle: {
          position: 'absolute',
          zIndex: 1,
          bottom: 35,
          left: 10,
          right: 10,
          elevation: 0,
          borderRadius: 46,
          height: Platform.OS === 'ios' ? 64 : 58,
          backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale400,
        },
      }}>
      <Tabs.Screen 
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: 'center',
                paddingTop: 16,
                width: SIZES.width / 4,
              }}>
                <Image 
                  source={ focused ? icons.home : icons.home2Outline}
                  contentFit='contain'
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Home</Text>
              </View>
            )
          }
        }} 
      />
      <Tabs.Screen 
        name="cart"
        options={{
          title: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: 'center',
                paddingTop: 16,
                width: SIZES.width / 4,
              }}>
                <Image 
                  source={ focused ? icons.bag3 : icons.bag3Outline}
                  contentFit='contain'
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Cart</Text>
              </View>
            )
          }
        }} 
      />
      <Tabs.Screen 
        name="orders" 
        options={{
          title: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: 'center',
                paddingTop: 16,
                width: SIZES.width / 4,
              }}>
                <Image 
                  source={focused ? icons.cart : icons.cartOutline}
                  contentFit='contain'
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Orders</Text>
              </View>
            )
          }
        }} 
      />
      <Tabs.Screen 
        name="wallet" 
        options={{
          title: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: 'center',
                paddingTop: 16,
                width: SIZES.width / 4,
              }}>
                <Image 
                  source={focused ? icons.wallet2 : icons.wallet2Outline}
                  contentFit='contain'
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Wallet</Text>
              </View>
            )
          }
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: '',
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: 'center',
                paddingTop: 16,
                width: SIZES.width / 4,
              }}>
                <Image 
                  source={focused ? icons.user : icons.userOutline}
                  contentFit='contain'
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? dark ? COLORS.white : COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Profile</Text>
              </View>
            )
          }
        }} 
      />
    </Tabs>
  )
};

export default TabLayout;