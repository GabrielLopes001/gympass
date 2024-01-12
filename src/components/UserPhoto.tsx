import { Image, ImageProps } from "react-native";

export type Props = ImageProps & {
  size: number;
};

export function UserPhoto({ size, ...rest }: Props) {
  return(
        <Image 
         width={size} 
         height={size} 
         borderRadius={30} 
         {...rest}
         />
      ) 
}
