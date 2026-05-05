import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Product } from "../apis/types";

type ProductCardProps = {
  product: Product;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export default function ProductCard({
  product,
  onPress,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View>
          <Text variant="titleMedium">{product.title}</Text>
          <Text>{product.price} KRW</Text>
        </View>
        <Button onPress={onToggleFavorite}>
          {product.isFavorite ? "❤️" : "🤍"}
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
