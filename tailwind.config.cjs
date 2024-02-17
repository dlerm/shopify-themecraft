import animated from "tailwindcss-animated";

const config = {
  content: [
    "src/*.{js,ts,html}",
    "src/styles/*.css",
    "src/icons/**",
    "shopify/**/*.{liquid,json}",
  ],
  theme: {
    extend: {
      screens: {
        "3xs": "320px",
        "2xs": "375px",
        "xs": "480px",
        "2xl": "1440px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [
    animated,
  ],
};

export default config;

