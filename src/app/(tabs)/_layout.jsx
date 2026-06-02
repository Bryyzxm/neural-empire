import { Tabs } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import {
  LayoutDashboard,
  Boxes,
  Atom,
  Users,
  Settings,
} from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import { useT } from "@/i18n/useT";

export default function TabsLayout() {
  const t = useT();
  const tick = useGameStore((s) => s.tick);
  const persist = useGameStore((s) => s.persist);

  // Run economy ticks frequently; sim clock advances 1 day every 1.5s.
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 500);
    const persistInterval = setInterval(() => {
      persist();
    }, 15000);
    return () => {
      clearInterval(interval);
      clearInterval(persistInterval);
    };
  }, [tick, persist]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          height: Platform.OS === "android" ? 64 : undefined,
          paddingTop: 4,
          paddingBottom: Platform.OS === "android" ? 6 : undefined,
        },
        tabBarItemStyle: {
          minWidth: 0,
          paddingHorizontal: 0,
        },
        tabBarActiveTintColor: "#111827",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 12,
          fontWeight: "500",
          maxWidth: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t("tab.dashboard"),
          tabBarIcon: ({ color }) => (
            <LayoutDashboard color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: t("tab.products"),
          tabBarIcon: ({ color }) => <Boxes color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="research"
        options={{
          title: t("tab.research"),
          tabBarIcon: ({ color }) => <Atom color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="operations"
        options={{
          title: t("tab.operations"),
          tabBarIcon: ({ color }) => <Users color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tab.settings"),
          tabBarIcon: ({ color }) => <Settings color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
