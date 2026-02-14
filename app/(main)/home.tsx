// app/(main)/home.tsx
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Animated,
  AppState,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  AppStateStatus,
} from "react-native";
import Navbar from "../../components/Navbar";
import { PrayerTimer } from "../../components/PrayerTimer";
import { SacredHourDisplay } from "../../components/SacredHourDisplay";
import { COLORS } from "../../constants/appConstants";
import { usePrayerState, ViewState } from "../../hooks/usePrayerState";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const { width, height } = Dimensions.get("window");

const prayerHours = [
  { hour: 0, name: "The Midnight Hour", subtitle: "WARFARE • NIGHT PRAYER" },
  { hour: 3, name: "The Third Hour", subtitle: "REVELATION • MORNING WATCH" },
  { hour: 6, name: "The Sixth Hour", subtitle: "PRIME • DAWN SACRIFICE" },
  { hour: 9, name: "The Ninth Hour", subtitle: "TERCE • THIRD HOUR" },
  { hour: 12, name: "The Twelfth Hour", subtitle: "SEXT • MIDDAY PRAYER" },
  { hour: 15, name: "The Ninth Hour", subtitle: "HOUR OF MERCY • AFTERNOON" },
  {
    hour: 18,
    name: "The Twelfth Hour",
    subtitle: "VESPERS • EVENING SACRIFICE",
  },
  {
    hour: 21,
    name: "The Third Hour",
    subtitle: "COMPLINE • NIGHT PRAYER",
  },
];

const prayerScriptures = [
  { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
  {
    ref: "Jeremiah 29:13",
    text: "Ye shall seek me, and find me, when ye shall search for me with all your heart.",
  },
  {
    ref: "Philippians 4:6",
    text: "In every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
  },
  {
    ref: "Matthew 6:14",
    text: "For if ye forgive men their trespasses, your heavenly Father will also forgive you.",
  },
  {
    ref: "Ephesians 6:18",
    text: "Praying always with all prayer and supplication in the Spirit.",
  },
  {
    ref: "Psalm 145:18",
    text: "The Lord is nigh unto all them that call upon him, to all that call upon him in truth.",
  },
  {
    ref: "James 5:16",
    text: "The effectual fervent prayer of a righteous man availeth much.",
  },
  {
    ref: "Matthew 21:22",
    text: "And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.",
  },
];

const anchorScriptures = [
  {
    ref: "Luke 18:1",
    text: "And he spake a parable unto them to this end, that men ought always to pray, and not to faint;",
  },
  {
    ref: "Psalm 55:17",
    text: "Evening, and morning, and at noon, will I pray, and cry aloud: and he shall hear my voice.",
  },
  {
    ref: "1 Chronicles 16:11",
    text: "Seek the Lord and his strength, seek his face continually.",
  },
  {
    ref: "Colossians 4:2",
    text: "Continue in prayer, and watch in the same with thanksgiving.",
  },
  {
    ref: "Romans 12:12",
    text: "Rejoicing in hope; patient in tribulation; continuing instant in prayer.",
  },
];

async function scheduleSacredHourNotifications() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Notification permissions not granted");
      return false;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("prayer-reminders", {
        name: "Sacred Hour Reminders",
        importance: Notifications.AndroidImportance.MAX,
        sound: "default",
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#D4AF37",
        enableVibrate: true,
        enableLights: true,
      });
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const prayerHour of prayerHours) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🕊️ SACRED HOUR",
          body: `${prayerHour.name} - The Lord is calling you to pause and pray.`,
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.MAX,
          categoryIdentifier: "PRAYER_REMINDER",
          data: {
            sacredHour: prayerHour.hour,
            prayerName: prayerHour.name,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: prayerHour.hour,
          minute: 0,
        },
      });
    }

    console.log("Sacred hour notifications scheduled successfully");
    return true;
  } catch (error) {
    console.error("Notification setup error:", error);
    return false;
  }
}

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [view, setView] = useState<ViewState>("altar");
  const [duration, setDuration] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [prayerStartTime, setPrayerStartTime] = useState<number | null>(null);

  const pulseAnim = useState(new Animated.Value(1))[0];
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const { savePrayerState, loadPrayerState, clearPrayerState } =
    usePrayerState();

  // Pick random anchor scripture on mount
  const anchorScripture = useMemo(() => {
    return anchorScriptures[
      Math.floor(Math.random() * anchorScriptures.length)
    ];
  }, []);

  // Load saved prayer state on mount
  useEffect(() => {
    const restoreState = async () => {
      const restored = await loadPrayerState();
      if (restored) {
        setView(restored.view);
        setDuration(restored.duration);
        setPrayerStartTime(restored.prayerStartTime);

        // Recalculate remaining time based on elapsed time
        if (restored.prayerStartTime) {
          const elapsed = Math.floor(
            (Date.now() - restored.prayerStartTime) / 1000,
          );
          if (restored.duration) {
            // Timed prayer
            setRemaining(Math.max(0, restored.duration - elapsed));
          } else {
            // Open-ended prayer
            setRemaining(elapsed);
          }
        }
      }
    };
    restoreState();
  }, [loadPrayerState]);

  // Save state whenever prayer session changes
  useEffect(() => {
    if (view === "praying" && prayerStartTime) {
      savePrayerState(view, duration, prayerStartTime, remaining);
    }
  }, [view, duration, remaining, prayerStartTime, savePrayerState]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // App coming to foreground
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // Recalculate remaining time based on actual elapsed time
        if (view === "praying" && prayerStartTime) {
          const elapsed = Math.floor((Date.now() - prayerStartTime) / 1000);
          if (duration) {
            // Timed prayer - count down
            setRemaining(Math.max(0, duration - elapsed));
          } else {
            // Open-ended prayer - count up
            setRemaining(elapsed);
          }
        }

        // Stop any ongoing vibration
        if (Platform.OS === "android") {
          Vibration.cancel();
        }
      }
      // App going to background
      else if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        if (view === "praying" && prayerStartTime) {
          savePrayerState(view, duration, prayerStartTime, remaining);
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [view, duration, remaining, prayerStartTime, savePrayerState]);

  // Live clock - updates every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Setup notifications on mount
  useEffect(() => {
    scheduleSacredHourNotifications();
  }, []);

  // Prayer timer - handles both timed and open-ended prayer
  useEffect(() => {
    if (view !== "praying" || !prayerStartTime) return;

    const interval = setInterval(() => {
      if (duration) {
        // Timed prayer - count down
        setRemaining((r) => Math.max(0, r - 1));
      } else {
        // Open-ended prayer - count up
        setRemaining((r) => r + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [view, duration, prayerStartTime]);

  // Auto-finish timed prayer when time runs out
  useEffect(() => {
    if (duration && remaining <= 0 && view === "praying") {
      setShowModal(true);
    }
  }, [remaining, duration, view]);

  // Determine greeting based on time of day
  const greeting = useMemo(() => {
    const h = now.getHours();
    if (h >= 0 && h < 6) return "Good Evening";
    if (h >= 6 && h < 12) return "Good Morning";
    if (h >= 12 && h < 18) return "Good Afternoon";
    return "Good Evening";
  }, [now]);

  // Check if current hour is a sacred hour
  const currentSacredHour = useMemo(() => {
    const h = now.getHours();
    return prayerHours.find((ph) => ph.hour === h);
  }, [now]);

  // Pulse animation for sacred hour indicator
  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;

    if (currentSacredHour) {
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
    } else {
      pulseAnim.setValue(1);
    }

    return () => loop?.stop();
  }, [currentSacredHour, pulseAnim]);

  // Rotate scripture every 2 minutes during prayer
  const activeScripture = useMemo(() => {
    const index =
      Math.floor(Math.abs(remaining) / 120) % prayerScriptures.length;
    return prayerScriptures[index];
  }, [remaining]);

  // Can only finish prayer if: open-ended OR timed prayer has completed
  const canFinishPrayer =
    duration === null || (duration !== null && remaining <= 0);

  const minutes = Math.floor(Math.abs(remaining) / 60);
  const seconds = Math.abs(remaining) % 60;

  const handleStartPraying = () => {
    const startTime = Date.now();
    setRemaining(duration ?? 0);
    setPrayerStartTime(startTime);
    setView("praying");
    savePrayerState("praying", duration, startTime, duration ? 0 : 0);
  };

  const handleFinishPrayer = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setView("altar");
    setPrayerStartTime(null);
    setDuration(null);
    setRemaining(0);
    clearPrayerState();
  };

  const handleBackToAltar = () => {
    setView("altar");
    setPrayerStartTime(null);
    setDuration(null);
    setRemaining(0);
    clearPrayerState();
  };

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.secondary, COLORS.background]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          {view === "altar" && (
            <>
              {/* <Text style={styles.headerLabel}>JERUSALEM TIME</Text> */}
              <Text style={styles.appTitle}>KAIROS</Text>

              <Text style={styles.time}>
                {now.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>

              <Text style={styles.greeting}>{greeting}</Text>

              <View style={styles.scriptureBox}>
                <Text style={styles.scriptureText}>{anchorScripture.text}</Text>
                <View style={styles.divider} />
                <Text style={styles.scriptureRef}>{anchorScripture.ref}</Text>
              </View>

              {currentSacredHour && (
                <SacredHourDisplay
                  currentSacredHour={currentSacredHour}
                  pulseAnim={pulseAnim}
                />
              )}

              <TouchableOpacity
                style={styles.startButton}
                onPress={() => setView("selectDuration")}
              >
                <Text style={styles.startIcon}>✨</Text>
                <Text style={styles.startText}>START</Text>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                &quot;LORD, TEACH US TO PRAY&quot;
              </Text>
            </>
          )}

          {view === "selectDuration" && (
            <>
              <TouchableOpacity onPress={handleBackToAltar}>
                <Text style={styles.back}>← Go Back</Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Choose Prayer Time</Text>

              {[5, 10, 15, 30, 45, 60].map((min) => {
                const selected = duration === min * 60;
                return (
                  <TouchableOpacity
                    key={min}
                    style={[styles.option, selected && styles.optionSelected]}
                    onPress={() => setDuration(min * 60)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.optionTextSelected,
                      ]}
                    >
                      {min} Minutes
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                style={[
                  styles.option,
                  duration === null && styles.optionSelected,
                ]}
                onPress={() => setDuration(null)}
              >
                <Text
                  style={[
                    styles.optionText,
                    duration === null && styles.optionTextSelected,
                  ]}
                >
                  I just wanna speak with God
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartPraying}
              >
                <Text style={styles.startIcon}>✨</Text>
                <Text style={styles.startText}>START PRAYING</Text>
              </TouchableOpacity>
              <View style={{ height: 80 }} />
            </>
          )}

          {view === "praying" && (
            <>
              <PrayerTimer
                minutes={minutes}
                seconds={seconds}
                canFinishPrayer={canFinishPrayer}
                onBack={handleBackToAltar}
                onFinish={handleFinishPrayer}
              />

              <View style={styles.scriptureBox}>
                <Text style={styles.scriptureText}>{activeScripture.text}</Text>
                <View style={styles.divider} />
                <Text style={styles.scriptureRef}>{activeScripture.ref}</Text>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      <Navbar />

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Pause. Write. Listen.</Text>
          <Text style={styles.modalText}>
            Write what the Lord has spoken. Guard it.
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.startText}>AMEN</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingTop: 70,
    paddingBottom: 140,
    paddingHorizontal: 24,
    alignItems: "center",
    minHeight: height,
  },
  headerLabel: {
    fontSize: 11,
    color: "#D4AF37",
    letterSpacing: 2,
    fontWeight: "600",
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 20,
    color: COLORS.primary,
    letterSpacing: 4,
    fontWeight: "700",
    marginBottom: 40,
  },
  time: {
    fontSize: 28,
    color: COLORS.primary,
    marginBottom: 12,
    fontWeight: "300",
    letterSpacing: 1,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "400",
    color: COLORS.text,
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
  },
  scriptureBox: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 24,
    borderRadius: 20,
    marginVertical: 20,
    width: width * 0.9,
    maxWidth: 440,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scriptureText: {
    color: COLORS.text,
    fontSize: 17,
    lineHeight: 28,
    textAlign: "center",
    fontStyle: "italic",
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    marginVertical: 12,
  },
  scriptureRef: {
    color: COLORS.primary,
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 1,
  },
  startButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 40,
    marginTop: 30,
    marginBottom: 40,
    minWidth: 260,
    borderWidth: 2,
    borderColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  startIcon: {
    fontSize: 18,
  },
  startText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 2,
    textAlign: "center",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 11,
    marginTop: 20,
    letterSpacing: 2,
    fontStyle: "italic",
  },
  back: {
    color: COLORS.primary,
    fontSize: 16,
    marginVertical: 20,
    fontWeight: "600",
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 30,
    textAlign: "center",
  },
  option: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 18,
    borderRadius: 20,
    width: width * 0.88,
    maxWidth: 400,
    marginVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderSecondary,
  },
  optionSelected: {
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    borderColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.text,
    fontSize: 16,
    textAlign: "center",
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  modal: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 36,
  },
  modalTitle: {
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "400",
  },
  modalText: {
    color: COLORS.textSecondary,
    fontSize: 17,
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 28,
  },
});
