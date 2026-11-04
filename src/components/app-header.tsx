import { StyleSheet, Text, View } from 'react-native';

import { Logo } from '@/components/logo';
import { colors, space, type } from '@/constants/theme';

export function AppHeader({ unlocked }: { unlocked: boolean }) {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Logo height={24} />
        <Text style={[type.caption, styles.muted]}>/ biometrics</Text>
      </View>
      <View style={styles.status}>
        <View style={[styles.dot, unlocked && styles.dotOn]} />
        <Text style={[type.caption, unlocked ? styles.on : styles.muted]}>{unlocked ? 'unlocked' : 'locked'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: space(8),
    marginHorizontal: -space(3),
    paddingHorizontal: space(3),
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral800,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: space(1.5) },
  status: { flexDirection: 'row', alignItems: 'center', gap: space(1) },
  dot: { width: space(1), height: space(1), borderWidth: 1, borderColor: colors.neutral700 },
  dotOn: { backgroundColor: colors.green, borderColor: colors.green },
  on: { color: colors.green },
  muted: { color: colors.neutral500 },
});
