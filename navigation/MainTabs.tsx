import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import HomeStack from "./HomeStack";
import MyPageStack from "./MyPageStack";
import SellStack from "./SellStack";
import FavoritesStack from "./FavoritesStack";

const Tab = createBottomTabNavigator();
type MainTabRouteName = "Home" | "Sell" | "Favorites" | "MY";

type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const getTabIconName = (routeName: MainTabRouteName, focused: boolean) => {
  if (routeName === "Home") {
    return focused ? "home" : "home-outline";
  }

  if (routeName === "Sell") {
    return focused ? "plus-circle" : "plus-circle-outline";
  }

  if (routeName === "Favorites") {
    return focused ? "heart" : "heart-outline";
  }

  if (routeName === "MY") {
    return focused ? "account" : "account-outline";
  }

  return "circle-outline";
};

const renderTabBarIcon =
  (routeName: MainTabRouteName) =>
  ({ color, size, focused }: TabBarIconProps) => {
    const iconName = getTabIconName(routeName, focused);

    return <Icon source={iconName} size={size} color={color} />;
  };

const getMainTabScreenOptions = ({
  route,
}: {
  route: { name: string };
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: "#111111",
  tabBarInactiveTintColor: "#9a9a9a",
  tabBarIcon: renderTabBarIcon(route.name as MainTabRouteName),
});

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={getMainTabScreenOptions}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Sell" component={SellStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
      <Tab.Screen name="MY" component={MyPageStack} />
    </Tab.Navigator>
  );
}
