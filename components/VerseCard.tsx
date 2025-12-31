import { View, Text } from "react-native";

export default function VerseCard({ verse, text }: { verse: string; text: string }) {
  return (
    <View className="bg-purple-100 rounded-2xl p-4 m-2 shadow">
      <Text className="text-purple-700 text-lg font-bold mb-2">{verse}</Text>
      <Text className="text-gray-700 text-base">{text}</Text>
    </View>
  );
}
