import { View, FlatList, ListRenderItem } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../apis/types";
import { useProducts } from "../hooks/useProducts";
import { useToggleFavorite } from "../hooks/useToogleFavorite";
import FullScreenLoading from "../components/FullScreenLoading";
import ProductCard from "../components/ProductCard";

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const { data: products, isPending } = useProducts();
  const { mutate: toggleFavorite } = useToggleFavorite();
  const favoriteProducts = (products ?? []).filter((item) => item.isFavorite);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate("Home", {
          screen: "Detail",
          params: { item },
        })
      }
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  if (isPending) {
    return <FullScreenLoading />;
  }

  if (favoriteProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favorite products yet</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
