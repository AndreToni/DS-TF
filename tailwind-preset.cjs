/**
 * DS-TF Tailwind preset.
 *
 * In your app's tailwind.config.js:
 *
 *   module.exports = {
 *     presets: [require("ds-tf-ds/tailwind-preset")],
 *     content: [
 *       "./src/**\/*.{js,jsx,ts,tsx}",
 *       "./node_modules/ds-tf-ds/dist/**\/*.{js,mjs}", // <- required
 *     ],
 *   };
 *
 * The content glob for node_modules/ds-tf-ds/dist is required so
 * Tailwind's JIT scanner sees the utility classes used inside the
 * pre-built component bundle and doesn't purge them.
 *
 * These color/shadow/radius values reference the CSS custom properties
 * defined in `ds-tf-ds/tokens.css` — make sure that file is imported
 * once at the root of your app.
 */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          hint: "var(--color-text-hint)",
          disabled: "var(--color-text-disabled)",
        },
        surface: {
          DEFAULT: "var(--color-background-surface)",
          canvas: "var(--color-background-canvas)",
          light: "var(--color-background-light)",
          medium: "var(--color-background-medium)",
          contrast: "var(--color-background-contrast)",
        },
        line: {
          DEFAULT: "var(--color-border-light)",
          light: "var(--color-border-light)",
          dark: "var(--color-border-dark)",
          disabled: "var(--color-border-disabled)",
        },
        action: {
          light: "var(--color-action-light)",
          medium: "var(--color-action-medium)",
          disabled: "var(--color-action-disabled)",
        },
        accent: {
          DEFAULT: "var(--color-accent-primary)",
          primary: "var(--color-accent-primary)",
          light: "var(--color-accent-light)",
          medium: "var(--color-accent-medium)",
          bg: "var(--color-accent-background)",
          contrast: "var(--color-accent-contrast)",
        },
        info: {
          DEFAULT: "var(--color-info-primary)",
          primary: "var(--color-info-primary)",
          light: "var(--color-info-light)",
          medium: "var(--color-info-medium)",
          contrast: "var(--color-info-contrast)",
        },
        warning: {
          DEFAULT: "var(--color-warning-primary)",
          primary: "var(--color-warning-primary)",
          light: "var(--color-warning-light)",
          medium: "var(--color-warning-medium)",
          contrast: "var(--color-warning-contrast)",
        },
        error: {
          DEFAULT: "var(--color-error-primary)",
          primary: "var(--color-error-primary)",
          light: "var(--color-error-light)",
          medium: "var(--color-error-medium)",
          contrast: "var(--color-error-contrast)",
        },
        success: {
          DEFAULT: "var(--color-success-primary)",
          primary: "var(--color-success-primary)",
          light: "var(--color-success-light)",
          medium: "var(--color-success-medium)",
          contrast: "var(--color-success-contrast)",
        },
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      spacing: {
        px: "1px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
        30: "120px",
        36: "144px",
        40: "160px",
        60: "240px",
        64: "256px",
        80: "320px",
      },
      fontSize: {
        "headline-h1": ["80px", { lineHeight: "88px", letterSpacing: "-1.776px", fontWeight: "600" }],
        "headline-h2": ["60px", { lineHeight: "72px", letterSpacing: "-1.344px", fontWeight: "600" }],
        "headline-h3": ["48px", { lineHeight: "56px", letterSpacing: "-1.072px", fontWeight: "600" }],
        "headline-h4": ["36px", { lineHeight: "44px", letterSpacing: "-0.784px", fontWeight: "600" }],
        "headline-h5": ["24px", { lineHeight: "32px", letterSpacing: "-0.464px", fontWeight: "600" }],
        "headline-h6": ["20px", { lineHeight: "28px", letterSpacing: "-0.336px", fontWeight: "600" }],
        "sh1-bold": ["18px", { lineHeight: "28px", letterSpacing: "-0.256px", fontWeight: "600" }],
        "sh1-medium": ["18px", { lineHeight: "28px", letterSpacing: "-0.256px", fontWeight: "500" }],
        "sh2-bold": ["16px", { lineHeight: "24px", letterSpacing: "-0.176px", fontWeight: "600" }],
        "sh2-medium": ["16px", { lineHeight: "24px", letterSpacing: "-0.176px", fontWeight: "500" }],
        "body1-regular": ["16px", { lineHeight: "26px", letterSpacing: "-0.176px", fontWeight: "450" }],
        "body1-medium": ["16px", { lineHeight: "26px", letterSpacing: "-0.176px", fontWeight: "500" }],
        "body2-regular": ["14px", { lineHeight: "22px", letterSpacing: "-0.128px", fontWeight: "450" }],
        "body2-medium": ["14px", { lineHeight: "22px", letterSpacing: "-0.128px", fontWeight: "550" }],
        "body2-bold": ["14px", { lineHeight: "22px", letterSpacing: "-0.128px", fontWeight: "600" }],
        "caption-regular": ["12px", { lineHeight: "18px", letterSpacing: "0.016px", fontWeight: "450" }],
        "caption-medium": ["12px", { lineHeight: "18px", letterSpacing: "0.016px", fontWeight: "600" }],
        overline: ["11px", { lineHeight: "12px", letterSpacing: "0.4px", fontWeight: "600" }],
        "button-lg": ["16px", { lineHeight: "24px", letterSpacing: "-0.18px", fontWeight: "600" }],
        "button-md": ["14px", { lineHeight: "16px", letterSpacing: "-0.128px", fontWeight: "600" }],
        "button-sm": ["13px", { lineHeight: "12px", letterSpacing: "-0.04px", fontWeight: "600" }],
      },
    },
  },
};
