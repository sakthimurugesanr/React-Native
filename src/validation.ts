export type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  accepted: boolean;
};
export type TextField = 'name' | 'email' | 'password' | 'confirmPassword';
export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const initialValues: FormValues = {
  name: '', email: '', password: '', confirmPassword: '', accepted: false,
};

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter a name with at least 2 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (values.password.length < 8) errors.password = 'Use at least 8 characters.';
  if (!values.confirmPassword || values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match.';
  }
  if (!values.accepted) errors.accepted = 'Confirm that you understand this is a local demo.';
  return errors;
}
