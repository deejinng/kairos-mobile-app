import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

export type ViewState = "altar" | "selectDuration" | "praying";

export interface PrayerState {
  view: ViewState;
  duration: number | null;
  startTime: number | null;
  remaining: number;
  savedAt: number;
}

export const usePrayerState = () => {
  const savePrayerState = useCallback(
    async (
      currentView: ViewState,
      currentDuration: number | null,
      startTime: number | null,
      currentRemaining: number,
    ) => {
      try {
        const state: PrayerState = {
          view: currentView,
          duration: currentDuration,
          startTime,
          remaining: currentRemaining,
          savedAt: Date.now(),
        };
        await AsyncStorage.setItem("prayerState", JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save prayer state:", error);
      }
    },
    [],
  );

  const loadPrayerState = useCallback(async () => {
    try {
      const stateJson = await AsyncStorage.getItem("prayerState");
      if (stateJson) {
        return JSON.parse(stateJson) as PrayerState;
      }
    } catch (error) {
      console.error("Failed to load prayer state:", error);
    }
    return null;
  }, []);

  const clearPrayerState = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("prayerState");
    } catch (error) {
      console.error("Failed to clear prayer state:", error);
    }
  }, []);

  return {
    savePrayerState,
    loadPrayerState,
    clearPrayerState,
  };
};
