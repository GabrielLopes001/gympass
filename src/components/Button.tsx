import { SpacingProps, VariantProps, createRestyleComponent, createText, createVariant, spacing, useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { ThemeProps } from "src/theme";

type BoxCustomProps = 
 SpacingProps<ThemeProps> &
 VariantProps<ThemeProps, 'buttonVariants'>;
 
 type Props =  BoxCustomProps & {
   title: string;
 }

const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
  spacing,
  createVariant({themeKey: "buttonVariants"}),
 ]);

const Text = createText<ThemeProps>();

export function Button(props: Props){
  return(
    <TouchableOpacity style={{width: '100%'}}>
      <Box {...props}>
        <Text variant={props.variant === "primary" ? 'button_primary' : 'button_secondary'}>
        {props.title}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}