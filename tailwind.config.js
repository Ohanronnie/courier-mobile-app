/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Brand Color
        primary: "#1d4ed8", // blue-700 (stronger brand color)

        // Light/Dark Backgrounds
        background: {
          light: "#f2f2f2", // gray-50 (softer white)
          dark: "#121212", // true dark background
        },
        surface: {
          light: "#ffffff", // white (clean surface)
          dark: "#161b21", // slightly lighter than background for surface contrast
        },
        // Input Borders
        input: {
          light: "#d1d5db", // gray-300 (subtle border for inputs in light mode)
          dark: "#3f3f46", // gray-700 (subtle border for inputs in dark mode)
          focusLight: "#3b82f6", // blue-500 (focused input border in light mode)
          focusDark: "#2563eb", // blue-600 (focused input border in dark mode)
        },
        // Text Colors
        text: {
          light: "#1f2937", // gray-800 (better readability)
          dark: "#e5e5e5", // light gray for better readability on dark background
        },
        subtext: {
          light: "#6b7280", // gray-500 (muted text)
          dark: "#a3a3a3", // muted gray for subtext on dark background
        },

        // Border Colors
        border: {
          light: "#d1d5db", // gray-300 (subtle border)
          dark: "#2c2c2c", // dark gray for subtle borders on dark mode
        },

        // Accent Colors
        accent: {
          light: "#3b82f6", // blue-500 (vibrant accent)
          dark: "#2563eb", // blue-600 (slightly deeper accent for dark mode)
        },

        // Error Colors
        danger: {
          light: "#ef4444", // red-500 (accessible error color)
          dark: "#dc2626", // red-600 (deeper red for dark mode)
        },

        // Success Colors
        success: {
          light: "#10b981", // green-500 (success state)
          dark: "#059669", // green-600 (deeper green for dark mode)
        },

        // Warning Colors
        warning: {
          light: "#f59e0b", // yellow-500 (warning state)
          dark: "#d97706", // yellow-600 (deeper yellow for dark mode)
        },
      },
    },
  },
  plugins: [],
};
