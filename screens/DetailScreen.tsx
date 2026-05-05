import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { Product } from "../apis/types";
import { useProducts } from "../hooks/useProducts";
import { useToggleFavorite } from "../hooks/useToogleFavorite";

export default function DetailScreen() {
  const route = useRoute();
  const { item } = route.params as { item: Product };
  const { data: products } = useProducts();
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();
  const currentItem = products?.find((product) => product.id === item.id);
  const isFavorite = currentItem?.isFavorite ?? item.isFavorite;

  const handleToggleFavorite = () => {
    toggleFavorite(item.id);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.imageFallback}>
              <Text style={styles.imageFallbackLabel}>No image available</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={handleToggleFavorite}
            disabled={isPending}
            activeOpacity={0.8}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteEmoji}>{isFavorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text variant="titleLarge" style={styles.title}>
            {item.title}
          </Text>
          <Text variant="headlineSmall" style={styles.price}>
            {item.price} KRW
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 16,
  },
  container: {
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f3f3f3",
  },
  imageFallback: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
  },
  imageFallbackLabel: {
    color: "#888888",
    fontSize: 14,
  },
  body: {
    padding: 16,
  },
  title: {
    color: "#111111",
    fontWeight: "700",
  },
  price: {
    marginTop: 8,
    color: "#111111",
    fontWeight: "700",
  },
  favoriteButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  favoriteEmoji: {
    fontSize: 22,
  },
});
