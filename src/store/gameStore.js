import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tFor } from "@/i18n/useT";
import {
  SCHEMA_VERSION,
  INITIAL_STATE,
  PRODUCT_TYPES,
  DATA_QUALITY_TIERS,
  RESEARCH_NODES,
  MARKET_EVENTS,
  CRISIS_EVENTS,
  COMPANY_STAGES,
  STAFF_UPGRADES,
  createInitialCompetitors,
} from "../data/gameContent";

const SAVE_KEY = "@neural_empire/save_v1";
const GAME_START_DATE_MS = Date.UTC(2026, 0, 1);
const GAME_DAY_REAL_MS = 1500;
const REAL_MS_PER_GAME_MS = (24 * 60 * 60 * 1000) / GAME_DAY_REAL_MS;

export const TUTORIAL_STEPS = {
  choose_first_product: "choose_first_product",
  buy_first_data: "buy_first_data",
  train_first_model: "train_first_model",
  pass_first_eval: "pass_first_eval",
  launch_first_product: "launch_first_product",
  complete: "complete",
};

const defaultTutorial = () => ({
  active: true,
  step: TUTORIAL_STEPS.choose_first_product,
  dismissedHints: [],
  firstLaunchAt: null,
});

const completeTutorialState = (firstLaunchAt = Date.now()) => ({
  active: false,
  step: TUTORIAL_STEPS.complete,
  dismissedHints: [],
  firstLaunchAt,
});

const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const safeNumber = (value, fallback = 0) =>
  typeof value === "number" && !isNaN(value) ? value : fallback;

const computeStage = (reputation, totalRevenue) => {
  let current = COMPANY_STAGES[0];
  for (const stage of COMPANY_STAGES) {
    if (reputation >= stage.minReputation && totalRevenue >= stage.minRevenue) {
      current = stage;
    }
  }
  return current;
};

// ── Upgrade effects aggregator ─────────────────────────────────────────────
// Sums all bonuses from every purchased upgrade tier into one flat object.
export function computeUpgradeEffects(purchasedUpgrades = {}) {
  const effects = {
    computeEfficiency: 0, // reduces compute cost per epoch (0..0.8 max)
    qualityBonus: 0, // added to raw quality score during training
    dataQualityBonus: 0, // added on top of tier's qualityScore
    biasReduction: 0, // subtracted from bias risk
    hallucinationReduction: 0, // subtracted from hallucination risk
    userMultiplier: 0, // multiplier bonus on initial users at launch
    churnReduction: 0, // subtracted from churn rate
    revenueMultiplier: 0, // multiplier bonus on revenue tick
    reputationTickBonus: 0, // reputation points added each tick
  };
  for (const [id, level] of Object.entries(purchasedUpgrades)) {
    const def = STAFF_UPGRADES[id];
    if (!def || level === 0) continue;
    for (let i = 0; i < level; i++) {
      const tier = def.tiers[i];
      if (!tier) continue;
      for (const [key, val] of Object.entries(tier.effect)) {
        if (key !== "computeCapacityBonus") {
          effects[key] = (effects[key] || 0) + val;
        }
      }
    }
  }
  return effects;
}

const defaultGameState = () => ({
  ...INITIAL_STATE,
  companyName: "Neural Empire Inc.",
  founded: Date.now(),
  language: "id", // "id" | "en" — chosen at onboarding, persisted across runs
  onboardingComplete: false,
  // products that are live in the market
  liveProducts: [],
  // a product currently being developed (training/eval flow)
  currentDraft: null,
  // unlocked research node ids
  unlockedResearch: [],
  // in-progress research { nodeId, startedAt, completesAt }
  activeResearch: null,
  // event log
  eventLog: [],
  activeEvents: [], // events with duration effects
  salesHistory: [], // real revenue samples for dashboard chart
  competitors: createInitialCompetitors(),
  activeCrisis: null,
  lastCrisisAt: Date.now(),
  lastTick: Date.now(),
  gameDateMs: GAME_START_DATE_MS,
  schemaVersion: SCHEMA_VERSION,
  tutorial: defaultTutorial(),
  // staff / operations
  purchasedUpgrades: {}, // { [upgradeId]: currentLevel }
});

export const useGameStore = create((set, get) => ({
  ...defaultGameState(),
  hydrated: false,

  // ---------- Persistence ----------
  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVE_KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }
      const parsed = JSON.parse(raw);
      // simple schema migration placeholder
      if (parsed.schemaVersion !== SCHEMA_VERSION) {
        console.warn("Schema version mismatch. Using defaults.");
        set({ ...defaultGameState(), hydrated: true });
        return;
      }
      const inferredTutorial = parsed.liveProducts?.length > 0 || parsed.totalRevenue > 0
        ? completeTutorialState(parsed.tutorial?.firstLaunchAt || Date.now())
        : { ...defaultTutorial(), ...(parsed.tutorial || {}) };
      set({
        ...parsed,
        purchasedUpgrades: parsed.purchasedUpgrades || {},
        competitors: parsed.competitors || createInitialCompetitors(),
        salesHistory: parsed.salesHistory || [],
        activeCrisis: parsed.activeCrisis || null,
        lastCrisisAt: parsed.lastCrisisAt || Date.now(),
        gameDateMs: parsed.gameDateMs || GAME_START_DATE_MS,
        language: parsed.language === "en" ? "en" : "id",
        tutorial: inferredTutorial,
        hydrated: true,
      });
    } catch (err) {
      console.error("Failed to hydrate save:", err);
      set({ hydrated: true });
    }
  },

  persist: async () => {
    try {
      const state = get();
      const toSave = {
        cash: state.cash,
        compute: state.compute,
        computeCapacity: state.computeCapacity,
        reputation: state.reputation,
        totalRevenue: state.totalRevenue,
        totalUsers: state.totalUsers,
        researchPoints: state.researchPoints,
        companyName: state.companyName,
        founded: state.founded,
        language: state.language,
        onboardingComplete: state.onboardingComplete,
        liveProducts: state.liveProducts,
        currentDraft: state.currentDraft,
        unlockedResearch: state.unlockedResearch,
        activeResearch: state.activeResearch,
        eventLog: state.eventLog,
        activeEvents: state.activeEvents,
        salesHistory: state.salesHistory,
        competitors: state.competitors,
        activeCrisis: state.activeCrisis,
        lastCrisisAt: state.lastCrisisAt,
        gameDateMs: state.gameDateMs,
        purchasedUpgrades: state.purchasedUpgrades,
        tutorial: state.tutorial,
        lastTick: state.lastTick,
        schemaVersion: SCHEMA_VERSION,
      };
      await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
    } catch (err) {
      console.error("Failed to persist save:", err);
    }
  },

  resetGame: async () => {
    try {
      await AsyncStorage.removeItem(SAVE_KEY);
    } catch (err) {
      console.error(err);
    }
    set({ ...defaultGameState(), hydrated: true });
  },

  completeOnboarding: () => {
    set({ onboardingComplete: true });
    get().persist();
  },

  setTutorialStep: (step) => {
    set({ tutorial: { ...(get().tutorial || defaultTutorial()), active: step !== TUTORIAL_STEPS.complete, step } });
    get().persist();
  },

  completeTutorial: () => {
    set({ tutorial: completeTutorialState() });
    get().persist();
  },

  skipTutorial: () => {
    set({ tutorial: completeTutorialState() });
    get().persist();
  },

  replayTutorial: () => {
    set({ tutorial: defaultTutorial() });
    get().persist();
  },

  dismissTutorialHint: (hintId) => {
    const tutorial = get().tutorial || defaultTutorial();
    set({ tutorial: { ...tutorial, dismissedHints: Array.from(new Set([...(tutorial.dismissedHints || []), hintId])) } });
    get().persist();
  },

  setCompanyName: (name) => {
    set({ companyName: name });
    get().persist();
  },

  setLanguage: (lang) => {
    if (lang !== "id" && lang !== "en") return;
    set({ language: lang });
    get().persist();
  },

  // ---------- Product Lifecycle ----------
  startDraft: (productTypeId) => {
    const productType = PRODUCT_TYPES[productTypeId];
    if (!productType) return;
    const draft = {
      id: generateId(),
      typeId: productTypeId,
      stage: "data", // data → training → turing → eval
      dataTierId: null,
      dataPurchased: false,
      trainingProgress: 0,
      epochs: 0,
      qualityScore: 0,
      hallucinationRisk: 1,
      biasRisk: 1,
      computeSpent: 0,
      cashSpent: 0,
      turingScore: null, // 0..1, set after Turing Test
      rlhfHistory: [], // last 5 ratings for display
    };
    set({ currentDraft: draft, tutorial: state.tutorial?.active ? { ...state.tutorial, step: TUTORIAL_STEPS.buy_first_data } : state.tutorial });
    get().persist();
  },

  cancelDraft: () => {
    set({ currentDraft: null });
    get().persist();
  },

  purchaseData: (tierId) => {
    const state = get();
    const draft = state.currentDraft;
    if (!draft) return { ok: false, error: tFor(get().language, "error.no_draft") };
    const productType = PRODUCT_TYPES[draft.typeId];
    const tier = DATA_QUALITY_TIERS[tierId];
    if (!productType || !tier)
      return { ok: false, error: tFor(get().language, "error.invalid_choice") };
    const cost = Math.round(productType.baseDataCost * tier.costMultiplier);
    if (state.cash < cost) {
      return { ok: false, error: tFor(get().language, "error.cash_low_data") };
    }
    set({
      cash: state.cash - cost,
      currentDraft: {
        ...draft,
        dataTierId: tierId,
        dataPurchased: true,
        cashSpent: draft.cashSpent + cost,
        stage: "training",
      },
      tutorial: state.tutorial?.active ? { ...state.tutorial, step: TUTORIAL_STEPS.train_first_model } : state.tutorial,
    });
    get().persist();
    return { ok: true };
  },

  // rating: 'approve' | 'reject' | 'skip'
  // approve — feedback positif: kualitas naik normal, compute normal
  // reject  — feedback korektif: kualitas naik lebih besar, hallucination turun, compute ×1.5
  // skip    — lewati review: kualitas naik sedikit, compute ×0.7
  // rating: 'approve' | 'reject' | 'skip'
  // responseType: 'good' | 'bad' — apakah output model benar atau bermasalah
  // Penalty: approve bad response → hallucination naik
  // Penalty: reject good response → quality turun, compute waste
  runTrainingEpoch: (rating = "approve", responseType = "good") => {
    const state = get();
    const draft = state.currentDraft;
    if (!draft || draft.stage !== "training") {
      return { ok: false, error: tFor(get().language, "error.not_training") };
    }
    const productType = PRODUCT_TYPES[draft.typeId];
    const tier = DATA_QUALITY_TIERS[draft.dataTierId];
    if (!productType || !tier)
      return { ok: false, error: tFor(get().language, "error.invalid_draft") };

    const fx = computeUpgradeEffects(state.purchasedUpgrades);
    const efficiency = Math.min(0.8, fx.computeEfficiency);
    const baseComputeCost = Math.max(
      1,
      Math.round((productType.baseComputeCost / 3) * (1 - efficiency)),
    );

    // Compute cost modifier by rating
    const computeMult =
      rating === "reject" ? 1.5 : rating === "skip" ? 0.7 : 1.0;
    const computeCost = Math.max(1, Math.round(baseComputeCost * computeMult));

    if (state.compute < computeCost) {
      return { ok: false, error: tFor(get().language, "error.cash_low", { context: "compute" }) };
    }

    const newEpochs = draft.epochs + 1;
    const targetEpochs = productType.minTrainingEpochs;
    const progress = Math.min(1, newEpochs / targetEpochs);

    // Quality multiplier by rating
    const qualMult =
      rating === "reject" ? 1.35 : rating === "skip" ? 0.65 : 1.0;
    const baseQuality =
      (tier.qualityScore + fx.dataQualityBonus) * (0.5 + 0.5 * progress);
    const quality = Math.min(
      1,
      baseQuality * qualMult + fx.qualityBonus + (Math.random() * 0.04 - 0.02),
    );

    // Hallucination: reject gives extra reduction (corrective learning)
    const hallMult = rating === "reject" ? 0.8 : 1.0;
    const hallucination = Math.max(
      0.02,
      tier.hallucinationRisk * hallMult * (1 - progress * 0.8) -
        fx.hallucinationReduction +
        (Math.random() * 0.04 - 0.02),
    );

    const bias = Math.max(
      0.02,
      tier.biasRisk * (1 - progress * 0.6) -
        fx.biasReduction +
        (Math.random() * 0.04 - 0.02),
    );

    // Keep last 5 RLHF ratings for the history display
    const rlhfHistory = [rating, ...(draft.rlhfHistory || [])].slice(0, 5);

    // ── RLHF Mismatch Penalty ────────────────────────────────────────────────
    // Approve bad response: hallucination increases, small quality penalty
    // Reject good response: quality penalty, compute still consumed
    let mismatchPenalty = { qualityDelta: 0, hallucinationDelta: 0 };
    if (rating === "approve" && responseType === "bad") {
      mismatchPenalty = { qualityDelta: -0.03, hallucinationDelta: 0.06 };
    } else if (rating === "reject" && responseType === "good") {
      mismatchPenalty = { qualityDelta: -0.02, hallucinationDelta: 0.02 };
    }

    const finalQuality = Math.max(
      0.02,
      quality + mismatchPenalty.qualityDelta,
    );
    const finalHallucination = Math.max(
      0.02,
      hallucination + mismatchPenalty.hallucinationDelta,
    );

    // After all epochs done → go to Turing Test, not eval
    const nextStage = progress >= 1 ? "turing" : "training";

    set({
      compute: state.compute - computeCost,
      currentDraft: {
        ...draft,
        epochs: newEpochs,
        trainingProgress: progress,
        qualityScore: finalQuality,
        hallucinationRisk: finalHallucination,
        biasRisk: bias,
        computeSpent: draft.computeSpent + computeCost,
        rlhfHistory,
        stage: nextStage,
      },
      tutorial: state.tutorial?.active && nextStage === "turing" ? { ...state.tutorial, step: TUTORIAL_STEPS.pass_first_eval } : state.tutorial,
    });
    get().persist();
    return { ok: true, nextStage };
  },

  // Manual advance to Turing stage (if player opts in before progress = 1)
  advanceToTuring: () => {
    const draft = get().currentDraft;
    if (!draft || draft.trainingProgress < 1) return;
    set({ currentDraft: { ...draft, stage: "turing" } });
    get().persist();
  },

  // score: 0..1 (fraction of correct Turing Test answers)
  submitTuringTest: (score) => {
    const draft = get().currentDraft;
    if (!draft || draft.stage !== "turing") return;

    let qualityDelta = 0;
    let hallucinationMult = 1.0;

    if (score >= 0.75) {
      // Excellent — model sangat mirip manusia
      qualityDelta = 0.08;
      hallucinationMult = 0.82;
    } else if (score >= 0.5) {
      // Good — model cukup meyakinkan
      qualityDelta = 0.04;
      hallucinationMult = 0.93;
    } else {
      // Poor — model terlalu "robotic"
      qualityDelta = 0;
      hallucinationMult = 1.12; // penalty: halusinasi meningkat
    }

    const newQuality = Math.min(1, draft.qualityScore + qualityDelta);
    const newHallucination = Math.max(
      0.02,
      draft.hallucinationRisk * hallucinationMult,
    );

    set({
      currentDraft: {
        ...draft,
        stage: "eval",
        turingScore: score,
        qualityScore: newQuality,
        hallucinationRisk: newHallucination,
      },
      tutorial: (get().tutorial || defaultTutorial()).active ? { ...(get().tutorial || defaultTutorial()), step: TUTORIAL_STEPS.launch_first_product } : get().tutorial,
    });
    get().persist();
  },

  moveDraftToEval: () => {
    const draft = get().currentDraft;
    if (!draft) return;
    if (draft.trainingProgress < 1) return;
    set({ currentDraft: { ...draft, stage: "eval" } });
    get().persist();
  },

  launchProduct: () => {
    const state = get();
    const draft = state.currentDraft;
    if (!draft || draft.stage !== "eval") {
      return { ok: false, error: tFor(get().language, "error.not_ready_launch") };
    }
    const productType = PRODUCT_TYPES[draft.typeId];
    const fx = computeUpgradeEffects(state.purchasedUpgrades);
    // Calculate initial users based on quality, hallucination, bias, and reputation
    const safetyScore =
      1 - (draft.hallucinationRisk * 0.6 + draft.biasRisk * 0.4);
    const launchScore = draft.qualityScore * 0.7 + safetyScore * 0.3;
    const repBonus = 1 + state.reputation / 100;
    const baseUsers = 80 + launchScore * 600 * repBonus + Math.random() * 50;
    const initialUsers = Math.round(baseUsers * (1 + fx.userMultiplier));
    const reputationDelta = Math.round(
      launchScore * 12 - draft.hallucinationRisk * 8,
    );
    const baseChurn = 0.015 + draft.hallucinationRisk * 0.04; // fraction of users lost per 30 game days
    const churnRate = Math.max(0.001, baseChurn - fx.churnReduction);
    const gameDateMs = safeNumber(state.gameDateMs, GAME_START_DATE_MS);
    const productLifespanGameMs =
      (productType.revenueLifespanSec * 1000 * REAL_MS_PER_GAME_MS);
    const live = {
      id: draft.id,
      typeId: draft.typeId,
      name: productType.name,
      launchedAt: Date.now(),
      launchedGameDateMs: gameDateMs,
      qualityScore: draft.qualityScore,
      hallucinationRisk: draft.hallucinationRisk,
      biasRisk: draft.biasRisk,
      users: initialUsers,
      // revenuePerTick = $/game day. Calendar drives revenue growth.
      revenuePerTick: initialUsers * productType.baseRevenuePerUser,
      totalRevenue: 0,
      salesHistory: [{ timestamp: Date.now(), revenue: 0, users: initialUsers }],
      churnRate, // fraction of users lost per 30 game days
      // revenue window — product stops earning after this game-date timestamp
      revenueLifespanSec: productType.revenueLifespanSec,
      revenueExpiresAt: Date.now() + productType.revenueLifespanSec * 1000,
      revenueExpiresGameDateMs: gameDateMs + productLifespanGameMs,
      reviews:
        launchScore > 0.6
          ? "positive"
          : launchScore > 0.4
            ? "mixed"
            : "negative",
    };
    set({
      liveProducts: [...state.liveProducts, live],
      currentDraft: null,
      reputation: Math.max(0, state.reputation + reputationDelta),
      totalUsers: state.totalUsers + initialUsers,
      tutorial: state.tutorial?.active ? completeTutorialState(Date.now()) : state.tutorial,
      eventLog: [
        {
          id: generateId(),
          timestamp: Date.now(),
          type: "launch",
          title: tFor(get().language, "event.launch_title"),
          message: tFor(get().language, "event.launch_message", {
            name: tFor(get().language, productType.name),
            users: initialUsers,
          }),
          tone: launchScore > 0.6 ? "positive" : "neutral",
        },
        ...state.eventLog,
      ].slice(0, 50),
    });
    get().persist();
    return {
      ok: true,
      summary: { initialUsers, launchScore, reputationDelta },
    };
  },

  // ---------- Compute / Economy ----------
  buyCompute: (amount = 10) => {
    const state = get();
    const cost = amount * 80;
    if (state.cash < cost) return { ok: false, error: tFor(get().language, "error.cash_low") };
    set({
      cash: state.cash - cost,
      computeCapacity: state.computeCapacity + amount,
      compute: state.compute + amount,
    });
    get().persist();
    return { ok: true };
  },

  refillCompute: () => {
    const state = get();
    const fx = computeUpgradeEffects(state.purchasedUpgrades);
    const baseCost = 100;
    const cost = Math.round(
      baseCost * (1 - Math.min(0.7, fx.refillCostReduction)),
    );
    if (state.cash < cost) return { ok: false, error: tFor(get().language, "error.cash_low") };
    set({ cash: state.cash - cost, compute: state.computeCapacity });
    get().persist();
    return { ok: true };
  },

  applyRewardedAdBoost: () => {
    const state = get();
    set({
      compute: Math.min(state.computeCapacity, state.compute + 10),
      eventLog: [
        {
          id: generateId(),
          timestamp: Date.now(),
          type: "boost",
          title: tFor(get().language, "event.ad_boost_title"),
          message: tFor(get().language, "event.ad_boost_message"),
          tone: "positive",
        },
        ...state.eventLog,
      ].slice(0, 50),
    });
    get().persist();
  },

  resolveCrisis: (choiceId) => {
    const state = get();
    const crisis = state.activeCrisis;
    if (!crisis) return { ok: false, error: tFor(get().language, "error.no_crisis") };
    const choice = crisis.choices.find((c) => c.id === choiceId);
    if (!choice) return { ok: false, error: tFor(get().language, "error.invalid_crisis") };
    const effect = choice.effect || {};

    let competitors = state.competitors || createInitialCompetitors();
    if (effect.competitorBoost) {
      competitors = competitors.map((c) => ({
        ...c,
        momentum: Math.max(0.5, Math.min(1.8, c.momentum + effect.competitorBoost)),
      }));
    }

    set({
      cash: Math.max(0, state.cash + (effect.cashDelta || 0)),
      compute: Math.max(
        0,
        Math.min(state.computeCapacity, state.compute + (effect.computeDelta || 0)),
      ),
      reputation: Math.max(0, state.reputation + (effect.reputationDelta || 0)),
      competitors,
      activeCrisis: null,
      lastCrisisAt: Date.now(),
      eventLog: [
        {
          id: generateId(),
          timestamp: Date.now(),
          type: "crisis_resolved",
          title: tFor(get().language, "event.crisis_resolved_title", {
            name: tFor(get().language, crisis.title),
            choice: tFor(get().language, choice.label),
          }),
          message: tFor(get().language, choice.result),
          tone: (effect.reputationDelta || 0) >= 0 ? "positive" : "negative",
        },
        ...state.eventLog,
      ].slice(0, 50),
    });
    get().persist();
    return { ok: true };
  },

  // ---------- Research ----------
  startResearch: (nodeId) => {
    const state = get();
    const node = RESEARCH_NODES[nodeId];
    if (!node) return { ok: false, error: tFor(get().language, "error.invalid_research") };
    if (state.activeResearch)
      return { ok: false, error: tFor(get().language, "error.research_running") };
    if (state.unlockedResearch.includes(nodeId)) {
      return { ok: false, error: tFor(get().language, "error.research_done") };
    }
    for (const dep of node.requires) {
      if (!state.unlockedResearch.includes(dep)) {
        return { ok: false, error: tFor(get().language, "error.prereq_missing") };
      }
    }
    if (state.cash < node.cost)
      return { ok: false, error: tFor(get().language, "error.cash_low") };
    set({
      cash: state.cash - node.cost,
      activeResearch: {
        nodeId,
        startedAt: Date.now(),
        completesAt: Date.now() + node.duration * 1000,
      },
    });
    get().persist();
    return { ok: true };
  },

  // ---------- Staff / Operations ----------
  purchaseUpgrade: (upgradeId) => {
    const state = get();
    const def = STAFF_UPGRADES[upgradeId];
    if (!def) return { ok: false, error: tFor(get().language, "error.invalid_upgrade") };
    const currentLevel = state.purchasedUpgrades[upgradeId] || 0;
    if (currentLevel >= def.maxLevel)
      return { ok: false, error: tFor(get().language, "error.upgrade_maxed") };
    const nextTier = def.tiers[currentLevel];
    if (!nextTier) return { ok: false, error: tFor(get().language, "error.tier_missing") };
    if (state.cash < nextTier.cost)
      return { ok: false, error: tFor(get().language, "error.cash_low") };
    const newPurchasedUpgrades = {
      ...state.purchasedUpgrades,
      [upgradeId]: currentLevel + 1,
    };
    // computeCapacityBonus is applied immediately (one-time per tier)
    let computeCapacity = state.computeCapacity;
    let compute = state.compute;
    if (nextTier.effect.computeCapacityBonus) {
      computeCapacity += nextTier.effect.computeCapacityBonus;
      compute = Math.min(
        computeCapacity,
        compute + nextTier.effect.computeCapacityBonus,
      );
    }
    set({
      cash: state.cash - nextTier.cost,
      purchasedUpgrades: newPurchasedUpgrades,
      computeCapacity,
      compute,
      eventLog: [
        {
          id: generateId(),
          timestamp: Date.now(),
          type: "upgrade",
          title: tFor(get().language, "event.recruit_title"),
          message: tFor(get().language, "event.recruit_message", {
            name: tFor(get().language, nextTier.label),
          }),
          tone: "positive",
        },
        ...state.eventLog,
      ].slice(0, 50),
    });
    get().persist();
    return { ok: true, tier: nextTier };
  },

  // ---------- Tick: economy + events + research ----------
  tick: () => {
    const state = get();
    const now = Date.now();
    // Cap at 10s — prevents huge catch-up ticks when app is backgrounded
    const deltaSec = Math.min(10, (now - state.lastTick) / 1000);
    if (deltaSec < 0.25) return;
    const prevGameDateMs = safeNumber(state.gameDateMs, GAME_START_DATE_MS);
    const gameDeltaMs = deltaSec * 1000 * REAL_MS_PER_GAME_MS;
    const gameDaysDelta = gameDeltaMs / (24 * 60 * 60 * 1000);
    const gameDateMs = prevGameDateMs + gameDeltaMs;

    // Guard: if any core value is NaN (corrupted save), start from safe defaults
    let cash = isNaN(state.cash) ? 0 : state.cash;
    let totalRevenue = isNaN(state.totalRevenue) ? 0 : state.totalRevenue;
    let reputation = isNaN(state.reputation) ? 10 : state.reputation;
    let totalUsers = 0;

    const fx = computeUpgradeEffects(state.purchasedUpgrades);
    let eventLog = state.eventLog;
    let activeCrisis = state.activeCrisis;
    let lastCrisisAt = state.lastCrisisAt || now;
    let competitors = state.competitors || createInitialCompetitors();

    // Revenue multiplier: staff bonus + active timed events
    let revenueMult = 1 + fx.revenueMultiplier;
    const activeEvents = state.activeEvents.filter((e) => e.expiresAt > now);
    for (const ev of activeEvents) {
      if (ev.revenueMultiplier) revenueMult *= ev.revenueMultiplier;
    }

    // Passive reputation from PR / Ethics staff
    if (fx.reputationTickBonus > 0) {
      reputation = Math.min(
        500,
        reputation + fx.reputationTickBonus * (deltaSec / 60),
      );
    }

    // ── Live product processing ────────────────────────────────────────────
    // Revenue is accumulated HERE inside the map using the ORIGINAL revenuePerTick,
    // then revenuePerTick is rescaled proportionally with the new user count.
    // This avoids the deltaSec double-multiply bug that caused NaN / billions.
    let cashFromProducts = 0;
    let revenueFromProducts = 0;

    const liveProducts = state.liveProducts
      .map((p) => {
        const safeUsers = isNaN(p.users) || p.users < 0 ? 0 : p.users;
        const safeRpt =
          isNaN(p.revenuePerTick) || p.revenuePerTick < 0
            ? 0
            : p.revenuePerTick;

        // Only earn if the product's game-date revenue window is still open.
        // Legacy saves fallback to real-time expiry.
        const revenueActive = p.revenueExpiresGameDateMs
          ? gameDateMs < p.revenueExpiresGameDateMs
          : !p.revenueExpiresAt || now < p.revenueExpiresAt;
        const earned = revenueActive ? safeRpt * gameDaysDelta * revenueMult : 0;

        // churnRate = fraction of users lost per 30 game days
        const churn = safeUsers * p.churnRate * (gameDaysDelta / 30);
        const newUsers = Math.max(0, Math.round(safeUsers - churn));

        // Accumulate using original earned (before revenuePerTick is updated)
        cashFromProducts += earned;
        revenueFromProducts += earned;

        const totalProductRevenue = (isNaN(p.totalRevenue) ? 0 : p.totalRevenue) + earned;
        const lastSample = (p.salesHistory || [])[0];
        const shouldSample = !lastSample || now - lastSample.timestamp >= 15000 || earned > 0;

        return {
          ...p,
          users: newUsers,
          totalRevenue: totalProductRevenue,
          salesHistory: shouldSample
            ? [
                { timestamp: now, revenue: totalProductRevenue, users: newUsers },
                ...(p.salesHistory || []),
              ].slice(0, 20)
            : p.salesHistory || [],
          // Scale revenuePerTick proportionally with user drop — NOT × deltaSec
          revenuePerTick:
            safeUsers > 0 ? safeRpt * (newUsers / safeUsers) : safeRpt,
        };
      })
      // Keep expired products visible as history; only remove if users fully drained
      .filter((p) => {
        const expired = p.revenueExpiresGameDateMs
          ? gameDateMs >= p.revenueExpiresGameDateMs
          : p.revenueExpiresAt && now >= p.revenueExpiresAt;
        return expired ? true : p.users > 5;
      });

    for (const p of liveProducts) {
      totalUsers += p.users;
    }

    cash += cashFromProducts;
    totalRevenue += revenueFromProducts;

    // ── Competitors: passive growth + occasional launches ─────────────────
    competitors = competitors.map((c) => {
      const launchRoll = Math.random() < (c.launchChance * c.momentum * gameDaysDelta) / 120;
      const launchUsers = launchRoll ? Math.round(c.baseUsers * (0.6 + Math.random())) : 0;
      const growth = safeNumber(c.users, 0) * 0.012 * c.momentum * (gameDaysDelta / 30);
      const users = Math.max(0, Math.round(safeNumber(c.users, 0) + growth + launchUsers));
      const earned = users * c.revenueRate * gameDaysDelta;
      if (launchRoll) {
        eventLog = [
          {
            id: generateId(),
            timestamp: now,
            type: "competitor",
            title: tFor(get().language, "event.competitor_launch_title", {
              name: tFor(get().language, c.name),
            }),
            message: tFor(get().language, "event.competitor_launch_message", {
              name: tFor(get().language, c.name),
              users: launchUsers,
            }),
            tone: "neutral",
          },
          ...eventLog,
        ].slice(0, 50);
      }
      return {
        ...c,
        users,
        totalRevenue: safeNumber(c.totalRevenue, 0) + earned,
        productsLaunched: c.productsLaunched + (launchRoll ? 1 : 0),
        momentum: Math.max(0.7, c.momentum * 0.998),
      };
    });

    // ── Crisis trigger (~every 2.5 min, only after first product) ───────────
    if (!activeCrisis && liveProducts.length > 0 && now - lastCrisisAt > 90000) {
      const crisisChance = Math.min(0.02, deltaSec / 150);
      if (Math.random() < crisisChance) {
        const pick = CRISIS_EVENTS[Math.floor(Math.random() * CRISIS_EVENTS.length)];
        activeCrisis = { ...pick, createdAt: now };
        lastCrisisAt = now;
        eventLog = [
          {
            id: generateId(),
            timestamp: now,
            type: "crisis",
            title: tFor(get().language, "event.market_crisis_title", {
              name: tFor(get().language, pick.title),
            }),
            message: tFor(get().language, pick.description),
            tone: "negative",
          },
          ...eventLog,
        ].slice(0, 50);
      }
    }

    // ── Research completion ────────────────────────────────────────────────
    let activeResearch = state.activeResearch;
    let unlockedResearch = state.unlockedResearch;
    if (activeResearch && now >= activeResearch.completesAt) {
      unlockedResearch = [...unlockedResearch, activeResearch.nodeId];
      eventLog = [
        {
          id: generateId(),
          timestamp: now,
          type: "research",
          title: tFor(get().language, "event.research_complete_title"),
          message: tFor(get().language, "event.research_complete_message", {
            name: tFor(get().language, RESEARCH_NODES[activeResearch.nodeId]?.name),
          }),
          tone: "positive",
        },
        ...eventLog,
      ].slice(0, 50);
      activeResearch = null;
    }

    // ── Random market event (~1 per 3 minutes) ────────────────────────────
    if (!state.tutorial?.active && Math.random() < deltaSec / 180) {
      const totalWeight = MARKET_EVENTS.reduce((s, e) => s + e.weight, 0);
      let pick = Math.random() * totalWeight;
      let chosen = MARKET_EVENTS[0];
      for (const ev of MARKET_EVENTS) {
        pick -= ev.weight;
        if (pick <= 0) {
          chosen = ev;
          break;
        }
      }
      const { effect } = chosen;
      if (effect.cashDelta) cash += effect.cashDelta;
      if (effect.reputationDelta)
        reputation = Math.max(0, reputation + effect.reputationDelta);
      eventLog = [
        {
          id: generateId(),
          timestamp: now,
          type: "event",
          eventId: chosen.id,
          title: tFor(get().language, chosen.title),
          message: tFor(get().language, chosen.description),
          tone: chosen.tone,
        },
        ...eventLog,
      ].slice(0, 50);
      if (effect.duration && effect.revenueMultiplier) {
        activeEvents.push({
          id: generateId(),
          eventId: chosen.id,
          revenueMultiplier: effect.revenueMultiplier,
          expiresAt: now + effect.duration * 1000,
        });
      }
    }

    const salesHistory = revenueFromProducts > 0
      ? [
          { timestamp: now, revenue: totalRevenue, delta: revenueFromProducts, users: totalUsers },
          ...(state.salesHistory || []),
        ].slice(0, 24)
      : state.salesHistory || [];

    // Single set — no early returns that skip product/revenue updates
    set({
      cash: Math.max(0, isNaN(cash) ? 0 : cash),
      totalRevenue: isNaN(totalRevenue) ? 0 : Math.max(0, totalRevenue),
      totalUsers,
      liveProducts,
      salesHistory,
      activeResearch,
      unlockedResearch,
      activeEvents,
      competitors,
      activeCrisis,
      lastCrisisAt,
      eventLog,
      reputation: isNaN(reputation) ? 10 : reputation,
      gameDateMs,
      lastTick: now,
    });
  },

  // selectors
  getStage: () => {
    const s = get();
    return computeStage(s.reputation, s.totalRevenue);
  },
}));
