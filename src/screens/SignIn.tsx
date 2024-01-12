import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView } from "react-native";
import { createBox, createText } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

import BackGroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function SignIn(){
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  function handleNewAccount(){
    navigation.navigate("signUp")
  }

  return(
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <Box flex={1} bg="gray_700" paddingHorizontal="xs2">
        <Image
          source={BackGroundImg}
          defaultSource={BackGroundImg}
          alt="Background img"
          resizeMode="contain"
          style={{position:"absolute"}}
        />

        <Box marginVertical="xxl" justifyContent="center" alignItems="center">
          <LogoSvg />
          <Text variant="body">
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

          <Button
          title="Acessar"
          variant="primary"
          />

          <Box justifyContent="center" alignItems="center" width={'100%'} marginTop="xxl">
            <Text variant="body">
              Ainda não tem acesso ?
            </Text>
            <Button
             title="Criar sua Conta"
             variant="secondary"
             onPress={handleNewAccount}
            />
          </Box>

        </Box>
      </Box>
    </ScrollView>
  );
}