import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "src/theme";

type Props = {
   title: string;
}

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function ScreenHeader({title}: Props) {
   return (
      <Box bg="gray_600" justifyContent="center" alignItems="center" pb="xl2" pt="md1">
         <Text variant="heading">
            {title}
         </Text>
      </Box>
   )
}