import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  X,
  Rocket,
  Cpu,
  Zap,
  ThumbsUp,
  ThumbsDown,
  SkipForward,
  Brain,
  CheckCircle2,
  XCircle,
} from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import CircularRing from "@/components/ui/CircularRing";
import TooltipWord from "@/components/ui/TooltipWord";
import { formatCurrency, formatPercent } from "@/utils/format";
import { PRODUCT_TYPES, DATA_QUALITY_TIERS } from "@/data/gameContent";
import {
  getRLHFScenario,
  pickResponseType,
  buildTuringCards,
} from "@/data/trainingScenarios";

const STAGES = [
  { id: "select", label: "Pilih" },
  { id: "data", label: "Data" },
  { id: "training", label: "RLHF" },
  { id: "turing", label: "Turing" },
  { id: "eval", label: "Eval" },
];

// ── Root Screen ───────────────────────────────────────────────────────────────
export default function ProductFlow() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currentDraft = useGameStore((s) => s.currentDraft);
  const unlockedResearch = useGameStore((s) => s.unlockedResearch);
  const startDraft = useGameStore((s) => s.startDraft);
  const cancelDraft = useGameStore((s) => s.cancelDraft);

  const activeStage = currentDraft ? currentDraft.stage : "select";
  const stageIndex = STAGES.findIndex((s) => s.id === activeStage);

  const handleCancelDraft = () => {
    Alert.alert(
      "Batalkan draft?",
      "Cash & compute yang sudah dipakai tidak dikembalikan.",
      [
        { text: "Tidak", style: "cancel" },
        { text: "Batalkan", style: "destructive", onPress: cancelDraft },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Top bar */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 0,
          paddingHorizontal: 16,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              opacity: pressed ? 0.6 : 1,
              padding: 4,
              marginLeft: -4,
            })}
          >
            <ChevronLeft size={22} color="#111827" />
            <Text style={{ fontSize: 15, color: "#111827", fontWeight: "500" }}>
              Tutup
            </Text>
          </Pressable>
          {currentDraft ? (
            <Pressable
              onPress={handleCancelDraft}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
                padding: 4,
              })}
            >
              <X size={18} color="#B91C1C" />
            </Pressable>
          ) : null}
        </View>

        {/* Stage tabs */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 14,
            borderBottomWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          {STAGES.map((s, i) => {
            const done = i < stageIndex;
            const active = i === stageIndex;
            return (
              <View
                key={s.id}
                style={{
                  flex: 1,
                  paddingBottom: 10,
                  marginBottom: -1,
                  borderBottomWidth: 2,
                  borderColor: active
                    ? "#2563EB"
                    : done
                      ? "#BFDBFE"
                      : "transparent",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: active ? "#111827" : done ? "#93C5FD" : "#9CA3AF",
                    fontWeight: active ? "600" : "400",
                  }}
                >
                  {done ? "✓" : null}
                  {s.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 24,
          gap: 12,
        }}
      >
        {activeStage === "select" && (
          <SelectStage
            unlockedResearch={unlockedResearch}
            onSelect={startDraft}
          />
        )}
        {activeStage === "data" && <DataStage />}
        {activeStage === "training" && <TrainingStage />}
        {activeStage === "turing" && <TuringTestStage />}
        {activeStage === "eval" && (
          <EvalStage onLaunched={() => router.replace("/(tabs)/dashboard")} />
        )}
      </ScrollView>
    </View>
  );
}

// ── Stage 1: Select ───────────────────────────────────────────────────────────
function SelectStage({ unlockedResearch, onSelect }) {
  const cash = useGameStore((s) => s.cash);
  const types = Object.values(PRODUCT_TYPES);
  return (
    <>
      <View>
        <Pill label="Langkah 1" variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          Pilih produk AI
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          Produk terkunci memerlukan riset di tab Riset.
        </Text>
      </View>
      {types.map((t) => {
        const locked =
          t.unlockRequirement &&
          !unlockedResearch.includes(t.unlockRequirement);
        const canAfford = cash >= t.baseDataCost * 0.5;
        return (
          <Card key={t.id}>
            <Pill label={t.category} variant="outline" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#111827",
                marginTop: 8,
              }}
            >
              {t.name}
            </Text>
            <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
              {t.description}
            </Text>
            <View style={{ marginTop: 10 }}>
              <StatRow
                label="Biaya data dasar"
                value={formatCurrency(t.baseDataCost)}
              />
              <StatRow
                label="Compute per epoch"
                value={`${Math.max(1, Math.round(t.baseComputeCost / 3))}`}
              />
              <StatRow
                label="Minimum epochs"
                value={`${t.minTrainingEpochs}`}
              />
            </View>
            <View style={{ marginTop: 12 }}>
              <Button
                label={
                  locked
                    ? "Terkunci — riset dulu"
                    : !canAfford
                      ? "Cash tidak cukup"
                      : "Mulai"
                }
                onPress={() => onSelect(t.id)}
                disabled={locked || !canAfford}
                fullWidth
              />
            </View>
          </Card>
        );
      })}
    </>
  );
}

// ── Stage 2: Data ─────────────────────────────────────────────────────────────
function DataStage() {
  const draft = useGameStore((s) => s.currentDraft);
  const cash = useGameStore((s) => s.cash);
  const purchaseData = useGameStore((s) => s.purchaseData);
  const [selectedTier, setSelectedTier] = useState("curated");
  if (!draft) return null;
  const productType = PRODUCT_TYPES[draft.typeId];
  const tiers = Object.values(DATA_QUALITY_TIERS);
  const cost = Math.round(
    productType.baseDataCost *
      (DATA_QUALITY_TIERS[selectedTier]?.costMultiplier || 1),
  );

  const handleBuy = () => {
    const res = purchaseData(selectedTier);
    if (!res.ok) Alert.alert("Tidak bisa membeli data", res.error);
  };

  return (
    <>
      <View>
        <Pill label="Langkah 2" variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          Siapkan data
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          Pilihan data menentukan kualitas, bias, dan risiko halusinasi.
        </Text>
      </View>
      {tiers.map((t) => {
        const isSelected = selectedTier === t.id;
        const tierCost = Math.round(
          productType.baseDataCost * t.costMultiplier,
        );
        const canAfford = cash >= tierCost;
        return (
          <Pressable
            key={t.id}
            onPress={() => setSelectedTier(t.id)}
            style={({ pressed }) => ({
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: isSelected ? "#2563EB" : "#E5E7EB",
              padding: 16,
              opacity: pressed ? 0.95 : 1,
            })}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}
              >
                {t.name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: canAfford ? "#111827" : "#B91C1C",
                }}
              >
                {formatCurrency(tierCost)}
              </Text>
            </View>
            <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
              {t.description}
            </Text>
            <View style={{ marginTop: 8 }}>
              <StatRow
                label="Quality potensial"
                value={formatPercent(t.qualityScore)}
              />
              <StatRow
                label={
                  <TooltipWord
                    termId="bias"
                    style={{ color: "#6B7280", fontSize: 14 }}
                  >
                    Risiko bias
                  </TooltipWord>
                }
                value={formatPercent(t.biasRisk)}
                valueColor={t.biasRisk > 0.4 ? "#B91C1C" : "#111827"}
              />
              <StatRow
                label={
                  <TooltipWord
                    termId="hallucination"
                    style={{ color: "#6B7280", fontSize: 14 }}
                  >
                    Risiko halusinasi
                  </TooltipWord>
                }
                value={formatPercent(t.hallucinationRisk)}
                valueColor={t.hallucinationRisk > 0.4 ? "#B91C1C" : "#111827"}
              />
            </View>
          </Pressable>
        );
      })}
      <Button
        label={`Beli data — ${formatCurrency(cost)}`}
        onPress={handleBuy}
        disabled={cash < cost}
        fullWidth
      />
    </>
  );
}

// ── Stage 3: Training (RLHF) ──────────────────────────────────────────────────
function TrainingStage() {
  const draft = useGameStore((s) => s.currentDraft);
  const compute = useGameStore((s) => s.compute);
  const runEpoch = useGameStore((s) => s.runTrainingEpoch);
  const advanceToTuring = useGameStore((s) => s.advanceToTuring);
  const buyCompute = useGameStore((s) => s.buyCompute);
  const refillCompute = useGameStore((s) => s.refillCompute);
  const [lastFeedback, setLastFeedback] = useState(null); // 'approve'|'reject'|'skip'|null

  if (!draft) return null;
  const productType = PRODUCT_TYPES[draft.typeId];
  const fx_eff = 0; // shown cost uses base for display
  const baseComputePerEpoch = Math.max(
    1,
    Math.round(productType.baseComputeCost / 3),
  );

  // Pick the current scenario (deterministic from epoch index)
  const scenario = getRLHFScenario(draft.typeId, draft.epochs);
  const responseType = pickResponseType(draft.qualityScore, draft.epochs);
  const responseText =
    responseType === "good" ? scenario.goodResponse : scenario.badResponse;
  const trainingDone = draft.trainingProgress >= 1;

  const handleRate = (rating) => {
    setLastFeedback(rating);
    const res = runEpoch(rating);
    if (!res.ok) {
      setLastFeedback(null);
      Alert.alert("Tidak bisa training", res.error);
    }
  };

  const ratingCost = {
    approve: baseComputePerEpoch,
    reject: Math.max(1, Math.round(baseComputePerEpoch * 1.5)),
    skip: Math.max(1, Math.round(baseComputePerEpoch * 0.7)),
  };

  // RLHF history chips
  const historyLabels = { approve: "✓", reject: "✗", skip: "→" };
  const historyColors = {
    approve: "#22C55E",
    reject: "#EF4444",
    skip: "#9CA3AF",
  };

  return (
    <>
      {/* Header */}
      <View>
        <Pill label="Langkah 3 — RLHF" variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          Reinforcement Learning
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          Baca output model, lalu beri feedback untuk melatihnya. Feedback
          menentukan arah pembelajaran.
        </Text>
      </View>

      {/* Progress rings */}
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 4,
          }}
        >
          <RingStat
            value={draft.qualityScore}
            label={formatPercent(draft.qualityScore)}
            sub="kualitas"
            color="#2563EB"
          />
          <RingStat
            value={draft.trainingProgress}
            label={formatPercent(draft.trainingProgress)}
            sub="progres"
            color="#EA580C"
          />
          <RingStat
            value={1 - draft.hallucinationRisk}
            label={formatPercent(1 - draft.hallucinationRisk)}
            sub="keamanan"
            color="#22C55E"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <StatRow
            label={
              <TooltipWord
                termId="epoch"
                style={{ color: "#6B7280", fontSize: 14 }}
              >
                Epoch
              </TooltipWord>
            }
            value={`${draft.epochs} / ${productType.minTrainingEpochs}`}
          />
          <StatRow label="Compute tersisa" value={`${Math.round(compute)}`} />
        </View>
        {/* RLHF history */}
        {(draft.rlhfHistory || []).length > 0 ? (
          <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 11,
                color: "#9CA3AF",
                fontWeight: "500",
                marginRight: 2,
              }}
            >
              Feedback:
            </Text>
            {(draft.rlhfHistory || []).map((r, i) => (
              <View
                key={i}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: historyColors[r] + "22",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: historyColors[r],
                    fontWeight: "700",
                  }}
                >
                  {historyLabels[r]}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </Card>

      {trainingDone ? (
        /* Training selesai — lanjut ke Turing Test */
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <Brain size={20} color="#7C3AED" />
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
              Training selesai!
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: "#6B7280", lineHeight: 21 }}>
            Model telah dilatih {draft.epochs} epoch dengan feedback RLHF.
            Langkah berikutnya: uji apakah model bisa lolos Turing Test.
          </Text>
          <View style={{ marginTop: 14 }}>
            <Button
              label="Mulai Turing Test →"
              icon={<Brain size={16} color="#FFFFFF" />}
              onPress={advanceToTuring}
              fullWidth
            />
          </View>
        </Card>
      ) : (
        <>
          {/* Scenario card */}
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Output Model — Epoch {draft.epochs + 1}
              </Text>
              <Pill
                label={
                  responseType === "good"
                    ? "Output normal"
                    : "Output bermasalah"
                }
                variant="status"
                dotColor={responseType === "good" ? "#22C55E" : "#EF4444"}
              />
            </View>

            {/* Prompt */}
            <View
              style={{
                backgroundColor: "#F3F4F6",
                borderRadius: 8,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#6B7280",
                  marginBottom: 4,
                }}
              >
                PROMPT USER
              </Text>
              <Text style={{ fontSize: 14, color: "#374151", lineHeight: 20 }}>
                {scenario.prompt}
              </Text>
            </View>

            {/* Model response */}
            <View
              style={{
                backgroundColor:
                  responseType === "good" ? "#F0FDF4" : "#FFF1F2",
                borderRadius: 8,
                padding: 12,
                borderWidth: 1,
                borderColor: responseType === "good" ? "#DCFCE7" : "#FFE4E6",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: responseType === "good" ? "#16A34A" : "#B91C1C",
                  marginBottom: 4,
                }}
              >
                RESPONS MODEL AI
              </Text>
              <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
                {responseText}
              </Text>
            </View>

            {/* Why bad hint (only when bad response shown) */}
            {responseType === "bad" ? (
              <View
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: "#FFFBEB",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#FDE68A",
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "#92400E", lineHeight: 18 }}
                >
                  💡 Hint: {scenario.why_bad}
                </Text>
              </View>
            ) : null}
          </Card>

          {/* Rating buttons */}
          <Card>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 4,
              }}
            >
              Beri feedback ke model
            </Text>
            <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>
              Feedback ini menjadi sinyal reinforcement learning untuk epoch
              berikutnya.
            </Text>
            <View style={{ gap: 10 }}>
              {/* Approve */}
              <Pressable
                onPress={() => handleRate("approve")}
                disabled={compute < ratingCost.approve}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor:
                    compute >= ratingCost.approve ? "#F0FDF4" : "#F9FAFB",
                  borderWidth: 1,
                  borderColor:
                    compute >= ratingCost.approve ? "#DCFCE7" : "#E5E7EB",
                  opacity: pressed
                    ? 0.8
                    : compute < ratingCost.approve
                      ? 0.45
                      : 1,
                })}
              >
                <ThumbsUp size={20} color="#16A34A" />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    Respons Tepat
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>
                    Sinyal positif — kualitas naik normal
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#6B7280" }}
                >
                  -{ratingCost.approve} ⚡
                </Text>
              </Pressable>

              {/* Reject */}
              <Pressable
                onPress={() => handleRate("reject")}
                disabled={compute < ratingCost.reject}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor:
                    compute >= ratingCost.reject ? "#FFF1F2" : "#F9FAFB",
                  borderWidth: 1,
                  borderColor:
                    compute >= ratingCost.reject ? "#FFE4E6" : "#E5E7EB",
                  opacity: pressed
                    ? 0.8
                    : compute < ratingCost.reject
                      ? 0.45
                      : 1,
                })}
              >
                <ThumbsDown size={20} color="#B91C1C" />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    Respons Salah
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>
                    Koreksi intensif — kualitas naik lebih besar, halusinasi ↓
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#6B7280" }}
                >
                  -{ratingCost.reject} ⚡
                </Text>
              </Pressable>

              {/* Skip */}
              <Pressable
                onPress={() => handleRate("skip")}
                disabled={compute < ratingCost.skip}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: "#F9FAFB",
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  opacity: pressed ? 0.8 : compute < ratingCost.skip ? 0.45 : 1,
                })}
              >
                <SkipForward size={20} color="#6B7280" />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    Lewati
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>
                    Hemat compute — peningkatan minimal
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#6B7280" }}
                >
                  -{ratingCost.skip} ⚡
                </Text>
              </Pressable>
            </View>
          </Card>

          {/* Compute refill shortcut */}
          {compute < ratingCost.skip ? <ComputeShortcut /> : null}
        </>
      )}
    </>
  );
}

function ComputeShortcut() {
  const buyCompute = useGameStore((s) => s.buyCompute);
  const refillCompute = useGameStore((s) => s.refillCompute);
  return (
    <Card>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 4,
        }}
      >
        Compute habis
      </Text>
      <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
        Refill atau upgrade kapasitas untuk melanjutkan.
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Button
            label="Refill ($100)"
            variant="soft"
            icon={<Zap size={14} color="#2563EB" />}
            onPress={() => {
              const r = refillCompute();
              if (!r.ok) Alert.alert("Gagal", r.error);
            }}
            fullWidth
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            label="+10 cap ($800)"
            variant="secondary"
            icon={<Cpu size={14} color="#111827" />}
            onPress={() => {
              const r = buyCompute(10);
              if (!r.ok) Alert.alert("Gagal", r.error);
            }}
            fullWidth
          />
        </View>
      </View>
    </Card>
  );
}

// ── Stage 4: Turing Test ──────────────────────────────────────────────────────
function TuringTestStage() {
  const draft = useGameStore((s) => s.currentDraft);
  const submitTuringTest = useGameStore((s) => s.submitTuringTest);
  const [phase, setPhase] = useState("intro"); // intro → testing → result
  const [cards, setCards] = useState([]);
  const [answers, setAnswers] = useState({}); // { cardId: 'ai' | 'human' }
  const [revealed, setRevealed] = useState(false);

  if (!draft) return null;

  const startTest = () => {
    setCards(buildTuringCards(draft.id));
    setAnswers({});
    setRevealed(false);
    setPhase("testing");
  };

  const handleAnswer = (cardId, choice) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [cardId]: choice }));
  };

  const allAnswered =
    cards.length > 0 && Object.keys(answers).length === cards.length;

  const handleReveal = () => {
    setRevealed(true);
    const correct = cards.filter((c) => {
      const expected = c.isAI ? "ai" : "human";
      return answers[c.id] === expected;
    }).length;
    const score = correct / cards.length;
    setPhase("result");
    setTimeout(() => submitTuringTest(score), 400);
  };

  // Score derived from answers
  const correctCount = revealed
    ? cards.filter((c) => answers[c.id] === (c.isAI ? "ai" : "human")).length
    : 0;
  const score = cards.length > 0 ? correctCount / cards.length : 0;

  if (phase === "intro") {
    return (
      <>
        <View>
          <Pill label="Langkah 4 — Turing Test" variant="soft" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#111827",
              marginTop: 8,
              letterSpacing: -0.3,
            }}
          >
            Turing Test
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            Uji seberapa "manusiawi" output modelmu.
          </Text>
        </View>

        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <Brain size={20} color="#7C3AED" />
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
              Apa itu Turing Test?
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "#374151",
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Turing Test diciptakan oleh Alan Turing (1950) untuk mengukur apakah
            sebuah mesin bisa berperilaku layaknya manusia — sebuah standar
            klasik kecerdasan buatan.
          </Text>
          <View
            style={{
              backgroundColor: "#F5F3FF",
              borderRadius: 10,
              padding: 12,
              gap: 6,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#7C3AED" }}>
              ATURAN MAIN
            </Text>
            <Text style={{ fontSize: 13, color: "#4B5563", lineHeight: 20 }}>
              Kamu akan melihat 4 respons percakapan — 2 ditulis oleh AI, 2
              ditulis oleh manusia. Identifikasi mana yang mana. Skor kamu
              menentukan seberapa "lolos" model AI-mu.
            </Text>
          </View>
          <View style={{ marginTop: 12, gap: 6 }}>
            <ScoreExplain
              score="≥75%"
              effect="Kualitas +8%, Halusinasi berkurang"
              positive
            />
            <ScoreExplain score="50–74%" effect="Kualitas +4%" positive />
            <ScoreExplain
              score="<50%"
              effect="Halusinasi meningkat — model terlalu 'robotic'"
              positive={false}
            />
          </View>
        </Card>

        <Button
          label="Mulai Turing Test"
          icon={<Brain size={16} color="#FFFFFF" />}
          onPress={startTest}
          fullWidth
        />
      </>
    );
  }

  if (phase === "testing") {
    return (
      <>
        <View>
          <Pill label="Turing Test" variant="soft" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#111827",
              marginTop: 8,
              letterSpacing: -0.3,
            }}
          >
            AI atau Manusia?
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {Object.keys(answers).length} / {cards.length} dijawab
          </Text>
        </View>

        {cards.map((card) => {
          const chosen = answers[card.id];
          return (
            <Card key={card.id}>
              {/* Prompt */}
              <View
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "600",
                    color: "#6B7280",
                    marginBottom: 2,
                  }}
                >
                  PERTANYAAN
                </Text>
                <Text style={{ fontSize: 13, color: "#374151" }}>
                  {card.prompt}
                </Text>
              </View>
              {/* Response */}
              <Text
                style={{
                  fontSize: 14,
                  color: "#111827",
                  lineHeight: 21,
                  marginBottom: 12,
                }}
              >
                {card.text}
              </Text>
              {/* Answer buttons */}
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable
                  onPress={() => handleAnswer(card.id, "human")}
                  style={({ pressed }) => ({
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    backgroundColor: chosen === "human" ? "#EFF6FF" : "#F9FAFB",
                    borderWidth: 1.5,
                    borderColor: chosen === "human" ? "#2563EB" : "#E5E7EB",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text style={{ fontSize: 20, marginBottom: 2 }}>🧑</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: chosen === "human" ? "#2563EB" : "#6B7280",
                    }}
                  >
                    Manusia
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleAnswer(card.id, "ai")}
                  style={({ pressed }) => ({
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    backgroundColor: chosen === "ai" ? "#F5F3FF" : "#F9FAFB",
                    borderWidth: 1.5,
                    borderColor: chosen === "ai" ? "#7C3AED" : "#E5E7EB",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text style={{ fontSize: 20, marginBottom: 2 }}>🤖</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: chosen === "ai" ? "#7C3AED" : "#6B7280",
                    }}
                  >
                    AI
                  </Text>
                </Pressable>
              </View>
            </Card>
          );
        })}

        {allAnswered ? (
          <Button label="Lihat hasil →" onPress={handleReveal} fullWidth />
        ) : null}
      </>
    );
  }

  if (phase === "result") {
    const verdict =
      score >= 0.75
        ? { label: "Excellent", color: "#16A34A", bg: "#F0FDF4", emoji: "🏆" }
        : score >= 0.5
          ? { label: "Good", color: "#D97706", bg: "#FFFBEB", emoji: "✅" }
          : {
              label: "Perlu Perbaikan",
              color: "#B91C1C",
              bg: "#FFF1F2",
              emoji: "⚠️",
            };

    return (
      <>
        <View>
          <Pill label="Hasil Turing Test" variant="soft" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#111827",
              marginTop: 8,
              letterSpacing: -0.3,
            }}
          >
            {verdict.emoji} {correctCount} / {cards.length} benar
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            Skor {formatPercent(score)} — {verdict.label}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: verdict.bg,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: verdict.color,
              marginBottom: 4,
            }}
          >
            Efek pada model:
          </Text>
          {score >= 0.75 ? (
            <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
              Kualitas model +8% · Halusinasi berkurang 18%{"\n"}Model sangat
              mirip tulisan manusia!
            </Text>
          ) : score >= 0.5 ? (
            <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
              Kualitas model +4%{"\n"}Model cukup meyakinkan, masih bisa
              dideteksi.
            </Text>
          ) : (
            <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
              Halusinasi meningkat 12%{"\n"}Output terlalu kaku dan mudah
              diidentifikasi sebagai AI.
            </Text>
          )}
        </View>

        {/* Answer review */}
        {cards.map((card) => {
          const playerChoice = answers[card.id];
          const correct = playerChoice === (card.isAI ? "ai" : "human");
          return (
            <Card key={card.id}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                {correct ? (
                  <CheckCircle2 size={16} color="#16A34A" />
                ) : (
                  <XCircle size={16} color="#B91C1C" />
                )}
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#111827" }}
                >
                  {correct ? "Benar" : "Salah"} — ini ditulis oleh{" "}
                  {card.isAI ? "🤖 AI" : "🧑 Manusia"}
                </Text>
              </View>
              <Text
                style={{ fontSize: 13, color: "#6B7280", fontStyle: "italic" }}
                numberOfLines={2}
              >
                "{card.text.slice(0, 100)}…"
              </Text>
              {!correct ? (
                <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>
                  {card.isAI ? card.scenario.aiLabel : card.scenario.humanLabel}
                </Text>
              ) : null}
            </Card>
          );
        })}

        <Text style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF" }}>
          Melanjutkan ke evaluasi…
        </Text>
      </>
    );
  }

  return null;
}

// ── Stage 5: Eval ─────────────────────────────────────────────────────────────
function EvalStage({ onLaunched }) {
  const draft = useGameStore((s) => s.currentDraft);
  const launchProduct = useGameStore((s) => s.launchProduct);
  if (!draft) return null;
  const productType = PRODUCT_TYPES[draft.typeId];

  const safetyScore =
    1 - (draft.hallucinationRisk * 0.6 + draft.biasRisk * 0.4);
  const overallScore = draft.qualityScore * 0.7 + safetyScore * 0.3;
  const verdict =
    overallScore > 0.7
      ? { label: "Siap launch", color: "#22C55E" }
      : overallScore > 0.5
        ? { label: "Risiko sedang", color: "#EAB308" }
        : { label: "Berisiko tinggi", color: "#EF4444" };

  const handleLaunch = () => {
    const res = launchProduct();
    if (!res.ok) {
      Alert.alert("Gagal launch", res.error);
      return;
    }
    Alert.alert(
      "Produk diluncurkan! 🚀",
      `${res.summary.initialUsers} pengguna awal.\nReputasi ${res.summary.reputationDelta >= 0 ? "+" : ""}${res.summary.reputationDelta}.`,
      [{ text: "Selesai", onPress: onLaunched }],
    );
  };

  return (
    <>
      <View>
        <Pill label="Langkah 5 — Eval" variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          Evaluasi pre-launch
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          Review akhir sebelum produk dirilis ke pasar.
        </Text>
      </View>

      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: "#6B7280", fontWeight: "500" }}>
              VERDICT
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginTop: 4,
              }}
            >
              {productType.name}
            </Text>
          </View>
          <Pill
            label={verdict.label}
            variant="status"
            dotColor={verdict.color}
          />
        </View>
        <View style={{ marginTop: 12 }}>
          <StatRow
            label="Skor kualitas"
            value={formatPercent(draft.qualityScore)}
          />
          <StatRow
            label={
              <TooltipWord
                termId="hallucination"
                style={{ color: "#6B7280", fontSize: 14 }}
              >
                Risiko halusinasi
              </TooltipWord>
            }
            value={formatPercent(draft.hallucinationRisk)}
            valueColor={draft.hallucinationRisk > 0.4 ? "#B91C1C" : "#111827"}
          />
          <StatRow
            label={
              <TooltipWord
                termId="bias"
                style={{ color: "#6B7280", fontSize: 14 }}
              >
                Risiko bias
              </TooltipWord>
            }
            value={formatPercent(draft.biasRisk)}
            valueColor={draft.biasRisk > 0.4 ? "#B91C1C" : "#111827"}
          />
          <StatRow
            label={
              <TooltipWord
                termId="launch_score"
                style={{ color: "#6B7280", fontSize: 14 }}
              >
                Skor keseluruhan
              </TooltipWord>
            }
            value={formatPercent(overallScore)}
          />
          {draft.turingScore !== null ? (
            <StatRow
              label="Skor Turing Test"
              value={formatPercent(draft.turingScore)}
              valueColor={
                draft.turingScore >= 0.75
                  ? "#16A34A"
                  : draft.turingScore >= 0.5
                    ? "#D97706"
                    : "#B91C1C"
              }
            />
          ) : null}
        </View>
      </Card>

      <Button
        label="Luncurkan produk"
        icon={<Rocket size={16} color="#FFFFFF" />}
        onPress={handleLaunch}
        fullWidth
      />
    </>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function RingStat({ value, label, sub, color }) {
  return (
    <View style={{ alignItems: "center", gap: 4 }}>
      <CircularRing
        value={value}
        size={64}
        strokeWidth={4}
        progressColor={color}
        label={label}
      />
      <Text style={{ fontSize: 11, color: "#6B7280", fontWeight: "500" }}>
        {sub}
      </Text>
    </View>
  );
}

function ScoreExplain({ score, effect, positive }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: positive ? "#16A34A" : "#B91C1C",
          width: 50,
        }}
      >
        {score}
      </Text>
      <Text style={{ fontSize: 13, color: "#6B7280", flex: 1 }}>{effect}</Text>
    </View>
  );
}
