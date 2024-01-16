import { useState } from "react";

import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

export function Input({...rest}: TextInputProps){
  const theme = useTheme<ThemeProps>();
  const [focus, setFocus] = useState(false);

  return(
    <TextInput
      style={{
        backgroundColor:theme.colors.gray_700, 
        width: '100%',
        height: theme.spacing[14], 
        paddingHorizontal: 16,
        fontSize: theme.spacing[4],
        color: theme.colors.white,
        fontFamily: 'Roboto_400Regular',
        marginBottom: 16,
        borderRadius: 5,
        borderWidth: focus ? 1 : 0,
        borderColor: focus ? theme.colors.green_500 : 'transparent'
      }}
      placeholderTextColor={theme.colors.gray_300}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...rest}
    />
  );
}