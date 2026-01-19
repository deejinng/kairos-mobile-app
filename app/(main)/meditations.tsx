// app/(main)/meditation.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "../../components/Navbar";

// Import external constants
import { dailyPsalms } from "../../constants/daily-psalms";
import { dailyVerses } from "../../constants/daily-verses";
import { dailyQuotes } from "../../constants/spiritual-quotes";
import { themes } from "../../constants/themes";

const { width } = Dimensions.get("window");
// const { width } = Dimensions.get("window");

const isTablet = width >= 768;

const scale = (size: number) => (width / 375) * size;

export default function MeditationScreen() {
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

  // Get daily content based on day of year
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }, []);

  const todaysVerse = dailyVerses[dayOfYear % dailyVerses.length];
  const todaysQuote = dailyQuotes[dayOfYear % dailyQuotes.length];
  const todaysPsalm = dailyPsalms[dayOfYear % dailyPsalms.length];

  return (
    <LinearGradient
      colors={["#1a0f2e", "#2d1b4e", "#1a0f2e"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Meditation</Text>
        <Text style={styles.subtitle}>Feed your soul with God&apos;s Word</Text>

        {/* VERSE OF THE DAY */}
        <View style={styles.dailyCard}>
          <Text style={styles.cardLabel}>VERSE OF THE DAY</Text>
          <Text style={styles.verseText}>{todaysVerse.text}</Text>
          <Text style={styles.verseRef}>{todaysVerse.ref}</Text>
        </View>

        {/* DAILY QUOTE */}
        <View style={styles.quoteCard}>
          <Text style={styles.cardLabel}>DAILY WISDOM</Text>
          <Text style={styles.quoteText}>&quot;{todaysQuote.text}&quot;</Text>
          <Text style={styles.quoteAuthor}>— {todaysQuote.author}</Text>
        </View>

        {/* DAILY PSALM */}
        <View style={styles.psalmCard}>
          <Text style={styles.cardLabel}>TODAY&apos;S PSALM</Text>
          <Text style={styles.psalmText}>{todaysPsalm.text}</Text>
          <Text style={styles.psalmRef}>{todaysPsalm.ref}</Text>
        </View>

        {/* THEMATIC SCRIPTURES */}
        <Text style={styles.sectionTitle}>Scriptures by Theme</Text>

        {Object.entries(themes).map(([key, theme]) => (
          <View key={key} style={styles.themeCard}>
            <TouchableOpacity
              style={styles.themeHeader}
              onPress={() =>
                setExpandedTheme(expandedTheme === key ? null : key)
              }
            >
              <View
                style={[styles.themeDot, { backgroundColor: theme.color }]}
              />
              <Text style={styles.themeTitle}>{theme.title}</Text>
              <Text style={styles.themeChevron}>
                {expandedTheme === key ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedTheme === key && (
              <View style={styles.themeExpanded}>
                {theme.verses.map((verse, idx) => (
                  <View key={idx} style={styles.themeVerse}>
                    <Text style={styles.themeVerseText}>{verse.text}</Text>
                    <Text style={styles.themeVerseRef}>— {verse.ref}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <Text style={styles.footer}>
          &quot;Thy word is a lamp unto my feet, and a light unto my path.&quot;
          {"\n"}— Psalm 119:105
        </Text>
      </ScrollView>

      <Navbar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingTop: 80,
    paddingBottom: 160,
    paddingHorizontal: 24,
  },

  //   header: {
  //     fontSize: 34,
  //     fontWeight: "700",
  //     color: "#FFFFFF",
  //     marginBottom: 8,
  //     textAlign: "center",
  //     letterSpacing: 1,
  //   },
  header: {
    fontSize: scale(isTablet ? 40 : 34),
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 16,
    color: "#D4AF37",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1,
  },

  dailyCard: {
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },

  quoteCard: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
  },

  psalmCard: {
    backgroundColor: "rgba(20, 184, 166, 0.15)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(20, 184, 166, 0.3)",
  },

  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D4AF37",
    letterSpacing: 2,
    marginBottom: 12,
  },

  //   verseText: {
  //     fontSize: 18,
  //     color: "#FFFFFF",
  //     lineHeight: 30,
  //     marginBottom: 12,
  //     fontStyle: "italic",
  //   },
  verseText: {
    fontSize: scale(18),
    lineHeight: scale(30),
    color: "#FFFFFF",
    marginBottom: 12,
    fontStyle: "italic",
  },

  verseRef: {
    fontSize: 14,
    color: "#D4AF37",
    fontWeight: "600",
    textAlign: "right",
  },

  quoteText: {
    fontSize: 17,
    color: "#FFFFFF",
    lineHeight: 28,
    marginBottom: 12,
    fontStyle: "italic",
  },

  quoteAuthor: {
    fontSize: 14,
    color: "#A78BFA",
    fontWeight: "600",
    textAlign: "right",
  },

  psalmText: {
    fontSize: 17,
    color: "#FFFFFF",
    lineHeight: 28,
    marginBottom: 12,
  },

  psalmRef: {
    fontSize: 14,
    color: "#14B8A6",
    fontWeight: "600",
    textAlign: "right",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 20,
  },

  themeCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  themeHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },

  themeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },

  themeTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  themeChevron: {
    fontSize: 14,
    color: "#D4AF37",
  },

  themeExpanded: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  themeVerse: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  themeVerseText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 26,
    marginBottom: 8,
  },

  themeVerseRef: {
    fontSize: 13,
    color: "#D4AF37",
    fontWeight: "600",
  },

  footer: {
    marginTop: 40,
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    lineHeight: 24,
    fontStyle: "italic",
  },
});
