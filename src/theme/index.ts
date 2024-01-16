import { createTheme } from "@shopify/restyle";

import { textVariants } from "./textVariants";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { buttonVariants } from "./buttonVariants";
import { inputVariants } from "./inputVariants";

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  buttonVariants,
  inputVariants,
});

type ThemeProps = typeof theme;

export { theme, ThemeProps }