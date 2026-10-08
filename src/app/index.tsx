import { router } from 'expo-router';
import { Text } from 'react-native';
import { Action, Card, Page, styles } from '../components/ui';
import { useLearningStore } from '../store';

export default function Home() {
  const count = useLearningStore(state => state.count);
  const increment = useLearningStore(state => state.increment);
  const profile = useLearningStore(state => state.profile);
  return <Page>
    <Text style={styles.kicker}>FROM REACT TO MOBILE</Text>
    <Text style={styles.title}>Learn by building.</Text>
    <Text style={styles.text}>A small cross-platform lab for forms, navigation, and state ownership.</Text>
    <Card>
      <Text style={styles.subtitle}>1. Shared state</Text>
      <Text style={styles.text}>Counter: {count}</Text>
      <Text style={styles.text}>Zustand owns this value. Open Profile to see the same counter on another screen.</Text>
      <Action title="Increment counter" onPress={increment} />
    </Card>
    <Card>
      <Text style={styles.subtitle}>2. Form validation</Text>
      <Text style={styles.text}>Try empty fields, an invalid email, or mismatched passwords. Errors appear on blur and submit.</Text>
      <Action title="Open registration form" onPress={() => router.push('/register')} />
    </Card>
    <Card>
      <Text style={styles.subtitle}>3. Screen navigation</Text>
      <Text style={styles.text}>{profile ? `Hello, ${profile.name}. Your demo profile is ready.` : 'Save a valid form to create a local demo profile.'}</Text>
      <Action title="Open shared profile" secondary onPress={() => router.push('/profile')} />
    </Card>
    <Text style={styles.text}>Demo only. There is no backend, account creation, or persistence. Reloading the app resets the store.</Text>
  </Page>;
}
