import { createBox, createText } from "@shopify/restyle"
import { ThemeProps } from "src/theme"


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function HistoryCard(){
   return(
      <Box width="100%" flexDirection="row" px="md" py="md" mb="xs" borderRadius={5} bg="gray_500" alignItems="center" justifyContent="space-between">
         <Box mr="xs">
            <Text variant="heading" fontSize={16} textTransform="capitalize">
               Costas
            </Text>
            <Text variant="body" numberOfLines={1} fontSize={18}>
               Puxa Frontal
            </Text>
         </Box>

         <Text variant="body" color="gray_300">
            08:20
         </Text>

      </Box>
   )
}