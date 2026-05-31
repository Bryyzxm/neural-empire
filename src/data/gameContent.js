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

export const SCHEMA_VERSION = 6;

export const PRODUCT_TYPES = {
  basic_chatbot: {
    id: "basic_chatbot",
    name: "Basic Chatbot",
    category: "NLP",
    description: "Asisten teks sederhana untuk pertanyaan umum.",
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
    name: "Smart Assistant",
    category: "NLP",
    description: "Asisten kontekstual dengan memori percakapan.",
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
    name: "Image Classifier",
    category: "Vision",
    description: "Klasifikasi gambar untuk kategori produk.",
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
    name: "Image Generator",
    category: "Generative",
    description: "Generator gambar dari prompt teks.",
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
    name: "Code Assistant",
    category: "NLP",
    description: "Autocomplete dan code review untuk developer.",
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
    name: "Scraped Web Data",
    costMultiplier: 0.5,
    qualityScore: 0.30,
    biasRisk: 0.75,
    hallucinationRisk: 0.65,
    description: "Murah tapi berisiko. Kualitas rendah, halusinasi tinggi.",
  },
  curated: {
    id: "curated",
    name: "Curated Dataset",
    costMultiplier: 1.0,
    qualityScore: 0.7,
    biasRisk: 0.3,
    hallucinationRisk: 0.3,
    description: "Seimbang antara biaya dan kualitas.",
  },
  premium: {
    id: "premium",
    name: "Premium Licensed",
    costMultiplier: 2.0, // was 2.5 — more tempting choice
    qualityScore: 0.95,
    biasRisk: 0.1,
    hallucinationRisk: 0.15,
    description: "Mahal, kualitas tinggi, risiko minimal.",
  },
};

export const RESEARCH_NODES = {
  research_nlp_1: {
    id: "research_nlp_1",
    name: "Advanced NLP",
    description: "Membuka Smart Assistant.",
    cost: 1200, // was 1500 — first research more accessible
    duration: 60,
    requires: [],
    unlocks: ["smart_assistant"],
  },
  research_nlp_2: {
    id: "research_nlp_2",
    name: "Code Understanding",
    description: "Membuka Code Assistant.",
    cost: 3500,
    duration: 90, // was 120 — tighter mid-game pacing
    requires: ["research_nlp_1"],
    unlocks: ["code_assistant"],
  },
  research_vision_1: {
    id: "research_vision_1",
    name: "Computer Vision",
    description: "Membuka Image Classifier.",
    cost: 2000,
    duration: 60, // was 90 — same tier as nlp_1, same duration
    requires: [],
    unlocks: ["image_classifier"],
  },
  research_gen_1: {
    id: "research_gen_1",
    name: "Generative Models",
    description: "Membuka Image Generator.",
    cost: 6000,
    duration: 120, // was 180 — endgame still meaningful but not blocking
    requires: ["research_vision_1"],
    unlocks: ["image_generator"],
  },
};

export const MARKET_EVENTS = [
  {
    id: "viral_post",
    title: "Produk Viral",
    description: "Salah satu produk Anda viral di media sosial!",
    weight: 10,
    effect: { revenueMultiplier: 1.5, reputationDelta: 5, duration: 30 },
    tone: "positive",
  },
  {
    id: "data_leak",
    title: "Insiden Data Leak",
    description: "Kebocoran data minor terjadi. Reputasi turun.",
    weight: 8,
    effect: { reputationDelta: -8, cashDelta: -250 }, // was -500 — survivable early game
    tone: "negative",
  },
  {
    id: "compute_outage",
    title: "Compute Outage",
    description:
      "Provider cloud mengalami downtime. Revenue terhenti sementara.",
    weight: 5,
    effect: { revenueMultiplier: 0.5, duration: 20 },
    tone: "negative",
  },
  {
    id: "investor_interest",
    title: "Investor Tertarik",
    description: "Seorang VC menawarkan grant kecil.",
    weight: 6,
    effect: { cashDelta: 2500, reputationDelta: 4 }, // was 2000 — slightly more impactful
    tone: "positive",
  },
  {
    id: "competitor_launch",
    title: "Kompetitor Meluncurkan Produk",
    description:
      "Sebuah kompetitor merilis produk serupa. Tekanan pasar meningkat.",
    weight: 7,
    effect: { revenueMultiplier: 0.8, duration: 40 },
    tone: "neutral",
  },
  {
    id: "regulation_update",
    title: "Regulasi AI Baru",
    description: "Pemerintah memperketat regulasi AI. Compliance cost naik.",
    weight: 4,
    effect: { cashDelta: -350, reputationDelta: 2 }, // was -800 — less brutal
    tone: "neutral",
  },
  {
    id: "press_coverage",
    title: "Liputan Media Positif",
    description: "Jurnalis tech meliput produk AI Anda secara positif.",
    weight: 7,
    effect: { reputationDelta: 8, revenueMultiplier: 1.2, duration: 25 },
    tone: "positive",
  },
  {
    id: "talent_acquisition",
    title: "Talent War",
    description:
      "Perusahaan besar merekrut beberapa engineer Anda. Output melambat.",
    weight: 4,
    effect: { cashDelta: -150, revenueMultiplier: 0.9, duration: 20 },
    tone: "negative",
  },
];

export const COMPANY_STAGES = [
  { id: "garage", name: "Garage Startup", minReputation: 0, minRevenue: 0 },
  { id: "seed", name: "Seed Stage", minReputation: 20, minRevenue: 1000 },
  { id: "series_a", name: "Series A", minReputation: 50, minRevenue: 10000 },
  { id: "scaleup", name: "Scale-up", minReputation: 100, minRevenue: 50000 },
  { id: "empire", name: "AI Empire", minReputation: 200, minRevenue: 150000 }, // was 250000
];

export const COMPETITORS = [
  {
    id: "omni_mind",
    name: "OmniMind Labs",
    strategy: "Growth agresif",
    color: "#7C3AED",
    launchChance: 0.42,
    baseUsers: 420,
    revenueRate: 0.18,
  },
  {
    id: "safe_synth",
    name: "SafeSynth AI",
    strategy: "Safety-first",
    color: "#059669",
    launchChance: 0.30,
    baseUsers: 280,
    revenueRate: 0.14,
  },
  {
    id: "cheap_gpt",
    name: "CheapGPT",
    strategy: "Harga murah",
    color: "#D97706",
    launchChance: 0.36,
    baseUsers: 360,
    revenueRate: 0.10,
  },
];

export const CRISIS_EVENTS = [
  {
    id: "hallucination_scandal",
    title: "Skandal Halusinasi",
    description:
      "Model kamu memberi jawaban ngawur ke pelanggan enterprise. Media mulai mencium kasus ini.",
    choices: [
      {
        id: "apologize",
        label: "Minta maaf publik",
        effect: { reputationDelta: -4, cashDelta: -250 },
        result: "Kamu transparan. Biaya PR naik, tapi krisis terkendali.",
      },
      {
        id: "patch",
        label: "Hotfix model",
        effect: { cashDelta: -500, computeDelta: -2, reputationDelta: 3 },
        result: "Tim ship hotfix cepat. Trust naik, resource terkuras.",
      },
      {
        id: "deny",
        label: "Bantah keras",
        effect: { reputationDelta: -12, competitorBoost: 0.08 },
        result: "Publik tidak percaya. Kompetitor manfaatkan momentum.",
      },
    ],
  },
  {
    id: "gpu_shortage",
    title: "GPU Shortage",
    description:
      "Harga GPU melonjak. Training produk baru jadi lebih mahal beberapa waktu ke depan.",
    choices: [
      {
        id: "rent",
        label: "Sewa GPU mahal",
        effect: { cashDelta: -650, computeDelta: 6 },
        result: "Compute aman, cash terbakar.",
      },
      {
        id: "optimize",
        label: "Optimasi infra",
        effect: { cashDelta: -300, reputationDelta: 2 },
        result: "Tim infra menemukan efisiensi. Investor suka disiplin burn-rate.",
      },
      {
        id: "wait",
        label: "Tunggu pasar stabil",
        effect: { reputationDelta: -3, competitorBoost: 0.05 },
        result: "Kamu hemat cash, tapi kompetitor bergerak duluan.",
      },
    ],
  },
  {
    id: "regulator_audit",
    title: "Audit Regulator AI",
    description:
      "Regulator meminta bukti mitigasi bias dan keamanan model sebelum produk makin besar.",
    choices: [
      {
        id: "comply",
        label: "Full compliance",
        effect: { cashDelta: -700, reputationDelta: 8 },
        result: "Mahal, tapi brand kamu dianggap paling aman.",
      },
      {
        id: "minimal",
        label: "Dokumen minimal",
        effect: { cashDelta: -250, reputationDelta: -2 },
        result: "Lolos sementara, tapi trust turun tipis.",
      },
      {
        id: "lobby",
        label: "Lobby asosiasi",
        effect: { cashDelta: -450, reputationDelta: 3, competitorBoost: -0.03 },
        result: "Aturan melunak. Semua pemain tertahan sedikit.",
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
    name: "ML Engineer",
    category: "engineering",
    description:
      "Kurangi compute per epoch training. Tingkatkan kualitas model.",
    icon: "Code2",
    maxLevel: 3,
    tiers: [
      {
        level: 1,
        label: "Junior ML Engineer",
        cost: 1200,
        effect: { computeEfficiency: 0.12 },
      },
      {
        level: 2,
        label: "Senior ML Engineer",
        cost: 3500,
        effect: { computeEfficiency: 0.12, qualityBonus: 0.05 },
      },
      {
        level: 3,
        label: "Principal ML Engineer",
        cost: 6500,
        effect: { computeEfficiency: 0.08, qualityBonus: 0.05 },
      }, // was 8000
    ],
  },
  data_engineer: {
    id: "data_engineer",
    name: "Data Engineer",
    category: "engineering",
    description:
      "Pipeline data lebih efisien. Meningkatkan bonus kualitas data dari semua tier.",
    icon: "Database",
    maxLevel: 3,
    tiers: [
      {
        level: 1,
        label: "Data Engineer",
        cost: 1000,
        effect: { dataQualityBonus: 0.05 },
      },
      {
        level: 2,
        label: "Senior Data Engineer",
        cost: 2800,
        effect: { dataQualityBonus: 0.06, biasReduction: 0.05 },
      },
      {
        level: 3,
        label: "Data Architect",
        cost: 6000,
        effect: { dataQualityBonus: 0.07, biasReduction: 0.05 },
      },
    ],
  },

  // ── Data Science ──
  data_scientist: {
    id: "data_scientist",
    name: "Data Scientist",
    category: "data",
    description:
      "Analisis dataset mendalam. Turunkan risiko bias dan halusinasi model.",
    icon: "BarChart2",
    maxLevel: 3,
    tiers: [
      {
        level: 1,
        label: "Data Analyst",
        cost: 900,
        effect: { biasReduction: 0.08, hallucinationReduction: 0.05 },
      },
      {
        level: 2,
        label: "Data Scientist",
        cost: 2500,
        effect: { biasReduction: 0.08, hallucinationReduction: 0.08 },
      },
      {
        level: 3,
        label: "Lead Data Scientist",
        cost: 5500,
        effect: {
          biasReduction: 0.07,
          hallucinationReduction: 0.07,
          qualityBonus: 0.04,
        },
      },
    ],
  },

  // ── Marketing ──
  growth_marketer: {
    id: "growth_marketer",
    name: "Growth Marketer",
    category: "marketing",
    description:
      "Lebih banyak pengguna awal saat launch. Tingkatkan revenue per user.",
    icon: "TrendingUp",
    maxLevel: 3,
    tiers: [
      {
        level: 1,
        label: "Growth Hacker",
        cost: 800,
        effect: { userMultiplier: 0.2, churnReduction: 0.004 },
      },
      {
        level: 2,
        label: "Marketing Manager",
        cost: 2400,
        effect: {
          userMultiplier: 0.25,
          churnReduction: 0.005,
          revenueMultiplier: 0.08,
        },
      },
      {
        level: 3,
        label: "CMO",
        cost: 5800,
        effect: {
          userMultiplier: 0.25,
          churnReduction: 0.006,
          revenueMultiplier: 0.12,
        },
      },
    ],
  },
  pr_manager: {
    id: "pr_manager",
    name: "PR Manager",
    category: "marketing",
    description:
      "Bangun reputasi perusahaan secara pasif. Pengaruhi persepsi publik.",
    icon: "Megaphone",
    maxLevel: 3,
    tiers: [
      {
        level: 1,
        label: "PR Specialist",
        cost: 1100,
        effect: { reputationTickBonus: 0.4 },
      },
      {
        level: 2,
        label: "PR Manager",
        cost: 3000,
        effect: { reputationTickBonus: 0.5, revenueMultiplier: 0.03 },
      },
      {
        level: 3,
        label: "Head of Brand",
        cost: 5500,
        effect: { reputationTickBonus: 0.6, revenueMultiplier: 0.05 },
      }, // was 7000
    ],
  },

  // ── Ethics & Safety ──
  safety_researcher: {
    id: "safety_researcher",
    name: "AI Safety Researcher",
    category: "ethics",
    description:
      "Audit model sebelum launch. Kurangi risiko halusinasi dan bias secara signifikan.",
    icon: "ShieldCheck",
    maxLevel: 3,
    tiers: [
      {
        level: 1,
        label: "Safety Researcher",
        cost: 1300,
        effect: { hallucinationReduction: 0.1, biasReduction: 0.06 },
      },
      {
        level: 2,
        label: "AI Ethics Specialist",
        cost: 3800,
        effect: { hallucinationReduction: 0.1, biasReduction: 0.08 },
      },
      {
        level: 3,
        label: "Chief Ethics Officer",
        cost: 6500,
        effect: {
          hallucinationReduction: 0.1,
          biasReduction: 0.08,
          reputationTickBonus: 0.5,
        },
      }, // was 9000
    ],
  },

  // ── Infrastructure ──
  devops_engineer: {
    id: "devops_engineer",
    name: "DevOps Engineer",
    category: "infrastructure",
    description:
      "Kurangi biaya refill compute. Tambah kapasitas server langsung.",
    icon: "Server",
    maxLevel: 3,
    tiers: [
      {
        level: 1,
        label: "DevOps Engineer",
        cost: 1500,
        effect: { refillCostReduction: 0.15, computeCapacityBonus: 10 },
      },
      {
        level: 2,
        label: "Cloud Architect",
        cost: 4000,
        effect: { refillCostReduction: 0.15, computeCapacityBonus: 15 },
      },
      {
        level: 3,
        label: "VP Engineering",
        cost: 7500,
        effect: { refillCostReduction: 0.2, computeCapacityBonus: 20 },
      }, // was 10000
    ],
  },
};

export const STAFF_CATEGORIES = [
  { id: "engineering", label: "Engineering", icon: "Code2" },
  { id: "data", label: "Data", icon: "BarChart2" },
  { id: "marketing", label: "Marketing", icon: "TrendingUp" },
  { id: "ethics", label: "Etika", icon: "ShieldCheck" },
  { id: "infrastructure", label: "Infra", icon: "Server" },
];
