import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  DollarSign,
  Cpu,
  Users,
  Activity,
  Plus,
  Rocket,
} from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import { useT } from "@/i18n/useT";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import CircularRing from "@/components/ui/CircularRing";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/format";
import { COMPANY_STAGES } from "@/data/gameContent";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const t = useT();
  const cash = useGameStore((s) => s.cash);
  const compute = useGameStore((s) => s.compute);
  const computeCapacity = useGameStore((s) => s.computeCapacity);
  const reputation = useGameStore((s) => s.reputation);
  const totalRevenue = useGameStore((s) => s.totalRevenue);
  const totalUsers = useGameStore((s) => s.totalUsers);
  const companyName = useGameStore((s) => s.companyName);
  const liveProducts = useGameStore((s) => s.liveProducts);
  const salesHistory = useGameStore((s) => s.salesHistory || []);
  const eventLog = useGameStore((s) => s.eventLog);
  const currentDraft = useGameStore((s) => s.currentDraft);
  const competitors = useGameStore((s) => s.competitors || []);
  const activeCrisis = useGameStore((s) => s.activeCrisis);
  const resolveCrisis = useGameStore((s) => s.resolveCrisis);
  const getStage = useGameStore((s) => s.getStage);

  const stage = getStage();
  const nextStageIdx = COMPANY_STAGES.findIndex((s) => s.id === stage.id) + 1;
  const nextStage = COMPANY_STAGES[nextStageIdx];

  const computePct = computeCapacity > 0 ? compute / computeCapacity : 0;
  const reputationPct = Math.min(1, reputation / 200);

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
        {/* Header */}
        <View style={{ marginBottom: 4 }}>
          <Pill label={t(stage.name)} variant="outline" dotColor="#22C55E" />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              color: "#111827",
              letterSpacing: -0.5,
              marginTop: 8,
            }}
            numberOfLines={1}
          >
            {companyName}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {t("dashboard.header_subtitle")}
          </Text>
        </View>

        {/* KPI grid */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <KpiCard
            icon={<DollarSign size={14} color="#6B7280" />}
            label={t("dashboard.kpi_cash")}
            value={formatCurrency(cash)}
          />
          <KpiCard
            icon={<Cpu size={14} color="#6B7280" />}
            label={t("dashboard.kpi_compute")}
            value={`${Math.round(compute)} / ${computeCapacity}`}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <KpiCard
            icon={<Users size={14} color="#6B7280" />}
            label={t("dashboard.kpi_users")}
            value={formatNumber(totalUsers)}
          />
          <KpiCard
            icon={<Activity size={14} color="#6B7280" />}
            label={t("dashboard.kpi_revenue")}
            value={formatCurrency(totalRevenue)}
          />
        </View>

        <SalesInsightCard
          history={salesHistory}
          totalRevenue={totalRevenue}
          liveProducts={liveProducts}
        />

        {/* Health rings */}
        <Card>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 2,
            }}
          >
            {t("dashboard.health_title")}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
            {t("dashboard.health_subtitle")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <RingStat
              value={computePct}
              label={formatPercent(computePct)}
              sublabel={t("dashboard.ring_compute")}
            />
            <RingStat
              value={reputationPct}
              label={Math.round(reputation).toString()}
              sublabel={t("dashboard.ring_reputation")}
            />
            <RingStat
              value={Math.min(1, liveProducts.length / 5)}
              label={liveProducts.length.toString()}
              sublabel={t("dashboard.ring_products")}
            />
          </View>
        </Card>

        {/* Next stage progress */}
        {nextStage ? (
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 11, color: "#6B7280", fontWeight: "500" }}
                >
                  {t("dashboard.next_target_label")}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                    marginTop: 4,
                  }}
                >
                  {t(nextStage.name)}
                </Text>
              </View>
              <Pill label={t("dashboard.next_target_pill")} variant="soft" />
            </View>
            <View style={{ marginTop: 10 }}>
              <StatRow
                label={t("dashboard.row_reputation")}
                value={`${Math.round(reputation)} / ${nextStage.minReputation}`}
              />
              <StatRow
                label={t("dashboard.row_total_revenue")}
                value={`${formatCurrency(totalRevenue)} / ${formatCurrency(
                  nextStage.minRevenue,
                )}`}
              />
            </View>
          </Card>
        ) : null}

        {/* CTA */}
        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            {t("dashboard.cta_title")}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginTop: 2,
              marginBottom: 12,
            }}
          >
            {currentDraft
              ? t("dashboard.cta_draft_subtitle")
              : t("dashboard.cta_empty_subtitle")}
          </Text>
          <Button
            label={
              currentDraft
                ? t("dashboard.cta_continue_draft")
                : t("dashboard.cta_new_product")
            }
            icon={
              currentDraft ? (
                <Rocket size={16} color="#FFFFFF" />
              ) : (
                <Plus size={16} color="#FFFFFF" />
              )
            }
            onPress={() => router.push("/product-flow")}
            fullWidth
          />
        </Card>

        {/* Crisis */}
        {activeCrisis ? (
          <Card>
            <Pill label={t("dashboard.crisis_pill")} variant="status" dotColor="#EF4444" />
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#111827", marginTop: 8 }}>
              {activeCrisis.title}
            </Text>
            <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 4, lineHeight: 20 }}>
              {activeCrisis.description}
            </Text>
            <View style={{ gap: 8, marginTop: 12 }}>
              {activeCrisis.choices.map((choice) => (
                <Pressable
                  key={choice.id}
                  onPress={() => resolveCrisis(choice.id)}
                  style={({ pressed }) => ({
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: pressed ? "#FEE2E2" : "#FFF1F2",
                    borderWidth: 1,
                    borderColor: "#FECACA",
                  })}
                >
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#991B1B" }}>
                    {t(choice.label)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>
        ) : null}

        {/* Competitors */}
        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 2 }}>
            {t("dashboard.competitor_title")}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
            {t("dashboard.competitor_subtitle")}
          </Text>
          {competitors.map((c) => {
            const totalMarket = totalUsers + competitors.reduce((sum, x) => sum + (x.users || 0), 0);
            const share = totalMarket > 0 ? (c.users || 0) / totalMarket : 0;
            return (
              <View key={c.id} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#111827" }}>{t(c.name)}</Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>{formatPercent(share)}</Text>
                </View>
                <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
                  {t(c.strategy)} · {formatNumber(c.users || 0)} {t("dashboard.competitor_users")} · {c.productsLaunched} {t("dashboard.competitor_products")}
                </Text>
                <View style={{ height: 6, borderRadius: 999, backgroundColor: "#F3F4F6", overflow: "hidden" }}>
                  <View style={{ width: `${Math.min(100, share * 100)}%`, height: 6, backgroundColor: c.color }} />
                </View>
              </View>
            );
          })}
        </Card>

        {/* Event feed */}
        <Card>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 2,
            }}
          >
            {t("dashboard.news_title")}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
            {t("dashboard.news_subtitle")}
          </Text>
          {eventLog.length === 0 ? (
            <Text
              style={{ fontSize: 13, color: "#9CA3AF", paddingVertical: 8 }}
            >
              {t("dashboard.news_empty")}
            </Text>
          ) : (
            eventLog.slice(0, 6).map((e) => (
              <View
                key={e.id}
                style={{
                  borderTopWidth: 1,
                  borderColor: "#F3F4F6",
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    marginTop: 7,
                    backgroundColor:
                      e.tone === "positive"
                        ? "#22C55E"
                        : e.tone === "negative"
                          ? "#EF4444"
                          : "#9CA3AF",
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#111827",
                      fontWeight: "500",
                    }}
                  >
                    {e.title ||
                      (e.type === "launch"
                        ? t("dashboard.news_type_launch")
                        : e.type === "research"
                          ? t("dashboard.news_type_research")
                          : t("dashboard.news_type_update"))}
                  </Text>
                  <Text
                    style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}
                  >
                    {e.message}
                  </Text>
                </View>
              </View>
            ))
          )}
        </Card>
      </ScrollView>
    </View>
  );
}

function SalesInsightCard({ history, totalRevenue, liveProducts }) {
  const points = [...history].reverse().slice(-12);
  const maxRevenue = Math.max(1, ...points.map((p) => p.revenue || 0));
  const activeRevenuePerMin = liveProducts.reduce((sum, p) => {
    const active = !p.revenueExpiresAt || Date.now() < p.revenueExpiresAt;
    return sum + (active ? (p.revenuePerTick || 0) * 60 : 0);
  }, 0);

  return (
    <Card>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 2 }}>
        Sales Insight
      </Text>
      <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
        Real revenue samples from active product sales.
      </Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 5, height: 86 }}>
        {points.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 13, color: "#9CA3AF" }}>No sales yet — launch a product to start charting.</Text>
          </View>
        ) : (
          points.map((p, idx) => {
            const height = Math.max(6, ((p.revenue || 0) / maxRevenue) * 78);
            return (
              <View key={`${p.timestamp}-${idx}`} style={{ flex: 1, justifyContent: "flex-end" }}>
                <View
                  style={{
                    height,
                    borderRadius: 6,
                    backgroundColor: idx === points.length - 1 ? "#22C55E" : "#A7F3D0",
                  }}
                />
              </View>
            );
          })
        )}
      </View>
      <View style={{ marginTop: 12 }}>
        <StatRow label="Total sales" value={formatCurrency(totalRevenue)} />
        <StatRow label="Current sales/min" value={formatCurrency(activeRevenuePerMin)} />
      </View>
    </Card>
  );
}

function KpiCard({ icon, label, value }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {icon}
        <Text
          style={{
            fontSize: 11,
            fontWeight: "500",
            color: "#6B7280",
            textTransform: "uppercase",
            letterSpacing: 0.4,
          }}
        >
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "#111827",
          marginTop: 6,
        }}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

function RingStat({ value, label, sublabel }) {
  return (
    <View style={{ alignItems: "center", gap: 6 }}>
      <CircularRing value={value} size={64} strokeWidth={4} label={label} />
      <Text style={{ fontSize: 11, color: "#6B7280", fontWeight: "500" }}>
        {sublabel}
      </Text>
    </View>
  );
}
