import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Cross } from "lucide-react-native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Prevent splash from hiding until fonts are ready
SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  const router = useRouter();

  // Animation values
  const iconScale = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  // Load fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  // Run entrance animation once fonts are loaded
  useEffect(() => {
    if (!fontsLoaded) return;

    SplashScreen.hideAsync();

    // Icon zooms in smoothly
    iconScale.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [fontsLoaded, iconScale]);

  // Icon animation style
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  // Whole screen fade-out animation
  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  // Handle Start button press
  const handleStart = () => {
    // Fade screen out
    screenOpacity.value = withTiming(
      0,
      { duration: 500, easing: Easing.inOut(Easing.ease) },
      () => {
        // Navigate only after animation finishes
        runOnJS(router.replace)("/(main)/home");
      },
    );
  };

  // While fonts load, show purple background
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#1a0f2e" }} />;
  }

  return (
    <Animated.View style={[{ flex: 1 }, screenStyle]}>
      <LinearGradient
        colors={["#1a0f2e", "#2d1b4e", "#1a0f2e"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        {/* App Icon */}
        <Animated.View style={iconStyle}>
          <Cross size={80} color="#FFFFFF" strokeWidth={1.5} />
        </Animated.View>

        {/* App Title */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 36,
            color: "#FFFFFF",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Kairos
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 20,
            color: "#FFFFFF",
            opacity: 0.85,
            marginTop: 10,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Seek your Father in prayer. He hears you.
        </Text>

        {/* Scripture */}
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 24,
            opacity: 0.9,
          }}
        >
          &quot;Men ought always to pray, and not to faint.&quot;{"\n"}– Luke
          18:1 (KJV)
        </Text>

        {/* Start Button */}
        <TouchableOpacity
          onPress={handleStart}
          style={{
            position: "absolute",
            bottom: 60,
            backgroundColor: "#FFFFFF",
            paddingVertical: 14,
            paddingHorizontal: 110,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              color: "#5B21B6",
              fontSize: 16,
              fontFamily: "Inter_600SemiBold",
              letterSpacing: 1,
            }}
          >
            START
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}
