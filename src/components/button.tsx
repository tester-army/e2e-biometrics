import { Pressable, type PressableProps, StyleSheet, Text } from 'react-native';

import { colors, type } from '@/constants/theme';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & { label: string };

export function Button({ label, disabled, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
      {...props}>
      <Text style={[type.button, styles.label]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.buttonFill },
  pressed: { backgroundColor: '#ffffff' },
  disabled: { opacity: 0.4 },
  label: { color: colors.textOnLight },
});
