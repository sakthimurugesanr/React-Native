import { router } from 'expo-router';
import { Text } from 'react-native';
import { Action, Card, Page, styles } from '../components/ui';
import { useLearningStore } from '../store';

export default function Profile() {
  const profile = useLearningStore(state => state.profile);
  const count = useLearningStore(state => state.count);
  const reset = useLearningStore(state => state.reset);
  return <Page>
    <Text style={styles.title}>One store. Two screens.</Text>
    <Card>
      <Text style={styles.subtitle}>{profile ? profile.name : 'No demo profile yet'}</Text>
      <Text style={styles.text}>{profile ? profile.email : 'Complete the registration form first.'}</Text>
      <Text style={styles.text}>Shared counter: {count}</Text>
      <Text style={styles.text}>This screen reads store selectors. No profile object or password is passed through navigation.</Text>
    </Card>
    <Action title="Open registration form" onPress={() => router.push('/register')} />
    <Action title="Reset demo state" secondary onPress={reset} />
    <Action title="Return home" secondary onPress={() => router.dismissTo('/')} />
  </Page>;
}
