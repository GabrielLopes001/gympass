import { ThemeProps } from "src/theme";
import { createBox, useTheme } from "@shopify/restyle";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";

const Box = createBox<ThemeProps>();

export function Routes(){
  const { colors } = useTheme<ThemeProps>();
  const { user } = useAuth();
  console.log('LOGADO => ', user)
  
  const theme = DefaultTheme
  
  theme.colors.background = colors.gray_700

  return(
    <Box flex={1} bg="gray_700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
      
  )
}