/**
 * Raw color values, mirrored from `src/styles/tokens.css`.
 * Use these when you need the literal value in JS (charts, canvas, inline
 * SVG, emails, etc.) instead of a CSS custom property.
 */
export const colors = {
  text: {
    primary: "#2C2E30",
    secondary: "#A0A3A6",
    hint: "#D9DBDD",
    disabled: "#A3A3A3",
  },
  background: {
    surface: "#FFFFFF",
    canvas: "#FFFFFF",
    light: "#FBFBFC",
    medium: "#F4F5F5",
    contrast: "#2C2C2E",
  },
  border: {
    light: "#E7E8E9",
    dark: "#D9DBDD",
    disabled: "#D4D4D4",
  },
  action: {
    light: "#233737",
    medium: "#101A23",
    disabled: "#000000",
  },
  accent: {
    primary: "#2563EB",
    light: "#3B82F6",
    medium: "#293E7A",
    background: "#EFF6FF",
    contrast: "#FFFFFF",
  },
  info: {
    primary: "#3B82F6",
    light: "#DBEAFE",
    medium: "#293E7A",
    contrast: "#223058",
  },
  warning: {
    primary: "#F5D90A",
    light: "#FFFBD1",
    medium: "#946800",
    contrast: "#35290F",
  },
  error: {
    primary: "#EF4444",
    light: "#FEE2E2",
    medium: "#B91C1C",
    contrast: "#422424",
  },
  success: {
    primary: "#41B871",
    light: "#D1FAE5",
    medium: "#367C50",
    contrast: "#084938",
  },
  other: {
    divider: "#F4F5F5",
    backdrop: "#101A23",
  },
} as const;

export type ColorGroup = keyof typeof colors;
