import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Code2,
  Database,
  BarChart2,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  Server,
  ChevronRight,
  CheckCircle2,
  Lock,
} from "lucide-react-native";
import { useGameStore, computeUpgradeEffects } from "@/store/gameStore";
import { STAFF_UPGRADES, STAFF_CATEGORIES } from "@/data/gameContent";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import { formatCurrency, formatPercent } from "@/utils/format";

const ICON_MAP = {
  Code2,
  Database,
  BarChart2,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  Server,
};

// Effect display config: key → { label, format, color }
const EFFECT_META = {
  computeEfficiency: {
    label: "Efisiensi compute",
    format: (v) => `-${formatPercent(v)} biaya`,
    color: "#2563EB",
  },
  qualityBonus: {
    label: "Bonus kualitas",
    format: (v) => `+${formatPercent(v)}`,
    color: "#22C55E",
  },
  dataQualityBonus: {
    label: "Bonus data",
    format: (v) => `+${formatPercent(v)}`,
    color: "#22C55E",
  },
  biasReduction: {
    label: "Kurangi bias",
    format: (v) => `-${formatPercent(v)}`,
    color: "#22C55E",
  },
  hallucinationReduction: {
    label: "Kurangi halusinasi",
    format: (v) => `-${formatPercent(v)}`,
    color: "#22C55E",
  },
  userMultiplier: {
    label: "Pengguna awal",
    format: (v) => `+${formatPercent(v)}`,
    color: "#EA580C",
  },
  churnReduction: {
    label: "Kurangi churn",
    format: (v) => `-${(v * 1000).toFixed(1)}‰`,
    color: "#22C55E",
  },
  revenueMultiplier: {
    label: "Bonus revenue",
    format: (v) => `+${formatPercent(v)}`,
    color: "#22C55E",
  },
  reputationTickBonus: {
    label: "Reputasi/menit",
    format: (v) => `+${(v).toFixed(1)} rep`,
    color: "#8B5CF6",
  },
  computeCapacityBonus: {
    label: "Kapasitas server",
    format: (v) => `+${v}`,
    color: "#2563EB",
  },
};

export default function OperationsTab() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("engineering");
  const cash = useGameStore((s) => s.cash);
  const purchasedUpgrades = useGameStore((s) => s.purchasedUpgrades);
  const purchaseUpgrade = useGameStore((s) => s.purchaseUpgrade);

  const fx = computeUpgradeEffects(purchasedUpgrades);
  const categoryUpgrades = Object.values(STAFF_UPGRADES).filter(
    (u) => u.category === activeCategory,
  );

  const totalHired = Object.values(purchasedUpgrades).filter(
    (l) => l > 0,
  ).length;

  const handlePurchase = (upgradeId) => {
    const def = STAFF_UPGRADES[upgradeId];
    const currentLevel = purchasedUpgrades[upgradeId] || 0;
    const nextTier = def?.tiers[currentLevel];
    if (!nextTier) return;
    Alert.alert(
      `Rekrut ${nextTier.label}?`,
      `Biaya: ${formatCurrency(nextTier.cost)}\nEfek langsung aktif setelah rekrut.`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Rekrut",
          onPress: () => {
            const res = purchaseUpgrade(upgradeId);
            if (!res.ok) Alert.alert("Gagal", res.error);
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Fixed top bar */}
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: 0,
          backgroundColor: "#F9FAFB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Pill label="Staff & Ops" variant="soft" />
            <Text
              style={{
                fontSize: 26,
                fontWeight: "600",
                color: "#111827",
                letterSpacing: -0.5,
                marginTop: 8,
              }}
            >
              Operasional
            </Text>
            <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
              {totalHired} staf direkrut · efek kumulatif aktif
            </Text>
          </View>
        </View>

        {/* Category tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 16, marginHorizontal: -16, flexGrow: 0 }}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 6 }}
        >
          {STAFF_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: isActive ? "#111827" : "#FFFFFF",
                  borderWidth: 1,
                  borderColor: isActive ? "#111827" : "#E5E7EB",
                  opacity: pressed ? 0.85 : 1,
                  marginBottom: 12,
                })}
              >
                {Icon ? (
                  <Icon size={14} color={isActive ? "#FFFFFF" : "#6B7280"} />
                ) : null}
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: isActive ? "#FFFFFF" : "#374151",
                  }}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 100,
          gap: 12,
        }}
      >
        {/* Active effects summary */}
        <ActiveEffectsSummary fx={fx} />

        {/* Upgrade cards for active category */}
        {categoryUpgrades.map((u) => (
          <UpgradeCard
            key={u.id}
            upgrade={u}
            currentLevel={purchasedUpgrades[u.id] || 0}
            cash={cash}
            onPurchase={() => handlePurchase(u.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

// ── Active Effects Summary ──────────────────────────────────────────────────
function ActiveEffectsSummary({ fx }) {
  const activeKeys = Object.entries(fx).filter(([, v]) => v > 0);
  if (activeKeys.length === 0) {
    return (
      <Card>
        <Text style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}>
          Efek Aktif
        </Text>
        <Text style={{ fontSize: 13, color: "#9CA3AF", marginTop: 6 }}>
          Belum ada staf direkrut. Rekrut anggota tim untuk mengaktifkan bonus.
        </Text>
      </Card>
    );
  }
  return (
    <Card>
      <Text style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}>
        Efek Aktif
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#6B7280",
          marginTop: 2,
          marginBottom: 10,
        }}
      >
        Semua bonus dari staf yang sudah direkrut.
      </Text>
      {activeKeys.map(([key, val]) => {
        const meta = EFFECT_META[key];
        if (!meta) return null;
        return (
          <StatRow
            key={key}
            label={meta.label}
            value={meta.format(val)}
            valueColor={meta.color}
          />
        );
      })}
    </Card>
  );
}

// ── Single Upgrade Card ─────────────────────────────────────────────────────
function UpgradeCard({ upgrade, currentLevel, cash, onPurchase }) {
  const isMaxed = currentLevel >= upgrade.maxLevel;
  const nextTier = upgrade.tiers[currentLevel];
  const canAfford = nextTier && cash >= nextTier.cost;
  const Icon = ICON_MAP[upgrade.icon];

  return (
    <Card>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            backgroundColor: "#F9FAFB",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icon ? <Icon size={18} color="#374151" /> : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}>
            {upgrade.name}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {upgrade.description}
          </Text>
        </View>
        {isMaxed ? (
          <CheckCircle2 size={20} color="#22C55E" />
        ) : currentLevel === 0 ? (
          <Lock size={18} color="#9CA3AF" />
        ) : (
          <ChevronRight size={18} color="#9CA3AF" />
        )}
      </View>

      {/* Tier progress dots */}
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          marginTop: 14,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        {upgrade.tiers.map((t, i) => {
          const done = i < currentLevel;
          const active = i === currentLevel;
          return (
            <View
              key={i}
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <View
                style={{
                  width: done ? 8 : active ? 10 : 8,
                  height: done ? 8 : active ? 10 : 8,
                  borderRadius: 999,
                  backgroundColor: done
                    ? "#22C55E"
                    : active
                      ? "#2563EB"
                      : "#E5E7EB",
                  borderWidth: active ? 2 : 0,
                  borderColor: "#BFDBFE",
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  color: done ? "#22C55E" : active ? "#2563EB" : "#9CA3AF",
                  fontWeight: active ? "600" : "400",
                }}
              >
                {t.label}
              </Text>
              {i < upgrade.tiers.length - 1 ? (
                <View
                  style={{ width: 12, height: 1, backgroundColor: "#E5E7EB" }}
                />
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Effects of next tier */}
      {!isMaxed && nextTier ? (
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#F3F4F6",
            paddingTop: 10,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "500",
              color: "#6B7280",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: 0.4,
            }}
          >
            Bonus tier berikutnya
          </Text>
          {Object.entries(nextTier.effect).map(([key, val]) => {
            const meta = EFFECT_META[key];
            if (!meta) return null;
            return (
              <StatRow
                key={key}
                label={meta.label}
                value={meta.format(val)}
                valueColor={meta.color}
              />
            );
          })}
        </View>
      ) : isMaxed ? (
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#F3F4F6",
            paddingTop: 10,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 13, color: "#22C55E", fontWeight: "500" }}>
            ✓ Semua tier telah direkrut.
          </Text>
        </View>
      ) : null}

      {/* CTA */}
      {!isMaxed ? (
        <Button
          label={
            canAfford
              ? `Rekrut ${nextTier?.label} — ${formatCurrency(nextTier?.cost)}`
              : `Butuh ${formatCurrency(nextTier?.cost)} — cash tidak cukup`
          }
          onPress={onPurchase}
          disabled={!canAfford}
          variant={canAfford ? "primary" : "secondary"}
          fullWidth
        />
      ) : null}
    </Card>
  );
}
