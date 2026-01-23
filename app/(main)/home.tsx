import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  AppState,
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Navbar from "../../components/Navbar";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const { width } = Dimensions.get("window");

type ViewState = "altar" | "selectDuration" | "praying";

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

let lastNotifiedHour = -1;

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
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
        vibrationPattern: [0, 500, 200, 500],
        lightColor: "#D4AF37",
      });
    }

    console.log("Sacred hour notifications ready");
    return true;
  } catch (error) {
    console.error("Notification setup error:", error);
    return false;
  }
}

async function sendSacredHourNotification(hourName: string) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🕊️ SACRED HOUR",
        body: `${hourName} - The Lord is calling you to pause and pray.`,
        sound: "default",
      },
      trigger: null,
    });

    // Vibrate for 5 seconds (pattern repeats)
    Vibration.vibrate([0, 500, 200, 500, 200, 500, 200, 500, 200, 500]);
  } catch (error) {
    console.error("Failed to send notification:", error);
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

  // Save prayer state to AsyncStorage
  const savePrayerState = async (
    currentView: ViewState,
    currentDuration: number | null,
    startTime: number | null,
    currentRemaining: number,
  ) => {
    try {
      const state = {
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
  };

  // Load prayer state from AsyncStorage
  const loadPrayerState = async () => {
    try {
      const stateJson = await AsyncStorage.getItem("prayerState");
      if (stateJson) {
        const state = JSON.parse(stateJson);

        // Only restore if user was actively praying
        if (state.view === "praying" && state.startTime) {
          const elapsedSeconds = Math.floor(
            (Date.now() - state.savedAt) / 1000,
          );

          if (state.duration) {
            // Timed prayer - calculate new remaining time
            const newRemaining = state.remaining - elapsedSeconds;
            if (newRemaining > 0) {
              setView("praying");
              setDuration(state.duration);
              setRemaining(newRemaining);
              setPrayerStartTime(state.startTime);
            } else {
              // Prayer time finished while away
              await AsyncStorage.removeItem("prayerState");
            }
          } else {
            // Untimed prayer - continue counting up
            const newRemaining = state.remaining + elapsedSeconds;
            setView("praying");
            setDuration(null);
            setRemaining(newRemaining);
            setPrayerStartTime(state.startTime);
          }
        } else {
          // Clear old state if not praying
          await AsyncStorage.removeItem("prayerState");
        }
      }
    } catch (error) {
      console.error("Failed to load prayer state:", error);
    }
  };

  // Clear prayer state
  const clearPrayerState = async () => {
    try {
      await AsyncStorage.removeItem("prayerState");
    } catch (error) {
      console.error("Failed to clear prayer state:", error);
    }
  };

  // Load saved state on mount
  useEffect(() => {
    loadPrayerState();
  }, []);

  // Save state whenever prayer session changes
  useEffect(() => {
    if (view === "praying") {
      savePrayerState(view, duration, prayerStartTime, remaining);
    }
  }, [view, duration, remaining, prayerStartTime]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        // App came to foreground - reload prayer state
        loadPrayerState();
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
  }, [view, duration, remaining, prayerStartTime]);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Setup notifications on mount
  useEffect(() => {
    scheduleSacredHourNotifications();
  }, []);

  // Check for sacred hour and send notification ONCE per hour
  useEffect(() => {
    const currentHour = now.getHours();
    const isSacred = prayerHours.some((ph) => ph.hour === currentHour);

    if (isSacred && currentHour !== lastNotifiedHour) {
      const currentHourData = prayerHours.find((ph) => ph.hour === currentHour);
      if (currentHourData) {
        sendSacredHourNotification(currentHourData.name);
        lastNotifiedHour = currentHour;
      }
    }
  }, [now]);

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
      colors={["#1a0f2e", "#2d1b4e", "#1a0f2e"]}
      style={styles.container}
    >
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
              <Animated.View
                style={[
                  styles.sacredBadge,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <View style={styles.sacredDot} />
                <Text style={styles.sacredText}>ACTIVE HOUR</Text>
              </Animated.View>
            )}

            {/* Hour Name and Subtitle */}
            {currentSacredHour && (
              <View style={styles.hourInfo}>
                <Text style={styles.hourName}>{currentSacredHour.name}</Text>
                <Text style={styles.hourSubtitle}>
                  {currentSacredHour.subtitle}
                </Text>
              </View>
            )}

            {/* Start Button */}
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
            <View style={styles.timerBox}>
              <Text style={styles.minutes}>{minutes}</Text>
              <Text style={styles.seconds}>
                :{seconds.toString().padStart(2, "0")}
              </Text>
            </View>

            <View style={styles.scriptureBox}>
              <Text style={styles.scriptureText}>{activeScripture.text}</Text>
              <View style={styles.divider} />
              <Text style={styles.scriptureRef}>{activeScripture.ref}</Text>
            </View>

            <TouchableOpacity onPress={() => setView("altar")}>
              <Text style={styles.back}>← Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.startButton,
                !canFinishPrayer && styles.disabledButton,
              ]}
              disabled={!canFinishPrayer}
              onPress={() => setShowModal(true)}
            >
              <Text
                style={[
                  styles.startText,
                  !canFinishPrayer && styles.disabledText,
                ]}
              >
                I HAVE PRAYED
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

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
    color: "#D4AF37",
    letterSpacing: 4,
    fontWeight: "700",
    marginBottom: 40,
  },
  time: {
    fontSize: 28,
    color: "#D4AF37",
    marginBottom: 12,
    fontWeight: "300",
    letterSpacing: 1,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "400",
    color: "#FFFFFF",
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
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  scriptureText: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 28,
    textAlign: "center",
    fontStyle: "italic",
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: "#D4AF37",
    alignSelf: "center",
    marginVertical: 12,
  },
  scriptureRef: {
    color: "#D4AF37",
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
    color: "#D4AF37",
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
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  hourSubtitle: {
    fontSize: 12,
    color: "#D4AF37",
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
    borderColor: "#D4AF37",
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
    color: "#D4AF37",
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
    color: "#D4AF37",
    fontSize: 16,
    marginVertical: 20,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#FFFFFF",
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
    borderColor: "rgba(255,255,255,0.1)",
  },
  optionSelected: {
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    borderColor: "#D4AF37",
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  optionTextSelected: {
    color: "#D4AF37",
    fontWeight: "700",
  },
  timerBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 50,
  },
  minutes: {
    fontSize: 72,
    fontWeight: "300",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  seconds: {
    fontSize: 36,
    color: "#D4AF37",
    marginBottom: 12,
    marginLeft: 8,
    fontWeight: "300",
  },
  modal: {
    flex: 1,
    backgroundColor: "#1a0f2e",
    justifyContent: "center",
    alignItems: "center",
    padding: 36,
  },
  modalTitle: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "400",
  },
  modalText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 28,
  },
});
