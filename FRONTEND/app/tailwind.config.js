import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#e5e7eb",

          secondary: "#4b5563",

          accent: "#78716c",

          neutral: "#44403c",

          "base-100": "#1c1917",

          info: "#00b8ff",

          success: "#5fcf3b",

          warning: "#ffc400",

          error: "#ff3e6a",
        },
        light: {
          primary: "#111827",

          secondary: "#4b5563",

          accent: "#78716c",

          neutral: "#d6d3d1",

          "base-100": "#d1d5db",

          info: "#00b8ff",

          success: "#5fcf3b",

          warning: "#ffc400",

          error: "#ff3e6a",
        },
      },
    ],
  },
};
