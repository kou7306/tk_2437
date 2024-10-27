import { createTheme } from "@mui/material";

// MUIのテーマをカスタマイズ
const theme = createTheme({
  palette: {
    primary: {
      main: "#674598", // メインカラー
      contrastText: "#2ecee6",
    },
    secondary: {
      main: "#674598", // メインの補助カラー
      contrastText: "#2c64c5",
    },
    background: {
      default: "#ffffff", // 背景
      paper: "#fffffff", // コンテンツの背景
    },
    text: {
      primary: "#000000", // テキスト
      secondary: "#000000", // 枠線
    },
    error: {
      main: "#ee223c", // メインとは反対の色
    },
    info: {
      main: "#674598", //hover時の色
    },
    warning: {
      main: "#3e4242", // 黒の中のコンテンツ
    },
  },
});

export default theme;
