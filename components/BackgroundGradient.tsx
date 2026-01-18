// import { LinearGradient } from 'expo-linear-gradient';
// import { StyleSheet, ViewStyle } from 'react-native';
// import { PropsWithChildren } from 'react';

// export default function BackgroundGradient({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
//   return (
//     <LinearGradient
//       colors={['#2E2B59', '#3F2A6D', '#1A1438']}
//       start={{ x: 0.5, y: 0 }}
//       end={{ x: 0.5, y: 1 }}
//       style={[StyleSheet.absoluteFill, style]}
//     >
//       {children}
//     </LinearGradient>
//   );
// }


// components/BackgroundGradient.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ViewStyle } from 'react-native';
import { PropsWithChildren } from 'react';

export default function BackgroundGradient({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return (
    <LinearGradient
      colors={['#2E1A47', '#3F2A6D', '#1A1438', '#0F0B24']}  // Deep liturgical purple → almost black for depth
      start={{ x: 0.5, y: 0 }}   // Vertical flow from top
      end={{ x: 0.5, y: 1 }}
      style={[StyleSheet.absoluteFill, { flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
}