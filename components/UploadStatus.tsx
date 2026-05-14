import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useProductOutboxStore } from "../store/productOutboxStore";

export default function UploadStatus() {
  const queue = useProductOutboxStore((s) => s.queue);
  const setQueue = useProductOutboxStore((s) => s.setQueue);

  const retry = (id: string) => {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, status: "pending", attempt: 0, errorMessage: undefined }
          : q,
      ),
    );
  };

  if (queue.length === 0) return null;

  return (
    <View style={{ padding: 8 }}>
      {queue.map((item) => (
        <View key={item.id} style={{ marginBottom: 4 }}>
          <Text>
            Upload {item.status} ({item.attempt})
          </Text>
          {item.errorMessage ? <Text>{item.errorMessage}</Text> : null}

          {item.status === "error" && (
            <Button onPress={() => retry(item.id)}>Retry</Button>
          )}
        </View>
      ))}
    </View>
  );
}
