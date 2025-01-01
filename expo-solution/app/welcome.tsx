import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "expo-router";

import { COLORS, SIZES, icons, images } from "../constants";
import { useTheme } from "../theme/ThemeProvider";
import SocialButtonV2 from "@/components/SocialButtonV2";

type Nav = {
    navigate: (value: string) => void
}

const Welcome = () => {
  const { navigate } = useNavigation<Nav>();
  const { colors, dark } = useTheme();

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={images.logo} resizeMode="contain" style={[styles.logo, { tintColor: dark ? COLORS.white : COLORS.black }]} />
        <Text style={[styles.title, { color: colors.text }]}>Welcome</Text>
        <Text style={[styles.subtitle, { color: dark ? COLORS.white : "black" }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        <View style={{ marginVertical: 32 }}>
          <SocialButtonV2 title="Continue with Apple" icon={icons.appleLogo} onPress={() => navigate("signup")} iconStyles={{ tintColor: dark? COLORS.white : COLORS.black }} />
          <SocialButtonV2 title="Continue with Google" icon={icons.google} onPress={() => navigate("signup")} />
          <SocialButtonV2 title="Continue with Email" icon={icons.email2} onPress={() => navigate("signup")} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.loginTitle, { color: dark ? COLORS.white : "black" }]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigate("login")}>
            <Text style={[styles.loginSubtitle, { color: dark ? COLORS.white : COLORS.primary }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
          <Text style={[styles.bottomTitle, { color: dark ? COLORS.white : COLORS.black }]}>By continuing, you accept the Terms Of Use and</Text>
          <TouchableOpacity onPress={() => navigate("login")}>
            <Text style={[styles.bottomSubtitle, { color: dark ? COLORS.white : COLORS.black }]}>Privacy Policy.</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
      flex: 1,
      backgroundColor: COLORS.white,
  },
  container: {
      flex: 1,
      backgroundColor: COLORS.white,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
  },
  logo: {
      width: 72,
      height: 72,
      marginBottom: 22,
      marginTop: -22,
      tintColor: COLORS.primary
  },
  title: {
      fontSize: 28,
      fontFamily: "bold",
      color: COLORS.black,
      marginVertical: 12,
      textAlign: "center",
  },
  subtitle: {
      fontSize: 12,
      fontFamily: "regular",
      color: "black",
      textAlign: "center",
      paddingHorizontal: 16,
  },
  loginTitle: {
      fontSize: 14,
      fontFamily: "regular",
      color: "black",
  },
  loginSubtitle: {
      fontSize: 14,
      fontFamily: "semiBold",
      color: COLORS.primary,
  },
  bottomContainer: {
      position: "absolute",
      bottom: 32,
      right: 0,
      left: 0,
      width: SIZES.width - 32,
      alignItems: "center",
  },
  bottomTitle: {
      fontSize: 12,
      fontFamily: "regular",
      color: COLORS.black,
  },
  bottomSubtitle: {
      fontSize: 12,
      fontFamily: "regular",
      color: COLORS.black,
      textDecorationLine: "underline",
      marginTop: 2,
  },
});

export default Welcome;