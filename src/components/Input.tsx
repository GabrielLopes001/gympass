import { useState } from "react";

import { TextInput, TextInputProps } from "react-native";
import { createBox, createText, useTheme } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

type variantInputStyleProps ='PRIMARY' | 'SECONDARY';

type Props = TextInputProps & {
  variant?: variantInputStyleProps;
  errorMessage?: string | null;
}

const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

export function Input({variant = 'PRIMARY', errorMessage = null, ...rest}: Props){
  const { colors, spacing } = useTheme<ThemeProps>();
  const [focus, setFocus] = useState(false);
  const invalid = !!errorMessage;

  return(
    <Box  width="100%">
      <TextInput
        style={{
          backgroundColor: variant === 'PRIMARY' ? colors.gray_700 : colors.gray_600, 
          width: '100%',
          height: spacing[14], 
          paddingHorizontal: 16,
          fontSize: spacing[4],
          color: colors.white,
          fontFamily: 'Roboto_400Regular',
          marginBottom: 6,
          borderRadius: 5,
          borderWidth: focus ? 1 : invalid ? 1 : 0,
          borderColor: focus ? colors.green_500 : invalid ? colors.red_500 : 'transparent'
        }}
        placeholderTextColor={colors.gray_300}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...rest}
      />

      <Text variant="body" color="red_500" mb="1">
        {errorMessage}
      </Text>
    </Box>
  );
}