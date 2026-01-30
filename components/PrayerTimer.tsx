import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, DIMENSIONS } from "../constants/appConstants";

interface PrayerTimerProps {
  minutes: number;
  seconds: number;
  canFinishPrayer: boolean;
  onBack: () => void;
  onFinish: () => void;
}

const scale = (size: number) => {
  if (DIMENSIONS.tabletWidth >= 768) return size * DIMENSIONS.scaleTablet;
  if (DIMENSIONS.smallDeviceWidth < 375) return size * DIMENSIONS.scaleSmall;
  return size;
};

export const PrayerTimer: React.FC<PrayerTimerProps> = ({
  minutes,
  seconds,
  canFinishPrayer,
  onBack,
  onFinish,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          marginVertical: 50,
        }}
      >
        <Text
          style={{
            fontSize: scale(72),
            fontWeight: "300",
            color: COLORS.text,
            letterSpacing: 2,
          }}
        >
          {minutes}
        </Text>
        <Text
          style={{
            fontSize: scale(36),
            color: COLORS.primary,
            marginBottom: 12,
            marginLeft: 8,
            fontWeight: "300",
          }}
        >
          :{seconds.toString().padStart(2, "0")}
        </Text>
      </View>

      <TouchableOpacity onPress={onBack} style={{ marginVertical: 20 }}>
        <Text
          style={{
            color: COLORS.primary,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          ← Go Back
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            backgroundColor: "transparent",
            paddingVertical: 16,
            paddingHorizontal: 60,
            borderRadius: 40,
            marginTop: 30,
            minWidth: 260,
            borderWidth: 2,
            borderColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          },
          !canFinishPrayer && { borderColor: "#4A4A4A", opacity: 0.5 },
        ]}
        disabled={!canFinishPrayer}
        onPress={onFinish}
      >
        <Text
          style={[
            {
              color: COLORS.primary,
              fontWeight: "700",
              fontSize: 16,
              letterSpacing: 2,
              textAlign: "center",
            },
            !canFinishPrayer && { color: "#6B7280" },
          ]}
        >
          I HAVE PRAYED
        </Text>
      </TouchableOpacity>
    </>
  );
};
