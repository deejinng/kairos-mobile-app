import { View, Text } from "react-native";

export default function ReminderCard({ title, time }: { title: string; time: string }) {
  return (
    <View className="bg-purple-50 rounded-2xl p-4 m-2 shadow">
      <Text className="text-purple-700 text-lg font-bold mb-1">{title}</Text>
      <Text className="text-gray-600 text-base">{time}</Text>
    </View>
  );
}
