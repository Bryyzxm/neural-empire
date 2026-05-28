import { useAuth } from "@/utils/auth/useAuth";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGameStore } from "@/store/gameStore";
import { useTooltipStore } from "@/store/tooltipStore";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const { initiate, isReady } = useAuth();
  const hydrate = useGameStore((s) => s.hydrate);
  const hydrated = useGameStore((s) => s.hydrated);
  const loadTooltips = useTooltipStore((s) => s.load);

  useEffect(() => {
    initiate();
  }, [initiate]);

  useEffect(() => {
    hydrate();
    loadTooltips(); // load seen-tooltips from AsyncStorage
  }, [hydrate, loadTooltips]);

  useEffect(() => {
    if (isReady && hydrated) {
      SplashScreen.hideAsync();
    }
  }, [isReady, hydrated]);

  if (!isReady || !hydrated) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="product-flow"
            options={{ presentation: "card" }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
