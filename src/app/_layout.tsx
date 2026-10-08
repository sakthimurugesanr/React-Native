import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return <>
    <StatusBar style="dark" />
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#13254a' }}>
      <Stack.Screen name="index" options={{ title: 'React Native Lab' }} />
      <Stack.Screen name="register" options={{ title: 'Validated form' }} />
      <Stack.Screen name="profile" options={{ title: 'Shared profile' }} />
    </Stack>
  </>;
}
