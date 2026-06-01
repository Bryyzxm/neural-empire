import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Atom, Lock, Check } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import { useT } from "@/i18n/useT";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import TooltipWord from "@/components/ui/TooltipWord";
import { formatCurrency, formatDuration } from "@/utils/format";
import { RESEARCH_NODES } from "@/data/gameContent";
import { TOOLTIPS, TOOLTIP_CATEGORIES } from "@/data/tooltipContent";

// Maps each research node → the tooltip term that explains its domain
const NODE_CONCEPT_MAP = {
  research_nlp_1: "nlp",
  research_nlp_2: "nlp",
  research_vision_1: "computer_vision",
  research_gen_1: "generative_ai",
};

export default function ResearchTab() {
  const insets = useSafeAreaInsets();
  const t = useT();
  const cash = useGameStore((s) => s.cash);
  const unlockedResearch = useGameStore((s) => s.unlockedResearch);
  const activeResearch = useGameStore((s) => s.activeResearch);
  const startResearch = useGameStore((s) => s.startResearch);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const nodes = Object.values(RESEARCH_NODES);

  const handleStart = (nodeId) => {
    const res = startResearch(nodeId);
    if (!res.ok) {
      Alert.alert(t("research.alert_cant_start_title"), res.error);
    }
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
          <Pill label={t("research.header_pill")} variant="soft" />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              color: "#111827",
              letterSpacing: -0.5,
              marginTop: 8,
            }}
          >
            {t("research.header_title")}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {t("research.header_subtitle")}
          </Text>
        </View>

        {activeResearch ? (
          <Card>
            <Text style={{ fontSize: 11, color: "#6B7280", fontWeight: "500" }}>
              {t("research.label_in_progress")}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#111827",
                marginTop: 4,
              }}
            >
              {t(RESEARCH_NODES[activeResearch.nodeId]?.name)}
            </Text>
            <View style={{ marginTop: 10 }}>
              <StatRow
                label={t("research.label_time_left")}
                value={formatDuration(activeResearch.completesAt - now)}
              />
            </View>
          </Card>
        ) : null}

        {nodes.map((n) => {
          const isUnlocked = unlockedResearch.includes(n.id);
          const isActive = activeResearch?.nodeId === n.id;
          const missingDep = n.requires.find(
            (d) => !unlockedResearch.includes(d),
          );
          const canAfford = cash >= n.cost;
          const conceptTermId = NODE_CONCEPT_MAP[n.id];
          return (
            <Card key={n.id}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Pill
                    label={
                      isUnlocked
                        ? t("research.status_done")
                        : isActive
                          ? t("research.status_running")
                          : missingDep
                            ? t("research.status_locked")
                            : t("research.status_available")
                    }
                    variant="status"
                    dotColor={
                      isUnlocked
                        ? "#22C55E"
                        : isActive
                          ? "#2563EB"
                          : missingDep
                            ? "#9CA3AF"
                            : "#EAB308"
                    }
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#111827",
                      marginTop: 8,
                    }}
                  >
                    {t(n.name)}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                      marginTop: 4,
                      gap: 4,
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "#6B7280" }}>
                      {t(n.description)}
                    </Text>
                    {conceptTermId ? (
                      <TooltipWord
                        termId={conceptTermId}
                        style={{ fontSize: 12 }}
                      >
                        {t("research.what_is", { term: t(TOOLTIPS[conceptTermId]?.term) })}
                      </TooltipWord>
                    ) : null}
                  </View>
                </View>
                {isUnlocked ? (
                  <Check size={20} color="#22C55E" />
                ) : missingDep ? (
                  <Lock size={20} color="#9CA3AF" />
                ) : (
                  <Atom size={20} color="#2563EB" />
                )}
              </View>
              <View style={{ marginTop: 10 }}>
                <StatRow label={t("research.label_cost")} value={formatCurrency(n.cost)} />
                <StatRow
                  label={t("research.label_duration")}
                  value={formatDuration(n.duration * 1000)}
                />
                {n.requires.length > 0 ? (
                  <StatRow
                    label={t("research.label_prereq")}
                    value={n.requires
                      .map((d) => t(RESEARCH_NODES[d]?.name))
                      .join(", ")}
                  />
                ) : null}
              </View>
              {!isUnlocked && !isActive ? (
                <View style={{ marginTop: 12 }}>
                  <Button
                    label={
                      missingDep
                        ? t("research.btn_prereq_locked")
                        : !canAfford
                          ? t("research.btn_cash_low")
                          : t("research.btn_start")
                    }
                    onPress={() => handleStart(n.id)}
                    disabled={!!missingDep || !canAfford || !!activeResearch}
                    fullWidth
                  />
                </View>
              ) : null}
            </Card>
          );
        })}

        {/* ── Glossary card — all tappable AI terms ─────────────────────── */}
        <Card>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}>
            {t("research.glossary_title")}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            {t("research.glossary_subtitle")}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {Object.values(TOOLTIPS).map((tt) => {
              const cat = TOOLTIP_CATEGORIES[tt.category];
              return (
                <TooltipWord
                  key={tt.id}
                  termId={tt.id}
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: cat?.color || "#2563EB",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: cat?.bg || "#EFF6FF",
                    borderRadius: 999,
                    overflow: "hidden",
                    textDecorationLine: "none",
                  }}
                >
                  {t(tt.term)}
                </TooltipWord>
              );
            })}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
