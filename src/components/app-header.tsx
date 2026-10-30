import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, type } from '@/constants/theme';

export function AppHeader({ unlocked }: { unlocked: boolean }) {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Image source={require('../../assets/images/e2e-mark.png')} style={styles.mark} />
        <Text style={[type.brand, styles.primary]}>e2e</Text>
        <Text style={[type.mono, styles.faint]}>/ biometrics</Text>
      </View>
      <View style={styles.status}>
        <View style={[styles.dot, unlocked && styles.dotOn]} />
        <Text style={[type.label, unlocked ? styles.primary : styles.faint]}>{unlocked ? 'Unlocked' : 'Locked'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 48 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mark: { width: 24, height: 24 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 7, height: 7, borderWidth: 1, borderColor: colors.hairlineStrong },
  dotOn: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  primary: { color: colors.textPrimary },
  faint: { color: colors.textFaint },
});
