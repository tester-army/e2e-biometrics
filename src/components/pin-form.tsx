import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { colors, fonts, space, type } from '@/constants/theme';
import { checkPin, pinIsSet } from '@/lib/biometrics';

export function PinForm({ notice, onUnlock }: { notice: string; onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  function submit() {
    if (!pinIsSet) {
      setError('no pin is set. add EXPO_PUBLIC_PIN to .env.local.');
    } else if (checkPin(pin)) {
      onUnlock();
    } else {
      setPin('');
      setError('wrong pin. try again.');
    }
  }

  return (
    <View style={styles.form}>
      <Text testID="pin-notice" style={[type.bodyL, styles.notice]}>
        {notice}
      </Text>
      <View style={styles.field}>
        <Text style={[type.caption, styles.label]}>pin</Text>
        <TextInput
          testID="pin"
          accessibilityLabel="pin"
          value={pin}
          onChangeText={(text) => {
            setPin(text.replace(/\D/g, ''));
            setError(null);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={6}
          autoComplete="off"
          selectionColor={colors.green}
          style={[styles.input, focused && styles.inputFocused, error !== null && styles.inputInvalid]}
        />
      </View>
      {error ? (
        <Text testID="pin-error" accessibilityRole="alert" style={[type.bodyS, styles.error]}>
          {error}
        </Text>
      ) : null}
      <Button testID="submit-pin" label="unlock" disabled={pin.length !== 6} onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: space(2) },
  notice: { color: colors.neutral400 },
  field: { gap: space(1) },
  label: { color: colors.neutral400 },
  input: {
    height: space(7),
    paddingHorizontal: space(2),
    borderWidth: 2,
    borderColor: colors.neutral800,
    backgroundColor: colors.neutral800,
    color: colors.offWhite,
    fontFamily: fonts.mono,
    fontSize: 22,
    letterSpacing: 12,
  },
  inputFocused: { borderColor: colors.green },
  inputInvalid: { borderColor: colors.mint },
  error: { color: colors.mint },
});
