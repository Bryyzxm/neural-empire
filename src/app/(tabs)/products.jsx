import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Plus, Clock, CheckCircle2 } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import { useT } from "@/i18n/useT";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import TooltipWord from "@/components/ui/TooltipWord";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/format";
import { PRODUCT_TYPES } from "@/data/gameContent";

// ── Helpers ────────────────────────────────────────────────────────────────
function formatRemaining(ms) {
  if (ms <= 0) return "0d";
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m === 0) return `${s}d`;
  return `${m}m ${s}d`;
}

// ── Revenue Lifespan Bar ───────────────────────────────────────────────────
function RevenueLifeBar({ product, now, t }) {
  const { revenueExpiresAt, revenueLifespanSec, launchedAt } = product;

  // Fallback for products launched before this feature existed
  if (!revenueExpiresAt) return null;

  const totalMs = (revenueLifespanSec || 300) * 1000;
  const remainingMs = Math.max(0, revenueExpiresAt - now);
  const ratio = remainingMs / totalMs; // 1.0 → 0.0
  const isExpired = remainingMs <= 0;

  // Bar color: green → yellow → red → gray (expired)
  let barColor = "#22C55E";
  if (isExpired) barColor = "#D1D5DB";
  else if (ratio < 0.2) barColor = "#EF4444";
  else if (ratio < 0.5) barColor = "#EAB308";

  // Label color matches bar
  let labelColor = "#16A34A";
  if (isExpired) labelColor = "#9CA3AF";
  else if (ratio < 0.2) labelColor = "#B91C1C";
  else if (ratio < 0.5) labelColor = "#A16207";

  return (
    <View style={{ marginTop: 10, gap: 6 }}>
      {/* Section label row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          {isExpired ? (
            <CheckCircle2 size={12} color="#9CA3AF" />
          ) : (
            <Clock size={12} color={labelColor} />
          )}
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {isExpired ? t("products.revenue_done") : t("products.revenue_lifespan")}
          </Text>
        </View>
        <Text style={{ fontSize: 12, fontWeight: "600", color: labelColor }}>
          {isExpired ? t("products.revenue_release_new") : formatRemaining(remainingMs)}
        </Text>
      </View>

      {/* Progress track */}
      <View
        style={{
          height: 6,
          backgroundColor: "#F3F4F6",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 6,
            borderRadius: 999,
            backgroundColor: barColor,
            width: `${Math.round(ratio * 100)}%`,
          }}
        />
      </View>

      {/* Expired message */}
      {isExpired ? (
        <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
          {t("products.revenue_expired_msg")}
        </Text>
      ) : null}
    </View>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────
function ProductCard({ p, now, t }) {
  const revenueExpiresAt = p.revenueExpiresAt;
  const isExpired = revenueExpiresAt && now >= revenueExpiresAt;

  const reviewDot =
    p.reviews === "positive"
      ? "#22C55E"
      : p.reviews === "mixed"
        ? "#EAB308"
        : "#EF4444";

  return (
    <Card style={isExpired ? { opacity: 0.75 } : {}}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1, gap: 8 }}>
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Pill label={t(PRODUCT_TYPES[p.typeId]?.category)} variant="outline" />
            {isExpired ? (
              <Pill label={t("products.pill_expired")} variant="status" dotColor="#9CA3AF" />
            ) : (
              <Pill label={p.reviews} variant="status" dotColor={reviewDot} />
            )}
          </View>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
            {t(p.name)}
          </Text>
        </View>
      </View>

      {/* Revenue lifespan bar */}
      <RevenueLifeBar product={p} now={now} t={t} />

      {/* Stats */}
      <View
        style={{
          marginTop: 10,
          borderTopWidth: 1,
          borderColor: "#F3F4F6",
          paddingTop: 10,
        }}
      >
        <StatRow label={t("products.stat_users")} value={formatNumber(p.users)} />
        <StatRow label={t("products.stat_revenue")} value={formatCurrency(p.totalRevenue)} />
        <StatRow
          label={
            <TooltipWord
              termId="model_quality"
              style={{ color: "#6B7280", fontSize: 14 }}
            >
              {t("products.stat_quality")}
            </TooltipWord>
          }
          value={formatPercent(p.qualityScore)}
        />
        <StatRow
          label={
            <TooltipWord
              termId="hallucination"
              style={{ color: "#6B7280", fontSize: 14 }}
            >
              {t("products.stat_hallucination")}
            </TooltipWord>
          }
          value={formatPercent(p.hallucinationRisk)}
          valueColor={p.hallucinationRisk > 0.4 ? "#B91C1C" : "#111827"}
        />
        <StatRow
          label={
            <TooltipWord
              termId="bias"
              style={{ color: "#6B7280", fontSize: 14 }}
            >
              {t("products.stat_bias")}
            </TooltipWord>
          }
          value={formatPercent(p.biasRisk)}
          valueColor={p.biasRisk > 0.4 ? "#B91C1C" : "#111827"}
        />
      </View>
    </Card>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function ProductsTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const t = useT();
  const liveProducts = useGameStore((s) => s.liveProducts);
  const currentDraft = useGameStore((s) => s.currentDraft);

  // Single clock — updates every second, drives all progress bars
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const activeCount = liveProducts.filter(
    (p) => !p.revenueExpiresAt || now < p.revenueExpiresAt,
  ).length;
  const expiredCount = liveProducts.length - activeCount;

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "600",
                color: "#111827",
                letterSpacing: -0.5,
              }}
            >
              {t("products.header_title")}
            </Text>
            <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
              {t("products.counter_active", { count: activeCount })}
              {expiredCount > 0 ? ` · ${t("products.counter_expired", { count: expiredCount })}` : ""}
              {currentDraft ? ` · ${t("products.counter_draft")}` : ""}
            </Text>
          </View>
          <Button
            label={t("common.new")}
            size="sm"
            icon={<Plus size={14} color="#FFFFFF" />}
            onPress={() => router.push("/product-flow")}
          />
        </View>

        {/* Draft card */}
        {currentDraft ? (
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
                  DRAFT
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                    marginTop: 4,
                  }}
                >
                  {t(PRODUCT_TYPES[currentDraft.typeId]?.name)}
                </Text>
              </View>
              <Pill label={currentDraft.stage} variant="soft" />
            </View>
            <View style={{ marginTop: 12 }}>
              <StatRow
                label={t("products.stat_progress")}
                value={formatPercent(currentDraft.trainingProgress)}
              />
              <StatRow
                label={
                  <TooltipWord
                    termId="epoch"
                    style={{ color: "#6B7280", fontSize: 14 }}
                  >
                    {t("products.stat_epochs")}
                  </TooltipWord>
                }
                value={`${currentDraft.epochs}`}
              />
              <StatRow
                label={t("products.stat_cash_spent")}
                value={formatCurrency(currentDraft.cashSpent)}
              />
            </View>
            <View style={{ marginTop: 12 }}>
              <Button
                label={t("products.draft_continue")}
                onPress={() => router.push("/product-flow")}
                fullWidth
              />
            </View>
          </Card>
        ) : null}

        {/* Empty state */}
        {liveProducts.length === 0 ? (
          <Card>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
              {t("products.empty_title")}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#6B7280",
                marginTop: 4,
                marginBottom: 12,
              }}
            >
              {t("products.empty_subtitle")}
            </Text>
            <Button
              label={t("products.empty_cta")}
              onPress={() => router.push("/product-flow")}
              icon={<Plus size={16} color="#FFFFFF" />}
              fullWidth
            />
          </Card>
        ) : (
          liveProducts.map((p) => <ProductCard key={p.id} p={p} now={now} t={t} />)
        )}
      </ScrollView>
    </View>
  );
}
