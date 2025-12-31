// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
// import { useRouter, usePathname } from 'expo-router';
// // Using Lucide icons that fit the spiritual theme
// import { Clock, Box, Flame, Users, Shield } from 'lucide-react-native';

// const { width } = Dimensions.get('window');

// const Navbar = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const tabs = [
//     { label: 'Watch', icon: Clock, route: '/(main)/watch' },
//     { label: 'Ark', icon: Box, route: '/(main)/ark' },
//     { label: 'Altar', icon: Flame, route: '/(main)/home', isMain: true },
//     { label: 'Kin', icon: Users, route: '/(main)/fellowship' },
//     { label: 'Sacristy', icon: Shield, route: '/(main)/settings' },
//   ];

//   return (
//     <View style={styles.externalWrapper}>
//       <View style={styles.container}>
//         {tabs.map(({ label, icon: Icon, route, isMain }) => {
//           const isActive = pathname === route;
          
//           if (isMain) {
//             return (
//               <TouchableOpacity
//                 key={label}
//                 style={styles.mainTab}
//                 onPress={() => router.replace(route)}
//                 activeOpacity={0.8}
//               >
//                 <View style={styles.altarCircle}>
//                   <Icon size={28} color="#FFFFFF" strokeWidth={2.5} />
//                 </View>
//                 <Text style={styles.mainLabel}>{label}</Text>
//               </TouchableOpacity>
//             );
//           }

//           return (
//             <TouchableOpacity
//               key={label}
//               style={styles.tab}
//               onPress={() => router.replace(route)}
//             >
//               <Icon 
//                 size={22} 
//                 color={isActive ? '#FFD700' : '#A0A0A0'} 
//                 strokeWidth={isActive ? 2.5 : 2}
//               />
//               <Text style={[styles.label, isActive && styles.activeText]}>{label}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   externalWrapper: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#1A1A1A', // Deep charcoal for a premium, reverent feel
//     width: width,
//     height: 80,
//     paddingBottom: 20,
//     paddingHorizontal: 10,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderTopWidth: 0.5,
//     borderTopColor: '#333',
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainTab: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: -40, // This lifts the "Altar" button up
//   },
//   altarCircle: {
//     backgroundColor: '#B8860B', // Dark Goldenrod - Symbolic of the Ark/Altar gold
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//     shadowColor: '#FFD700',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     borderWidth: 3,
//     borderColor: '#1A1A1A',
//   },
//   label: {
//     color: '#A0A0A0',
//     fontSize: 10,
//     marginTop: 4,
//     fontFamily: 'Inter-Regular', // Use a clean font
//   },
//   mainLabel: {
//     color: '#FFD700',
//     fontSize: 11,
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
//   activeText: {
//     color: '#FFD700', // Gold color for active state
//     fontWeight: 'bold',
//   },
// });

// export default Navbar;


// import React from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { useRouter, usePathname } from 'expo-router';
// import { Home, Clock, BookOpen, PenTool, Settings } from 'lucide-react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const insets = useSafeAreaInsets(); // 👈 this fixes Android nav button overlap

//   const tabs = [
//     { label: 'Altar', icon: Home, route: '/(main)/home' },
//     { label: 'Watch', icon: Clock, route: '/(main)/watch' },
//     { label: 'Scripture', icon: BookOpen, route: '/(main)/scripture' },
//     { label: 'Scribe', icon: PenTool, route: '/(main)/notes' },
//     { label: 'Settings', icon: Settings, route: '/(main)/settings' },
//   ];

//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: '#1E3A8A',
//         paddingTop: 10,
//         paddingBottom: insets.bottom + 10, // 👈 SAFE AREA MAGIC
//         borderTopWidth: 1,
//         borderTopColor: 'rgba(255,255,255,0.15)',
//       }}
//     >
//       {tabs.map(({ label, icon: Icon, route }) => {
//         const isActive = pathname === route;

//         return (
//           <TouchableOpacity
//             key={label}
//             onPress={() => router.replace(route)}
//             style={{ alignItems: 'center', gap: 4 }}
//             activeOpacity={0.7}
//           >
//             <Icon
//               size={22}
//               color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
//             />

//             <Text
//               style={{
//                 fontSize: 11,
//                 color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
//                 fontWeight: isActive ? '600' : '400',
//                 letterSpacing: 0.3,
//               }}
//             >
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }



import { usePathname, useRouter } from 'expo-router';
import { BookOpen, Clock, Flame, PenTool, Settings } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const tabs = [
    { label: 'Watch', icon: Clock, route: '/(main)/watch' },
    { label: 'Scripture', icon: BookOpen, route: '/(main)/scripture' },
    { label: 'Altar', icon: Flame, route: '/(main)/home', isMain: true },
    { label: 'Scribe', icon: PenTool, route: '/(main)/notes' },
    { label: 'Settings', icon: Settings, route: '/(main)/settings' },
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width,
        paddingBottom: insets.bottom + 8,
        backgroundColor: '#1E3A8A',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.15)',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          height: 70,
        }}
      >
        {tabs.map(({ label, icon: Icon, route, isMain }) => {
          const isActive = pathname === route;

          // 🔥 ALTAR — CENTER, RAISED, GOLD-ANNOINTED
          if (isMain) {
            return (
              <TouchableOpacity
                key={label}
                onPress={() => router.replace(route as any)}
                activeOpacity={0.85}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginTop: -34, // stays lifted
                }}
              >
                {/* GOLD OUTER RING */}
                <View
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 36,
                    backgroundColor: '#D4AF37', // 👑 GOLD
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#FFD700',
                    shadowOpacity: 0.45,
                    shadowRadius: 10,
                    elevation: 10,
                  }}
                >
                  {/* BLUE INNER CORE */}
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: '#1E40AF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#FACC15', // soft gold trim
                    }}
                  >
                    <Icon size={28} color="#FFFFFF" strokeWidth={2.6} />
                  </View>
                </View>

                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 11,
                    color: '#FACC15', // GOLD TEXT
                    fontWeight: '700',
                    letterSpacing: 0.6,
                  }}
                >
                  ALTAR
                </Text>
              </TouchableOpacity>
            );
          }

          // 🧭 OTHER TABS
          return (
            <TouchableOpacity
              key={label}
              onPress={() => router.replace(route as any)}
              style={{ flex: 1, alignItems: 'center', gap: 4 }}
              activeOpacity={0.7}
            >
              <Icon
                size={22}
                color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)'}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
