import { Redirect } from "expo-router";
import { useGameStore } from "@/store/gameStore";

export default function Index() {
  const onboardingComplete = useGameStore((s) => s.onboardingComplete);
  if (!onboardingComplete) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tabs)/dashboard" />;
}
