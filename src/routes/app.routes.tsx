import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { useTheme } from "@shopify/restyle";
import { ThemeProps } from "src/theme";

import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg"
import HomeSvg from "@assets/home.svg";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes(){
  const { spacing, colors } = useTheme<ThemeProps>();
  const iconSize = spacing.xl2

  return(
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green_500,
      tabBarInactiveTintColor: colors.gray_200,
      tabBarStyle: {
        backgroundColor: colors.gray_600,
        borderTopWidth: 0,
        paddingTop: spacing.md,
        paddingBottom: spacing.xs2
      }
    }}>
      <Screen 
       name="home"
       component={Home}
       options={{
        tabBarIcon: ({color}) => (
          <HomeSvg fill={color} height={iconSize} width={iconSize} />
        )
       }}
      />

      <Screen 
       name="history"
       component={History}
       options={{
        tabBarIcon: ({color}) => (
          <HistorySvg fill={color} height={iconSize} width={iconSize} />
        )
       }}
      />

      <Screen 
       name="profile"
       component={Profile}
       options={{
        tabBarIcon: ({color}) => (
          <ProfileSvg fill={color} height={iconSize} width={iconSize} />
        )
       }}
      />

      <Screen 
       name="exercise"
       component={Exercise}
       options={{tabBarButton: () => null}}
      />
    </Navigator>
  )
}