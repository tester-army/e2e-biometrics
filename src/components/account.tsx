import { StyleSheet, Text, View } from 'react-native';

import { colors, type } from '@/constants/theme';

const RECENT = [
  { name: 'Café Nero', date: 'Today', amount: '−$4.20' },
  { name: 'e2e Labs payroll', date: 'Oct 28', amount: '+$3,200.00' },
  { name: 'Transit pass', date: 'Oct 27', amount: '−$64.00' },
];

export function Account({ method }: { method: string }) {
  return (
    <View testID="unlocked" style={styles.account}>
      <View style={styles.summary}>
        <Text style={[type.label, styles.faint]}>Checking •••• 6021</Text>
        <Text style={[type.balance, styles.primary]}>$2,480.00</Text>
        <Text testID="unlock-method" style={[type.mono, styles.secondary]}>
          Unlocked with {method}
        </Text>
      </View>
      <View>
        <Text style={[type.label, styles.faint, styles.listTitle]}>Recent</Text>
        {RECENT.map((item) => (
          <View key={item.name} style={styles.row}>
            <View>
              <Text style={[type.bodyS, styles.primary]}>{item.name}</Text>
              <Text style={[type.mono, styles.faint]}>{item.date}</Text>
            </View>
            <Text style={[type.mono, styles.primary]}>{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  account: { gap: 48 },
  summary: { gap: 8 },
  listTitle: { marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairlineStrong,
  },
  primary: { color: colors.textPrimary },
  secondary: { color: colors.textSecondary },
  faint: { color: colors.textFaint },
});
