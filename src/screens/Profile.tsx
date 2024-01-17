import { useState } from "react";
import ContentLoader, { Circle } from "react-content-loader/native";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";

import { ThemeProps } from "src/theme";
import { createBox, createText, useTheme } from "@shopify/restyle";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Profile(){
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { colors } = useTheme<ThemeProps>();

  return(
    <Box flex={1}>
      <ScreenHeader title="Perfil"/>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
                <Box justifyContent="center" alignItems="center" mt="7" px="10">
                  {
                    isProfileLoading ?
                    <UserPhoto
                      source={{ uri: "https://github.com/GabrielLopes001.png" }}
                      alt="User Profile"
                      size={128}
                    /> :
                    <ContentLoader
                      width={450} 
                      height={128} 
                      viewBox="0 0 450 128" 
                      backgroundColor={colors.gray_500} 
                      foregroundColor={colors.gray_400}
                    >
                      <Circle cx={225} cy={64} r={64}/>
                    </ContentLoader>
                  }

                  <TouchableOpacity>
                    <Text color="green_500" fontWeight="bold" fontSize={16} mt="3" mb="8">
                      Alterar foto
                    </Text>
                  </TouchableOpacity>

                  <Input
                    variant="SECONDARY"
                    placeholder="Nome"
                  />

                  <Input
                    variant="SECONDARY"
                    placeholder="E-mail"
                    editable={false}
                  />
                </Box>

              <Box px="10" mt="12" mb="9">
                <Text variant="heading" fontSize={16} color="gray_200" mb="2">
                  Alterar Senha
                </Text>

                <Input
                  variant="SECONDARY"
                  placeholder="Senha atiga"
                  secureTextEntry
                />

                <Input
                  variant="SECONDARY"
                  placeholder="Nova senha"
                  secureTextEntry
                />

                <Input
                  variant="SECONDARY"
                  placeholder="Confirmar nova senha"
                  secureTextEntry
                />

                <Button
                  variant="primary"
                  title="Atualizar"
                />
              </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  )
}