import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Account } from '@/components/account';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/button';
import { LockMark } from '@/components/lock-mark';
import { PinForm } from '@/components/pin-form';
import { colors, type } from '@/constants/theme';
import { useLock } from '@/hooks/use-lock';

export default function HomeScreen() {
  const { state, sensor, unlock, unlockWithPin } = useLock();

  return (
    <SafeAreaView style={styles.page}>
      <AppHeader unlocked={state.status === 'unlocked'} />
      <View style={styles.main}>
        {state.status === 'unlocked' ? (
          <Account method={state.method} />
        ) : (
          <>
            {state.status === 'pin' ? null : <LockMark active={state.status === 'prompting'} />}
            <View style={styles.intro}>
              <Text accessibilityRole="header" style={[type.display, styles.heading]}>
                Your account is locked
              </Text>
              {state.status === 'pin' ? null : (
                <Text style={[type.body, styles.lede]}>Unlock it with {sensor}, or with your PIN if that fails.</Text>
              )}
            </View>
            {state.status === 'pin' ? (
              <PinForm notice={state.notice} onUnlock={unlockWithPin} />
            ) : (
              <View style={styles.actions}>
                <Button
                  testID="unlock"
                  label={state.status === 'prompting' && state.waiting ? `Waiting for ${sensor}…` : 'Unlock'}
                  disabled={state.status === 'prompting'}
                  onPress={unlock}
                />
                {state.status === 'locked' && state.notice ? (
                  <Text testID="lock-notice" style={[type.mono, styles.notice]}>
                    {state.notice}
                  </Text>
                ) : null}
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas, paddingHorizontal: 24 },
  main: { paddingTop: 40, gap: 28 },
  intro: { gap: 8 },
  heading: { color: colors.textPrimary },
  lede: { color: colors.textSecondary },
  actions: { gap: 16 },
  notice: { color: colors.textFaint },
});
