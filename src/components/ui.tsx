import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Page({ children }: { children: ReactNode }) {
  return <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  </SafeAreaView>;
}

export function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function Action({ title, onPress, disabled = false, secondary = false }: {
  title: string; onPress: () => void; disabled?: boolean; secondary?: boolean;
}) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }}
    disabled={disabled} onPress={onPress}
    style={({ pressed }) => [styles.button, secondary && styles.secondary,
      (pressed || disabled) && { opacity: 0.55 }]}>
    <Text style={[styles.buttonText, secondary && { color: '#2349bb' }]}>{title}</Text>
  </Pressable>;
}

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f2f5fc' },
  page: { padding: 20, gap: 18, maxWidth: 720, width: '100%', alignSelf: 'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 18, gap: 12,
    borderWidth: 1, borderColor: '#dfe6f2' },
  title: { fontSize: 30, fontWeight: '800', color: '#13254a' },
  subtitle: { fontSize: 20, fontWeight: '700', color: '#13254a' },
  text: { fontSize: 16, lineHeight: 24, color: '#42526e' },
  kicker: { color: '#2349bb', fontSize: 12, fontWeight: '800', letterSpacing: 1.4 },
  button: { backgroundColor: '#2349bb', padding: 14, borderRadius: 10,
    minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  secondary: { backgroundColor: '#edf1fc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#9aa9c2', borderRadius: 10,
    padding: 12, fontSize: 16, color: '#13254a', backgroundColor: '#fff', minHeight: 48 },
  label: { fontSize: 15, color: '#13254a', fontWeight: '600' },
  error: { color: '#ac2133', fontSize: 14, lineHeight: 20 },
  field: { gap: 8 },
});
