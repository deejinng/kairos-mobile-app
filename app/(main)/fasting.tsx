import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Droplets,
  Moon,
  Play,
  Square,
  Sun,
  Sunrise,
} from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scaleFont, scaleSize, verticalScale } from "../../hooks/useResponsive";
import Navbar from "@/components/Navbar";
// ─── Types ────────────────────────────────────────────────────────────────────

type FastType = "water" | "partial" | "full" | "daniel";

interface FastState {
  active: boolean;
  type: FastType;
  startTime: number | null; // epoch ms
  intention: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "@kairos/fast_state";

const FAST_TYPES: {
  id: FastType;
  label: string;
  desc: string;
  icon: React.FC<any>;
}[] = [
  { id: "water", label: "Water Fast", desc: "Water only", icon: Droplets },
  { id: "partial", label: "Partial Fast", desc: "One meal a day", icon: Sun },
  {
    id: "daniel",
    label: "Daniel Fast",
    desc: "Vegetables & water",
    icon: Sunrise,
  },
  {
    id: "full",
    label: "Full Fast",
    desc: "Nothing — complete denial",
    icon: Moon,
  },
];

const FAST_SCRIPTURES: Record<FastType, { verse: string; ref: string }> = {
  water: {
    verse: "But when you fast, put oil on your head and wash your face.",
    ref: "Matthew 6:17",
  },
  partial: {
    verse:
      "So we fasted and petitioned our God about this, and he answered our prayer.",
    ref: "Ezra 8:23",
  },
  daniel: {
    verse: "I ate no choice food; no meat or wine touched my lips.",
    ref: "Daniel 10:3",
  },
  full: {
    verse:
      "Even now, return to me with all your heart, with fasting and weeping.",
    ref: "Joel 2:12",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDuration = (ms: number): { h: string; m: string; s: string } => {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(sec).padStart(2, "0"),
  };
};

const formatStartTime = (epoch: number): string => {
  const d = new Date(epoch);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// ─── Arc Progress (SVG-like via absolute Views) ───────────────────────────────

interface ArcProps {
  progress: number; // 0–1
  size: number;
}

const ArcRing: React.FC<ArcProps> = ({ progress, size }) => {
  const strokeW = scaleSize(6);
  const r = (size - strokeW * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * Math.min(progress, 1);
  // We simulate arc with a border-based circle + rotation trick
  return (
    <View
      style={{
        width: size,
        height: size,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Track ring */}
      <View
        style={{
          position: "absolute",
          width: size - strokeW,
          height: size - strokeW,
          borderRadius: (size - strokeW) / 2,
          borderWidth: strokeW,
          borderColor: "rgba(212,175,55,0.1)",
        }}
      />
      {/* Progress — we use opacity-based segments since RN has no SVG built-in */}
      {/* For a clean arc, render filled portion using border colors */}
      <View
        style={{
          position: "absolute",
          width: size - strokeW,
          height: size - strokeW,
          borderRadius: (size - strokeW) / 2,
          borderWidth: strokeW,
          borderTopColor: progress > 0 ? "#D4AF37" : "transparent",
          borderRightColor: progress > 0.25 ? "#D4AF37" : "transparent",
          borderBottomColor: progress > 0.5 ? "#D4AF37" : "transparent",
          borderLeftColor: progress > 0.75 ? "#D4AF37" : "transparent",
          transform: [{ rotate: "-90deg" }],
        }}
      />
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function FastingScreen() {
  const insets = useSafeAreaInsets();

  const [fast, setFast] = useState<FastState>({
    active: false,
    type: "water",
    startTime: null,
    intention: "",
  });
  const [elapsed, setElapsed] = useState(0); // ms
  const [loading, setLoading] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // ── Load from storage ──
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved: FastState = JSON.parse(raw);
          setFast(saved);
          if (saved.active && saved.startTime) {
            setElapsed(Date.now() - saved.startTime);
          }
        }
      } catch (e) {
        console.error("[Kairos] Failed to load fast state:", e);
      } finally {
        setLoading(false);
        Animated.timing(headerAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }
    })();
  }, []);

  // ── Timer tick ──
  useEffect(() => {
    if (fast.active && fast.startTime) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - (fast.startTime ?? Date.now()));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fast.active, fast.startTime]);

  // ── Pulse animation when active ──
  useEffect(() => {
    if (fast.active) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [fast.active]);

  const persist = useCallback(async (state: FastState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("[Kairos] Failed to save fast state:", e);
    }
  }, []);

  const startFast = () => {
    const next: FastState = { ...fast, active: true, startTime: Date.now() };
    setFast(next);
    setElapsed(0);
    persist(next);
  };

  const endFast = () => {
    Alert.alert(
      "End Fast",
      `You have fasted for ${time.h}h ${time.m}m. Break your fast with gratitude.`,
      [
        { text: "Continue Fasting", style: "cancel" },
        {
          text: "End Fast",
          style: "destructive",
          onPress: () => {
            const next: FastState = { ...fast, active: false, startTime: null };
            setFast(next);
            setElapsed(0);
            persist(next);
          },
        },
      ],
    );
  };

  const selectType = (type: FastType) => {
    if (fast.active) return; // can't change while fasting
    const next: FastState = { ...fast, type };
    setFast(next);
    persist(next);
  };

  const time = formatDuration(elapsed);
  const scripture = FAST_SCRIPTURES[fast.type];

  // Progress: treat 24h as a full ring
  const progress = elapsed / (24 * 60 * 60 * 1000);
  const arcSize = scaleSize(200);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#120a22",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Droplets size={scaleSize(28)} color="#D4AF37" strokeWidth={1.5} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#120a22" }}>
      <StatusBar barStyle="light-content" backgroundColor="#120a22" />

      {/* ── Header ── */}
      <Animated.View
        style={{
          opacity: headerAnim,
          transform: [
            {
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-12, 0],
              }),
            },
          ],
          paddingTop: insets.top + scaleSize(10),
          paddingHorizontal: scaleSize(20),
          paddingBottom: scaleSize(16),
          backgroundColor: "#1a0f2e",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(212,175,55,0.12)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scaleSize(8),
            marginBottom: scaleSize(6),
          }}
        >
          <Droplets size={scaleSize(14)} color="#D4AF37" strokeWidth={2} />
          <Text
            style={{
              fontSize: scaleFont(11),
              color: "#D4AF37",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            Sacred Discipline
          </Text>
        </View>
        <Text
          style={{
            fontSize: scaleFont(28),
            fontWeight: "700",
            color: "#FFFFFF",
            letterSpacing: 0.5,
          }}
        >
          Fasting
        </Text>
        <Text
          style={{
            fontSize: scaleFont(12),
            color: "rgba(255,255,255,0.35)",
            letterSpacing: 2,
            marginTop: 2,
          }}
        >
          DENY YOURSELF · DRAW NEAR
        </Text>

        {/* Active status pill */}
        {fast.active && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scaleSize(6),
              backgroundColor: "rgba(212,175,55,0.12)",
              paddingHorizontal: scaleSize(12),
              paddingVertical: scaleSize(6),
              borderRadius: scaleSize(20),
              borderWidth: 1,
              borderColor: "rgba(212,175,55,0.25)",
              alignSelf: "flex-start",
              marginTop: scaleSize(14),
            }}
          >
            <View
              style={{
                width: scaleSize(6),
                height: scaleSize(6),
                borderRadius: scaleSize(3),
                backgroundColor: "#D4AF37",
              }}
            />
            <Text
              style={{
                fontSize: scaleFont(11),
                color: "#D4AF37",
                fontWeight: "600",
              }}
            >
              Fast active · started{" "}
              {fast.startTime ? formatStartTime(fast.startTime) : ""}
            </Text>
          </View>
        )}
      </Animated.View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: scaleSize(16),
          paddingTop: scaleSize(16),
          paddingBottom: verticalScale(150) + insets.bottom + scaleSize(24),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Arc Timer ── */}
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
            alignItems: "center",
            marginBottom: scaleSize(8),
          }}
        >
          <ArcRing progress={progress} size={arcSize} />
          {/* Time overlay */}
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              width: arcSize,
              height: arcSize,
            }}
          >
            {fast.active ? (
              <>
                <Text
                  style={{
                    fontSize: scaleFont(38),
                    fontWeight: "200",
                    color: "#fff",
                    letterSpacing: 4,
                  }}
                >
                  {time.h}:{time.m}
                </Text>
                <Text
                  style={{
                    fontSize: scaleFont(13),
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: 2,
                  }}
                >
                  {time.s}s
                </Text>
                <Text
                  style={{
                    fontSize: scaleFont(10),
                    color: "#D4AF37",
                    letterSpacing: 1.5,
                    marginTop: scaleSize(4),
                  }}
                >
                  HOURS FASTED
                </Text>
              </>
            ) : (
              <>
                <Droplets
                  size={scaleSize(32)}
                  color="rgba(212,175,55,0.3)"
                  strokeWidth={1.5}
                />
                <Text
                  style={{
                    fontSize: scaleFont(12),
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: 1.5,
                    marginTop: scaleSize(8),
                  }}
                >
                  NOT FASTING
                </Text>
              </>
            )}
          </View>
        </Animated.View>

        {/* ── Fast Type Selector ── */}
        <Text
          style={{
            fontSize: scaleFont(10),
            color: "rgba(255,255,255,0.25)",
            letterSpacing: 2,
            textTransform: "uppercase",
            alignSelf: "flex-start",
            marginBottom: scaleSize(10),
            marginLeft: scaleSize(4),
          }}
        >
          Fast Type {fast.active ? "(active)" : ""}
        </Text>

        <View
          style={{
            width: "100%",
            gap: scaleSize(8),
            marginBottom: scaleSize(20),
          }}
        >
          {FAST_TYPES.map(({ id, label, desc, icon: Icon }) => {
            const selected = fast.type === id;
            return (
              <TouchableOpacity
                key={id}
                onPress={() => selectType(id)}
                activeOpacity={fast.active ? 1 : 0.75}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: selected ? "#1e1035" : "#150c28",
                  borderRadius: scaleSize(14),
                  padding: scaleSize(14),
                  borderWidth: 1,
                  borderColor: selected
                    ? "rgba(212,175,55,0.25)"
                    : "rgba(255,255,255,0.05)",
                  opacity: fast.active && !selected ? 0.4 : 1,
                }}
              >
                <View
                  style={{
                    width: scaleSize(38),
                    height: scaleSize(38),
                    borderRadius: scaleSize(10),
                    backgroundColor: selected
                      ? "rgba(212,175,55,0.12)"
                      : "rgba(255,255,255,0.06)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: scaleSize(12),
                  }}
                >
                  <Icon
                    size={scaleSize(17)}
                    color={selected ? "#D4AF37" : "rgba(255,255,255,0.25)"}
                    strokeWidth={2}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: scaleFont(13),
                      fontWeight: "600",
                      color: selected ? "#fff" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {label}
                  </Text>
                  <Text
                    style={{
                      fontSize: scaleFont(11),
                      color: selected
                        ? "rgba(212,175,55,0.6)"
                        : "rgba(255,255,255,0.2)",
                      marginTop: 2,
                    }}
                  >
                    {desc}
                  </Text>
                </View>
                {selected && (
                  <View
                    style={{
                      width: scaleSize(8),
                      height: scaleSize(8),
                      borderRadius: scaleSize(4),
                      backgroundColor: "#D4AF37",
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Scripture Card ── */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#1a0f2e",
            borderRadius: scaleSize(16),
            padding: scaleSize(18),
            borderWidth: 1,
            borderColor: "rgba(212,175,55,0.12)",
            marginBottom: scaleSize(20),
          }}
        >
          <Text
            style={{
              fontSize: scaleFont(10),
              color: "#D4AF37",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: scaleSize(10),
            }}
          >
            Scripture
          </Text>
          <Text
            style={{
              fontSize: scaleFont(14),
              color: "rgba(255,255,255,0.8)",
              lineHeight: scaleFont(22),
              fontStyle: "italic",
            }}
          >
            &quot;{scripture.verse}&quot;
          </Text>
          <Text
            style={{
              fontSize: scaleFont(11),
              color: "rgba(212,175,55,0.6)",
              marginTop: scaleSize(10),
              textAlign: "right",
            }}
          >
            — {scripture.ref}
          </Text>
        </View>

        {/* ── CTA ── */}
        {fast.active ? (
          <TouchableOpacity
            onPress={endFast}
            activeOpacity={0.85}
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: scaleSize(10),
              backgroundColor: "rgba(255,80,80,0.12)",
              borderRadius: scaleSize(14),
              paddingVertical: scaleSize(16),
              borderWidth: 1,
              borderColor: "rgba(255,80,80,0.25)",
            }}
          >
            <Square size={scaleSize(16)} color="#ff5050" strokeWidth={2} />
            <Text
              style={{
                color: "#ff5050",
                fontSize: scaleFont(15),
                fontWeight: "700",
                letterSpacing: 0.8,
              }}
            >
              End Fast
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={startFast}
            activeOpacity={0.85}
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: scaleSize(10),
              backgroundColor: "#7C3AED",
              borderRadius: scaleSize(14),
              paddingVertical: scaleSize(16),
              borderWidth: 1,
              borderColor: "rgba(212,175,55,0.25)",
            }}
          >
            <Play
              size={scaleSize(16)}
              color="#fff"
              strokeWidth={2}
              fill="#fff"
            />
            <Text
              style={{
                color: "#fff",
                fontSize: scaleFont(15),
                fontWeight: "700",
                letterSpacing: 0.8,
              }}
            >
              Begin Fast
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* ── Navbar ── */}
      <Navbar />
    </View>
  );
}
