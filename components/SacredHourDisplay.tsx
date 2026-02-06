import React from "react";
import { Animated, Text, View } from "react-native";
//import { COLORS } from "../constants/appConstants";

interface SacredHourDisplayProps {
	currentSacredHour: { name: string; subtitle: string } | undefined;
	pulseAnim: Animated.Value;
}

export const SacredHourDisplay: React.FC<SacredHourDisplayProps> = ({
	currentSacredHour,
	pulseAnim,
}) => {
	if (!currentSacredHour) return null;

	return (
		<>
			{/* Sacred Hour Badge */}
			<Animated.View
				style={[
					{
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: "rgba(212, 175, 55, 0.15)",
						paddingVertical: 8,
						paddingHorizontal: 16,
						borderRadius: 20,
						marginTop: 10,
						borderWidth: 1,
						borderColor: COLORS.primary,
					},
					{ transform: [{ scale: pulseAnim }] },
				]}
			>
				<View
					style={{
						width: 8,
						height: 8,
						borderRadius: 4,
						backgroundColor: COLORS.primary,
						marginRight: 8,
					}}
				/>
				<Text
					style={{
						color: COLORS.primary,
						fontSize: 12,
						fontWeight: "700",
						letterSpacing: 1.5,
					}}
				>
					ACTIVE HOUR
				</Text>
			</Animated.View>

			{/* Hour Name and Subtitle */}
			<View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
				<Text
					style={{
						fontSize: 24,
						fontWeight: "400",
						color: COLORS.text,
						textAlign: "center",
						marginBottom: 6,
					}}
				>
					{currentSacredHour.name}
				</Text>
				<Text
					style={{
						fontSize: 12,
						color: COLORS.primary,
						letterSpacing: 2,
						fontWeight: "600",
					}}
				>
					{currentSacredHour.subtitle}
				</Text>
			</View>
		</>
	);
};
