import { useState, useEffect } from "react";

import { Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBox, createText } from "@shopify/restyle"

import { api } from "@services/api";

import { ThemeProps } from "src/theme"

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/appError";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Home(){
  const [ groups, setGroups ] = useState<string[]>([]);
  const [ groupSelected, setGroupSelected ] = useState('costas');
  const [ exercises, setExercises ] = useState(['Puxada Lateral','Peito','Remada unilateral']);

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

  useEffect(()=>{
    fetchGroups()
  },[])

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

      <Box px="3">
        <Box flexDirection="row" justifyContent="space-between" mb="3">
          <Text variant="heading" color="gray_200">
            Exercícios
          </Text>
          <Text variant="body" color="gray_200">
            {groups.length}
          </Text>
        </Box>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <ExerciseCard
              onPress={handleOpenCardExercise}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 20}}
        />

      </Box>
    </Box>
  )
}