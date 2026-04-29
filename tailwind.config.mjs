// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ✅ Solo cosas que NO son colores:
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        md: "16px",
        gutter: "24px",
        xs: "4px",
        unit: "4px",
        xl: "32px",
        margin: "48px",
        sm: "8px",
        lg: "24px",
      },
      fontFamily: {
        "headline-lg": ["Space Grotesk"],
        "headline-md": ["Space Grotesk"],
        "headline-xl": ["Space Grotesk"],
        "body-md": ["Manrope"],
        "body-lg": ["Manrope"],
        "label-sm": ["Manrope"],
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "500" }],
        "headline-xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};