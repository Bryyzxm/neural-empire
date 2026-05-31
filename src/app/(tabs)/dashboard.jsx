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
  const cash = useGameStore((s) => s.cash);
  const compute = useGameStore((s) => s.compute);
  const computeCapacity = useGameStore((s) => s.computeCapacity);
  const reputation = useGameStore((s) => s.reputation);
  const totalRevenue = useGameStore((s) => s.totalRevenue);
  const totalUsers = useGameStore((s) => s.totalUsers);
  const companyName = useGameStore((s) => s.companyName);
  const liveProducts = useGameStore((s) => s.liveProducts);
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
          <Pill label={stage.name} variant="outline" dotColor="#22C55E" />
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
            Dashboard founder · MVP 0.1.0
          </Text>
        </View>

        {/* KPI grid */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <KpiCard
            icon={<DollarSign size={14} color="#6B7280" />}
            label="Cash"
            value={formatCurrency(cash)}
          />
          <KpiCard
            icon={<Cpu size={14} color="#6B7280" />}
            label="Compute"
            value={`${Math.round(compute)} / ${computeCapacity}`}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <KpiCard
            icon={<Users size={14} color="#6B7280" />}
            label="Users"
            value={formatNumber(totalUsers)}
          />
          <KpiCard
            icon={<Activity size={14} color="#6B7280" />}
            label="Revenue"
            value={formatCurrency(totalRevenue)}
          />
        </View>

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
            Company Health
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
            Indikator kesehatan operasional.
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
              sublabel="compute"
            />
            <RingStat
              value={reputationPct}
              label={Math.round(reputation).toString()}
              sublabel="reputasi"
            />
            <RingStat
              value={Math.min(1, liveProducts.length / 5)}
              label={liveProducts.length.toString()}
              sublabel="produk"
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
                  TARGET LANJUTAN
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                    marginTop: 4,
                  }}
                >
                  {nextStage.name}
                </Text>
              </View>
              <Pill label="Naik tahap" variant="soft" />
            </View>
            <View style={{ marginTop: 10 }}>
              <StatRow
                label="Reputasi"
                value={`${Math.round(reputation)} / ${nextStage.minReputation}`}
              />
              <StatRow
                label="Total revenue"
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
            Produk berikutnya
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
              ? "Anda memiliki produk yang sedang dikerjakan."
              : "Bangun produk AI baru dan rilis ke pasar."}
          </Text>
          <Button
            label={currentDraft ? "Lanjutkan draft" : "Mulai produk baru"}
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
            <Pill label="CRISIS ACTIVE" variant="status" dotColor="#EF4444" />
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
                    {choice.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>
        ) : null}

        {/* Competitors */}
        <Card>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 2 }}>
            Competitor Radar
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
            Rival AI startup ikut berebut users dan market attention.
          </Text>
          {competitors.map((c) => {
            const totalMarket = totalUsers + competitors.reduce((sum, x) => sum + (x.users || 0), 0);
            const share = totalMarket > 0 ? (c.users || 0) / totalMarket : 0;
            return (
              <View key={c.id} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#111827" }}>{c.name}</Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>{formatPercent(share)}</Text>
                </View>
                <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
                  {c.strategy} · {formatNumber(c.users || 0)} users · {c.productsLaunched} produk
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
            News Feed
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
            Peristiwa pasar dan keputusan terakhir.
          </Text>
          {eventLog.length === 0 ? (
            <Text
              style={{ fontSize: 13, color: "#9CA3AF", paddingVertical: 8 }}
            >
              Belum ada peristiwa. Mulai produk pertamamu untuk memicu aktivitas
              pasar.
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
                        ? "Product Launch"
                        : e.type === "research"
                          ? "Riset Selesai"
                          : "Update")}
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
