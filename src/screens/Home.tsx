import { useState } from "react";

import { ActivityIndicator, FlatList } from "react-native";
import { createBox, createText } from "@shopify/restyle"
import { useNavigation } from "@react-navigation/native";

import { ExerciseDTO } from "@dtos/ExercisesDTO";

import { ThemeProps } from "src/theme"

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppNavigationRoutesProps } from "@routes/app.routes";

import { useGroupData } from "@hooks/useGroupData";
import { useExerciseByGroup } from "@hooks/useExerciseByGroup";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Home(){
  const [ isLoading, setIsLoading ] = useState(true);
  const [ exercises, setExercises ] = useState<ExerciseDTO[]>([]);
  const [ groupSelected, setGroupSelected ] = useState('');

  const { data } = useGroupData();
  const { data: dataExerciseByGroup } = useExerciseByGroup(groupSelected);

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenCardExercise(exerciseId: string){
    navigation.navigate("exercise", { exerciseId });
  }

  return(
    <Box flex={1}>
      <HomeHeader />

      <FlatList
        data={data}
        keyExtractor={item => item}
        renderItem={({item})=>(
          <Group 
          name={item}
          isActive={dataExerciseByGroup === item}
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
                onPress={()=> handleOpenCardExercise(item.id)}
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