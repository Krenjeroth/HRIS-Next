/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      },
      blur: {
        xs: "1px",
      },
      colors: {
        // cyan is used in all components as the default "primary" color
        // here we are actually overriding it to some purple color
        // so practically, the cyan means primary
        cyan: {
          50:"rgb(239 246 255)",
          100:"rgb(219 234 254)",
          200:"rgb(191 219 254)",
          300:"rgb(147 197 253)",
          400:"rgb(96 165 250)",
          500:"rgb(59 130 246)",
          600:"rgb(37 99 235)",
          700:"rgb(29 78 216)",
          800:"rgb(30 64 175)",
          900:"rgb(30 58 138)",
          950:"rgb(23 37 84)",
        },

      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
