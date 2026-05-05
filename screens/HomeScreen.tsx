import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
} from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../apis/types";
import { useToggleFavorite } from "../hooks/useToogleFavorite";
import FullScreenLoading from "../components/FullScreenLoading";
import ProductCard from "../components/ProductCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { data: products, isPending, isRefetching, refetch } = useProducts();

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate("Detail", { item })}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  if (isPending) {
    return <FullScreenLoading />;
  }

  if (!products || products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <IconButton
          mode="contained"
          icon="refresh"
          size={22}
          onPress={() => refetch()}
          disabled={isRefetching}
          style={styles.refreshButton}
        />
        <Text>No products yet</Text>
        <Text>Add your first product</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <IconButton
        mode="contained"
        icon="refresh"
        size={22}
        onPress={() => refetch()}
        disabled={isRefetching}
        style={styles.refreshButton}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  refreshButton: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 64,
  },
});
