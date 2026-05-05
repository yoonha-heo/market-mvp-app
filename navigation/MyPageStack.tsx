import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPageScreen from "../screens/MyPageScreen";

const Stack = createNativeStackNavigator();

export default function MyPageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MY" component={MyPageScreen} />
    </Stack.Navigator>
  );
}
