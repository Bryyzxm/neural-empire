import { useState } from "react";
import { View, Text, ScrollView, TextInput, Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Check, Rocket } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

const STRINGS = {
  id: {
    pill: "Tutorial cepat",
    langTitle: "Pilih bahasa",
    nameTitle: "Nama perusahaan",
    nameSubtitle: "Nanti muncul di Dashboard dan event log.",
    nameField: "Nama Perusahaan",
    namePlaceholder: "Mis. Lumen Labs",
    goalTitle: "Goal awal: launch produk pertama",
    goalBody: "Ikuti objective di layar. Lu akan pilih produk, beli data, training model, lalu launch sampai revenue pertama jalan.",
    back: "Kembali",
    next: "Lanjut",
    start: "Mulai Tutorial",
    langId: "Bahasa Indonesia",
    langEn: "English",
  },
  en: {
    pill: "Quick tutorial",
    langTitle: "Choose language",
    nameTitle: "Company name",
    nameSubtitle: "Shown on Dashboard and event logs.",
    nameField: "Company Name",
    namePlaceholder: "e.g. Lumen Labs",
    goalTitle: "First goal: launch your first product",
    goalBody: "Follow the objective on screen. You'll pick a product, buy data, train the model, then launch until first revenue starts.",
    back: "Back",
    next: "Next",
    start: "Start Tutorial",
    langId: "Bahasa Indonesia",
    langEn: "English",
  },
};

const LANGUAGES = [
  { code: "id", flag: "🇮🇩", labelKey: "langId" },
  { code: "en", flag: "🇬🇧", labelKey: "langEn" },
];

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const storedLanguage = useGameStore((s) => s.language);
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);
  const setCompanyName = useGameStore((s) => s.setCompanyName);
  const setLanguage = useGameStore((s) => s.setLanguage);
  const replayTutorial = useGameStore((s) => s.replayTutorial);
  const [lang, setLang] = useState(storedLanguage === "en" ? "en" : "id");
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Neural Empire Inc.");
  const t = STRINGS[lang];

  const finish = () => {
    setCompanyName(name?.trim() || "Neural Empire Inc.");
    setLanguage(lang);
    replayTutorial();
    completeOnboarding();
    router.replace("/(tabs)/dashboard");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 24, paddingHorizontal: 20, paddingBottom: insets.bottom + 24, gap: 16 }}>
        <Pill label={t.pill} variant="soft" />
        {step === 0 ? (
          <>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#111827" }}>{t.langTitle}</Text>
            <View style={{ gap: 12 }}>
              {LANGUAGES.map((l) => {
                const selected = lang === l.code;
                return (
                  <Pressable key={l.code} onPress={() => setLang(l.code)} style={({ pressed }) => ({ borderWidth: 1, borderColor: selected ? "#2563EB" : "#E5E7EB", backgroundColor: selected ? "#EFF6FF" : "#FFFFFF", borderRadius: 12, padding: 16, flexDirection: "row", alignItems: "center", gap: 14, opacity: pressed ? 0.85 : 1 })}>
                    <Text style={{ fontSize: 28 }}>{l.flag}</Text>
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: "600", color: "#111827" }}>{t[l.labelKey]}</Text>
                    {selected ? <Check size={20} color="#2563EB" /> : null}
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : step === 1 ? (
          <>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#111827" }}>{t.nameTitle}</Text>
            <Text style={{ fontSize: 14, color: "#6B7280" }}>{t.nameSubtitle}</Text>
            <Card>
              <Text style={{ fontSize: 11, fontWeight: "600", color: "#6B7280", marginBottom: 6, textTransform: "uppercase" }}>{t.nameField}</Text>
              <TextInput value={name} onChangeText={setName} placeholder={t.namePlaceholder} placeholderTextColor="#9CA3AF" style={{ borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, paddingHorizontal: 12, paddingVertical: Platform.OS === "ios" ? 12 : 8, fontSize: 15, color: "#111827", backgroundColor: "#FFFFFF" }} />
            </Card>
          </>
        ) : (
          <Card style={{ borderColor: "#BFDBFE", backgroundColor: "#EFF6FF" }}>
            <Rocket size={36} color="#2563EB" />
            <Text style={{ fontSize: 24, fontWeight: "800", color: "#111827", marginTop: 12 }}>{t.goalTitle}</Text>
            <Text style={{ fontSize: 14, color: "#4B5563", lineHeight: 21, marginTop: 6 }}>{t.goalBody}</Text>
          </Card>
        )}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
          {step > 0 ? <Button label={t.back} variant="secondary" onPress={() => setStep((v) => v - 1)} /> : null}
          <Button label={step === 2 ? t.start : t.next} onPress={step === 2 ? finish : () => setStep((v) => v + 1)} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
