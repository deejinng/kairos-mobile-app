// app/splash.tsx
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function AppSplash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/'); // goes to index.tsx
    }, 8000);

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/kairos-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.9,
    height: height * 0.9,
  },
});
