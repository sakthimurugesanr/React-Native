import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, Switch, Text, TextInput, View } from 'react-native';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { Action, Card, Page, styles } from '../components/ui';
import { useLearningStore } from '../store';
import { FormValues, initialValues, TextField, validate } from '../validation';

export default function Register() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<TextField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const busy = useRef(false);
  const saveProfile = useLearningStore(state => state.saveProfile);
  const headerHeight = useHeaderHeight();
  const errors = validate(values);

  function change(field: TextField, value: string) {
    setValues(previous => ({ ...previous, [field]: value }));
    setSubmitError('');
  }
  async function submit() {
    if (busy.current) return;
    setSubmitted(true);
    if (Object.keys(validate(values)).length) return;
    busy.current = true;
    setSubmitting(true);
    setSubmitError('');
    try {
      // Intentional local delay so the submitting state is visible. No API request.
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      saveProfile({ name: values.name.trim(), email: values.email.trim() });
      setValues(initialValues);
      router.dismissTo('/');
    } catch {
      setSubmitError('Could not save the demo profile. Please try again.');
    } finally {
      busy.current = false;
      setSubmitting(false);
    }
  }

  function field(key: TextField, label: string, secure = false) {
    const error = (submitted || touched[key]) ? errors[key] : undefined;
    return <View style={styles.field} key={key}>
      <Text style={styles.label}>{label}</Text>
      <TextInput accessibilityLabel={label} value={values[key]}
        onChangeText={value => change(key, value)}
        onBlur={() => setTouched(previous => ({ ...previous, [key]: true }))}
        editable={!submitting} secureTextEntry={secure && !showPassword}
        keyboardType={key === 'email' ? 'email-address' : 'default'}
        autoCapitalize={key === 'name' ? 'words' : 'none'}
        autoCorrect={key === 'name'}
        style={[styles.input, !!error && { borderColor: '#ac2133' }]} />
      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    </View>;
  }

  return <KeyboardAvoidingView style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={headerHeight}>
    <Page>
      <Text style={styles.title}>Build a demo profile.</Text>
      <Text style={styles.text}>Local form state + pure validation + shared store. Use dummy details and a dummy password.</Text>
      <Card>
        {field('name', 'Full name')}
        {field('email', 'Email address')}
        {field('password', 'Demo password', true)}
        {field('confirmPassword', 'Confirm demo password', true)}
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Switch accessibilityLabel="Show passwords" value={showPassword}
            disabled={submitting} onValueChange={setShowPassword} />
          <Text style={[styles.text, { flex: 1 }]}>Show passwords</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Switch accessibilityLabel="I understand this is a local demo" value={values.accepted}
            disabled={submitting} onValueChange={accepted => setValues(previous => ({ ...previous, accepted }))} />
          <Text style={[styles.text, { flex: 1 }]}>I understand this is a local demo.</Text>
        </View>
        {submitted && !!errors.accepted && <Text style={styles.error}>{errors.accepted}</Text>}
        {!!submitError && <Text style={styles.error}>{submitError}</Text>}
        <Action title={submitting ? 'Saving demo...' : 'Save demo profile'} disabled={submitting}
          onPress={() => { void submit(); }} />
      </Card>
      <Text style={styles.text}>Rules: name ≥ 2 characters; valid email shape; password ≥ 8 characters; confirmation matches; demo agreement enabled.</Text>
      <Text style={styles.text}>Only name and email enter the shared store. Passwords are cleared on success. A real service must validate on the backend.</Text>
    </Page>
  </KeyboardAvoidingView>;
}
