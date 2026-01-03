

import { usePathname, useRouter } from 'expo-router';
import { BookOpen, Clock, Flame, Info, PenTool } from 'lucide-react-native';
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
    { label: 'Scribe', icon: PenTool, route: '/(main)/scribe' },
    { label: 'About', icon: Info, route: '/(main)/about' },
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




