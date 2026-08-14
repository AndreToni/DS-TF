export interface TypeStyle {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}

export const typography = {
  headline: {
    h1: { fontSize: 80, fontWeight: 600, lineHeight: 88, letterSpacing: -1.776 },
    h2: { fontSize: 60, fontWeight: 600, lineHeight: 72, letterSpacing: -1.344 },
    h3: { fontSize: 48, fontWeight: 600, lineHeight: 56, letterSpacing: -1.072 },
    h4: { fontSize: 36, fontWeight: 600, lineHeight: 44, letterSpacing: -0.784 },
    h5: { fontSize: 24, fontWeight: 600, lineHeight: 32, letterSpacing: -0.464 },
    h6: { fontSize: 20, fontWeight: 600, lineHeight: 28, letterSpacing: -0.336 },
  },
  subheadline: {
    sh1Bold: { fontSize: 18, fontWeight: 600, lineHeight: 28, letterSpacing: -0.256 },
    sh1Medium: { fontSize: 18, fontWeight: 500, lineHeight: 28, letterSpacing: -0.256 },
    sh2Bold: { fontSize: 16, fontWeight: 600, lineHeight: 24, letterSpacing: -0.176 },
    sh2Medium: { fontSize: 16, fontWeight: 500, lineHeight: 24, letterSpacing: -0.176 },
  },
  body: {
    body1Regular: { fontSize: 16, fontWeight: 450, lineHeight: 26, letterSpacing: -0.176 },
    body1Medium: { fontSize: 16, fontWeight: 500, lineHeight: 26, letterSpacing: -0.176 },
    body2Regular: { fontSize: 14, fontWeight: 450, lineHeight: 22, letterSpacing: -0.128 },
    body2Medium: { fontSize: 14, fontWeight: 550, lineHeight: 22, letterSpacing: -0.128 },
    body2Bold: { fontSize: 14, fontWeight: 600, lineHeight: 22, letterSpacing: -0.128 },
  },
  caption: {
    regular: { fontSize: 12, fontWeight: 450, lineHeight: 18, letterSpacing: 0.016 },
    medium: { fontSize: 12, fontWeight: 600, lineHeight: 18, letterSpacing: 0.016 },
  },
  overline: { fontSize: 11, fontWeight: 600, lineHeight: 12, letterSpacing: 0.4 },
  button: {
    lg: { fontSize: 16, fontWeight: 600, lineHeight: 24, letterSpacing: -0.18 },
    md: { fontSize: 14, fontWeight: 600, lineHeight: 16, letterSpacing: -0.128 },
    sm: { fontSize: 13, fontWeight: 600, lineHeight: 12, letterSpacing: -0.04 },
  },
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
} as const;
