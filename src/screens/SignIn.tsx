import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { createBox, createText } from "@shopify/restyle";
import { Alert, Image, ScrollView } from "react-native";

import { ThemeProps } from "src/theme";

import LogoSvg from "@assets/logo.svg";
import BackGroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/appError";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { SingInSchema, singInSchema } from "@utils/singInSchema";
import { useState } from "react";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function SignIn(){
  const [isLoading, setIsLoading ] = useState(false);
  const navigation = useNavigation<AuthNavigationRoutesProps>();
  const { singIn } = useAuth();

  const { control, handleSubmit, reset, formState:{errors} } = useForm<SingInSchema>({
    resolver: zodResolver(singInSchema)
  });

  function handleNewAccount(){
    navigation.navigate("signUp")
  }

  async function handleAccessAccount({email, password}: SingInSchema){
      try {
        setIsLoading(true)
        await singIn(email, password)
        reset()
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError ? error.message : 'Não foi possível logar. Tente novamente mais tarde.'
        setIsLoading(false)
        Alert.alert('Erro', title)
      }
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
            isLoading={isLoading}
          />

          <Box justifyContent="center" alignItems="center" width={'100%'} mt="24">
            <Text variant="body">
              Ainda não tem acesso ?
            </Text>

            <Button
             title="Criar sua Conta"
             variant="secondary"
             marginTop="2"
             isLoading={isLoading}
             onPress={handleNewAccount}
            />
          </Box>

        </Box>
      </ScrollView>
    </Box>
  );
}