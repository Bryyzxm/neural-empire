// ─── AI Concept Tooltip Definitions ──────────────────────────────────────────
// Shown in-context the first time a player encounters the term.
// Design goal: educational tapi tidak terasa seperti pelajaran.
//
// i18n: term / definition / analogy are translation KEYS, not literal strings.
//   TooltipWord component resolves them via t() with the player's language.

export const TOOLTIP_CATEGORIES = {
  training: { label: "tooltip_category.training", color: "#2563EB", bg: "#EFF6FF" },
  safety: { label: "tooltip_category.safety", color: "#B91C1C", bg: "#FEF2F2" },
  business: { label: "tooltip_category.business", color: "#EA580C", bg: "#FFF7ED" },
  data: { label: "tooltip_category.data", color: "#7C3AED", bg: "#F5F3FF" },
  field: { label: "tooltip_category.field", color: "#0369A1", bg: "#F0F9FF" },
};

export const TOOLTIPS = {
  // ── Training concepts ──────────────────────────────────────────────────────
  epoch: {
    id: "epoch",
    term: "tooltip.epoch.term",
    category: "training",
    icon: "RefreshCw",
    definition: "tooltip.epoch.definition",
    analogy: "tooltip.epoch.analogy",
    relatedTerms: ["training", "model_quality"],
  },
  training: {
    id: "training",
    term: "tooltip.training.term",
    category: "training",
    icon: "Cpu",
    definition: "tooltip.training.definition",
    analogy: "tooltip.training.analogy",
    relatedTerms: ["epoch", "compute"],
  },
  model_quality: {
    id: "model_quality",
    term: "tooltip.model_quality.term",
    category: "training",
    icon: "Star",
    definition: "tooltip.model_quality.definition",
    analogy: "tooltip.model_quality.analogy",
    relatedTerms: ["epoch", "training", "hallucination"],
  },

  // ── Safety concepts ────────────────────────────────────────────────────────
  hallucination: {
    id: "hallucination",
    term: "tooltip.hallucination.term",
    category: "safety",
    icon: "AlertTriangle",
    definition: "tooltip.hallucination.definition",
    analogy: "tooltip.hallucination.analogy",
    relatedTerms: ["bias", "model_quality", "training"],
  },
  bias: {
    id: "bias",
    term: "tooltip.bias.term",
    category: "safety",
    icon: "Scale",
    definition: "tooltip.bias.definition",
    analogy: "tooltip.bias.analogy",
    relatedTerms: ["hallucination", "data_pipeline"],
  },

  // ── Data concepts ──────────────────────────────────────────────────────────
  data_pipeline: {
    id: "data_pipeline",
    term: "tooltip.data_pipeline.term",
    category: "data",
    icon: "Database",
    definition: "tooltip.data_pipeline.definition",
    analogy: "tooltip.data_pipeline.analogy",
    relatedTerms: ["bias", "training"],
  },
  compute: {
    id: "compute",
    term: "tooltip.compute.term",
    category: "data",
    icon: "Server",
    definition: "tooltip.compute.definition",
    analogy: "tooltip.compute.analogy",
    relatedTerms: ["training", "epoch"],
  },

  // ── Business concepts ──────────────────────────────────────────────────────
  churn: {
    id: "churn",
    term: "tooltip.churn.term",
    category: "business",
    icon: "UserMinus",
    definition: "tooltip.churn.definition",
    analogy: "tooltip.churn.analogy",
    relatedTerms: ["model_quality", "hallucination"],
  },
  launch_score: {
    id: "launch_score",
    term: "tooltip.launch_score.term",
    category: "business",
    icon: "Rocket",
    definition: "tooltip.launch_score.definition",
    analogy: "tooltip.launch_score.analogy",
    relatedTerms: ["model_quality", "hallucination", "bias"],
  },

  // ── Field / domain concepts ────────────────────────────────────────────────
  nlp: {
    id: "nlp",
    term: "tooltip.nlp.term",
    category: "field",
    icon: "MessageCircle",
    definition: "tooltip.nlp.definition",
    analogy: "tooltip.nlp.analogy",
    relatedTerms: ["generative_ai"],
  },
  computer_vision: {
    id: "computer_vision",
    term: "tooltip.computer_vision.term",
    category: "field",
    icon: "Eye",
    definition: "tooltip.computer_vision.definition",
    analogy: "tooltip.computer_vision.analogy",
    relatedTerms: ["generative_ai"],
  },
  generative_ai: {
    id: "generative_ai",
    term: "tooltip.generative_ai.term",
    category: "field",
    icon: "Sparkles",
    definition: "tooltip.generative_ai.definition",
    analogy: "tooltip.generative_ai.analogy",
    relatedTerms: ["nlp", "computer_vision", "hallucination"],
  },
};
