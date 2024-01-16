import { useState } from "react";

import { TextInput, TextInputProps } from "react-native";
import { SpacingProps, VariantProps, createRestyleComponent, createVariant, spacing, useTheme } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

type BoxCustomProps = SpacingProps<ThemeProps> & VariantProps<ThemeProps, 'inputVariants'>;

type Props = BoxCustomProps & TextInputProps;

const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
  spacing,
  createVariant({themeKey: 'inputVariants'})
]);

export function Input(props: Props){

  const theme = useTheme<ThemeProps>();
  const [focus, setFocus] = useState(false);

  return(
    <Box
      style={{
        borderWidth: focus ? 1 : 0,
        borderColor: focus ? theme.colors.green_500 : 'transparent'
      }}
      placeholderTextColor={theme.colors.gray_300}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...props}
    />
  );
}