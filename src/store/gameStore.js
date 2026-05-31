import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  competitors: createInitialCompetitors(),
  activeCrisis: null,
  lastCrisisAt: Date.now(),
  lastTick: Date.now(),
  schemaVersion: SCHEMA_VERSION,
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
      set({
        ...parsed,
        purchasedUpgrades: parsed.purchasedUpgrades || {},
        competitors: parsed.competitors || createInitialCompetitors(),
        activeCrisis: parsed.activeCrisis || null,
        lastCrisisAt: parsed.lastCrisisAt || Date.now(),
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
        onboardingComplete: state.onboardingComplete,
        liveProducts: state.liveProducts,
        currentDraft: state.currentDraft,
        unlockedResearch: state.unlockedResearch,
        activeResearch: state.activeResearch,
        eventLog: state.eventLog,
        activeEvents: state.activeEvents,
        competitors: state.competitors,
        activeCrisis: state.activeCrisis,
        lastCrisisAt: state.lastCrisisAt,
        purchasedUpgrades: state.purchasedUpgrades,
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

  setCompanyName: (name) => {
    set({ companyName: name });
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
    set({ currentDraft: draft });
    get().persist();
  },

  cancelDraft: () => {
    set({ currentDraft: null });
    get().persist();
  },

  purchaseData: (tierId) => {
    const state = get();
    const draft = state.currentDraft;
    if (!draft) return { ok: false, error: "Tidak ada draft aktif." };
    const productType = PRODUCT_TYPES[draft.typeId];
    const tier = DATA_QUALITY_TIERS[tierId];
    if (!productType || !tier)
      return { ok: false, error: "Pilihan tidak valid." };
    const cost = Math.round(productType.baseDataCost * tier.costMultiplier);
    if (state.cash < cost) {
      return { ok: false, error: "Cash tidak cukup untuk membeli data." };
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
      return { ok: false, error: "Tidak dalam tahap training." };
    }
    const productType = PRODUCT_TYPES[draft.typeId];
    const tier = DATA_QUALITY_TIERS[draft.dataTierId];
    if (!productType || !tier)
      return { ok: false, error: "State draft tidak valid." };

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
      return { ok: false, error: "Compute tidak cukup. Upgrade kapasitas." };
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
      return { ok: false, error: "Produk belum siap launch." };
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
    const baseChurn = 0.015 + draft.hallucinationRisk * 0.04; // fraction of users lost per real-world minute
    const churnRate = Math.max(0.001, baseChurn - fx.churnReduction);
    const live = {
      id: draft.id,
      typeId: draft.typeId,
      name: productType.name,
      launchedAt: Date.now(),
      qualityScore: draft.qualityScore,
      hallucinationRisk: draft.hallucinationRisk,
      biasRisk: draft.biasRisk,
      users: initialUsers,
      // revenuePerTick = $/second. Formula: users × $/user/min ÷ 60
      revenuePerTick: (initialUsers * productType.baseRevenuePerUser) / 60,
      totalRevenue: 0,
      churnRate, // fraction of users lost per real-world minute
      // revenue window — product stops earning after this timestamp
      revenueLifespanSec: productType.revenueLifespanSec,
      revenueExpiresAt: Date.now() + productType.revenueLifespanSec * 1000,
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
      eventLog: [
        {
          id: generateId(),
          timestamp: Date.now(),
          type: "launch",
          message: `Produk "${productType.name}" diluncurkan dengan ${initialUsers} pengguna awal.`,
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
    if (state.cash < cost) return { ok: false, error: "Cash tidak cukup." };
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
    if (state.cash < cost) return { ok: false, error: "Cash tidak cukup." };
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
          message: "Boost compute +10 diterima dari ad reward.",
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
    if (!crisis) return { ok: false, error: "Tidak ada crisis aktif." };
    const choice = crisis.choices.find((c) => c.id === choiceId);
    if (!choice) return { ok: false, error: "Pilihan crisis tidak valid." };
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
          title: `${crisis.title} — ${choice.label}`,
          message: choice.result,
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
    if (!node) return { ok: false, error: "Node riset tidak valid." };
    if (state.activeResearch)
      return { ok: false, error: "Sudah ada riset berjalan." };
    if (state.unlockedResearch.includes(nodeId)) {
      return { ok: false, error: "Riset sudah selesai." };
    }
    for (const dep of node.requires) {
      if (!state.unlockedResearch.includes(dep)) {
        return { ok: false, error: "Prasyarat belum terpenuhi." };
      }
    }
    if (state.cash < node.cost)
      return { ok: false, error: "Cash tidak cukup." };
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
    if (!def) return { ok: false, error: "Upgrade tidak valid." };
    const currentLevel = state.purchasedUpgrades[upgradeId] || 0;
    if (currentLevel >= def.maxLevel)
      return { ok: false, error: "Sudah level maksimal." };
    const nextTier = def.tiers[currentLevel];
    if (!nextTier) return { ok: false, error: "Tier tidak ditemukan." };
    if (state.cash < nextTier.cost)
      return { ok: false, error: "Cash tidak cukup." };
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
          title: "Rekrutmen Berhasil",
          message: `${nextTier.label} berhasil bergabung ke tim.`,
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
    if (deltaSec < 1) return;

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

        // Only earn if the product's revenue window is still open
        const revenueActive = !p.revenueExpiresAt || now < p.revenueExpiresAt;
        const earned = revenueActive ? safeRpt * deltaSec * revenueMult : 0;

        // churnRate = fraction of users lost per real-world minute
        const churn = safeUsers * p.churnRate * (deltaSec / 60);
        const newUsers = Math.max(0, Math.round(safeUsers - churn));

        // Accumulate using original earned (before revenuePerTick is updated)
        cashFromProducts += earned;
        revenueFromProducts += earned;

        return {
          ...p,
          users: newUsers,
          totalRevenue: (isNaN(p.totalRevenue) ? 0 : p.totalRevenue) + earned,
          // Scale revenuePerTick proportionally with user drop — NOT × deltaSec
          revenuePerTick:
            safeUsers > 0 ? safeRpt * (newUsers / safeUsers) : safeRpt,
        };
      })
      // Keep expired products visible as history; only remove if users fully drained
      .filter((p) => {
        const expired = p.revenueExpiresAt && now >= p.revenueExpiresAt;
        return expired ? true : p.users > 5;
      });

    for (const p of liveProducts) {
      totalUsers += p.users;
    }

    cash += cashFromProducts;
    totalRevenue += revenueFromProducts;

    // ── Competitors: passive growth + occasional launches ─────────────────
    competitors = competitors.map((c) => {
      const launchRoll = Math.random() < (c.launchChance * c.momentum * deltaSec) / 240;
      const launchUsers = launchRoll ? Math.round(c.baseUsers * (0.6 + Math.random())) : 0;
      const growth = safeNumber(c.users, 0) * 0.012 * c.momentum * (deltaSec / 60);
      const users = Math.max(0, Math.round(safeNumber(c.users, 0) + growth + launchUsers));
      const earned = users * c.revenueRate * (deltaSec / 60);
      if (launchRoll) {
        eventLog = [
          {
            id: generateId(),
            timestamp: now,
            type: "competitor",
            title: `${c.name} launch produk baru`,
            message: `${c.name} menambah ${launchUsers} users. Market share makin ketat.`,
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
            title: `Crisis: ${pick.title}`,
            message: pick.description,
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
          title: "Riset Selesai",
          message: `Riset "${RESEARCH_NODES[activeResearch.nodeId]?.name}" selesai.`,
          tone: "positive",
        },
        ...eventLog,
      ].slice(0, 50);
      activeResearch = null;
    }

    // ── Random market event (~1 per 3 minutes) ────────────────────────────
    if (Math.random() < deltaSec / 180) {
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
          title: chosen.title,
          message: chosen.description,
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

    // Single set — no early returns that skip product/revenue updates
    set({
      cash: Math.max(0, isNaN(cash) ? 0 : cash),
      totalRevenue: isNaN(totalRevenue) ? 0 : Math.max(0, totalRevenue),
      totalUsers,
      liveProducts,
      activeResearch,
      unlockedResearch,
      activeEvents,
      competitors,
      activeCrisis,
      lastCrisisAt,
      eventLog,
      reputation: isNaN(reputation) ? 10 : reputation,
      lastTick: now,
    });
  },

  // selectors
  getStage: () => {
    const s = get();
    return computeStage(s.reputation, s.totalRevenue);
  },
}));
