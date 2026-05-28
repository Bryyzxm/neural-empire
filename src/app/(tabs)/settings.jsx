import { View, Text, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Play, RotateCcw, Info, Zap } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import { formatCurrency, formatNumber } from "@/utils/format";

export default function SettingsTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const companyName = useGameStore((s) => s.companyName);
  const founded = useGameStore((s) => s.founded);
  const totalRevenue = useGameStore((s) => s.totalRevenue);
  const totalUsers = useGameStore((s) => s.totalUsers);
  const resetGame = useGameStore((s) => s.resetGame);
  const applyRewardedAdBoost = useGameStore((s) => s.applyRewardedAdBoost);

  const handleReset = () => {
    Alert.alert(
      "Reset progress?",
      "Semua data permainan akan dihapus. Ini tidak bisa dibatalkan.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetGame();
            router.replace("/onboarding");
          },
        },
      ],
    );
  };

  const handleAdBoost = () => {
    Alert.alert(
      "Tonton ad?",
      "Simulasi reward ad — Anda akan mendapatkan +10 Compute.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Klaim",
          onPress: () => applyRewardedAdBoost(),
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: 100,
          gap: 12,
        }}
      >
        <View>
          <Pill label="Settings" variant="soft" />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              color: "#111827",
              letterSpacing: -0.5,
              marginTop: 8,
            }}
          >
            Pengaturan
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            Profil perusahaan dan manajemen save.
          </Text>
        </View>

        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            Profil Perusahaan
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            Ringkasan all-time.
          </Text>
          <StatRow label="Nama" value={companyName} />
          <StatRow
            label="Didirikan"
            value={new Date(founded).toLocaleDateString("id-ID")}
          />
          <StatRow label="Revenue total" value={formatCurrency(totalRevenue)} />
          <StatRow label="Pengguna aktif" value={formatNumber(totalUsers)} />
        </Card>

        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            Boost (Simulasi Rewarded Ad)
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            Pratinjau monetisasi non pay-to-win — boost compute opsional.
          </Text>
          <Button
            label="Klaim +10 Compute"
            variant="soft"
            icon={<Zap size={16} color="#2563EB" />}
            onPress={handleAdBoost}
            fullWidth
          />
        </Card>

        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            Save & Reset
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            Auto-save aktif (lokal). Reset menghapus seluruh progress.
          </Text>
          <View style={{ gap: 8 }}>
            <Button
              label="Lihat tutorial lagi"
              variant="secondary"
              icon={<Play size={16} color="#111827" />}
              onPress={() => router.push("/onboarding")}
              fullWidth
            />
            <Button
              label="Reset progress"
              variant="danger"
              icon={<RotateCcw size={16} color="#B91C1C" />}
              onPress={handleReset}
              fullWidth
            />
          </View>
        </Card>

        <Card>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Info size={16} color="#6B7280" />
            <Text style={{ fontSize: 13, color: "#6B7280" }}>
              Neural Empire MVP 0.1.0 · Build {new Date().getFullYear()}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
