import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BackgroundGradient from "@/components/BackgroundGradient";
import { FONTS } from "@/constants/appConstants";
import "../global.css"; // Keep if you're using Tailwind/NativeWind

// Prevent splash from auto-hiding (do this outside the component)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [FONTS.regular]: Inter_400Regular,
    [FONTS.semibold]: Inter_600SemiBold,
    [FONTS.bold]: Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash even if fonts failed → better UX than stuck splash
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded, fontError]);

  // Important: show nothing (keep splash) until fonts are ready or failed
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <BackgroundGradient>
        <Stack screenOptions={{ headerShown: false }} />
      </BackgroundGradient>
    </SafeAreaProvider>
  );
}