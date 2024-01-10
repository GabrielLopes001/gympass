import { createBox, createText, useTheme } from "@shopify/restyle";
import { Image } from "react-native";

import { ThemeProps } from "src/theme";

import LogoSvg from "@assets/logo.svg";
import BackGroundImg from "@assets/background.png";
import { Input } from "@components/Input";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function SignIn(){
  return(
    <Box flex={1} bg="gray_700" paddingHorizontal="xs2">
       <Image
        source={BackGroundImg}
        alt="Background img"
        resizeMode="contain"
        style={{position:"absolute"}}
       />

       <Box marginVertical="xxl" justifyContent="center" alignItems="center">
        <LogoSvg />
        <Text color="gray_100" variant="body">
          Treine sua mente e seu corpo
        </Text>
       </Box>

       <Box justifyContent="center" alignItems="center">
        <Text variant="heading" marginBottom="xs">
          Acesse sua conta
        </Text>

        <Input 
         placeholder="E-mail"
         keyboardType="email-address"
         autoCapitalize="none"
        />
        <Input 
         placeholder="Senha"
         secureTextEntry
        />
       </Box>
    </Box>
  );
}