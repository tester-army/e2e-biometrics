import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { authenticate, isEnrolled, sensorName } from '@/lib/biometrics';

export type LockState =
  | { status: 'locked'; notice?: string }
  | { status: 'prompting'; waiting: boolean }
  | { status: 'pin'; notice: string }
  | { status: 'unlocked'; method: string };

const NOT_SET_UP = ['not_enrolled', 'not_available', 'passcode_not_set'];
const SYSTEM_CANCELLED = ['system_cancel', 'app_cancel'];

function sentence(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function useLock() {
  const [state, setState] = useState<LockState>({ status: 'locked' });
  const [sensor, setSensor] = useState('biometrics');

  useEffect(() => {
    sensorName().then(setSensor);
    const subscription = AppState.addEventListener('change', (next) => {
      // iOS goes inactive once the Face ID prompt is up. Android's prompt leaves AppState alone.
      if (next === 'inactive') setState((s) => (s.status === 'prompting' ? { ...s, waiting: true } : s));
      if (next === 'background') {
        setState((s) =>
          s.status === 'unlocked' ? { status: 'locked', notice: 'Locked when the app went to the background.' } : s,
        );
      }
    });
    return () => subscription.remove();
  }, []);

  async function unlock() {
    const notSetUp = `${sentence(sensor)} isn't set up on this device. Enter your PIN.`;
    if (!(await isEnrolled())) {
      setState({ status: 'pin', notice: notSetUp });
      return;
    }
    setState({ status: 'prompting', waiting: false });
    const result = await authenticate();
    if (result.success) setState({ status: 'unlocked', method: sensor });
    else if (SYSTEM_CANCELLED.includes(result.error)) setState({ status: 'locked' });
    else if (NOT_SET_UP.includes(result.error)) setState({ status: 'pin', notice: notSetUp });
    else setState({ status: 'pin', notice: `${sentence(sensor)} didn't unlock the app. Enter your PIN.` });
  }

  function unlockWithPin() {
    setState({ status: 'unlocked', method: 'PIN' });
  }

  return { state, sensor, unlock, unlockWithPin };
}
