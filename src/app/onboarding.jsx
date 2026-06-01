import { useState } from "react";
import { View, Text, ScrollView, TextInput, Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Sparkles, Database, Cpu, TrendingUp, Check } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

// ── Bilingual strings for the onboarding flow only ──────────────────────────
// Game content (dashboard, products, events) stays Indonesian for now.
// Add new keys here and the consumer below — no library, ~1KB bundle cost.
const STRINGS = {
  id: {
    pill: "MVP 0.1.0",
    langTitle: "Pilih bahasa",
    langSubtitle: "Pilih bahasa untuk tutorial onboarding.",
    langId: "Bahasa Indonesia",
    langEn: "English",
    steps: [
      {
        icon: Sparkles,
        title: "Selamat datang, Founder",
        body: "Anda baru saja mendirikan startup AI di garage. Tujuan Anda: membangun produk AI, mendapatkan pengguna, dan tumbuh menjadi perusahaan global.",
      },
      {
        icon: Database,
        title: "Pilih data dengan bijak",
        body: "Data adalah bahan bakar. Data murah cepat dapat, tapi membawa risiko bias dan halusinasi. Data premium mahal, tapi reputasi tetap aman.",
      },
      {
        icon: Cpu,
        title: "Latih modelmu",
        body: "Training menghabiskan compute. Semakin banyak epoch, semakin tinggi kualitas — namun marginal returns akan turun.",
      },
      {
        icon: TrendingUp,
        title: "Luncurkan dan tumbuh",
        body: "Evaluasi sebelum launch. Tiap rilis mempengaruhi pengguna, revenue, dan reputasi. Tumbuh dari garage ke AI empire.",
      },
    ],
    nameTitle: "Beri nama perusahaanmu",
    nameSubtitle: "Nama ini akan muncul di Dashboard dan log peristiwa.",
    nameField: "Nama Perusahaan",
    namePlaceholder: "Mis. Lumen Labs",
    back: "Kembali",
    next: "Lanjut",
    start: "Mulai Bermain",
  },
  en: {
    pill: "MVP 0.1.0",
    langTitle: "Choose language",
    langSubtitle: "Pick the language for the onboarding tutorial.",
    langId: "Bahasa Indonesia",
    langEn: "English",
    steps: [
      {
        icon: Sparkles,
        title: "Welcome, Founder",
        body: "You just founded an AI startup in your garage. Your goal: build AI products, gain users, and grow into a global company.",
      },
      {
        icon: Database,
        title: "Choose data wisely",
        body: "Data is fuel. Cheap data is fast to grab, but it carries bias and hallucination risks. Premium data costs more, but your reputation stays safe.",
      },
      {
        icon: Cpu,
        title: "Train your model",
        body: "Training spends compute. More epochs mean higher quality — though marginal returns will taper off.",
      },
      {
        icon: TrendingUp,
        title: "Launch and grow",
        body: "Evaluate before launching. Each release affects users, revenue, and reputation. Grow from garage to AI empire.",
      },
    ],
    nameTitle: "Name your company",
    nameSubtitle: "This name will appear on the Dashboard and in event logs.",
    nameField: "Company Name",
    namePlaceholder: "e.g. Lumen Labs",
    back: "Back",
    next: "Next",
    start: "Start Playing",
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

  const [lang, setLang] = useState(storedLanguage === "en" ? "en" : "id");
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Neural Empire Inc.");

  const t = STRINGS[lang];
  // Step 0 = language picker, 1..4 = content, 5 = company name
  const TOTAL_STEPS = t.steps.length + 2;
  const isNameStep = step === TOTAL_STEPS - 1;
  const isLangStep = step === 0;
  const Active = t.steps[step - 1]?.icon;
  const activeTitle = isNameStep
    ? t.nameTitle
    : isLangStep
    ? t.langTitle
    : t.steps[step - 1].title;
  const activeBody = isNameStep
    ? null
    : isLangStep
    ? t.langSubtitle
    : t.steps[step - 1].body;

  const handleNext = () => {
    if (isNameStep) {
      setCompanyName(name?.trim() || "Neural Empire Inc.");
      setLanguage(lang);
      completeOnboarding();
      router.replace("/(tabs)/dashboard");
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 24,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 24,
          gap: 16,
        }}
      >
        <Pill label={t.pill} variant="soft" />

        {isNameStep ? (
          <>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "600",
                color: "#111827",
                letterSpacing: -0.5,
              }}
            >
              {t.nameTitle}
            </Text>
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}>
              {t.nameSubtitle}
            </Text>

            <Card>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "500",
                  color: "#6B7280",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {t.nameField}
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t.namePlaceholder}
                placeholderTextColor="#9CA3AF"
                style={{
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: Platform.OS === "ios" ? 12 : 8,
                  fontSize: 15,
                  color: "#111827",
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Card>
          </>
        ) : isLangStep ? (
          <>
            <View style={{ marginTop: 12, gap: 12 }}>
              {LANGUAGES.map((l) => {
                const selected = lang === l.code;
                return (
                  <Pressable
                    key={l.code}
                    onPress={() => setLang(l.code)}
                    style={({ pressed }) => ({
                      borderWidth: 1,
                      borderColor: selected ? "#2563EB" : "#E5E7EB",
                      backgroundColor: selected ? "#EFF6FF" : "#FFFFFF",
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 18,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 14,
                      opacity: pressed ? 0.85 : 1,
                    })}
                  >
                    <Text style={{ fontSize: 28 }}>{l.flag}</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {t[l.labelKey]}
                    </Text>
                    {selected ? (
                      <Check size={20} color="#2563EB" />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              {Active ? <Active size={26} color="#2563EB" /> : null}
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "600",
                color: "#111827",
                letterSpacing: -0.5,
              }}
            >
              {activeTitle}
            </Text>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 22,
                color: "#6B7280",
              }}
            >
              {activeBody}
            </Text>
          </>
        )}

        {/* Step dots: language + content + name */}
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            marginTop: 12,
          }}
        >
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === step ? "#2563EB" : "#E5E7EB",
              }}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 16,
          paddingTop: 12,
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          gap: 12,
        }}
      >
        {step > 0 ? (
          <Button
            label={t.back}
            variant="secondary"
            onPress={() => setStep((s) => s - 1)}
          />
        ) : null}
        <View style={{ flex: 1 }}>
          <Button
            label={isNameStep ? t.start : t.next}
            onPress={handleNext}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}
