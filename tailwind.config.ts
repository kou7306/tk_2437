import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#6a2c91", // メインカラー
        secondary: "#9b59b6", // メインの補助カラー
        base: "#ffffff", // 背景
        sub_base: "#e1bee7", // コンテンツの背景
        content_base: "#4a148c", // コンテンツの中のコンテンツの背景
        border: "#7e57c2", // 枠線
        accent: "#ab47bc", // メインとは反対の色
        text: "#000000", // テキスト
        sub_text: "#9575cd", // サブテキスト
        hover: "#5e35b1", // hover時の色
        hover_blue: "#8e24aa", // hover時の色
      },
    },
  },
  plugins: [],
};

export default config;
