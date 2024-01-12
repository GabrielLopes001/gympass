import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { createBox, createText, useTheme } from "@shopify/restyle";

import { ThemeProps } from "src/theme";
import { UserPhoto } from "./UserPhoto";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function HomeHeader() {
  const { colors } = useTheme<ThemeProps>();
  return (
    <Box
      flexDirection="row"
      bg="gray_600"
      pt="md1"
      pb="xl"
      px="sm1"
      alignItems="center"
    >
      <UserPhoto
        source={{ uri: "https://github.com/GabrielLopes001.png" }}
        alt="User Profile"
        size={64}
        style={{ marginRight: 16 }}
      />
      <Box flex={1}>
        <Text variant="body">Olá,</Text>
        <Text variant="heading">Gabriel</Text>
      </Box>

      <TouchableOpacity>
        <MaterialIcons name="logout" size={28} color={colors.gray_200} />
      </TouchableOpacity>
    </Box>
  );
}
