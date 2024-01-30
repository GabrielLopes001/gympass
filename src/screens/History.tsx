import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, SectionList } from "react-native";
import { createBox, createText } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function History(){
  const [ isLoading, setIsLoading ] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchExerciseHistory(){
    try {
      setIsLoading(true)
      const response = await api.get('history')
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico'
      Alert.alert('Erro',title)
    } finally {
      setIsLoading(false)
    }
  }
  
  useFocusEffect(useCallback(() => {
    fetchExerciseHistory()
  },[]))

  return(
    <Box>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HistoryCard
            data={item}
          />
        )}
        renderSectionHeader={({section}) => (
          <Text variant="body" mt="10" mb="4">
            {section.title}
          </Text>
        )}
        style={{paddingHorizontal: 32}}
      />
    </Box>
  )
}