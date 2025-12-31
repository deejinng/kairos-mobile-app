import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../components/Navbar';

const defaultPlans = [
  {
    id: 'seeker',
    name: 'The Seeker',
    times: ['6:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'],
    desc: 'For those seeking intimacy with God throughout the day.',
  },
  {
    id: 'prayer',
    name: 'The Prayer',
    times: ['12:00 AM', '6:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'],
    desc: 'For steadfast hearts who commune continually with the Father.',
  },
  {
    id: 'watcher',
    name: 'The Watcher',
    times: ['12:00 AM', '3:00 AM', '6:00 AM', '6:00 PM', '9:00 PM'],
    desc: 'For intercessors who watch in the Spirit day and night.',
  },
  {
    id: 'intercessor',
    name: 'The Intercessor',
    times: ['Various'],
    desc: 'Pray through scripture and prophetic utterance — stand in the gap.',
  },
];

export default function Plans() {
  const router = useRouter();
  const [customPlans, setCustomPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Load Custom Plans from AsyncStorage whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchPlans = async () => {
        try {
          const stored = await AsyncStorage.getItem('customPlans');
          if (stored) {
            const parsed = JSON.parse(stored);
            setCustomPlans(parsed);
          } else {
            setCustomPlans([]);
          }
        } catch (error) {
          console.error('Error loading plans:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPlans();
    }, [])
  );

  // ✅ Navigate correctly to dynamic route
  const handleStartPlan = (planName: string) => {
    router.push({ pathname: '/plans/[planName]', params: { planName } });
  };

  const handleNewPlan = () => {
    router.push('/plans/new');
  };

  if (loading) {
    return (
      <LinearGradient colors={['#4B0082', '#7B1FA2', '#8A2BE2']} style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color="#E6E6FA" size="large" />
          <Text style={{ color: '#E6E6FA', marginTop: 10 }}>Loading your plans...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#4B0082', '#7B1FA2', '#8A2BE2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Kairos</Text>
        </View>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Prayer Plans</Text>

        {/* Default Plans */}
        <Text style={styles.sectionTitle}>✨ Default Plans</Text>
        {defaultPlans.map((plan) => (
          <View key={plan.id} style={styles.card}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDesc}>{plan.desc}</Text>
            <Text style={styles.planTimes}>🕒 {plan.times.join(' • ')}</Text>

            <TouchableOpacity style={styles.startButton} onPress={() => handleStartPlan(plan.name)}>
              <Text style={styles.startText}>Start This Plan</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Custom Plans */}
        {customPlans.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>🌿 Your Custom Plans</Text>
            {customPlans.map((plan, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.planName}>{plan.name}</Text>
                {plan.description ? <Text style={styles.planDesc}>{plan.description}</Text> : null}
                <Text style={styles.planTimes}>🕒 {plan.times.join(' • ')}</Text>

                <TouchableOpacity style={styles.startButton} onPress={() => handleStartPlan(plan.name)}>
                  <Text style={styles.startText}>Open Plan</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* Add New Plan */}
        <TouchableOpacity style={styles.addButton} onPress={handleNewPlan}>
          <Text style={styles.addText}>+ Add New Plan</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navbar */}
      <Navbar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 80 },
  header: { marginBottom: 10 },
  appTitle: { color: '#FFFFFF', fontSize: 26, fontWeight: '700' },
  pageTitle: { color: '#E6E6FA', fontSize: 22, fontWeight: '600', marginBottom: 20 },
  sectionTitle: { color: '#FFD700', fontSize: 18, fontWeight: '600', marginBottom: 10 },
  card: {
    backgroundColor: '#FFFFFF22',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#D8BFD8',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  planName: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 6 },
  planDesc: { color: '#E6E6FA', fontSize: 14, marginBottom: 10 },
  planTimes: { color: '#FFFFFF', fontSize: 15, marginBottom: 16 },
  startButton: {
    backgroundColor: '#D8BFD8',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'flex-start',
  },
  startText: { color: '#4B0082', fontWeight: '700', fontSize: 15 },
  addButton: {
    backgroundColor: '#FFFFFF33',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  addText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
