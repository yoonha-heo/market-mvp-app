import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import useSignupForm from "../hooks/useSignupForm";
import FullScreenLoading from "../components/FullScreenLoading";

export default function SignupScreen() {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleChangeEmail,
    handleChangePassword,
    submit,
    isPending,
    signupError,
  } = useSignupForm();

  if (isPending) {
    return <FullScreenLoading />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={email}
        onChangeText={handleChangeEmail}
        placeholder="email"
        outlineStyle={styles.inputOutline}
        style={styles.input}
      />
      <Text style={styles.error}>{emailError}</Text>
      <TextInput
        mode="outlined"
        value={password}
        onChangeText={handleChangePassword}
        placeholder="password"
        secureTextEntry
        outlineStyle={styles.inputOutline}
        style={styles.input}
      />
      <Text style={styles.error}>{passwordError}</Text>
      <Button
        mode="contained"
        onPress={submit}
        style={styles.signupButton}
        contentStyle={styles.buttonContent}
      >
        Sign Up
      </Button>
      {!!signupError && <Text style={styles.signupError}>{signupError}</Text>}
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
    marginBottom: 8,
  },
  inputOutline: {
    borderRadius: 12,
  },
  error: {
    minHeight: 20,
    marginBottom: 12,
    color: "#d32f2f",
  },
  signupButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
  signupError: {
    marginTop: 12,
    color: "#d32f2f",
    textAlign: "center",
  },
});
