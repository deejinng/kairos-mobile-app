// app/(main)/about.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native';
import Navbar from '../../components/Navbar';

const { width } = Dimensions.get('window');

const EMAIL = 'olateju202@gmail.com';

export default function AboutScreen() {
  const [contactVisible, setContactVisible] = useState(false);

  const sendEmail = (subject: string) => {
    Linking.openURL(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`);
  };

  return (
    <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>About Kairos</Text>

        {/* Original About Section */}
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Kairos is a space for alignment.
            A quiet companion for prayer, reflection,
            and attentiveness to God.
          </Text>

          <Text style={styles.paragraph}>
            It is built around sacred rhythms in Scripture —
            moments where God invites response.
          </Text>
        </View>

        {/* New: Why Kairos Exists */}
        <Text style={styles.section}>Why Kairos Exists</Text>
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Modern life moves fast.
            Attention is scattered.
            Prayer is often rushed, postponed, or reduced to habit.
          </Text>

          <Text style={styles.paragraph}>
            Kairos was built to restore rhythm.
            To slow the soul.
            To help believers return to prayer not as duty,
            but as relationship.
          </Text>
        </View>

        {/* New: How to Use This App */}
        <Text style={styles.section}>How to Use This App</Text>
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            • Begin with the Home altar to enter prayer.
          </Text>
          <Text style={styles.paragraph}>
            • Learn the meaning of sacred hours in Watch.
          </Text>
          <Text style={styles.paragraph}>
            • Feed your prayers with Scripture.
          </Text>
          <Text style={styles.paragraph}>
            • Record what God speaks in Scribe.
          </Text>
        </View>

        {/* New: A Gentle Reminder */}
        <Text style={styles.section}>A Gentle Reminder</Text>
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Kairos does not replace Scripture.
            It does not replace the Church.
            It does not replace personal devotion.
          </Text>

          <Text style={styles.paragraph}>
            It is a companion — a quiet tool meant to support
            discipline, attentiveness, and faithfulness.
          </Text>
        </View>

        {/* Get Involved Section (from first version) */}
        <Text style={styles.section}>Get Involved</Text>
        <View style={styles.card}>
          <ActionButton
            label="Contact the Developer"
            onPress={() => setContactVisible(true)}
          />

          <ActionButton
            label="Report an Issue"
            onPress={() => sendEmail('Kairos App — Issue Report')}
          />

          <ActionButton
            label="Suggest a Feature"
            onPress={() => sendEmail('Kairos App — Feature Suggestion')}
          />

          <ActionButton
            label="Send Feedback"
            onPress={() => sendEmail('Kairos App — Feedback')}
          />
        </View>

        {/* Support Development */}
        <Text style={styles.section}>Support Development</Text>
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Kairos is independently built and maintained.
            If this app has helped you,
            you may support its development.
          </Text>

          <Text style={styles.paragraph}>
            Moniepoint
            {'\n'}Account Number: 8086976247
          </Text>
        </View>

        {/* Final Footer with Psalm */}
        <Text style={styles.footer}>
          “Teach us to number our days,
          that we may apply our hearts unto wisdom.”
          {'\n'}— Psalm 90:12{'\n\n'}
          Kairos exists to serve,
          not to impress.
        </Text>
      </ScrollView>

      <Navbar />

      {/* CONTACT MODAL */}
      <Modal visible={contactVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Contact the Developer</Text>

            <Text style={styles.modalText}>
              Email:
              {'\n'}olateju202@gmail.com
            </Text>

            <Text style={styles.modalText}>
              Phone:
              {'\n'}+234 808 697 6247
              {'\n'}+234 916 307 8466
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

/* ---------------- SMALL COMPONENT ---------------- */
function ActionButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionBtn}>
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    flexGrow: 1,
    paddingTop: 100,
    paddingBottom: 140,
    paddingHorizontal: 26,
  },

  header: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },

  section: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 36,
    marginBottom: 14,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 24,
    borderRadius: 24,
    width: width * 0.92,
    maxWidth: 440,
    alignSelf: 'center',
  },

  paragraph: {
    fontSize: 17,
    color: '#E5E7EB',
    lineHeight: 28,
    marginBottom: 12,
  },

  actionBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 22,
    marginBottom: 12,
  },

  actionText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  footer: {
    marginTop: 50,
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 26,
    fontStyle: 'italic',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 24,
    padding: 26,
    width: width * 0.9,
    maxWidth: 400,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalText: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 26,
    marginBottom: 14,
    textAlign: 'center',
  },

  modalBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 22,
    marginTop: 10,
  },

  modalBtnText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});