import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import AuthStack from "./AuthStack";
import { useAuthStore } from "../store/authStore";

export default function RootNavigator() {
  const accessToken = useAuthStore((s) => s.accessToken);

  return (
    <NavigationContainer>
      {accessToken ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
