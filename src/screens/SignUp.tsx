import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { createBox, createText } from "@shopify/restyle";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { ThemeProps } from "src/theme";

import LogoSvg from "@assets/logo.svg";
import BackGroundImg from "@assets/background.png";

import { api } from "@services/api";
import { AppError } from "@utils/appError";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { SingUpSchema, singUpSchema } from "@utils/singUpSchema";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function SignUp(){
  const navigation = useNavigation();

  const { control, handleSubmit, reset, formState: {errors} } = useForm<SingUpSchema>({
    resolver: zodResolver(singUpSchema)
  });

  async function handleSingUp({name,email,password}: SingUpSchema){
    try {
      const response = await api.post('/users', {name,email,password})
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível criar a conta.'
      Alert.alert('Error', title)
    }
    //reset();
  }

  function handleGoBack(){
    navigation.goBack();
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

        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <Box marginVertical="20" justifyContent="center" alignItems="center">
              <LogoSvg />
              <Text variant="body">
                Treine sua mente e seu corpo
              </Text>
            </Box>

            <Box justifyContent="center" alignItems="center">
              <Text variant="heading" mb="3">
                Crie sua conta
              </Text>

              <Controller
                control={control}
                name="name"
                render={({field: {onChange, value}}) => (
                  <Input 
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <Input 
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                  <Input 
                    placeholder="Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password_confirm"
                render={({field: {onChange, value}}) => (
                  <Input 
                    placeholder="Confirme a Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password_confirm?.message}
                    onSubmitEditing={handleSubmit(handleSingUp)}
                    returnKeyType="send"
                  />
                )}
              />

              <Button
                title="Criar sua conta"
                variant="primary"
                onPress={handleSubmit(handleSingUp)}
              />

              <Button
                title="Voltar para o login"
                variant="secondary"
                marginTop="20"
                onPress={handleGoBack}
              />

            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
  );
}