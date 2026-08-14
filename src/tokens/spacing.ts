/**
 * Spacing scale in pixels, base-4. Mirrors `tailwind-preset.cjs` `theme.extend.spacing`.
 */
export const spacing = {
  0: 0,
  px: 1,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  30: 120,
  36: 144,
  40: 160,
  60: 240,
  64: 256,
  80: 320,
} as const;

export type SpacingToken = keyof typeof spacing;
