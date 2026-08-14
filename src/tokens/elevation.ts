export const elevation = {
  xs: "0px 5px 4px -4px rgba(0,0,0,0.02), 0px 1px 2px 0px rgba(0,0,0,0.06)",
  sm: "0px 0px 2px 0px rgba(0,0,0,0.04), 0px 2px 2px 0px rgba(0,0,0,0.08)",
  md: "0px 0px 4px 0px rgba(0,0,0,0.04), 0px 12px 12px -8px rgba(0,0,0,0.08)",
  lg: "0px 2px 6px 0px rgba(0,0,0,0.06), 0px 32px 40px -16px rgba(0,0,0,0.12)",
  xl: "0px 48px 64px -24px rgba(0,0,0,0.12), 0px 24px 48px -8px rgba(0,0,0,0.12)",
} as const;

export type ElevationToken = keyof typeof elevation;
