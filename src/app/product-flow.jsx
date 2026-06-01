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
import { useT } from "@/i18n/useT";
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

const STAGE_KEYS = ["select", "data", "training", "turing", "eval"];

// ── Root Screen ───────────────────────────────────────────────────────────────
export default function ProductFlow() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const t = useT();
  const currentDraft = useGameStore((s) => s.currentDraft);
  const unlockedResearch = useGameStore((s) => s.unlockedResearch);
  const startDraft = useGameStore((s) => s.startDraft);
  const cancelDraft = useGameStore((s) => s.cancelDraft);

  const activeStage = currentDraft ? currentDraft.stage : "select";
  const stageIndex = STAGE_KEYS.indexOf(activeStage);

  const handleCancelDraft = () => {
    Alert.alert(
      t("product_flow.cancel_title"),
      t("product_flow.cancel_body"),
      [
        { text: t("common.no"), style: "cancel" },
        { text: t("product_flow.cancel_confirm"), style: "destructive", onPress: cancelDraft },
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
              {t("common.close")}
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
          {STAGE_KEYS.map((sid, i) => {
            const done = i < stageIndex;
            const active = i === stageIndex;
            return (
              <View
                key={sid}
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
                  {t(`product_flow.stage.${sid}`)}
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
  const t = useT();
  const cash = useGameStore((s) => s.cash);
  const types = Object.values(PRODUCT_TYPES);
  return (
    <>
      <View>
        <Pill label={t("product_flow.pill_step", { n: 1 })} variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          {t("product_flow.select.title")}
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          {t("product_flow.select.subtitle")}
        </Text>
      </View>
      {types.map((pt) => {
        const locked =
          pt.unlockRequirement &&
          !unlockedResearch.includes(pt.unlockRequirement);
        const canAfford = cash >= pt.baseDataCost * 0.5;
        return (
          <Card key={pt.id}>
            <Pill label={t(pt.category)} variant="outline" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#111827",
                marginTop: 8,
              }}
            >
              {t(pt.name)}
            </Text>
            <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
              {t(pt.description)}
            </Text>
            <View style={{ marginTop: 10 }}>
              <StatRow
                label={t("product_flow.stat.base_data_cost")}
                value={formatCurrency(pt.baseDataCost)}
              />
              <StatRow
                label={t("product_flow.stat.compute_per_epoch")}
                value={`${Math.max(1, Math.round(pt.baseComputeCost / 3))}`}
              />
              <StatRow
                label={t("product_flow.stat.min_epochs")}
                value={`${pt.minTrainingEpochs}`}
              />
            </View>
            <View style={{ marginTop: 12 }}>
              <Button
                label={
                  locked
                    ? t("product_flow.btn.locked")
                    : !canAfford
                      ? t("product_flow.btn.cash_low")
                      : t("common.start")
                }
                onPress={() => onSelect(pt.id)}
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
  const t = useT();
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
    if (!res.ok) Alert.alert(t("product_flow.alert.buy_fail_title"), res.error);
  };

  return (
    <>
      <View>
        <Pill label={t("product_flow.pill_step", { n: 2 })} variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          {t("product_flow.data.title")}
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          {t("product_flow.data.subtitle")}
        </Text>
      </View>
      {tiers.map((d) => {
        const isSelected = selectedTier === d.id;
        const tierCost = Math.round(
          productType.baseDataCost * d.costMultiplier,
        );
        const canAfford = cash >= tierCost;
        return (
          <Pressable
            key={d.id}
            onPress={() => setSelectedTier(d.id)}
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
                {t(d.name)}
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
              {t(d.description)}
            </Text>
            <View style={{ marginTop: 8 }}>
              <StatRow
                label={t("product_flow.data.potential_quality")}
                value={formatPercent(d.qualityScore)}
              />
              <StatRow
                label={
                  <TooltipWord
                    termId="bias"
                    style={{ color: "#6B7280", fontSize: 14 }}
                  >
                    {t("product_flow.data.bias_risk")}
                  </TooltipWord>
                }
                value={formatPercent(d.biasRisk)}
                valueColor={d.biasRisk > 0.4 ? "#B91C1C" : "#111827"}
              />
              <StatRow
                label={
                  <TooltipWord
                    termId="hallucination"
                    style={{ color: "#6B7280", fontSize: 14 }}
                  >
                    {t("product_flow.data.hallucination_risk")}
                  </TooltipWord>
                }
                value={formatPercent(d.hallucinationRisk)}
                valueColor={d.hallucinationRisk > 0.4 ? "#B91C1C" : "#111827"}
              />
            </View>
          </Pressable>
        );
      })}
      <Button
        label={t("product_flow.data.buy_cta", { cost: formatCurrency(cost) })}
        onPress={handleBuy}
        disabled={cash < cost}
        fullWidth
      />
    </>
  );
}

// ── Stage 3: Training (RLHF) ──────────────────────────────────────────────────
function TrainingStage() {
  const t = useT();
  const draft = useGameStore((s) => s.currentDraft);
  const compute = useGameStore((s) => s.compute);
  const runEpoch = useGameStore((s) => s.runTrainingEpoch);
  const advanceToTuring = useGameStore((s) => s.advanceToTuring);
  const buyCompute = useGameStore((s) => s.buyCompute);
  const refillCompute = useGameStore((s) => s.refillCompute);
  const [lastFeedback, setLastFeedback] = useState(null);

  if (!draft) return null;
  const productType = PRODUCT_TYPES[draft.typeId];
  const baseComputePerEpoch = Math.max(
    1,
    Math.round(productType.baseComputeCost / 3),
  );

  const scenario = getRLHFScenario(draft.typeId, draft.epochs);
  const responseType = pickResponseType(draft.qualityScore, draft.epochs);
  const responseText =
    responseType === "good" ? scenario.goodResponse : scenario.badResponse;
  const trainingDone = draft.trainingProgress >= 1;

  const handleRate = (rating) => {
    setLastFeedback(rating);
    const res = runEpoch(rating, responseType);
    if (!res.ok) {
      setLastFeedback(null);
      Alert.alert(t("product_flow.alert.train_fail_title"), res.error);
    }
  };

  const ratingCost = {
    approve: baseComputePerEpoch,
    reject: Math.max(1, Math.round(baseComputePerEpoch * 1.5)),
    skip: Math.max(1, Math.round(baseComputePerEpoch * 0.7)),
  };

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
        <Pill label={t("product_flow.training.pill")} variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          {t("product_flow.training.title")}
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          {t("product_flow.training.subtitle")}
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
            sub={t("product_flow.training.sub.quality")}
            color="#2563EB"
          />
          <RingStat
            value={draft.trainingProgress}
            label={formatPercent(draft.trainingProgress)}
            sub={t("product_flow.training.sub.progress")}
            color="#EA580C"
          />
          <RingStat
            value={1 - draft.hallucinationRisk}
            label={formatPercent(1 - draft.hallucinationRisk)}
            sub={t("product_flow.training.sub.safety")}
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
                {t("product_flow.training.epoch_label")}
              </TooltipWord>
            }
            value={`${draft.epochs} / ${productType.minTrainingEpochs}`}
          />
          <StatRow
            label={t("product_flow.training.compute_left")}
            value={`${Math.round(compute)}`}
          />
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
              {t("product_flow.training.feedback_label")}
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
              {t("product_flow.training.done_title")}
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: "#6B7280", lineHeight: 21 }}>
            {t("product_flow.training.done_body", {
              epochs: draft.epochs,
            })}
          </Text>
          <View style={{ marginTop: 14 }}>
            <Button
              label={t("product_flow.training.start_turing_cta")}
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
                {t("product_flow.training.scenario_header", {
                  n: draft.epochs + 1,
                })}
              </Text>
              <Pill
                label={
                  responseType === "good"
                    ? t("product_flow.training.pill.good")
                    : t("product_flow.training.pill.bad")
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
                {t("product_flow.training.prompt_label")}
              </Text>
              <Text style={{ fontSize: 14, color: "#374151", lineHeight: 20 }}>
                {t(scenario.prompt)}
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
                {t("product_flow.training.response_label")}
              </Text>
              <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
                {t(responseText)}
              </Text>
            </View>
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
              {t("product_flow.rating.title")}
            </Text>
            <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>
              {t("product_flow.rating.subtitle")}
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
                    {t("product_flow.rating.approve.title")}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>
                    {t("product_flow.rating.approve.subtitle")}
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
                    {t("product_flow.rating.reject.title")}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>
                    {t("product_flow.rating.reject.subtitle")}
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
                    {t("product_flow.rating.skip.title")}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>
                    {t("product_flow.rating.skip.subtitle")}
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
  const t = useT();
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
        {t("product_flow.refill.title")}
      </Text>
      <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
        {t("product_flow.refill.subtitle")}
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Button
            label={t("product_flow.refill.refill_cta")}
            variant="soft"
            icon={<Zap size={14} color="#2563EB" />}
            onPress={() => {
              const r = refillCompute();
              if (!r.ok) Alert.alert(t("common.failed"), r.error);
            }}
            fullWidth
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            label={t("product_flow.refill.buy_cap_cta")}
            variant="secondary"
            icon={<Cpu size={14} color="#111827" />}
            onPress={() => {
              const r = buyCompute(10);
              if (!r.ok) Alert.alert(t("common.failed"), r.error);
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
  const t = useT();
  const draft = useGameStore((s) => s.currentDraft);
  const submitTuringTest = useGameStore((s) => s.submitTuringTest);
  const [phase, setPhase] = useState("intro");
  const [cards, setCards] = useState([]);
  const [answers, setAnswers] = useState({});
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

  const correctCount = revealed
    ? cards.filter((c) => answers[c.id] === (c.isAI ? "ai" : "human")).length
    : 0;
  const score = cards.length > 0 ? correctCount / cards.length : 0;

  if (phase === "intro") {
    return (
      <>
        <View>
          <Pill label={t("product_flow.turing.pill")} variant="soft" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#111827",
              marginTop: 8,
              letterSpacing: -0.3,
            }}
          >
            {t("product_flow.turing.title")}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {t("product_flow.turing.subtitle")}
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
              {t("product_flow.turing.what_title")}
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
            {t("product_flow.turing.what_body")}
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
              {t("product_flow.turing.rules_title")}
            </Text>
            <Text style={{ fontSize: 13, color: "#4B5563", lineHeight: 20 }}>
              {t("product_flow.turing.rules_body")}
            </Text>
          </View>
          <View style={{ marginTop: 12, gap: 6 }}>
            <ScoreExplain
              score="≥75%"
              effect={t("product_flow.turing.score_high")}
              positive
            />
            <ScoreExplain
              score="50–74%"
              effect={t("product_flow.turing.score_mid")}
              positive
            />
            <ScoreExplain
              score="<50%"
              effect={t("product_flow.turing.score_low")}
              positive={false}
            />
          </View>
        </Card>

        <Button
          label={t("product_flow.turing.start_cta")}
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
          <Pill label={t("product_flow.turing.pill")} variant="soft" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#111827",
              marginTop: 8,
              letterSpacing: -0.3,
            }}
          >
            {t("product_flow.turing.prompt_title")}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {t("product_flow.turing.progress", {
              done: Object.keys(answers).length,
              total: cards.length,
            })}
          </Text>
        </View>

        {cards.map((card) => {
          const chosen = answers[card.id];
          return (
            <Card key={card.id}>
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
                  {t("product_flow.turing.question_label")}
                </Text>
                <Text style={{ fontSize: 13, color: "#374151" }}>
                  {t(card.prompt)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111827",
                  lineHeight: 21,
                  marginBottom: 12,
                }}
              >
                {t(card.text)}
              </Text>
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
                    {t("product_flow.turing.choice_human")}
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
                    {t("product_flow.turing.choice_ai")}
                  </Text>
                </Pressable>
              </View>
            </Card>
          );
        })}

        {allAnswered ? (
          <Button
            label={t("product_flow.turing.reveal_cta")}
            onPress={handleReveal}
            fullWidth
          />
        ) : null}
      </>
    );
  }

  if (phase === "result") {
    const verdict =
      score >= 0.75
        ? { key: "excellent", color: "#16A34A", bg: "#F0FDF4", emoji: "🏆" }
        : score >= 0.5
          ? { key: "good", color: "#D97706", bg: "#FFFBEB", emoji: "✅" }
          : {
              key: "poor",
              color: "#B91C1C",
              bg: "#FFF1F2",
              emoji: "⚠️",
            };

    return (
      <>
        <View>
          <Pill label={t("product_flow.turing.result_pill")} variant="soft" />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#111827",
              marginTop: 8,
              letterSpacing: -0.3,
            }}
          >
            {verdict.emoji}{" "}
            {t("product_flow.turing.score_count", {
              correct: correctCount,
              total: cards.length,
            })}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {t("product_flow.turing.score_summary", {
              pct: formatPercent(score),
              verdict: t(`product_flow.turing.verdict.${verdict.key}`),
            })}
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
            {t("product_flow.turing.effect_title")}
          </Text>
          {score >= 0.75 ? (
            <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
              {t("product_flow.turing.effect_high")}
            </Text>
          ) : score >= 0.5 ? (
            <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
              {t("product_flow.turing.effect_mid")}
            </Text>
          ) : (
            <Text style={{ fontSize: 14, color: "#374151", lineHeight: 21 }}>
              {t("product_flow.turing.effect_low")}
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
                  {correct
                    ? t("product_flow.turing.correct")
                    : t("product_flow.turing.wrong")}
                  {" — "}
                  {card.isAI
                    ? t("product_flow.turing.written_by_ai")
                    : t("product_flow.turing.written_by_human")}
                </Text>
              </View>
              <Text
                style={{ fontSize: 13, color: "#6B7280", fontStyle: "italic" }}
                numberOfLines={2}
              >
                "{t(card.text).slice(0, 100)}…"
              </Text>
              {!correct ? (
                <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>
                  {card.isAI
                    ? t(card.scenario.aiLabel)
                    : t(card.scenario.humanLabel)}
                </Text>
              ) : null}
            </Card>
          );
        })}

        <Text style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF" }}>
          {t("product_flow.turing.continuing")}
        </Text>
      </>
    );
  }

  return null;
}

// ── Stage 5: Eval ─────────────────────────────────────────────────────────────
function EvalStage({ onLaunched }) {
  const t = useT();
  const draft = useGameStore((s) => s.currentDraft);
  const launchProduct = useGameStore((s) => s.launchProduct);
  if (!draft) return null;
  const productType = PRODUCT_TYPES[draft.typeId];

  const safetyScore =
    1 - (draft.hallucinationRisk * 0.6 + draft.biasRisk * 0.4);
  const overallScore = draft.qualityScore * 0.7 + safetyScore * 0.3;
  const verdictKey =
    overallScore > 0.7
      ? "ready"
      : overallScore > 0.5
        ? "risky_mid"
        : "risky_high";
  const verdictColor =
    overallScore > 0.7
      ? "#22C55E"
      : overallScore > 0.5
        ? "#EAB308"
        : "#EF4444";

  const handleLaunch = () => {
    const res = launchProduct();
    if (!res.ok) {
      Alert.alert(t("product_flow.eval.launch_fail_title"), res.error);
      return;
    }
    Alert.alert(
      t("product_flow.eval.launch_ok_title"),
      t("product_flow.eval.launch_ok_body", {
        users: res.summary.initialUsers,
        rep: res.summary.reputationDelta >= 0 ? "+" : "",
        repDelta: res.summary.reputationDelta,
      }),
      [{ text: t("common.done"), onPress: onLaunched }],
    );
  };

  return (
    <>
      <View>
        <Pill label={t("product_flow.pill_step", { n: 5 })} variant="soft" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "#111827",
            marginTop: 8,
            letterSpacing: -0.3,
          }}
        >
          {t("product_flow.eval.title")}
        </Text>
        <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
          {t("product_flow.eval.subtitle")}
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
              {t("product_flow.eval.verdict_label")}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginTop: 4,
              }}
            >
              {t(productType.name)}
            </Text>
          </View>
          <Pill
            label={t(`product_flow.eval.verdict.${verdictKey}`)}
            variant="status"
            dotColor={verdictColor}
          />
        </View>
        <View style={{ marginTop: 12 }}>
          <StatRow
            label={t("product_flow.eval.quality")}
            value={formatPercent(draft.qualityScore)}
          />
          <StatRow
            label={
              <TooltipWord
                termId="hallucination"
                style={{ color: "#6B7280", fontSize: 14 }}
              >
                {t("product_flow.data.hallucination_risk")}
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
                {t("product_flow.data.bias_risk")}
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
                {t("product_flow.eval.overall")}
              </TooltipWord>
            }
            value={formatPercent(overallScore)}
          />
          {draft.turingScore !== null ? (
            <StatRow
              label={t("product_flow.eval.turing_score")}
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
        label={t("product_flow.eval.launch_cta")}
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
