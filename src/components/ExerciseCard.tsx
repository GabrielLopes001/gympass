import { createBox, createText, useTheme } from "@shopify/restyle";
import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons"
import { ThemeProps } from "src/theme";

type Props = TouchableOpacityProps & {}

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function ExerciseCard({...rest}: Props){
   const { colors } = useTheme<ThemeProps>();
   return(
         <TouchableOpacity {...rest}>

            <Box flexDirection="row" bg="gray_500" alignItems="center" p="2" pr="4" borderRadius={6} mb="3">

            <Image 
               source={{uri: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-remada-curvada-.gif'}}
               width={64}
               height={64}
               borderRadius={12}
               resizeMode="center"
            />

            <Box flex={1} ml="4">
               <Text variant="heading" marginTop="1">
                  Remada Curvada
               </Text>
               <Text variant="body" numberOfLines={3}>
                  3x séries de 12x repetições
               </Text>
            </Box>

            <Entypo name="chevron-thin-right" color={colors.gray_300}/>
            </Box>
         </TouchableOpacity>
   )
}