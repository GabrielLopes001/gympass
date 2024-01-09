import { createTheme } from "@shopify/restyle";

import { textVariants } from "./textVariants";
import { colors } from "./colors";
import { spacing } from "./spacing";

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  size: {
    "14": 56,
    "33": 148
  }
});

type ThemeProps = typeof theme;

export { theme, ThemeProps }