import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBox, useTheme } from "@shopify/restyle";
import { ThemeProps } from "src/theme";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const Box = createBox<ThemeProps>();

export function Routes(){
  const { colors } = useTheme<ThemeProps>();
  const theme = DefaultTheme
  theme.colors.background = colors.gray_700

  return(
    <Box flex={1} bg="gray_700">
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
      
  )
}