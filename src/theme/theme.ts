import { createTheme } from "@mui/material";

// MUIのテーマをカスタマイズ
const theme = createTheme({
  palette: {
    primary: {
      main: "#6a2c91", // メインカラー
      contrastText: "#f3e5f5", // コントラスト用のテキスト色
    },
    secondary: {
      main: "#9b59b6", // メインの補助カラー
      contrastText: "#ffffff", // コントラスト用のテキスト色
    },
    background: {
      default: "#ffffff", // 背景
      paper: "#ffffff", // コンテンツの背景
    },
    text: {
      primary: "#000000", // テキスト
      secondary: "#000000", // サブテキスト
    },
    error: {
      main: "#ab47bc", // エラーカラー
    },
    info: {
      main: "#8e24aa", // 情報表示用の色
    },
    warning: {
      main: "#5e35b1", // 警告用の色
    },
  },
});

export default theme;
