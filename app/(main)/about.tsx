// app/(main)/about.tsx
import { LinearGradient } from "expo-linear-gradient";
import {
  Heart,
  BookOpen,
  Clock,
  Lightbulb,
  Users,
  Mail,
  Bug,
  Zap,
  Send,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "../../components/Navbar";

const { width, height } = Dimensions.get("window");
const openKofi = () => {
  Linking.openURL("https://ko-fi.com/olatejuolamide");
};

// Responsive helpers
const isSmallDevice = width < 375;
const isTablet = width >= 768;

const scale = (size: number) => {
  if (isTablet) return size * 1.2;
  if (isSmallDevice) return size * 0.9;
  return size;
};

const EMAIL = "olateju202@gmail.com";

export default function AboutScreen() {
  const [contactVisible, setContactVisible] = useState(false);

  const sendEmail = (subject: string) => {
    Linking.openURL(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`);
  };

  return (
    <LinearGradient
      colors={["#0a0312", "#17071e", "#2d1b4e"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>About Kairos</Text>

          {/* Original About Section */}
          <View style={styles.card}>
            <View style={styles.iconRow}>
              <Heart size={28} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <Text style={styles.paragraph}>
              Kairos is a sacred space for alignment. A quiet companion built
              for those who want to pray with intention, listen to Scripture,
              and record what God whispers into their lives.
            </Text>

            <Text style={styles.paragraph}>
              It is rooted in the sacred rhythms of Scripture—those moments
              where God invites response and relationship deepens.
            </Text>
          </View>

          {/* Why Kairos Exists */}
          <Text style={styles.section}>Why Kairos Exists</Text>

          <View style={styles.card}>
            <View style={styles.iconRow}>
              <Clock size={28} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <Text style={styles.paragraph}>
              In a world of endless noise, prayer has become rushed. We scroll
              instead of pray. We defer instead of seek.
            </Text>

            <Text style={styles.paragraph}>
              Kairos was born to restore what our souls hunger for: rhythm,
              silence, and genuine encounter with God. It&apos;s a tool to help
              you return to prayer—not as obligation, but as the most natural
              act of intimacy.
            </Text>
          </View>

          {/* How to Use This App */}
          <Text style={styles.section}>How to Use This App</Text>
          <View style={styles.card}>
            <IconRow
              icon={<Heart size={20} color="#D4AF37" strokeWidth={2} />}
              label="Altar"
              desc="Begin your prayer in a sacred space."
            />
            <IconRow
              icon={<Clock size={20} color="#D4AF37" strokeWidth={2} />}
              label="Watch"
              desc="Learn the sacredness of prayer times."
            />
            <IconRow
              icon={<BookOpen size={20} color="#D4AF37" strokeWidth={2} />}
              label="Feed"
              desc="Nourish your prayers with Scripture."
            />
            <IconRow
              icon={<Lightbulb size={20} color="#D4AF37" strokeWidth={2} />}
              label="Scribe"
              desc="Capture what God speaks to your heart."
            />
          </View>

          {/* A Gentle Reminder */}
          <Text style={styles.section}>What Kairos Is Not</Text>
          <View style={styles.card}>
            <View style={styles.iconRow}>
              <Users size={28} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <Text style={styles.paragraph}>
              Kairos does not replace Scripture. It does not replace the Church
              or personal Bible study.
            </Text>

            <Text style={styles.paragraph}>
              It is a companion—a quiet tool designed to support your
              discipline, deepen your attentiveness, and strengthen your
              faithfulness to prayer.
            </Text>
          </View>

          {/* Get Involved Section */}
          <Text style={styles.section}>Connect & Contribute</Text>
          <View style={styles.card}>
            <ActionButton
              icon={<Mail size={18} color="#D4AF37" strokeWidth={2} />}
              label="Contact the Developer"
              onPress={() => setContactVisible(true)}
            />

            <ActionButton
              icon={<Bug size={18} color="#D4AF37" strokeWidth={2} />}
              label="Report an Issue"
              onPress={() => sendEmail("Kairos App — Issue Report")}
            />

            <ActionButton
              icon={<Zap size={18} color="#D4AF37" strokeWidth={2} />}
              label="Suggest a Feature"
              onPress={() => sendEmail("Kairos App — Feature Suggestion")}
            />

            <ActionButton
              icon={<Send size={18} color="#D4AF37" strokeWidth={2} />}
              label="Send Feedback"
              onPress={() => sendEmail("Kairos App — Feedback")}
            />
          </View>

          <Text style={styles.section}>Support This Mission</Text>
          <View style={styles.card}>
            <View style={styles.iconRow}>
              <Heart size={28} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <Text style={styles.paragraph}>
              Kairos is independently created and maintained. Your support helps
              keep this ministry free and growing for everyone.
            </Text>

            <Text style={styles.supportInfo}>
              Access Bank · Nigeria
              {"\n"}Account: 1960476133
              {"\n"}Name: OLAMIDE OLATEJU EMMANUEL
            </Text>

            <TouchableOpacity style={styles.button} onPress={openKofi}>
              <Text style={styles.buttonText}>Support via Ko-fi</Text>
            </TouchableOpacity>

            <Text style={styles.featureNote}>
              🎯 Coming soon: version 1.4 will introduce guided prayer series,
              deeper fasting tracks, customizable prayer reminders, and more.
            </Text>
          </View>

          {/* Final Footer with Psalm */}
          <Text style={styles.footer}>
            &quot;Teach us to number our days, that we may apply our hearts unto
            wisdom.&quot;
            {"\n"}&mdash; Psalm 90:12{"\n\n"}
            Kairos exists to serve, not to impress.
          </Text>
        </ScrollView>
      </SafeAreaView>

      <Navbar />

      {/* CONTACT MODAL */}
      <Modal visible={contactVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Contact Developer</Text>

            <Text style={styles.modalText}>
              Email
              {"\n"}
              <Text style={styles.modalBold}>olateju202@gmail.com</Text>
            </Text>

            <Text style={styles.modalText}>
              Phone
              {"\n"}
              <Text style={styles.modalBold}>
                +234 808 697 6247{"\n"}+234 916 307 8466
              </Text>
            </Text>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setContactVisible(false)}
            >
              <Text style={styles.modalBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

/* Icon Row Component */
function IconRow({
  icon,
  label,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.iconBox}>{icon}</View>
      <View style={styles.featureContent}>
        <Text style={styles.featureLabel}>{label}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

/* Action Button Component */
function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon?: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionBtn}>
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    flexGrow: 1,
    paddingTop: scale(100),
    paddingBottom: 180, // Extra padding for navbar
    paddingHorizontal: isTablet ? 40 : 26,
    minHeight: height,
  },
  button: {
    backgroundColor: "#D4AF37", // sacred gold
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1a0f2e",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  header: {
    fontSize: scale(34),
    fontWeight: "700",
    color: "#D4AF37",
    marginBottom: scale(24),
    textAlign: "center",
    letterSpacing: 1,
  },

  section: {
    fontSize: scale(22),
    fontWeight: "600",
    color: "#D4AF37",
    marginTop: scale(36),
    marginBottom: scale(14),
    letterSpacing: 0.5,
    textAlign: isTablet ? "center" : "left",
  },

  card: {
    backgroundColor: "rgba(76, 20, 123, 0.24)",
    padding: isTablet ? 28 : 24,
    borderRadius: 24,
    width: "100%",
    maxWidth: isTablet ? 700 : 440,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    marginBottom: scale(16),
  },

  paragraph: {
    fontSize: scale(17),
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: scale(28),
    marginBottom: 12,
  },

  supportInfo: {
    fontSize: scale(17),
    color: "#D4AF37",
    lineHeight: scale(26),
    marginTop: 8,
    fontWeight: "600",
  },

  actionBtn: {
    backgroundColor: "transparent",
    paddingVertical: scale(14),
    paddingHorizontal: scale(18),
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#D4AF37",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    color: "#D4AF37",
    fontSize: scale(16),
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  footer: {
    marginTop: scale(50),
    marginBottom: 50,
    fontSize: scale(16),
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    lineHeight: scale(26),
    fontStyle: "italic",
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(26, 15, 46, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalCard: {
    backgroundColor: "#2d1b4e",
    borderRadius: 24,
    padding: isTablet ? 32 : 26,
    width: "90%",
    maxWidth: isTablet ? 500 : 400,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },

  modalTitle: {
    fontSize: scale(22),
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },

  modalText: {
    fontSize: scale(16),
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: scale(26),
    marginBottom: 14,
    textAlign: "center",
  },

  modalBtn: {
    backgroundColor: "#D4AF37",
    paddingVertical: scale(14),
    borderRadius: 22,
    marginTop: 10,
  },

  modalBtnText: {
    color: "#1a0f2e",
    fontSize: scale(16),
    fontWeight: "700",
    textAlign: "center",
  },

  iconRow: {
    marginBottom: 16,
    alignItems: "center",
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  iconBox: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(212, 175, 55, 0.12)",
    borderRadius: 14,
    marginRight: 14,
  },

  featureContent: {
    flex: 1,
  },

  featureLabel: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#D4AF37",
    marginBottom: 4,
  },

  featureDesc: {
    fontSize: scale(15),
    color: "rgba(255, 255, 255, 0.75)",
    lineHeight: scale(22),
  },

  buttonIcon: {
    marginRight: 10,
  },

  featureNote: {
    fontSize: scale(14),
    color: "rgba(255, 255, 255, 0.68)",
    lineHeight: scale(20),
    marginTop: 16,
    fontStyle: "italic",
    backgroundColor: "rgba(212, 175, 55, 0.08)",
    padding: 12,
    borderRadius: 12,
  },

  modalBold: {
    fontWeight: "700",
    color: "#D4AF37",
  },
});
