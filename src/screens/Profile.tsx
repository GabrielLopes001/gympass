import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker"
import { Controller, useForm } from "react-hook-form";
import ContentLoader, { Circle } from "react-content-loader/native";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";

import { ThemeProps } from "src/theme";
import { createBox, createText, useTheme } from "@shopify/restyle";

import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/appError";

import defaultUserPhoto from "@assets/userPhotoDefault.png"

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { ProfileSchema, profileSchema } from "@utils/profileSchema";


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export function Profile(){
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg');
  const { colors } = useTheme<ThemeProps>();

  const { user, updateUserProfile } = useAuth();

  const { control, handleSubmit, formState: {errors} } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });

  async function handleUpdateProfile(data: ProfileSchema) {
    try {
      const userUpdated = user;
      userUpdated.name = data.name

      await api.put('/users', data)

      await updateUserProfile(userUpdated)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar o perfil.'
      Alert.alert('Erro', title)
    }
  }

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
        if(photoSelected.assets[0].fileSize && (photoSelected.assets[0].fileSize / 1024 / 1024 > 5)){
          return Alert.alert('ERRO', 'Imagem grande de mais, selecione uma ate 5MB')
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
          uri: photoSelected.assets[0].uri
        } as any

        const photoUploadForm = new FormData();
        photoUploadForm.append('avatar', photoFile)

        const userPhotoUploadResponse = await api.patch('/users/avatar', photoUploadForm,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const photoUpload = user;
        photoUpload.avatar = userPhotoUploadResponse.data.avatar

        updateUserProfile(photoUpload)

        console.log(photoUpload)

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
                  </ContentLoader> 
                :
                  <UserPhoto
                    source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} : defaultUserPhoto}
                    alt="User Profile"
                    size={128}
                  />
              }

              <TouchableOpacity onPress={handleUserPhotoSelect}>
                <Text color="green_500" fontWeight="bold" fontSize={16} mt="3" mb="8">
                   Alterar foto
                </Text>
              </TouchableOpacity>

              <Controller
                control={control}
                name="name"
                render={({field: {value, onChange}}) => (
                  <Input
                    variant="SECONDARY"
                    placeholder="Nome"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({field: {value, onChange}}) => (
                  <Input
                    variant="SECONDARY"
                    placeholder="E-mail"
                    value={value}
                    editable={false}
                  />
                )}
              />


            </Box>

              <Box px="10" mt="12" mb="9">
                <Text variant="heading" fontSize={16} color="gray_200" mb="2">
                  Alterar Senha
                </Text>


                <Controller
                  control={control}
                  name="old_password"
                  render={({field: {value, onChange}}) => (
                    <Input
                      variant="SECONDARY"
                      placeholder="Senha atiga"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.old_password?.message}
                  />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({field: {value, onChange}}) => (
                    <Input
                      variant="SECONDARY"
                      placeholder="Nova senha"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.password?.message}
                  />
                  )}
                />

                <Controller
                  control={control}
                  name="password_confirm"
                  render={({field: {value, onChange}}) => (
                    <Input
                      variant="SECONDARY"
                      placeholder="Confirmar nova senha"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.password_confirm?.message}
                  />
                  )}
                />

                <Button
                  onPress={handleSubmit(handleUpdateProfile)}
                  variant="primary"
                  title="Atualizar"
                />
              </Box>
            </ScrollView>
        </KeyboardAvoidingView>
    </Box>
  )
}