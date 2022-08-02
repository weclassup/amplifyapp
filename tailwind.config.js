const {
  extend,
} = require("@methodstudio/class-component-module/lib/cjs/theme/class.theme");

/**@type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/@methodstudio/class-component-module/lib/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      ...extend,
      colors: {
        ...extend.colors,
        primary: "#3d9cf3",
        "dark-red": "#CE264E",
        "dark-blue": "#1472A8",
      },
      transitionProperty: { ...extend.transitionProperty, height: "height" },
      maxHeight: { ...extend.maxHeight },
      flex: {
        0.75: "0.75",
        2: "2",
      },
    },
  },
  variants: {
    extend: {
      display: ["first"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
