import assert from 'node:assert/strict';
import test from 'node:test';
import { initialValues, validate } from '../src/validation.ts';

test('empty registration reports each required rule', () => {
  assert.deepEqual(Object.keys(validate(initialValues)).sort(),
    ['accepted', 'confirmPassword', 'email', 'name', 'password']);
});
test('valid registration accepts surrounding whitespace in name and email', () => {
  assert.deepEqual(validate({ name: ' Demo User ', email: ' demo@example.com ',
    password: 'demo1234', confirmPassword: 'demo1234', accepted: true }), {});
});
test('mismatched passwords and invalid email do not pass', () => {
  const errors = validate({ name: 'Demo User', email: 'invalid',
    password: 'demo1234', confirmPassword: 'different', accepted: true });
  assert.ok(errors.email);
  assert.ok(errors.confirmPassword);
  assert.equal(errors.name, undefined);
});
