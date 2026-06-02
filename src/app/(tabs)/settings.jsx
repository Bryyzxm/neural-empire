import { View, Text, ScrollView, Pressable, Alert, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Play, RotateCcw, Info, Zap, Check, Heart } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import { useT } from "@/i18n/useT";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import { formatCurrency, formatNumber, formatPercent, formatDuration } from "@/utils/format";
import { formatDateLocalized } from "@/i18n/useT";

const LANGS = [
  { code: "id", flag: "🇮🇩" },
  { code: "en", flag: "🇬🇧" },
];

export default function SettingsTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const t = useT();
  const companyName = useGameStore((s) => s.companyName);
  const founded = useGameStore((s) => s.founded);
  const totalRevenue = useGameStore((s) => s.totalRevenue);
  const totalUsers = useGameStore((s) => s.totalUsers);
  const resetGame = useGameStore((s) => s.resetGame);
  const applyRewardedAdBoost = useGameStore((s) => s.applyRewardedAdBoost);
  const language = useGameStore((s) => s.language);
  const setLanguage = useGameStore((s) => s.setLanguage);

  const handleReset = () => {
    Alert.alert(
      t("settings.alert_reset_title"),
      t("settings.alert_reset_body"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("settings.alert_reset_confirm"),
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
      t("settings.alert_ad_title"),
      t("settings.alert_ad_body"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("settings.alert_ad_confirm"),
          onPress: () => applyRewardedAdBoost(),
        },
      ],
    );
  };

  const handleDonate = () => {
    Linking.openURL("https://saweria.co/bryyzxm");
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
          <Pill label={t("settings.header_pill")} variant="soft" />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              color: "#111827",
              letterSpacing: -0.5,
              marginTop: 8,
            }}
          >
            {t("settings.header_title")}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {t("settings.header_subtitle")}
          </Text>
        </View>

        {/* Language switcher card */}
        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            {t("settings.lang_section_title")}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            {t("settings.lang_section_subtitle")}
          </Text>
          <View style={{ gap: 8 }}>
            {LANGS.map((l) => {
              const selected = language === l.code;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => setLanguage(l.code)}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: selected ? "#2563EB" : "#E5E7EB",
                    backgroundColor: selected ? "#EFF6FF" : "#FFFFFF",
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Text style={{ fontSize: 22 }}>{l.flag}</Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    {t(`settings.lang_${l.code}`)}
                  </Text>
                  {selected ? <Check size={20} color="#2563EB" /> : null}
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            {t("settings.profile_title")}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            {t("settings.profile_subtitle")}
          </Text>
          <StatRow label={t("settings.profile_name")} value={companyName} />
          <StatRow
            label={t("settings.profile_founded")}
            value={formatDateLocalized(founded, language)}
          />
          <StatRow label={t("settings.profile_revenue")} value={formatCurrency(totalRevenue)} />
          <StatRow label={t("settings.profile_users")} value={formatNumber(totalUsers)} />
        </Card>

        <Card
          style={{
            borderColor: "#FCA5A5",
            backgroundColor: "#FFF7F7",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Heart size={18} color="#DC2626" fill="#DC2626" />
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827", flex: 1 }}>
              {t("settings.donate_title")}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 6,
              marginBottom: 12,
              lineHeight: 19,
            }}
          >
            {t("settings.donate_subtitle")}
          </Text>
          <Button
            label={t("settings.donate_cta")}
            variant="primary"
            icon={<Heart size={16} color="#FFFFFF" fill="#FFFFFF" />}
            onPress={handleDonate}
            fullWidth
          />
        </Card>

        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            {t("settings.boost_title")}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            {t("settings.boost_subtitle")}
          </Text>
          <Button
            label={t("settings.boost_cta")}
            variant="soft"
            icon={<Zap size={16} color="#2563EB" />}
            onPress={handleAdBoost}
            fullWidth
          />
        </Card>

        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            {t("settings.save_title")}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            {t("settings.save_subtitle")}
          </Text>
          <View style={{ gap: 8 }}>
            <Button
              label={t("settings.save_replay")}
              variant="secondary"
              icon={<Play size={16} color="#111827" />}
              onPress={() => router.push("/onboarding")}
              fullWidth
            />
            <Button
              label={t("settings.save_reset")}
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
              {t("settings.about", { year: new Date().getFullYear() })}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
