import { HistoryDTO } from "@dtos/HistoryDTO";
import { createBox, createText } from "@shopify/restyle"
import { ThemeProps } from "src/theme"


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

type HistoryExerciseProps = {
   data: HistoryDTO;
}

export function HistoryCard({data}: HistoryExerciseProps){
   return(
      <Box width="100%" flexDirection="row" px="4" py="4" mb="3" borderRadius={5} bg="gray_500" alignItems="center" justifyContent="space-between">
         <Box mr="3" flex={1}>
            <Text variant="heading" fontSize={16} textTransform="capitalize">
               {data.group}
            </Text>
            <Text variant="body" numberOfLines={1} fontSize={18}>
               {data.name}
            </Text>
         </Box>

         <Text variant="body" color="gray_300">
            {data.hour}
         </Text>

      </Box>
   )
}