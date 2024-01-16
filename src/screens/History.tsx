import { useState } from "react";
import { createBox, createText } from "@shopify/restyle";
import { SectionList } from "react-native";
import { ThemeProps } from "src/theme";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function History(){
  const [exercises, setExercises] = useState([
    {
      title: '15.01.24',
      data: ['Puxada Lateral', 'Puxada unilateral'],
    },
    {
      title: '14.01.24',
      data: ['Puxada Lateral'],
    }
  ]);

  return(
    <Box>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <HistoryCard />
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