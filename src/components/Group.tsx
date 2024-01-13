import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { createText, useTheme } from "@shopify/restyle"
import { ThemeProps } from "src/theme"
import { useState } from "react";

const Text = createText<ThemeProps>();

type Props = TouchableOpacityProps &{
   name: string;
   isActive: boolean;
}

export function Group({ name, isActive, ...rest}: Props){
   const { colors } = useTheme<ThemeProps>();
   const [pressed, setPressed] = useState(false);
   return(
      <TouchableOpacity
         activeOpacity={1}
         style={{
            marginRight: 12,
            width: 96,
            height: 40,
            borderRadius: 6,
            overflow: "hidden",
            backgroundColor: colors.gray_600,
            borderWidth: isActive ? 1 : pressed ? 1 : 0,
            borderColor: isActive ? colors.green_500 : pressed ? colors.green_500 : "transparent",
            justifyContent: "center",
            alignItems: "center"
         }}
         onPressIn={() => setPressed(true)}
         onPressOut={() => setPressed(false)}
         {...rest}>
         <Text 
            variant="body" 
            fontWeight="bold"
            color= {isActive ? "green_500" : pressed ? "green_500" : "gray_100"}
            textTransform="uppercase" 
            fontSize={12}
         >
            {name}
         </Text>
      </TouchableOpacity>
   )
}