import { createBox, createText, useTheme } from "@shopify/restyle";
import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons"

import { ThemeProps } from "src/theme";

import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExercisesDTO";

type Props = TouchableOpacityProps & {
   data: ExerciseDTO;
}

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function ExerciseCard({data,...rest}: Props){
   const { colors } = useTheme<ThemeProps>();
   return(
         <TouchableOpacity {...rest}>

            <Box flexDirection="row" bg="gray_500" alignItems="center" p="2" pr="4" borderRadius={6} mb="3">

            <Image 
               source={{uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
               width={64}
               height={64}
               borderRadius={12}
               resizeMode="cover"
            />

            <Box flex={1} ml="4">
               <Text variant="heading" marginTop="1">
                  {data.name}
               </Text>
               <Text variant="body" numberOfLines={3}>
                  {data.series} séries de {data.repetitions} repetições
               </Text>
            </Box>

            <Entypo name="chevron-thin-right" color={colors.gray_300}/>
            </Box>
         </TouchableOpacity>
   )
}