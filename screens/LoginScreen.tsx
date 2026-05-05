import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import useLogin from "../hooks/useLogin";
import FullScreenLoading from "../components/FullScreenLoading";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const { mutate: login, isPending } = useLogin();

  if (isPending) {
    return <FullScreenLoading />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        outlineStyle={styles.inputOutline}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        outlineStyle={styles.inputOutline}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => login({ email, password })}
        style={styles.loginButton}
        contentStyle={styles.buttonContent}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Signup")}
        style={styles.signupButton}
        contentStyle={styles.buttonContent}
      >
        Sign Up
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
  },
  input: {
    marginBottom: 12,
  },
  inputOutline: {
    borderRadius: 12,
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  signupButton: {
    marginTop: 10,
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
});
