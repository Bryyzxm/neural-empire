import { useState } from "react";
import { View, Text, ScrollView, TextInput, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Sparkles, Database, Cpu, TrendingUp } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

const STEPS = [
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
];

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Neural Empire Inc.");
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);
  const setCompanyName = useGameStore((s) => s.setCompanyName);

  const isLast = step === STEPS.length;
  const Active = STEPS[step]?.icon;

  const handleNext = () => {
    if (isLast) {
      setCompanyName(name?.trim() || "Neural Empire Inc.");
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
        <Pill label="MVP 0.1.0" variant="soft" />

        {isLast ? (
          <>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "600",
                color: "#111827",
                letterSpacing: -0.5,
              }}
            >
              Beri nama perusahaanmu
            </Text>
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}>
              Nama ini akan muncul di Dashboard dan log peristiwa.
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
                Nama Perusahaan
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Mis. Lumen Labs"
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
              {STEPS[step].title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 22,
                color: "#6B7280",
              }}
            >
              {STEPS[step].body}
            </Text>
          </>
        )}

        {/* Step dots */}
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            marginTop: 12,
          }}
        >
          {STEPS.concat([{}]).map((_, i) => (
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
            label="Kembali"
            variant="secondary"
            onPress={() => setStep((s) => s - 1)}
          />
        ) : null}
        <View style={{ flex: 1 }}>
          <Button
            label={isLast ? "Mulai Bermain" : "Lanjut"}
            onPress={handleNext}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}
