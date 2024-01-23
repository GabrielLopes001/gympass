import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { createBox, createText } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

import LogoSvg from "@assets/logo.svg";
import BackGroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { SingInSchema, singInSchema } from "@utils/singInSchema";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function SignIn(){
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  const { control, handleSubmit, reset, formState:{errors} } = useForm<SingInSchema>({
    resolver: zodResolver(singInSchema)
  });

  function handleNewAccount(){
    navigation.navigate("signUp")
  }

  function handleAccessAccount(data: SingInSchema){
    console.log(data)
    reset()
  }

  return(
    <Box flex={1} bg="gray_700" paddingHorizontal="10">
      <Image
        source={BackGroundImg}
        defaultSource={BackGroundImg}
        alt="Background img"
        resizeMode="contain"
        style={{position:"absolute"}}
      />

      <ScrollView contentContainerStyle={{flexGrow: 1}} showsHorizontalScrollIndicator={false}>
        <Box marginVertical="24" justifyContent="center" alignItems="center">
          <LogoSvg />
          <Text variant="body">
            Treine sua mente e seu corpo
          </Text>
        </Box>

        <Box justifyContent="center" alignItems="center">
          <Text variant="heading" mb="3">
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            render={({field: {value, onChange}}) => (
              <Input 
                placeholder="E-mail"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />
          
          <Controller
            control={control}
            name="password"
            render={({field: {value, onChange}}) => (
              <Input 
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleAccessAccount)}
            title="Acessar"
            variant="primary"
          />

          <Box justifyContent="center" alignItems="center" width={'100%'} mt="24">
            <Text variant="body">
              Ainda não tem acesso ?
            </Text>

            <Button
             title="Criar sua Conta"
             variant="secondary"
             marginTop="2"
             onPress={handleNewAccount}
            />
          </Box>

        </Box>
      </ScrollView>
    </Box>
  );
}