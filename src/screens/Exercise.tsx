import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createBox, createText, useTheme } from "@shopify/restyle"
import { ActivityIndicator, Alert, Image, ScrollView, TouchableOpacity } from "react-native";

import { ThemeProps } from "src/theme"

import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { ExerciseDTO } from "@dtos/ExercisesDTO";
import { AppNavigationRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"

import { Button } from "@components/Button";

type RouteParamsProps = {
  exerciseId: string;
}

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Exercise(){
  const [ sendingExercise, setSendingExercise ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true);
  const [ exercise, setExercise ] = useState<ExerciseDTO>({} as ExerciseDTO)
  const { colors } = useTheme<ThemeProps>();

  const navigation = useNavigation<AppNavigationRoutesProps>();
  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack(){
    navigation.goBack();
  }

  async function fetchExerciseDetails(){
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.'
      Alert.alert('Erro', title)
    } finally {
      setIsLoading(false)
    }
  }
  async function handleExerciseHistoryRegister(){
    try {
      setSendingExercise(true)
      
      await api.post('/history', {exercise_id: exerciseId})

      Alert.alert('Parabéns', 'Exercício marcado como realizado com sucesso.')

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício.'
      Alert.alert('Erro', title)
    } finally {
      setSendingExercise(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  },[exerciseId])

  return(
    <Box flex={1}>
      <Box px="8" bg="gray_600" pt="12">
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" color={colors.green_500} size={24} />
        </TouchableOpacity>

        <Box justifyContent="space-between" flexDirection="row" mt="4" mb="8" alignItems="center">
          <Text variant="heading" color="gray_100">
            {exercise.name}
          </Text>

          <Box flexDirection="row" alignItems="center">
            <BodySvg />
            <Text variant="body" color="gray_200" textTransform="capitalize" ml="1">
              {exercise.group}
            </Text>
          </Box>
        </Box>
      </Box>

        {
          isLoading 
            ? 
            <ActivityIndicator /> 
            :
            <ScrollView>
              <Box p="8">
                <Image
                  style={{width: '100%', height: 320, marginBottom: 10}}
                  source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
                  alt="Imagem do exercício"
                  borderRadius={8}
                />

                <Box bg="gray_600" px="4" pb="4" borderRadius={8}>

                  <Box flexDirection="row" alignItems="center" justifyContent="space-around" mb="5" mt="5">
                    <Box flexDirection="row" alignItems="center">
                      <SeriesSvg />
                      <Text variant="body" color="gray_200" ml="2">
                        {exercise.series} Series
                      </Text>
                    </Box>

                    <Box flexDirection="row" alignItems="center">
                      <RepetitionsSvg />
                      <Text variant="body" color="gray_200" ml="2">
                        {exercise.repetitions} repetições
                      </Text>
                    </Box>
                  </Box>

                  <Button
                    title="Marcar como realizado"
                    isLoading={sendingExercise}
                    onPress={handleExerciseHistoryRegister}
                    variant="primary"
                  />

                </Box>
              </Box>
            </ScrollView>
        }
    </Box>
  )
}