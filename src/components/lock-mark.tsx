import { StyleSheet, View } from 'react-native';

import { DottedIcon } from '@/components/dotted-icon';
import { colors } from '@/constants/theme';

export function LockMark({ active }: { active: boolean }) {
  const corner = { borderColor: active ? colors.green : colors.neutral700 };
  return (
    <View style={styles.frame} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={[styles.corner, styles.topLeft, corner]} />
      <View style={[styles.corner, styles.topRight, corner]} />
      <View style={[styles.corner, styles.bottomLeft, corner]} />
      <View style={[styles.corner, styles.bottomRight, corner]} />
      <DottedIcon name="lock" scale={3} />
    </View>
  );
}

const CORNER = 18;
const LINE = 2;

const styles = StyleSheet.create({
  frame: { width: 104, height: 104, alignItems: 'center', justifyContent: 'center' },
  corner: { position: 'absolute', width: CORNER, height: CORNER },
  topLeft: { top: 0, left: 0, borderTopWidth: LINE, borderLeftWidth: LINE },
  topRight: { top: 0, right: 0, borderTopWidth: LINE, borderRightWidth: LINE },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: LINE, borderLeftWidth: LINE },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: LINE, borderRightWidth: LINE },
});
