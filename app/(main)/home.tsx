import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
} from "react-native";
import Navbar from "../../components/Navbar";
import { PrayerTimer } from "../../components/PrayerTimer";
import { SacredHourDisplay } from "../../components/SacredHourDisplay";
import { COLORS, DIMENSIONS } from "@/constants/appConstants";
import { usePrayerState, ViewState } from "../../hooks/usePrayerState";

// Configure notification handler - IMPORTANT: Th is controls what happens when notification arrives
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const { width, height } = Dimensions.get("window");

// Responsive helpers
const isSmallDevice = width < DIMENSIONS.smallDeviceWidth;
const isTablet = width >= DIMENSIONS.tabletWidth;

const scale = (size: number) => {
  if (isTablet) return size * DIMENSIONS.scaleTablet;
  if (isSmallDevice) return size * DIMENSIONS.scaleSmall;
  return size;
};

const prayerHours = [
  { hour: 0, name: "The Midnight Hour", subtitle: "MATINS • NIGHT PRAYER" },
  { hour: 3, name: "The Third Hour", subtitle: "LAUDS • MORNING WATCH" },
  { hour: 6, name: "The Sixth Hour", subtitle: "PRIME • DAWN SACRIFICE" },
  { hour: 9, name: "The Ninth Hour", subtitle: "TERCE • THIRD HOUR" },
  { hour: 12, name: "The Twelfth Hour", subtitle: "SEXT • MIDDAY PRAYER" },
  { hour: 15, name: "The Fifteenth Hour", subtitle: "NONE • AFTERNOON" },
  {
    hour: 18,
    name: "The Eighteenth Hour",
    subtitle: "VESPERS • EVENING SACRIFICE",
  },
  {
    hour: 21,
    name: "The Twenty-First Hour",
    subtitle: "COMPLINE • NIGHT PRAYER",
  },
];

const prayerScriptures = [
  { ref: "1 Thessalonians 5:17", text: '"Pray without ceasing."' },
  {
    ref: "Jeremiah 29:13",
    text: '"Ye shall seek me, and find me, when ye shall search for me with all your heart."',
  },
  {
    ref: "Philippians 4:6",
    text: '"In every thing by prayer and supplication with thanksgiving let your requests be made known unto God."',
  },
  {
    ref: "Matthew 6:14",
    text: '"For if ye forgive men their trespasses, your heavenly Father will also forgive you."',
  },
  {
    ref: "Ephesians 6:18",
    text: '"Praying always with all prayer and supplication in the Spirit."',
  },
];

const anchorScripture = {
  ref: "Luke 18:1",
  text: '"And he spake a parable unto them to this end, that men ought always to pray, and not to faint;"',
};

async function scheduleSacredHourNotifications() {
  try {
    // Request permissions
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

    // Setup notification channel for Android
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("prayer-reminders", {
        name: "Sacred Hour Reminders",
        importance: Notifications.AndroidImportance.MAX, // Changed to MAX for full-screen intent
        sound: "default",
        vibrationPattern: [0, 1000, 500, 1000, 500, 1000, 500, 1000], // 2 minutes of vibration pattern
        lightColor: "#D4AF37",
        enableVibrate: true,
        enableLights: true,
      });
    }

    // Cancel any existing notifications first
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule notifications for each sacred hour using DAILY trigger (works on both platforms)
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
          vibrate: [0, 1000, 500, 1000, 500, 1000, 500, 1000], // Vibration pattern
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: prayerHour.hour,
          minute: 0,
        },
      });
    }

    console.log("Daily sacred hour notifications scheduled successfully");
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

  const soundRef = useRef<Audio.Sound | null>(null);
  const [notificationAudioActive, setNotificationAudioActive] = useState(false);
  const vibrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { savePrayerState, loadPrayerState, clearPrayerState } =
    usePrayerState();

  // Load saved state on mount
  useEffect(() => {
    loadPrayerState();
  }, [loadPrayerState]);

  // Save state whenever prayer session changes
  useEffect(() => {
    if (view === "praying") {
      savePrayerState(view, duration, prayerStartTime, remaining);
    }
  }, [view, duration, remaining, prayerStartTime, savePrayerState]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        // App came to foreground - reload prayer state
        loadPrayerState();
        // Stop any ongoing vibration when app opens
        if (Platform.OS === "android") {
          Vibration.cancel();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // App going to background - save current state
        if (view === "praying") {
          savePrayerState(view, duration, prayerStartTime, remaining);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [
    view,
    duration,
    remaining,
    prayerStartTime,
    loadPrayerState,
    savePrayerState,
  ]);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Setup notifications on mount
  useEffect(() => {
    scheduleSacredHourNotifications();
  }, []);

  // Load sound
  useEffect(() => {
    const loadSound = async () => {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(require("../../assets/audio/song.mp3"));
        soundRef.current = sound;
      } catch (error) {
        console.error("Failed to load sound", error);
      }
    };
    loadSound();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  // Handle notification responses (when user taps notification)
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        console.log("Notification tapped:", response);

        // Stop any currently playing notification audio
        if (soundRef.current && notificationAudioActive) {
          await soundRef.current.stopAsync();
          setNotificationAudioActive(false);
        }

        // Stop vibration
        if (Platform.OS === "android") {
          Vibration.cancel();
        }

        if (vibrationTimeoutRef.current) {
          clearTimeout(vibrationTimeoutRef.current);
          vibrationTimeoutRef.current = null;
        }
      },
    );

    return () => subscription.remove();
  }, [notificationAudioActive]);

  // Handle notification received (when notification triggers)
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        console.log("Notification received:", notification);

        const currentHour = new Date().getHours();
        const isSacred = prayerHours.some((ph) => ph.hour === currentHour);

        if (isSacred && !notificationAudioActive) {
          // Start vibration for 2 minutes
          if (Platform.OS === "android") {
            const pattern = [0, 1000, 500, 1000, 500, 1000, 500, 1000];
            Vibration.vibrate(pattern, true); // Repeat pattern

            // Stop after 2 minutes
            vibrationTimeoutRef.current = setTimeout(() => {
              Vibration.cancel();
            }, 120000);
          }

          // Start playing audio for 2 minutes
          const sound = soundRef.current;
          if (sound) {
            setNotificationAudioActive(true);
            await sound.setIsLoopingAsync(true);
            await sound.playAsync();

            // Stop after 2 minutes
            setTimeout(async () => {
              await sound.stopAsync();
              setNotificationAudioActive(false);
            }, 120000); // 2 minutes
          }
        }
      },
    );

    return () => subscription.remove();
  }, [notificationAudioActive]);

  // Prayer timer
  useEffect(() => {
    if (view !== "praying") return;
    const timer = setInterval(() => {
      setRemaining((r) => (duration ? r - 1 : r + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [view, duration]);

  // Auto-finish timed prayer
  useEffect(() => {
    if (duration && remaining <= 0 && view === "praying") {
      setShowModal(true);
    }
  }, [remaining, duration, view]);

  const greeting = useMemo(() => {
    const h = now.getHours();
    if (h >= 0 && h < 6) return "Good Evening";
    if (h >= 6 && h < 12) return "Good Morning";
    if (h >= 12 && h < 18) return "Good Afternoon";
    return "Good Evening";
  }, [now]);

  const currentSacredHour = useMemo(() => {
    const h = now.getHours();
    return prayerHours.find((ph) => ph.hour === h);
  }, [now]);

  // Pulse when sacred hour
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

  const activeScripture = useMemo(() => {
    const index =
      Math.floor(Math.abs(remaining) / 120) % prayerScriptures.length;
    return prayerScriptures[index];
  }, [remaining]);

  const canFinishPrayer =
    duration === null || (duration !== null && remaining <= 0);

  const minutes = Math.floor(Math.abs(remaining) / 60);
  const seconds = Math.abs(remaining) % 60;

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.secondary, COLORS.background]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          {view === "altar" && (
            <>
              {/* Header with Jerusalem Time */}
              <Text style={styles.headerLabel}>JERUSALEM TIME</Text>
              <Text style={styles.appTitle}>KAIROS</Text>

              {/* Current Time */}
              <Text style={styles.time}>
                {now.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>

              {/* Greeting */}
              <Text style={styles.greeting}>{greeting}</Text>

              {/* Scripture Box */}
              <View style={styles.scriptureBox}>
                <Text style={styles.scriptureText}>{anchorScripture.text}</Text>
                <View style={styles.divider} />
                <Text style={styles.scriptureRef}>{anchorScripture.ref}</Text>
              </View>

              {/* Sacred Hour Badge (if active) */}
              {currentSacredHour && (
                <SacredHourDisplay
                  currentSacredHour={currentSacredHour}
                  pulseAnim={pulseAnim}
                />
              )}

              {/* Start Button */}
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => setView("selectDuration")}
              >
                <Text style={styles.startIcon}>✨</Text>
                <Text style={styles.startText}>START</Text>
              </TouchableOpacity>

              {/* Stop Notification Audio/Vibration Button */}
              {notificationAudioActive && (
                <TouchableOpacity
                  style={styles.disableButton}
                  onPress={async () => {
                    if (soundRef.current) {
                      await soundRef.current.stopAsync();
                      setNotificationAudioActive(false);
                    }
                    if (Platform.OS === "android") {
                      Vibration.cancel();
                    }
                    if (vibrationTimeoutRef.current) {
                      clearTimeout(vibrationTimeoutRef.current);
                      vibrationTimeoutRef.current = null;
                    }
                  }}
                >
                  <Text style={styles.disableText}>Stop Sacred Alert</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.footerText}>
                &quot;LORD, TEACH US TO PRAY&quot;
              </Text>
            </>
          )}

          {view === "selectDuration" && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setView("altar");
                  clearPrayerState();
                }}
              >
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
                onPress={() => {
                  setRemaining(duration ?? 0);
                  setPrayerStartTime(Date.now());
                  setView("praying");
                }}
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
                onBack={() => setView("altar")}
                onFinish={() => setShowModal(true)}
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
            onPress={() => {
              setShowModal(false);
              setView("altar");
              setPrayerStartTime(null);
              clearPrayerState();
            }}
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
  sacredBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D4AF37",
  },
  sacredDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D4AF37",
    marginRight: 8,
  },
  sacredText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  hourInfo: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  hourName: {
    fontSize: 24,
    fontWeight: "400",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 6,
  },
  hourSubtitle: {
    fontSize: 12,
    color: COLORS.primary,
    letterSpacing: 2,
    fontWeight: "600",
  },
  // startButton: {
  //   backgroundColor: "transparent",
  //   paddingVertical: 16,
  //   paddingHorizontal: 60,
  //   borderRadius: 40,
  //   marginTop: 30,
  //   minWidth: 260,
  //   borderWidth: 2,
  //   borderColor: "#D4AF37",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 8,
  // },
  startButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 40,
    marginTop: 30,
    marginBottom: 40, // 👈 ADD THIS
    minWidth: 260,
    borderWidth: 2,
    borderColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  disabledButton: { borderColor: "#4A4A4A", opacity: 0.5 },
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
  disabledText: { color: "#6B7280" },
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
  timerBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 50,
  },
  minutes: {
    fontSize: scale(72),
    fontWeight: "300",
    color: COLORS.text,
    letterSpacing: 2,
  },
  seconds: {
    fontSize: scale(36),
    color: COLORS.primary,
    marginBottom: 12,
    marginLeft: 8,
    fontWeight: "300",
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
  disableButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
  },
  disableText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 1,
  },
});
