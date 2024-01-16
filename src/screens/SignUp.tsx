import { Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBox, createText } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

import BackGroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function SignUp(){
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

  return(
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsHorizontalScrollIndicator={false}>
      <Box flex={1} bg="gray_700" paddingHorizontal="10">
        <Image
          source={BackGroundImg}
          defaultSource={BackGroundImg}
          alt="Background img"
          resizeMode="contain"
          style={{position:"absolute"}}
        />

        <Box marginVertical="24" justifyContent="center" alignItems="center">
          <LogoSvg />
          <Text variant="body">
            Treine sua mente e seu corpo
          </Text>
        </Box>

        <Box justifyContent="center" alignItems="center">
          <Text variant="heading" marginBottom="3">
            Crie sua conta
          </Text>

          <Input 
            placeholder="Nome"
          />
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

          <Button
            title="Voltar para o login"
            variant="secondary"
            marginTop="24"
            onPress={handleGoBack}
          />

        </Box>
      </Box>
    </ScrollView>
  );
}