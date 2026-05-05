import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellScreen from "../screens/SellScreen";

const Stack = createNativeStackNavigator();

export default function SellStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sell" component={SellScreen} />
    </Stack.Navigator>
  );
}
