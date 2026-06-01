// Static game content / balancing data
// Definitions for products, research nodes, events, etc.
//
// ── BALANCING CHANGELOG v6 ──────────────────────────────────────────────────
// v5 → v6 (2026-05-29 rebalance):
//   [BALANCE]  Starting cash 5000→1500, compute 8→5, capacity 16→10.
//   [BALANCE]  Basic chatbot: dataCost 150→300, computeCost 5→10,
//              epochs 3→4, revenue 0.40→0.25, lifespan 300→180s.
//   [BALANCE]  Scraped data: quality 0.40→0.30, hallucination 0.50→0.65,
//              bias 0.60→0.75. Early game forces strategic data choices.
//   [SCHEMA]   Bumped ke 6 — clears pre-rebalance saves.
// ────────────────────────────────────────────────────────────────────────────
// v4 → v5 (2026-05-25 feature pass):
//   [FEATURE]  RLHF training — runTrainingEpoch menerima rating
//              'approve'|'reject'|'skip' dengan efek berbeda pada kualitas.
//   [FEATURE]  Turing Test stage antara training dan eval.
//   [SCHEMA]   Bumped ke 5 — clears saves tanpa field turingScore.
// ────────────────────────────────────────────────────────────────────────────
//
// ── i18n: every user-facing string (name, description, etc.) is now a KEY
//   (e.g. "product.basic_chatbot.name") that resolves via t() at render time.
//   Internal identifiers (id, category, icon, costMultiplier) stay literal.

export const SCHEMA_VERSION = 6;

export const PRODUCT_TYPES = {
  basic_chatbot: {
    id: "basic_chatbot",
    name: "product.basic_chatbot_name",
    category: "product.basic_chatbot_category",
    description: "product.basic_chatbot_description",
    baseDataCost: 300,
    baseComputeCost: 10,
    minTrainingEpochs: 4,
    baseRevenuePerUser: 0.25,
    revenueLifespanSec: 180, // 3 menit — tight early game
    unlockRequirement: null,
    icon: "MessageCircle",
  },
  smart_assistant: {
    id: "smart_assistant",
    name: "product.smart_assistant_name",
    category: "product.smart_assistant_category",
    description: "product.smart_assistant_description",
    baseDataCost: 650,
    baseComputeCost: 15,
    minTrainingEpochs: 5,
    baseRevenuePerUser: 1.2,
    revenueLifespanSec: 480, // 8 menit
    unlockRequirement: "research_nlp_1",
    icon: "Bot",
  },
  image_classifier: {
    id: "image_classifier",
    name: "product.image_classifier_name",
    category: "product.image_classifier_category",
    description: "product.image_classifier_description",
    baseDataCost: 600,
    baseComputeCost: 12,
    minTrainingEpochs: 4,
    baseRevenuePerUser: 0.9,
    revenueLifespanSec: 420, // 7 menit
    unlockRequirement: "research_vision_1",
    icon: "Image",
  },
  image_generator: {
    id: "image_generator",
    name: "product.image_generator_name",
    category: "product.image_generator_category",
    description: "product.image_generator_description",
    baseDataCost: 2500,
    baseComputeCost: 32,
    minTrainingEpochs: 8,
    baseRevenuePerUser: 3.0,
    revenueLifespanSec: 600, // 10 menit — endgame worth the investment
    unlockRequirement: "research_gen_1",
    icon: "Sparkles",
  },
  code_assistant: {
    id: "code_assistant",
    name: "product.code_assistant_name",
    category: "product.code_assistant_category",
    description: "product.code_assistant_description",
    baseDataCost: 1500,
    baseComputeCost: 25,
    minTrainingEpochs: 6,
    baseRevenuePerUser: 2.0,
    revenueLifespanSec: 540, // 9 menit
    unlockRequirement: "research_nlp_2",
    icon: "Code",
  },
};

export const DATA_QUALITY_TIERS = {
  scraped: {
    id: "scraped",
    name: "data_tier.scraped_name",
    costMultiplier: 0.5,
    qualityScore: 0.30,
    biasRisk: 0.75,
    hallucinationRisk: 0.65,
    description: "data_tier.scraped_description",
  },
  curated: {
    id: "curated",
    name: "data_tier.curated_name",
    costMultiplier: 1.0,
    qualityScore: 0.7,
    biasRisk: 0.3,
    hallucinationRisk: 0.3,
    description: "data_tier.curated_description",
  },
  premium: {
    id: "premium",
    name: "data_tier.premium_name",
    costMultiplier: 2.0, // was 2.5 — more tempting choice
    qualityScore: 0.95,
    biasRisk: 0.1,
    hallucinationRisk: 0.15,
    description: "data_tier.premium_description",
  },
};

export const RESEARCH_NODES = {
  research_nlp_1: {
    id: "research_nlp_1",
    name: "research_node.nlp_1_name",
    description: "research_node.nlp_1_description",
    cost: 1200, // was 1500 — first research more accessible
    duration: 60,
    requires: [],
    unlocks: ["smart_assistant"],
  },
  research_nlp_2: {
    id: "research_nlp_2",
    name: "research_node.nlp_2_name",
    description: "research_node.nlp_2_description",
    cost: 3500,
    duration: 90, // was 120 — tighter mid-game pacing
    requires: ["research_nlp_1"],
    unlocks: ["code_assistant"],
  },
  research_vision_1: {
    id: "research_vision_1",
    name: "research_node.vision_1_name",
    description: "research_node.vision_1_description",
    cost: 2000,
    duration: 60, // was 90 — same tier as nlp_1, same duration
    requires: [],
    unlocks: ["image_classifier"],
  },
  research_gen_1: {
    id: "research_gen_1",
    name: "research_node.gen_1_name",
    description: "research_node.gen_1_description",
    cost: 6000,
    duration: 120, // was 180 — endgame still meaningful but not blocking
    requires: ["research_vision_1"],
    unlocks: ["image_generator"],
  },
};

export const MARKET_EVENTS = [
  {
    id: "viral_post",
    title: "market_event.viral_post_title",
    description: "market_event.viral_post_description",
    weight: 10,
    effect: { revenueMultiplier: 1.5, reputationDelta: 5, duration: 30 },
    tone: "positive",
  },
  {
    id: "data_leak",
    title: "market_event.data_leak_title",
    description: "market_event.data_leak_description",
    weight: 8,
    effect: { reputationDelta: -8, cashDelta: -250 }, // was -500 — survivable early game
    tone: "negative",
  },
  {
    id: "compute_outage",
    title: "market_event.compute_outage_title",
    description: "market_event.compute_outage_description",
    weight: 5,
    effect: { revenueMultiplier: 0.5, duration: 20 },
    tone: "negative",
  },
  {
    id: "investor_interest",
    title: "market_event.investor_interest_title",
    description: "market_event.investor_interest_description",
    weight: 6,
    effect: { cashDelta: 2500, reputationDelta: 4 }, // was 2000 — slightly more impactful
    tone: "positive",
  },
  {
    id: "competitor_launch",
    title: "market_event.competitor_launch_title",
    description: "market_event.competitor_launch_description",
    weight: 7,
    effect: { revenueMultiplier: 0.8, duration: 40 },
    tone: "neutral",
  },
  {
    id: "regulation_update",
    title: "market_event.regulation_update_title",
    description: "market_event.regulation_update_description",
    weight: 4,
    effect: { cashDelta: -350, reputationDelta: 2 }, // was -800 — less brutal
    tone: "neutral",
  },
  {
    id: "press_coverage",
    title: "market_event.press_coverage_title",
    description: "market_event.press_coverage_description",
    weight: 7,
    effect: { reputationDelta: 8, revenueMultiplier: 1.2, duration: 25 },
    tone: "positive",
  },
  {
    id: "talent_acquisition",
    title: "market_event.talent_acquisition_title",
    description: "market_event.talent_acquisition_description",
    weight: 4,
    effect: { cashDelta: -150, revenueMultiplier: 0.9, duration: 20 },
    tone: "negative",
  },
];

export const COMPANY_STAGES = [
  { id: "garage", name: "company_stage.garage", minReputation: 0, minRevenue: 0 },
  { id: "seed", name: "company_stage.seed", minReputation: 20, minRevenue: 1000 },
  { id: "series_a", name: "company_stage.series_a", minReputation: 50, minRevenue: 10000 },
  { id: "scaleup", name: "company_stage.scaleup", minReputation: 100, minRevenue: 50000 },
  { id: "empire", name: "company_stage.empire", minReputation: 200, minRevenue: 150000 }, // was 250000
];

export const COMPETITORS = [
  {
    id: "omni_mind",
    name: "competitor.omni_mind_name",
    strategy: "competitor.omni_mind_strategy",
    color: "#7C3AED",
    launchChance: 0.42,
    baseUsers: 420,
    revenueRate: 0.18,
  },
  {
    id: "safe_synth",
    name: "competitor.safe_synth_name",
    strategy: "competitor.safe_synth_strategy",
    color: "#059669",
    launchChance: 0.30,
    baseUsers: 280,
    revenueRate: 0.14,
  },
  {
    id: "cheap_gpt",
    name: "competitor.cheap_gpt_name",
    strategy: "competitor.cheap_gpt_strategy",
    color: "#D97706",
    launchChance: 0.36,
    baseUsers: 360,
    revenueRate: 0.10,
  },
];

export const CRISIS_EVENTS = [
  {
    id: "hallucination_scandal",
    title: "crisis.hallucination_scandal_title",
    description: "crisis.hallucination_scandal_description",
    choices: [
      {
        id: "apologize",
        label: "crisis.hallucination_scandal_choices.apologize",
        effect: { reputationDelta: -4, cashDelta: -250 },
        result: "crisis.hallucination_scandal_results.apologize",
      },
      {
        id: "patch",
        label: "crisis.hallucination_scandal_choices.patch",
        effect: { cashDelta: -500, computeDelta: -2, reputationDelta: 3 },
        result: "crisis.hallucination_scandal_results.patch",
      },
      {
        id: "deny",
        label: "crisis.hallucination_scandal_choices.deny",
        effect: { reputationDelta: -12, competitorBoost: 0.08 },
        result: "crisis.hallucination_scandal_results.deny",
      },
    ],
  },
  {
    id: "gpu_shortage",
    title: "crisis.gpu_shortage_title",
    description: "crisis.gpu_shortage_description",
    choices: [
      {
        id: "rent",
        label: "crisis.gpu_shortage_choices.rent",
        effect: { cashDelta: -650, computeDelta: 6 },
        result: "crisis.gpu_shortage_results.rent",
      },
      {
        id: "optimize",
        label: "crisis.gpu_shortage_choices.optimize",
        effect: { cashDelta: -300, reputationDelta: 2 },
        result: "crisis.gpu_shortage_results.optimize",
      },
      {
        id: "wait",
        label: "crisis.gpu_shortage_choices.wait",
        effect: { reputationDelta: -3, competitorBoost: 0.05 },
        result: "crisis.gpu_shortage_results.wait",
      },
    ],
  },
  {
    id: "regulator_audit",
    title: "crisis.regulator_audit_title",
    description: "crisis.regulator_audit_description",
    choices: [
      {
        id: "comply",
        label: "crisis.regulator_audit_choices.comply",
        effect: { cashDelta: -700, reputationDelta: 8 },
        result: "crisis.regulator_audit_results.comply",
      },
      {
        id: "minimal",
        label: "crisis.regulator_audit_choices.minimal",
        effect: { cashDelta: -250, reputationDelta: -2 },
        result: "crisis.regulator_audit_results.minimal",
      },
      {
        id: "lobby",
        label: "crisis.regulator_audit_choices.lobby",
        effect: { cashDelta: -450, reputationDelta: 3, competitorBoost: -0.03 },
        result: "crisis.regulator_audit_results.lobby",
      },
    ],
  },
];

export const createInitialCompetitors = () =>
  COMPETITORS.map((c, i) => ({
    ...c,
    users: c.baseUsers + i * 120,
    totalRevenue: 0,
    productsLaunched: 1,
    momentum: 1,
  }));

export const INITIAL_STATE = {
  cash: 1500,
  compute: 5,
  computeCapacity: 10,
  reputation: 10,
  totalRevenue: 0,
  totalUsers: 0,
  researchPoints: 0,
};

// ─── Staff / Operations Upgrades ──────────────────────────────────────────────

export const STAFF_UPGRADES = {
  // ── Engineering ──
  ml_engineer: {
    id: "ml_engineer",
    name: "upgrade.ml_engineer_name",
    description: "upgrade.ml_engineer_description",
    category: "engineering",
    icon: "Code2",
    maxLevel: 3,
    tiers: [
      { level: 1, label: "upgrade.ml_engineer_t1", cost: 1200, effect: { computeEfficiency: 0.12 } },
      { level: 2, label: "upgrade.ml_engineer_t2", cost: 3500, effect: { computeEfficiency: 0.12, qualityBonus: 0.05 } },
      { level: 3, label: "upgrade.ml_engineer_t3", cost: 6500, effect: { computeEfficiency: 0.08, qualityBonus: 0.05 } },
    ],
  },
  data_engineer: {
    id: "data_engineer",
    name: "upgrade.data_engineer_name",
    description: "upgrade.data_engineer_description",
    category: "engineering",
    icon: "Database",
    maxLevel: 3,
    tiers: [
      { level: 1, label: "upgrade.data_engineer_t1", cost: 1000, effect: { dataQualityBonus: 0.05 } },
      { level: 2, label: "upgrade.data_engineer_t2", cost: 2800, effect: { dataQualityBonus: 0.06, biasReduction: 0.05 } },
      { level: 3, label: "upgrade.data_engineer_t3", cost: 6000, effect: { dataQualityBonus: 0.07, biasReduction: 0.05 } },
    ],
  },

  // ── Data Science ──
  data_scientist: {
    id: "data_scientist",
    name: "upgrade.data_scientist_name",
    description: "upgrade.data_scientist_description",
    category: "data",
    icon: "BarChart2",
    maxLevel: 3,
    tiers: [
      { level: 1, label: "upgrade.data_scientist_t1", cost: 900, effect: { biasReduction: 0.08, hallucinationReduction: 0.05 } },
      { level: 2, label: "upgrade.data_scientist_t2", cost: 2500, effect: { biasReduction: 0.08, hallucinationReduction: 0.08 } },
      { level: 3, label: "upgrade.data_scientist_t3", cost: 5500, effect: { biasReduction: 0.07, hallucinationReduction: 0.07, qualityBonus: 0.04 } },
    ],
  },

  // ── Marketing ──
  growth_marketer: {
    id: "growth_marketer",
    name: "upgrade.growth_marketer_name",
    description: "upgrade.growth_marketer_description",
    category: "marketing",
    icon: "TrendingUp",
    maxLevel: 3,
    tiers: [
      { level: 1, label: "upgrade.growth_marketer_t1", cost: 800, effect: { userMultiplier: 0.2, churnReduction: 0.004 } },
      { level: 2, label: "upgrade.growth_marketer_t2", cost: 2400, effect: { userMultiplier: 0.25, churnReduction: 0.005, revenueMultiplier: 0.08 } },
      { level: 3, label: "upgrade.growth_marketer_t3", cost: 5800, effect: { userMultiplier: 0.25, churnReduction: 0.006, revenueMultiplier: 0.12 } },
    ],
  },
  pr_manager: {
    id: "pr_manager",
    name: "upgrade.pr_manager_name",
    description: "upgrade.pr_manager_description",
    category: "marketing",
    icon: "Megaphone",
    maxLevel: 3,
    tiers: [
      { level: 1, label: "upgrade.pr_manager_t1", cost: 1100, effect: { reputationTickBonus: 0.4 } },
      { level: 2, label: "upgrade.pr_manager_t2", cost: 3000, effect: { reputationTickBonus: 0.5, revenueMultiplier: 0.03 } },
      { level: 3, label: "upgrade.pr_manager_t3", cost: 5500, effect: { reputationTickBonus: 0.6, revenueMultiplier: 0.05 } },
    ],
  },

  // ── Ethics & Safety ──
  safety_researcher: {
    id: "safety_researcher",
    name: "upgrade.safety_researcher_name",
    description: "upgrade.safety_researcher_description",
    category: "ethics",
    icon: "ShieldCheck",
    maxLevel: 3,
    tiers: [
      { level: 1, label: "upgrade.safety_researcher_t1", cost: 1300, effect: { hallucinationReduction: 0.1, biasReduction: 0.06 } },
      { level: 2, label: "upgrade.safety_researcher_t2", cost: 3800, effect: { hallucinationReduction: 0.1, biasReduction: 0.08 } },
      { level: 3, label: "upgrade.safety_researcher_t3", cost: 6500, effect: { hallucinationReduction: 0.1, biasReduction: 0.08, reputationTickBonus: 0.5 } },
    ],
  },

  // ── Infrastructure ──
  devops_engineer: {
    id: "devops_engineer",
    name: "upgrade.devops_engineer_name",
    description: "upgrade.devops_engineer_description",
    category: "infrastructure",
    icon: "Server",
    maxLevel: 3,
    tiers: [
      { level: 1, label: "upgrade.devops_engineer_t1", cost: 1500, effect: { refillCostReduction: 0.15, computeCapacityBonus: 10 } },
      { level: 2, label: "upgrade.devops_engineer_t2", cost: 4000, effect: { refillCostReduction: 0.15, computeCapacityBonus: 15 } },
      { level: 3, label: "upgrade.devops_engineer_t3", cost: 7500, effect: { refillCostReduction: 0.2, computeCapacityBonus: 20 } },
    ],
  },
};

export const STAFF_CATEGORIES = [
  { id: "engineering", label: "staff_category.engineering", icon: "Code2" },
  { id: "data", label: "staff_category.data", icon: "BarChart2" },
  { id: "marketing", label: "staff_category.marketing", icon: "TrendingUp" },
  { id: "ethics", label: "staff_category.ethics", icon: "ShieldCheck" },
  { id: "infrastructure", label: "staff_category.infrastructure", icon: "Server" },
];
