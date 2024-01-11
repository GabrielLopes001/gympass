import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthProps = {
  signIn: undefined;
  signUp: undefined;
}

export type AuthNavigationRoutesProps = NavigationProp<AuthProps>;

const { Navigator, Screen } = createNativeStackNavigator<AuthProps>();

export function AuthRoutes(){
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
       name="signIn"
       component={SignIn}
      />
      <Screen
       name="signUp"
       component={SignUp}
      />
    </Navigator>
  )
}