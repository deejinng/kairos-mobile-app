import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function initNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Notification permission denied');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('prayer', {
      name: 'Prayer Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }
}

export async function scheduleTestNotificationIn2Minutes() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Kairos',
      body: 'It is time to pray.',
      sound: 'default',
    },
    trigger: {
      seconds: 120, // 2 minutes for the first test of the android notifications
      channelId: 'prayer',
    },
  });
}
