import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import { useCallback, useEffect } from "react";
import { AppState, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGameStore } from "@/store/gameStore";
import { useTooltipStore } from "@/store/tooltipStore";

SplashScreen.preventAutoHideAsync().catch(() => {});

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

const enterAndroidImmersiveMode = async () => {
  if (Platform.OS !== "android") return;

  try {
    await NavigationBar.setPositionAsync("absolute");
    await NavigationBar.setBehaviorAsync("overlay-swipe");
    await NavigationBar.setVisibilityAsync("hidden");
    await NavigationBar.setBackgroundColorAsync("#00000000");
    await NavigationBar.setButtonStyleAsync("dark");
  } catch {
    // Unsupported on a few OEM/gesture-nav combos; safe to ignore.
  }
};

export default function RootLayout() {
  const hydrate = useGameStore((s) => s.hydrate);
  const hydrated = useGameStore((s) => s.hydrated);
  const loadTooltips = useTooltipStore((s) => s.load);

  const restoreImmersiveMode = useCallback(() => {
    enterAndroidImmersiveMode();
  }, []);

  useEffect(() => {
    Promise.resolve(hydrate()).catch(() => {});
    Promise.resolve(loadTooltips()).catch(() => {});
  }, [hydrate, loadTooltips]);

  useEffect(() => {
    restoreImmersiveMode();

    const appStateSubscription = AppState.addEventListener("change", (state) => {
      if (state === "active") restoreImmersiveMode();
    });

    const interval = setInterval(restoreImmersiveMode, 3000);

    return () => {
      appStateSubscription.remove();
      clearInterval(interval);
    };
  }, [restoreImmersiveMode]);

  useEffect(() => {
    if (hydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [hydrated]);

  if (!hydrated) {
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
