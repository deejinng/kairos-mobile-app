import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function NewPlan() {
  const router = useRouter();
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [times, setTimes] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  // 🕒 Add new time
  const handleAddTime = (event: any, selectedTime?: Date) => {
    setShowPicker(false);
    if (selectedTime) {
      const formatted = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimes([...times, formatted]);
    }
  };

  // ❌ Delete time
  const handleDeleteTime = (index: number) => {
    const updated = [...times];
    updated.splice(index, 1);
    setTimes(updated);
  };

  // 💾 Save plan
  const handleSavePlan = async () => {
    if (!planName.trim()) {
      alert('Please enter a plan title.');
      return;
    }

    if (times.length === 0) {
      alert('Please add at least one prayer time.');
      return;
    }

    const newPlan = {
      id: Date.now().toString(),
      name: planName.trim(),
      description: description.trim(),
      times,
    };

    try {
      const stored = await AsyncStorage.getItem('customPlans');
      const parsed = stored ? JSON.parse(stored) : [];

      // Add newest plan first
      const updatedPlans = [newPlan, ...parsed];

      await AsyncStorage.setItem('customPlans', JSON.stringify(updatedPlans));

      alert('✅ Your new prayer plan has been saved.');
      router.back();
    } catch (error) {
      console.error(error);
      alert('Error saving plan. Try again.');
    }
  };

  return (
    <LinearGradient colors={['#4B0082', '#8A2BE2']} style={styles.container}>
      <Text style={styles.header}>Kairos</Text>
      <Text style={styles.title}>Create a New Prayer Plan</Text>

      <TextInput
        style={styles.input}
        placeholder="Plan Title"
        placeholderTextColor="#D8BFD8"
        value={planName}
        onChangeText={setPlanName}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description (optional)"
        placeholderTextColor="#D8BFD8"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.addButtonText}>+ Add Prayer Time</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker mode="time" value={new Date()} onChange={handleAddTime} />
      )}

      <FlatList
        data={times}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.timeItemContainer}>
            <Text style={styles.timeItem}>🕒 {item}</Text>
            <TouchableOpacity onPress={() => handleDeleteTime(index)}>
              <Text style={styles.deleteText}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noTimes}>No times added yet.</Text>}
        style={styles.timeList}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan}>
        <Text style={styles.saveText}>Save Plan</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginBottom: 6 },
  title: { color: '#E6E6FA', fontSize: 18, marginBottom: 20 },
  input: {
    backgroundColor: '#FFFFFF22',
    borderRadius: 10,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  addButton: {
    backgroundColor: '#D8BFD8',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'flex-start',
  },
  addButtonText: { color: '#4B0082', fontWeight: '700', fontSize: 15 },
  timeList: { marginTop: 20, marginBottom: 20 },
  timeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeItem: { color: '#FFFFFF', fontSize: 16, marginBottom: 8 },
  deleteText: { color: '#FFCCCC', fontSize: 18, paddingLeft: 10 },
  noTimes: { color: '#D8BFD8', fontSize: 14, fontStyle: 'italic' },
  saveButton: {
    backgroundColor: '#D8BFD8',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: { color: '#4B0082', fontWeight: '700', fontSize: 16 },
});
