import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../../components/Navbar';

// Configure notification handler BEFORE component
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const { width } = Dimensions.get('window');

type ViewState = 'altar' | 'selectDuration' | 'praying';

const prayerHours = [0, 3, 6, 9, 12, 15, 18, 21];

const prayerScriptures = [
  { ref: '1 Thessalonians 5:17', text: 'Pray without ceasing.' },
  { ref: 'Jeremiah 29:13', text: 'Ye shall seek me, and find me, when ye shall search for me with all your heart.' },
  { ref: 'Philippians 4:6', text: 'In every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
  { ref: 'Matthew 6:14', text: 'For if ye forgive men their trespasses, your heavenly Father will also forgive you.' },
  { ref: 'Ephesians 6:18', text: 'Praying always with all prayer and supplication in the Spirit.' },
  { ref: 'Galatians 2:20', text: 'I live; yet not I, but Christ liveth in me.' },
  { ref: 'John 13:35', text: 'By this shall all men know that ye are my disciples, if ye have love one to another.' },
];

const anchorScripture = {
  ref: 'Luke 18:1',
  text: 'And he spake a parable unto them to this end, that men ought always to pray, and not to faint;',

};

async function registerNotifications() {
  try {
    // 1. Permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Notification permissions not granted');
      return false;
    }

    // 2. ANDROID CHANNEL — MUST COME FIRST
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('prayer-reminders', {
        name: 'Prayer Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#3B82F6',
      });
    }

    // 3. Clear old notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 4. Schedule sacred hours
    for (const hour of prayerHours) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🕊 Sacred Hour',
          body: 'The Lord is calling you to pause and pray.',
          sound: 'default',
        },
        trigger: {
          hour,
          minute: 0,
          repeats: true,
          channelId: 'prayer-reminders', // safe on iOS
        },
      });
    }

    console.log('Sacred hour notifications scheduled');
    return true;
  } catch (error) {
    console.error('Notification setup error:', error);
    return false;
  }
}


export default function Home() {
  const [now, setNow] = useState(new Date());
  const [view, setView] = useState<ViewState>('altar');
  const [duration, setDuration] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const pulseAnim = useState(new Animated.Value(1))[0];



  // Live clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Register notifications on mount
  useEffect(() => {
    registerNotifications();
  }, []);

  // Prayer timer
  useEffect(() => {
    if (view !== 'praying') return;

    const timer = setInterval(() => {
      setRemaining(r => (duration ? r - 1 : r + 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [view, duration]);

  // Auto-finish timed prayer
  useEffect(() => {
    if (duration && remaining <= 0 && view === 'praying') {
      setShowModal(true);
    }
  }, [remaining, duration, view]);

  const greeting = useMemo(() => {
    const h = now.getHours();
    if (h === 0) return 'It is time to pray.';
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, [now]);

  const isSacredHour = prayerHours.includes(now.getHours());

  // Pulse when sacred hour
useEffect(() => {
  let loop: Animated.CompositeAnimation | null = null;

  if (isSacredHour) {
    loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
  } else {
    pulseAnim.setValue(1);
  }

  return () => loop?.stop();
}, [isSacredHour, pulseAnim]);



  const activeScripture = useMemo(() => {
    const index = Math.floor(Math.abs(remaining) / 120) % prayerScriptures.length;
    return prayerScriptures[index];
  }, [remaining]);

  const canFinishPrayer = duration === null || (duration !== null && remaining <= 0);

  const minutes = Math.floor(Math.abs(remaining) / 60);
  const seconds = Math.abs(remaining) % 60;

  return (
    <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {view === 'altar' && (
          <>
            <Text style={styles.time}>
              {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            <Text style={styles.greeting}>{greeting}</Text>

            {isSacredHour && (
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Text style={styles.sacred}>SACRED HOUR</Text>
              </Animated.View>
            )}

            <View style={styles.scriptureBox}>
              <Text style={styles.scriptureText}>{anchorScripture.text}</Text>
              <Text style={styles.scriptureRef}>{anchorScripture.ref}</Text>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setView('selectDuration')}
            >
              <Text style={styles.startText}>START</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'selectDuration' && (
          <>
            <TouchableOpacity onPress={() => setView('altar')}>
              <Text style={styles.back}>← Go Back</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Choose Prayer Time</Text>

            {[5, 10, 15, 30, 45, 60].map(min => {
              const selected = duration === min * 60;
              return (
                <TouchableOpacity
                  key={min}
                  style={[styles.option, selected && styles.optionSelected]}
                  onPress={() => setDuration(min * 60)}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {min} Minutes
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={[styles.option, duration === null && styles.optionSelected]}
              onPress={() => setDuration(null)}
            >
              <Text style={[styles.optionText, duration === null && styles.optionTextSelected]}>
                I just wanna speak with God
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                setRemaining(duration ?? 0);
                setView('praying');
              }}
            >
              <Text style={styles.startText}>START PRAYING</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'praying' && (
          <>
            <View style={styles.timerBox}>
              <Text style={styles.minutes}>{minutes}</Text>
              <Text style={styles.seconds}>:{seconds.toString().padStart(2, '0')}</Text>
            </View>

            <View style={styles.scriptureBox}>
              <Text style={styles.scriptureText}>{activeScripture.text}</Text>
              <Text style={styles.scriptureRef}>{activeScripture.ref}</Text>
            </View>

            <TouchableOpacity onPress={() => setView('altar')}>
              <Text style={styles.back}>← Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.startButton, !canFinishPrayer && styles.disabledButton]}
              disabled={!canFinishPrayer}
              onPress={() => setShowModal(true)}
            >
              <Text style={[styles.startText, !canFinishPrayer && styles.disabledText]}>
                I HAVE PRAYED
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <Navbar />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Pause. Write. Listen.</Text>
          <Text style={styles.modalText}>Write what the Lord has spoken. Guard it.</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              setShowModal(false);
              setView('altar');
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
    paddingTop: 100,
    paddingBottom: 140,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  time: { fontSize: 25, color: '#E0E7FF', marginBottom: 16 },
  greeting: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  sacred: {
    fontSize: 21,
    fontWeight: '700',
    color: '#FDE68A',
    marginBottom: 28,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 70,
  },
  minutes: { fontSize: 76, fontWeight: '800', color: '#FFFFFF' },
  seconds: {
    fontSize: 38,
    color: '#E0E7FF',
    marginBottom: 14,
    marginLeft: 10,
  },
  scriptureBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 28,
    borderRadius: 28,
    marginVertical: 20,
    width: width * 0.92,
    maxWidth: 440,
    alignSelf: 'center',
  },
  scriptureText: {
    color: '#FFFFFF',
    fontSize: 19,
    lineHeight: 30,
    textAlign: 'center',
  },
  scriptureRef: {
    color: '#D1D5DB',
    fontSize: 16,
    marginTop: 14,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 90,
    borderRadius: 34,
    marginTop: 40,
    minWidth: 260,
  },
  disabledButton: { backgroundColor: '#CBD5E1' },
  startText: {
    color: '#1E3A8A',
    fontWeight: '700',
    fontSize: 19,
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  disabledText: { color: '#64748B' },
  back: { color: '#E0E7FF', fontSize: 18, marginVertical: 35 },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 35,
    textAlign: 'center',
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 20,
    borderRadius: 28,
    width: width * 0.88,
    maxWidth: 400,
    marginVertical: 12,
    alignItems: 'center',
  },
  optionSelected: { backgroundColor: '#FFFFFF' },
  optionText: { color: '#FFFFFF', fontSize: 19, textAlign: 'center' },
  optionTextSelected: { color: '#1E3A8A', fontWeight: '700' },
  modal: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 36,
  },
  modalTitle: { fontSize: 28, color: '#FFFFFF', marginBottom: 24, textAlign: 'center' },
  modalText: {
    color: '#E0E7FF',
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 30,
  },
});