import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { SpacingProps, VariantProps, createRestyleComponent, createText, createVariant, spacing } from "@shopify/restyle";

import { ThemeProps } from "src/theme";

type BoxCustomProps = 
 SpacingProps<ThemeProps> &
 VariantProps<ThemeProps, 'buttonVariants'>;
 
 type Props =  BoxCustomProps & TouchableOpacityProps & {
   title: string;
   isLoading?: boolean;
 }

const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
  spacing,
  createVariant({themeKey: "buttonVariants"}),
 ]);

const Text = createText<ThemeProps>();

export function Button(props: Props){
  return(
    <TouchableOpacity style={{width: '100%'}} activeOpacity={0.4} disabled={props.isLoading ? true : false} {...props}>
      <Box {...props}>
        {
            props.isLoading
           ?
            <ActivityIndicator />
           :
            <Text variant={props.variant === "primary" ? 'button_primary' : 'button_secondary'}>
            {props.title}
            </Text>
        }
      </Box>
    </TouchableOpacity>
  )
}