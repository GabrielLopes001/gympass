import { createBox, createText } from "@shopify/restyle"
import { ThemeProps } from "src/theme"


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function HistoryCard(){
   return(
      <Box width="100%" flexDirection="row" px="4" py="4" mb="3" borderRadius={5} bg="gray_500" alignItems="center" justifyContent="space-between">
         <Box mr="3">
            <Text variant="heading" fontSize={16} textTransform="capitalize">
               Costas
            </Text>
            <Text variant="body" fontSize={18} numberOfLines={1}>
               Puxa Frontal
            </Text>
         </Box>

         <Text variant="body" color="gray_300">
            08:20
         </Text>

      </Box>
   )
}