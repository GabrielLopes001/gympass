import { useState } from "react";

import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

type variantInputStyleProps ='PRIMARY' | 'SECONDARY';

type Props = TextInputProps & {
  variant?: variantInputStyleProps;
}

export function Input({variant = 'PRIMARY', ...rest}: Props){
  const { colors, spacing } = useTheme<ThemeProps>();
  const [focus, setFocus] = useState(false);

  return(
    <TextInput
      style={{
        backgroundColor: variant === 'PRIMARY' ? colors.gray_700 : colors.gray_600, 
        width: '100%',
        height: spacing[14], 
        paddingHorizontal: 16,
        fontSize: spacing[4],
        color: colors.white,
        fontFamily: 'Roboto_400Regular',
        marginBottom: 16,
        borderRadius: 5,
        borderWidth: focus ? 1 : 0,
        borderColor: focus ? colors.green_500 : 'transparent'
      }}
      placeholderTextColor={colors.gray_300}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...rest}
    />
  );
}