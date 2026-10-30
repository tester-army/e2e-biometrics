import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

export function LockMark({ active }: { active: boolean }) {
  const corner = { borderColor: active ? colors.textPrimary : colors.hairlineStrong };
  return (
    <View style={styles.frame} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={[styles.corner, styles.topLeft, corner]} />
      <View style={[styles.corner, styles.topRight, corner]} />
      <View style={[styles.corner, styles.bottomLeft, corner]} />
      <View style={[styles.corner, styles.bottomRight, corner]} />
      <View style={styles.shackle} />
      <View style={styles.body}>
        <View style={styles.keyhole} />
      </View>
    </View>
  );
}

const CORNER = 18;
const LINE = 1.5;

const styles = StyleSheet.create({
  frame: { width: 104, height: 104, alignItems: 'center', justifyContent: 'center' },
  corner: { position: 'absolute', width: CORNER, height: CORNER },
  topLeft: { top: 0, left: 0, borderTopWidth: LINE, borderLeftWidth: LINE },
  topRight: { top: 0, right: 0, borderTopWidth: LINE, borderRightWidth: LINE },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: LINE, borderLeftWidth: LINE },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: LINE, borderRightWidth: LINE },
  shackle: { width: 24, height: 18, borderWidth: 2, borderBottomWidth: 0, borderColor: colors.textPrimary },
  body: {
    width: 40,
    height: 30,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyhole: { width: 2, height: 9, backgroundColor: colors.textPrimary },
});
