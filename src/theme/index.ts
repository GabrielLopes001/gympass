import { createTheme } from "@shopify/restyle";

import { textVariants } from "./textVariants";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { buttonVariants } from "./buttonVariants";

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  buttonVariants
});

type ThemeProps = typeof theme;

export { theme, ThemeProps }