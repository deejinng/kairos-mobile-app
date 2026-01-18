import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BackgroundGradient from "@/components/BackgroundGradient";
import "../global.css"; // Keep if you're using Tailwind/NativeWind

// Prevent splash from auto-hiding (do this outside the component)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
    // Add more fonts here if needed
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
