import { StyleSheet, Text, View } from 'react-native';

import { colors, space, type } from '@/constants/theme';

const RECENT = [
  { name: 'Café Nero', date: 'today', amount: '−$4.20' },
  { name: 'e2e labs payroll', date: 'oct 28', amount: '+$3,200.00' },
  { name: 'transit pass', date: 'oct 27', amount: '−$64.00' },
];

export function Account({ method }: { method: string }) {
  return (
    <View testID="unlocked" style={styles.account}>
      <View style={styles.summary}>
        <Text style={[type.caption, styles.eyebrow]}>checking •••• 6021</Text>
        <Text style={[type.numberL, styles.primary]}>$2,480.00</Text>
        <Text testID="unlock-method" style={[type.caption, styles.positive]}>
          unlocked with {method}
        </Text>
      </View>
      <View>
        <Text style={[type.caption, styles.muted, styles.listTitle]}>recent</Text>
        {RECENT.map((item) => (
          <View key={item.name} style={styles.row}>
            <View style={styles.rowText}>
              <Text style={[type.bodyM, styles.primary]}>{item.name}</Text>
              <Text style={[type.caption, styles.muted]}>{item.date}</Text>
            </View>
            <Text style={[type.monoM, styles.primary]}>{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  account: { gap: space(5) },
  summary: {
    gap: space(1),
    padding: space(3),
    borderWidth: 1,
    borderColor: colors.neutral800,
    backgroundColor: colors.panel,
  },
  listTitle: { marginBottom: space(1) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space(2),
    borderTopWidth: 1,
    borderTopColor: colors.neutral800,
  },
  rowText: { gap: space(0.5) },
  eyebrow: { color: colors.mint },
  primary: { color: colors.offWhite },
  positive: { color: colors.green },
  muted: { color: colors.neutral500 },
});
