import { useState } from "react";
import Toast, { ErrorToast } from "react-native-toast-message";
import ContentLoader, { Circle } from "react-content-loader/native";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";

import { ThemeProps } from "src/theme";
import { createBox, createText, useTheme } from "@shopify/restyle";

import * as ImagePicker from "expo-image-picker"

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Profile(){
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg');
  const { colors } = useTheme<ThemeProps>();

  async function handleUserPhotoSelect() {
    setIsProfileLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing: true
      });
  
      if(photoSelected.canceled){
        return
      }

      if(photoSelected.assets[0].uri){
        if(photoSelected.assets[0].fileSize && (photoSelected.assets[0].fileSize / 1024 / 1024 > 1)){
          return Alert.alert('ERRO')
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }
  
    } catch (error) {
      console.log(error)
    } finally {
      setIsProfileLoading(false)
    }
  }

  return(
    <Box flex={1}>
      <ScreenHeader title="Perfil"/>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
                <Box justifyContent="center" alignItems="center" mt="7" px="10">
                  {
                    isProfileLoading ?
                    <ContentLoader
                      width={450} 
                      height={128} 
                      viewBox="0 0 450 128" 
                      backgroundColor={colors.gray_500} 
                      foregroundColor={colors.gray_400}
                    >
                      <Circle cx={225} cy={64} r={64}/>
                    </ContentLoader> :

                    <UserPhoto
                      source={{ uri: userPhoto }}
                      alt="User Profile"
                      size={128}
                    />
                  }

                  <TouchableOpacity onPress={handleUserPhotoSelect}>
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