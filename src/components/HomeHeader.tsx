import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { createBox, createText, useTheme } from "@shopify/restyle";

import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

import { ThemeProps } from "src/theme";

import defaultUserPhoto from "@assets/userPhotoDefault.png"

import { UserPhoto } from "./UserPhoto";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function HomeHeader() {
  const { colors } = useTheme<ThemeProps>();
  const { user, singUp } = useAuth();

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
        source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} : defaultUserPhoto}
        alt="User Profile"
        size={58}
        style={{ marginRight: 16 }}
      />
      <Box flex={1}>
        <Text variant="body">Olá,</Text>
        <Text variant="heading" textTransform="capitalize">{user.name}</Text>
      </Box>

      <TouchableOpacity onPress={singUp}>
        <MaterialIcons name="logout" size={28} color={colors.gray_200} />
      </TouchableOpacity>
    </Box>
  );
}
