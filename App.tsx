import useProductOutboxWorker from "./hooks/useProductOutboxWorker";
import RootNavigator from "./navigation/RootNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

function AppContent() {
  useProductOutboxWorker();

  return <RootNavigator />;
}
