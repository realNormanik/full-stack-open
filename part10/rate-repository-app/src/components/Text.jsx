import PropTypes from "prop-types";
import { Text as NativeText } from "react-native";

import styles from "../utils/styles";

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorTextSecondary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style
  ];

  return <NativeText style={textStyle} {...props} />;
};

Text.propTypes = {
  color: PropTypes.oneOf(["textSecondary", "primary"]),
  fontSize: PropTypes.oneOf(["subheading"]),
  fontWeight: PropTypes.oneOf(["bold"]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default Text;