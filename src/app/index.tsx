import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Account } from '@/components/account';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/button';
import { LockMark } from '@/components/lock-mark';
import { PinForm } from '@/components/pin-form';
import { colors, space, type } from '@/constants/theme';
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
              <Text style={[type.caption, styles.eyebrow]}>biometric lock</Text>
              <Text accessibilityRole="header" style={[type.h1, styles.heading]}>
                your account is locked
              </Text>
              {state.status === 'pin' ? null : (
                <Text style={[type.bodyL, styles.lede]}>unlock it with {sensor}, or with your pin if that fails.</Text>
              )}
            </View>
            {state.status === 'pin' ? (
              <PinForm notice={state.notice} onUnlock={unlockWithPin} />
            ) : (
              <View style={styles.actions}>
                <Button
                  testID="unlock"
                  label={state.status === 'prompting' && state.waiting ? `waiting for ${sensor}…` : 'unlock'}
                  disabled={state.status === 'prompting'}
                  onPress={unlock}
                />
                {state.status === 'locked' && state.notice ? (
                  <Text testID="lock-notice" style={[type.bodyS, styles.notice]}>
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
  page: { flex: 1, backgroundColor: colors.black, paddingHorizontal: space(3) },
  main: { paddingTop: space(5), gap: space(4) },
  intro: { gap: space(2) },
  eyebrow: { color: colors.mint },
  heading: { color: colors.offWhite },
  lede: { color: colors.neutral400 },
  actions: { gap: space(2) },
  notice: { color: colors.neutral500 },
});
