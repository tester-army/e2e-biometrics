import { StyleSheet } from 'react-native';

export const colors = {
  canvas: '#111111',
  panel: '#161616',
  hairline: 'rgba(255, 255, 255, 0.12)',
  hairlineStrong: 'rgba(255, 255, 255, 0.3)',
  textPrimary: '#f9f8f7',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textFaint: 'rgba(255, 255, 255, 0.45)',
  fieldFill: '#1a1a1a',
  buttonFill: '#f9f8f7',
  textOnLight: '#161616',
  accentOrange: '#ff8001',
};

export const fonts = {
  display: 'Stack Sans Notch',
  sans: 'Inter',
  mono: 'DM Mono',
};

export const type = StyleSheet.create({
  display: { fontFamily: fonts.display, fontSize: 34, lineHeight: 40 },
  balance: { fontFamily: fonts.display, fontSize: 52, lineHeight: 60 },
  body: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24 },
  bodyS: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
  mono: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 20 },
  label: { fontFamily: fonts.mono, fontSize: 11, lineHeight: 16, letterSpacing: 1.1, textTransform: 'uppercase' },
  button: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 20, fontWeight: '500', textTransform: 'uppercase' },
  brand: { fontFamily: fonts.display, fontSize: 22, lineHeight: 26, letterSpacing: -1.2 },
  pin: { fontFamily: fonts.mono, fontSize: 22, letterSpacing: 12 },
});
