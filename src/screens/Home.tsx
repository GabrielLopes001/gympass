import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBox, createText } from "@shopify/restyle"

import { ThemeProps } from "src/theme"

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppNavigationRoutesProps } from "@routes/app.routes";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Home(){
  const [ groups, setGroups ] = useState(['Costas', 'Bíceps', 'Peito','ombro']);
  const [ groupSelected, setGroupSelected ] = useState('costas');
  const [ exercises, setExercises ] = useState(['Puxada Lateral','Peito','Remada unilateral']);

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenCardExercise(){
    navigation.navigate("exercise");
  }

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