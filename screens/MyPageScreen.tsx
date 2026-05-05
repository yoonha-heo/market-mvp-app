import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuthStore } from "../store/authStore";

export default function MyPageScreen() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={logout}
        style={styles.logoutButton}
        contentStyle={styles.logoutButtonContent}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 96,
    backgroundColor: "#ffffff",
  },
  logoutButton: {
    borderRadius: 12,
  },
  logoutButtonContent: {
    height: 48,
  },
});
