import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-get-random-values';

export default function RootLayout() {
  useEffect(() => {
    console.log('🌍 Aequitas Zone Mobile - Initializing...');
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
