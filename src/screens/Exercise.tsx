import { createBox, createText, useTheme } from "@shopify/restyle"
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ThemeProps } from "src/theme"

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"
import { Button } from "@components/Button";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Exercise(){
  const { colors } = useTheme<ThemeProps>();
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

  return(
    <Box flex={1}>
      <Box px="8" bg="gray_600" pt="12">
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" color={colors.green_500} size={24} />
        </TouchableOpacity>

        <Box justifyContent="space-between" flexDirection="row" mt="4" mb="8" alignItems="center">
          <Text variant="heading" color="gray_100">
            Puxada Lateral
          </Text>

          <Box flexDirection="row" alignItems="center">
            <BodySvg />
            <Text variant="body" color="gray_200" textTransform="capitalize" ml="1">
              Costas
            </Text>
          </Box>
        </Box>
      </Box>

      <ScrollView>
        <Box p="8">
          <Image
            style={{width: '100%', height: 320, marginBottom: 10}}
            source={{uri: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-remada-curvada-.gif'}}
            alt="Imagem do exercício"
            borderRadius={8}
          />

          <Box bg="gray_600" px="4" pb="4" borderRadius={8}>

            <Box flexDirection="row" alignItems="center" justifyContent="space-around" mb="5" mt="5">
              <Box flexDirection="row" alignItems="center">
                <SeriesSvg />
                <Text variant="body" color="gray_200" ml="2">
                  3 Series
                </Text>
              </Box>

              <Box flexDirection="row" alignItems="center">
                <RepetitionsSvg />
                <Text variant="body" color="gray_200" ml="2">
                  12 repetições
                </Text>
              </Box>
            </Box>

            <Button
              title="Marcar como realizado"
              variant="primary"
            />

          </Box>
        </Box>
      </ScrollView>
    </Box>
  )
}