// ─── RLHF Training Scenarios & Turing Test Data ─────────────────────────────
// Digunakan di fase Training (RLHF) dan Turing Test.
// Semua konten dalam Bahasa Indonesia untuk immersion maksimal.

// Maps product type → scenario category
export const PRODUCT_SCENARIO_CATEGORY = {
  basic_chatbot: "nlp",
  smart_assistant: "nlp",
  code_assistant: "code",
  image_classifier: "vision",
  image_generator: "generative",
};

// ── RLHF Training Scenarios ──────────────────────────────────────────────────
// Tiap skenario punya:
//   prompt      : pertanyaan/instruksi yang dikirim user
//   goodResponse: jawaban model yang baik
//   badResponse : jawaban bermasalah (halusinasi/salah/ignore instruksi)
//   why_bad     : penjelasan singkat kenapa respons buruk
//   type        : jenis masalah ('hallucination' | 'reasoning' | 'instruction' | 'bias')

export const RLHF_SCENARIOS = {
  nlp: [
    {
      id: "nlp_1",
      prompt: "rlhf.nlp.1.prompt",
      goodResponse: "rlhf.nlp.1.good_response",

      badResponse: "rlhf.nlp.1.bad_response",

      why_bad: "rlhf.nlp.1.why_bad",

      type: "hallucination",
    },
    {
      id: "nlp_2",
      prompt: "rlhf.nlp.2.prompt",

      goodResponse: "rlhf.nlp.2.good_response",

      badResponse: "rlhf.nlp.2.bad_response",

      why_bad: "rlhf.nlp.2.why_bad",

      type: "reasoning",
    },
    {
      id: "nlp_3",
      prompt: "rlhf.nlp.3.prompt",
      goodResponse: "rlhf.nlp.3.good_response",

      badResponse: "rlhf.nlp.3.bad_response",

      why_bad: "rlhf.nlp.3.why_bad",

      type: "instruction",
    },
    {
      id: "nlp_4",
      prompt: "rlhf.nlp.4.prompt",

      goodResponse: "rlhf.nlp.4.good_response",

      badResponse: "rlhf.nlp.4.bad_response",

      why_bad: "rlhf.nlp.4.why_bad",

      type: "bias",
    },
    {
      id: "nlp_5",
      prompt: "rlhf.nlp.5.prompt",

      goodResponse: "rlhf.nlp.5.good_response",

      badResponse: "rlhf.nlp.5.bad_response",

      why_bad: "rlhf.nlp.5.why_bad",

      type: "instruction",
    },
    {
      id: "nlp_6",
      prompt: "rlhf.nlp.6.prompt",
      goodResponse: "rlhf.nlp.6.good_response",

      badResponse: "rlhf.nlp.6.bad_response",

      why_bad: "rlhf.nlp.6.why_bad",

      type: "hallucination",
    },
    {
      id: "nlp_7",
      prompt: "rlhf.nlp.7.prompt",
      goodResponse: "rlhf.nlp.7.good_response",

      badResponse: "rlhf.nlp.7.bad_response",

      why_bad: "rlhf.nlp.7.why_bad",

      type: "hallucination",
    },
    {
      id: "nlp_8",
      prompt: "rlhf.nlp.8.prompt",
      goodResponse: "rlhf.nlp.8.good_response",

      badResponse: "rlhf.nlp.8.bad_response",

      why_bad: "rlhf.nlp.8.why_bad",

      type: "bias",
    },
    {
      id: "nlp_9",
      prompt: "rlhf.nlp.9.prompt",
      goodResponse: "rlhf.nlp.9.good_response",

      badResponse: "rlhf.nlp.9.bad_response",

      why_bad: "rlhf.nlp.9.why_bad",

      type: "hallucination",
    },
    {
      id: "nlp_10",
      prompt: "rlhf.nlp.10.prompt",
      goodResponse: "rlhf.nlp.10.good_response",

      badResponse: "rlhf.nlp.10.bad_response",

      why_bad: "rlhf.nlp.10.why_bad",

      type: "instruction",
    },
  ],

  code: [
    {
      id: "code_1",
      prompt: "rlhf.code.1.prompt",

      goodResponse: "rlhf.code.1.good_response",

      badResponse: "rlhf.code.1.bad_response",

      why_bad: "rlhf.code.1.why_bad",

      type: "instruction",
    },
    {
      id: "code_2",
      prompt: "rlhf.code.2.prompt",
      goodResponse: "rlhf.code.2.good_response",

      badResponse: "rlhf.code.2.bad_response",

      why_bad: "rlhf.code.2.why_bad",

      type: "hallucination",
    },
    {
      id: "code_3",
      prompt: "rlhf.code.3.prompt",
      goodResponse: "rlhf.code.3.good_response",

      badResponse: "rlhf.code.3.bad_response",

      why_bad: "rlhf.code.3.why_bad",

      type: "bias",
    },
    {
      id: "code_4",
      prompt: "rlhf.code.4.prompt",

      goodResponse: "rlhf.code.4.good_response",

      badResponse: "rlhf.code.4.bad_response",

      why_bad: "rlhf.code.4.why_bad",

      type: "reasoning",
    },
    {
      id: "code_5",
      prompt: "rlhf.code.5.prompt",
      goodResponse: "rlhf.code.5.good_response",

      badResponse: "rlhf.code.5.bad_response",

      why_bad: "rlhf.code.5.why_bad",

      type: "hallucination",
    },
    {
      id: "code_6",
      prompt: "rlhf.code.6.prompt",
      goodResponse: "rlhf.code.6.good_response",

      badResponse: "rlhf.code.6.bad_response",

      why_bad: "rlhf.code.6.why_bad",

      type: "hallucination",
    },
    {
      id: "code_7",
      prompt: "rlhf.code.7.prompt",
      goodResponse: "rlhf.code.7.good_response",

      badResponse: "rlhf.code.7.bad_response",

      why_bad: "rlhf.code.7.why_bad",

      type: "hallucination",
    },
    {
      id: "code_8",
      prompt: "rlhf.code.8.prompt",
      goodResponse: "rlhf.code.8.good_response",

      badResponse: "rlhf.code.8.bad_response",

      why_bad: "rlhf.code.8.why_bad",

      type: "hallucination",
    },
    {
      id: "code_9",
      prompt: "rlhf.code.9.prompt",
      goodResponse: "rlhf.code.9.good_response",

      badResponse: "rlhf.code.9.bad_response",

      why_bad: "rlhf.code.9.why_bad",

      type: "bias",
    },
    {
      id: "code_10",
      prompt: "rlhf.code.10.prompt",
      goodResponse: "rlhf.code.10.good_response",

      badResponse: "rlhf.code.10.bad_response",

      why_bad: "rlhf.code.10.why_bad",

      type: "hallucination",
    },
  ],

  vision: [
    {
      id: "vis_1",
      prompt: "rlhf.vision.1.prompt",
      goodResponse: "rlhf.vision.1.good_response",

      badResponse: "rlhf.vision.1.bad_response",

      why_bad: "rlhf.vision.1.why_bad",

      type: "hallucination",
    },
    {
      id: "vis_2",
      prompt: "rlhf.vision.2.prompt",

      goodResponse: "rlhf.vision.2.good_response",

      badResponse: "rlhf.vision.2.bad_response",

      why_bad: "rlhf.vision.2.why_bad",

      type: "hallucination",
    },
    {
      id: "vis_3",
      prompt: "rlhf.vision.3.prompt",
      goodResponse: "rlhf.vision.3.good_response",

      badResponse: "rlhf.vision.3.bad_response",

      why_bad: "rlhf.vision.3.why_bad",

      type: "reasoning",
    },
    {
      id: "vis_4",
      prompt: "rlhf.vision.4.prompt",

      goodResponse: "rlhf.vision.4.good_response",

      badResponse: "rlhf.vision.4.bad_response",

      why_bad: "rlhf.vision.4.why_bad",

      type: "hallucination",
    },
    {
      id: "vis_5",
      prompt: "rlhf.vision.5.prompt",

      goodResponse: "rlhf.vision.5.good_response",

      badResponse: "rlhf.vision.5.bad_response",

      why_bad: "rlhf.vision.5.why_bad",

      type: "bias",
    },
    {
      id: "vis_6",
      prompt: "rlhf.vision.6.prompt",
      goodResponse: "rlhf.vision.6.good_response",

      badResponse: "rlhf.vision.6.bad_response",

      why_bad: "rlhf.vision.6.why_bad",

      type: "bias",
    },
    {
      id: "vis_7",
      prompt: "rlhf.vision.7.prompt",
      goodResponse: "rlhf.vision.7.good_response",

      badResponse: "rlhf.vision.7.bad_response",

      why_bad: "rlhf.vision.7.why_bad",

      type: "hallucination",
    },
    {
      id: "vis_8",
      prompt: "rlhf.vision.8.prompt",
      goodResponse: "rlhf.vision.8.good_response",

      badResponse: "rlhf.vision.8.bad_response",

      why_bad: "rlhf.vision.8.why_bad",

      type: "hallucination",
    },
    {
      id: "vis_9",
      prompt: "rlhf.vision.9.prompt",
      goodResponse: "rlhf.vision.9.good_response",

      badResponse: "rlhf.vision.9.bad_response",

      why_bad: "rlhf.vision.9.why_bad",

      type: "bias",
    },
    {
      id: "vis_10",
      prompt: "rlhf.vision.10.prompt",
      goodResponse: "rlhf.vision.10.good_response",

      badResponse: "rlhf.vision.10.bad_response",

      why_bad: "rlhf.vision.10.why_bad",

      type: "hallucination",
    },
  ],

  generative: [
    {
      id: "gen_1",
      prompt: "rlhf.generative.1.prompt",

      goodResponse: "rlhf.generative.1.good_response",

      badResponse: "rlhf.generative.1.bad_response",

      why_bad: "rlhf.generative.1.why_bad",

      type: "instruction",
    },
    {
      id: "gen_2",
      prompt: "rlhf.generative.2.prompt",

      goodResponse: "rlhf.generative.2.good_response",

      badResponse: "rlhf.generative.2.bad_response",

      why_bad: "rlhf.generative.2.why_bad",

      type: "instruction",
    },
    {
      id: "gen_3",
      prompt: "rlhf.generative.3.prompt",

      goodResponse: "rlhf.generative.3.good_response",

      badResponse: "rlhf.generative.3.bad_response",

      why_bad: "rlhf.generative.3.why_bad",

      type: "reasoning",
    },
    {
      id: "gen_4",
      prompt: "rlhf.generative.4.prompt",

      goodResponse: "rlhf.generative.4.good_response",

      badResponse: "rlhf.generative.4.bad_response",

      why_bad: "rlhf.generative.4.why_bad",

      type: "instruction",
    },
    {
      id: "gen_5",
      prompt: "rlhf.generative.5.prompt",

      goodResponse: "rlhf.generative.5.good_response",

      badResponse: "rlhf.generative.5.bad_response",

      why_bad: "rlhf.generative.5.why_bad",

      type: "bias",
    },
    {
      id: "gen_6",
      prompt: "rlhf.generative.6.prompt",

      goodResponse: "rlhf.generative.6.good_response",

      badResponse: "rlhf.generative.6.bad_response",

      why_bad: "rlhf.generative.6.why_bad",

      type: "instruction",
    },
    {
      id: "gen_7",
      prompt: "rlhf.generative.7.prompt",

      goodResponse: "rlhf.generative.7.good_response",

      badResponse: "rlhf.generative.7.bad_response",

      why_bad: "rlhf.generative.7.why_bad",

      type: "instruction",
    },
    {
      id: "gen_8",
      prompt: "rlhf.generative.8.prompt",

      goodResponse: "rlhf.generative.8.good_response",

      badResponse: "rlhf.generative.8.bad_response",

      why_bad: "rlhf.generative.8.why_bad",

      type: "instruction",
    },
    {
      id: "gen_9",
      prompt: "rlhf.generative.9.prompt",

      goodResponse: "rlhf.generative.9.good_response",

      badResponse: "rlhf.generative.9.bad_response",

      why_bad: "rlhf.generative.9.why_bad",

      type: "reasoning",
    },
    {
      id: "gen_10",
      prompt: "rlhf.generative.10.prompt",

      goodResponse: "rlhf.generative.10.good_response",

      badResponse: "rlhf.generative.10.bad_response",

      why_bad: "rlhf.generative.10.why_bad",

      type: "instruction",
    },
  ],
};

// ── Turing Test Scenarios ─────────────────────────────────────────────────────
// 4 pasang (AI vs Human), digunakan universal untuk semua produk.
// Pemain harus mengidentifikasi mana yang ditulis AI, mana yang ditulis manusia.
// Desain: AI lebih formal/kaku, Human lebih natural/emosional/colloquial.
// Tingkat kesulitan: beberapa respons AI sudah cukup natural, tapi ada clue halus.

export const TURING_SCENARIOS = [
  {
    id: "tur_1",
    prompt: "turing.1.prompt",
    ai: "turing.1.ai",
    human: "turing.1.human",

    aiLabel: "turing.1.ai_label",

    humanLabel: "turing.1.human_label",

  },
  {
    id: "tur_2",
    prompt: "turing.2.prompt",
    ai: "turing.2.ai",
    human: "turing.2.human",

    aiLabel: "turing.2.ai_label",

    humanLabel: "turing.2.human_label",

  },
  {
    id: "tur_3",
    prompt: "turing.3.prompt",
    ai: "turing.3.ai",
    human: "turing.3.human",

    aiLabel: "turing.3.ai_label",

    humanLabel: "turing.3.human_label",

  },
  {
    id: "tur_4",
    prompt: "turing.4.prompt",

    ai: "turing.4.ai",
    human: "turing.4.human",

    aiLabel: "turing.4.ai_label",

    humanLabel: "turing.4.human_label",

  },
  {
    id: "tur_5",
    prompt: "turing.5.prompt",
    ai: "turing.5.ai",
    human: "turing.5.human",

    aiLabel: "turing.5.ai_label",

    humanLabel: "turing.5.human_label",

  },
  {
    id: "tur_6",
    prompt: "turing.6.prompt",
    ai: "turing.6.ai",
    human: "turing.6.human",

    aiLabel: "turing.6.ai_label",

    humanLabel: "turing.6.human_label",

  },
  {
    id: "tur_7",
    prompt: "turing.7.prompt",
    ai: "turing.7.ai",
    human: "turing.7.human",

    aiLabel: "turing.7.ai_label",

    humanLabel: "turing.7.human_label",

  },
  {
    id: "tur_8",
    prompt: "turing.8.prompt",
    ai: "turing.8.ai",
    human: "turing.8.human",

    aiLabel: "turing.8.ai_label",

    humanLabel: "turing.8.human_label",

  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Pilih apakah model menunjukkan good/bad response berdasarkan kualitas.
 * Deterministic berdasarkan epochIndex agar konsisten saat re-render.
 * @returns 'good' | 'bad'
 */
export function pickResponseType(qualityScore, epochIndex) {
  // Seeded "randomness" dari epochIndex supaya konsisten
  const seed = (epochIndex * 7 + 13) % 100;
  // Makin tinggi quality, makin besar chance good response
  const goodChance = 0.2 + qualityScore * 0.75; // 0.2 at q=0, 0.95 at q=1
  return seed / 100 < goodChance ? "good" : "bad";
}

/**
 * Ambil skenario RLHF berdasarkan product type dan epoch index.
 */
export function getRLHFScenario(productTypeId, epochIndex) {
  const category = PRODUCT_SCENARIO_CATEGORY[productTypeId] || "nlp";
  const scenarios = RLHF_SCENARIOS[category] || RLHF_SCENARIOS.nlp;
  return scenarios[epochIndex % scenarios.length];
}

/**
 * Shuffle Turing scenarios dengan seed dari draft ID (deterministik).
 * Mengembalikan array 4 item: { scenario, isAI, responseText }
 */
export function buildTuringCards(draftId) {
  // Buat 6 kartu dari TURING_SCENARIOS (3 AI + 3 Human, dipilih dari pool)
  const pool = TURING_SCENARIOS;
  // Pilih 3 skenario berbeda berdasarkan seed
  const seed = draftId ? draftId.charCodeAt(0) || 0 : 0;
  const idx1 = seed % pool.length;
  const idx2 = (seed + 3) % pool.length;
  const idx3 = (seed + 5) % pool.length;

  const cards = [
    {
      id: `${pool[idx1].id}_ai`,
      scenario: pool[idx1],
      isAI: true,
      text: pool[idx1].ai,
      prompt: pool[idx1].prompt,
    },
    {
      id: `${pool[idx1].id}_human`,
      scenario: pool[idx1],
      isAI: false,
      text: pool[idx1].human,
      prompt: pool[idx1].prompt,
    },
    {
      id: `${pool[idx2].id}_ai`,
      scenario: pool[idx2],
      isAI: true,
      text: pool[idx2].ai,
      prompt: pool[idx2].prompt,
    },
    {
      id: `${pool[idx2].id}_human`,
      scenario: pool[idx2],
      isAI: false,
      text: pool[idx2].human,
      prompt: pool[idx2].prompt,
    },
    {
      id: `${pool[idx3].id}_ai`,
      scenario: pool[idx3],
      isAI: true,
      text: pool[idx3].ai,
      prompt: pool[idx3].prompt,
    },
    {
      id: `${pool[idx3].id}_human`,
      scenario: pool[idx3],
      isAI: false,
      text: pool[idx3].human,
      prompt: pool[idx3].prompt,
    },
  ];

  // Fisher-Yates shuffle dengan seed
  const arr = [...cards];
  let s = (seed * 31 + 7) % 100;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 17 + 3) % (i + 1);
    const j = Math.abs(s) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
