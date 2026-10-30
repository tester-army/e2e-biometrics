import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { colors, type } from '@/constants/theme';
import { checkPin, pinIsSet } from '@/lib/biometrics';

export function PinForm({ notice, onUnlock }: { notice: string; onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit() {
    if (!pinIsSet) {
      setError('No PIN is set. Add EXPO_PUBLIC_PIN to .env.local.');
    } else if (checkPin(pin)) {
      onUnlock();
    } else {
      setPin('');
      setError('Wrong PIN. Try again.');
    }
  }

  return (
    <View style={styles.form}>
      <Text testID="pin-notice" style={[type.body, styles.notice]}>
        {notice}
      </Text>
      <View style={styles.field}>
        <Text style={[type.label, styles.label]}>PIN</Text>
        <TextInput
          testID="pin"
          accessibilityLabel="PIN"
          value={pin}
          onChangeText={(text) => {
            setPin(text.replace(/\D/g, ''));
            setError(null);
          }}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={6}
          autoComplete="off"
          selectionColor={colors.textSecondary}
          style={[type.pin, styles.input]}
        />
      </View>
      {error ? (
        <Text testID="pin-error" accessibilityRole="alert" style={[type.bodyS, styles.error]}>
          {error}
        </Text>
      ) : null}
      <Button testID="submit-pin" label="Unlock" disabled={pin.length !== 6} onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16 },
  notice: { color: colors.textSecondary },
  field: { gap: 8 },
  label: { color: colors.textFaint },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    backgroundColor: colors.fieldFill,
    color: colors.textPrimary,
  },
  error: { color: colors.accentOrange },
});
