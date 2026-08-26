import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#24292e",
    secondary: "#586069",
    background: "#e1e4e8",
    blue: "#0366d6",
    red: "#d73a4a",
    grey: "#cccccc",
    white: "#ffffff"
  },
  fontSizes: {
    body: 14,
    subheading: 16
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    })
  },
  fontWeights: {
    normal: "400",
    bold: "bold"
  },
  flexDirection: {
    row: "row"
  },
  align: {
    center: "center"
  },
  display: {
    none: "none"
  },
  numbers: {
    five: 5,
    ten: 10,
    fiveTeen: 15,
    fifty: 50
  }
};

export default theme;