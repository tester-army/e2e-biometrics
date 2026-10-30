import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

const { FACIAL_RECOGNITION, FINGERPRINT } = LocalAuthentication.AuthenticationType;

export async function sensorName() {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const face = types.includes(FACIAL_RECOGNITION);
  const finger = types.includes(FINGERPRINT);
  if (Platform.OS === 'ios') return face ? 'Face ID' : finger ? 'Touch ID' : 'biometrics';
  return finger ? 'your fingerprint' : face ? 'your face' : 'biometrics';
}

export function isEnrolled() {
  return LocalAuthentication.isEnrolledAsync();
}

export function authenticate() {
  return LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock e2e Biometrics',
    // iOS shows no fallback button after a failed match, so the cancel button leads to the PIN.
    cancelLabel: 'Use PIN',
    fallbackLabel: '',
    disableDeviceFallback: true,
  });
}

const PIN = process.env.EXPO_PUBLIC_PIN ?? '';

export const pinIsSet = /^\d{6}$/.test(PIN);

export function checkPin(pin: string) {
  return pinIsSet && pin === PIN;
}
