import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "src/theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function SignIn(){
  return(
    <Box flex={1} bg="gray_500" justifyContent="center" alignItems="center">
      <Box flexDirection="row">
        <Text variant="heading"> Hello World</Text>
      </Box>  
    </Box>
  );
}