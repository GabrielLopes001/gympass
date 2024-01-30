import { useState, useEffect, useCallback } from "react";

import { ActivityIndicator, ActivityIndicatorComponent, Alert, FlatList } from "react-native";
import { createBox, createText } from "@shopify/restyle"
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/appError";
import { ExerciseDTO } from "@dtos/ExercisesDTO";

import { ThemeProps } from "src/theme"

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppNavigationRoutesProps } from "@routes/app.routes";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Home(){
  const [ isLoading, setIsLoading ] = useState(true);
  const [ groups, setGroups ] = useState<string[]>([]);
  const [ exercises, setExercises ] = useState<ExerciseDTO[]>([]);
  const [ groupSelected, setGroupSelected ] = useState('costas');

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenCardExercise(){
    navigation.navigate("exercise");
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups')
      setGroups(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'
      Alert.alert('Errro', title)
    }
  }

  async function fetchExercisesByGroup(){
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'
      Alert.alert('Errro', title)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchGroups()
  },[])

  useFocusEffect(useCallback(() =>{
    fetchExercisesByGroup()
  },[groupSelected]))

  return(
    <Box flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item})=>(
          <Group 
          name={item}
          isActive={groupSelected === item}
          onPress={() => setGroupSelected(item)}
        />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10, maxHeight: 40, minHeight: 40, marginVertical: 32}}
      />

      {
        isLoading 
          ? 
          <ActivityIndicator/> 
          :
          <Box flex={1} px="3">
          <Box flexDirection="row" justifyContent="space-between" mb="3">
            <Text variant="heading" color="gray_200">
              Exercícios
            </Text>
            <Text variant="body" color="gray_200">
              {exercises.length}
            </Text>
          </Box>

          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ExerciseCard
                data={item}
                onPress={handleOpenCardExercise}
              />
            )}
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: 20}}
          />
        </Box>
      }
    </Box>
  )
}