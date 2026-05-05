import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
