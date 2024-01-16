import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { createBox, createText } from "@shopify/restyle"
import { useState } from "react";
import { FlatList } from "react-native";
import { ThemeProps } from "src/theme"

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Home(){
  const [ groups, setGroups ] = useState(['Costas', 'Bíceps', 'Peito','ombro']);
  const [ groupSelected, setGroupSelected ] = useState('costas');
  const [ exercises, setExercises ] = useState(['Puxada Lateral','Peito','Remada unilateral']);

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
        style={{ paddingHorizontal: 10, maxHeight: 40, marginVertical: 32}}
      />

      <Box px="3">
        <Box flexDirection="row" justifyContent="space-between" mb="3">
          <Text variant="body" color="gray_200" fontSize={16} fontWeight="bold">
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
            <ExerciseCard />
          )}
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 20}}
        />

      </Box>
    </Box>
  )
}