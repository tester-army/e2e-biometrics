import { View } from 'react-native';

import { colors } from '@/constants/theme';

// Dot grids from the e2e design system's dotted icon set: `X` is a dot, `.` is empty.
const ICONS = {
  lock: ['..XXX..', '.X...X.', '.X...X.', 'XXXXXXX', 'X..X..X', 'X.....X', 'XXXXXXX'],
};

/** A dotted icon at a whole-number scale: 2px dots on a 3px pitch, times `scale`. Decorative. */
export function DottedIcon({
  name,
  scale = 1,
  color = colors.offWhite,
}: {
  name: keyof typeof ICONS;
  scale?: number;
  color?: string;
}) {
  const rows = ICONS[name];
  const dot = 2 * scale;
  const pitch = 3 * scale;
  const size = rows.length * pitch - scale;
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ width: size, height: size }}>
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === 'X' ? (
            <View
              key={`${x}-${y}`}
              style={{
                position: 'absolute',
                left: x * pitch,
                top: y * pitch,
                width: dot,
                height: dot,
                backgroundColor: color,
              }}
            />
          ) : null,
        ),
      )}
    </View>
  );
}
