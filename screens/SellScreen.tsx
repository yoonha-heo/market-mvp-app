import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import useDraft from "../hooks/useDraft";
import useSell from "../hooks/useSell";
import usePickImage from "../hooks/usePickImage";

export default function SellScreen() {
  const {
    hydrated,
    title,
    setTitle,
    price,
    setPrice,
    image,
    setImage,
    clearDraft,
  } = useDraft();
  const { submit, loading } = useSell({ title, price, image });
  const pickImage = usePickImage(setImage);

  const imageUri = typeof image === "string" ? image : image?.uri;
  const restoredDraftMessage =
    hydrated && (title || price || image)
      ? "Your saved draft has been restored"
      : "";

  const handleSubmit = async () => {
    const success = await submit();

    if (success) {
      clearDraft();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.draftText}>{restoredDraftMessage}</Text>
      <TextInput
        mode="outlined"
        label="Title"
        value={title}
        onChangeText={setTitle}
        outlineStyle={styles.inputOutline}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        outlineStyle={styles.inputOutline}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={pickImage}
        disabled={loading}
        activeOpacity={0.85}
        style={[styles.imageBox, !imageUri && styles.imageBoxEmpty]}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.plusText}>+</Text>
          </View>
        )}
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.submitButton}
        contentStyle={styles.submitButtonContent}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  draftText: {
    minHeight: 20,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
  inputOutline: {
    borderRadius: 16,
  },
  imageBox: {
    width: "50%",
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  imageBoxEmpty: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#9e9e9e",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#fafafa",
  },
  uploadLabel: {
    position: "absolute",
    top: 16,
    left: 16,
    color: "#666666",
    fontSize: 13,
    fontWeight: "600",
  },
  plusText: {
    fontSize: 32,
    lineHeight: 32,
    color: "#444444",
  },
  submitButton: {
    marginTop: 4,
    borderRadius: 14,
  },
  submitButtonContent: {
    height: 48,
  },
});
