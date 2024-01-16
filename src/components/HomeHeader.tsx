import { createBox, createText, useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
      pt="16"
      pb="5"
      px="8"
      alignItems="center"
    >
      <UserPhoto
        source={{ uri: "https://github.com/GabrielLopes001.png" }}
        alt="User Profile"
        size={58}
        style={{ marginRight: 16 }}
      />
      <Box flex={1}>
        <Text variant="body" fontSize={16}>Olá,</Text>
        <Text variant="body" fontSize={16} fontFamily="bold">Gabriel</Text>
      </Box>

      <TouchableOpacity>
        <MaterialIcons name="logout" size={28} color={colors.gray_200} />
      </TouchableOpacity>
    </Box>
  );
}
