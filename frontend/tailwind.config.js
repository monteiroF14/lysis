import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans"],
        montserrat: ["Montserrat", "sans"]
      },
    },
  },
} satisfies Config;
