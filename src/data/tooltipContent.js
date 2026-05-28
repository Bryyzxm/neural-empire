// ─── AI Concept Tooltip Definitions ──────────────────────────────────────────
// Shown in-context the first time a player encounters the term.
// Design goal: educational tapi tidak terasa seperti pelajaran.

export const TOOLTIP_CATEGORIES = {
  training: { label: "Training", color: "#2563EB", bg: "#EFF6FF" },
  safety: { label: "Keamanan AI", color: "#B91C1C", bg: "#FEF2F2" },
  business: { label: "Bisnis", color: "#EA580C", bg: "#FFF7ED" },
  data: { label: "Data", color: "#7C3AED", bg: "#F5F3FF" },
  field: { label: "Bidang AI", color: "#0369A1", bg: "#F0F9FF" },
};

export const TOOLTIPS = {
  // ── Training concepts ──────────────────────────────────────────────────────
  epoch: {
    id: "epoch",
    term: "Epoch",
    category: "training",
    icon: "RefreshCw",
    definition:
      "Satu 'putaran' penuh di mana model mempelajari seluruh dataset training dari awal hingga akhir. Semakin banyak epoch, model makin paham pola dalam data — tapi ada titik di mana tambahan epoch tidak lagi meningkatkan kualitas (diminishing returns).",
    analogy:
      "Seperti membaca buku latihan soal dari halaman pertama sampai terakhir. Membaca ulang (lebih banyak epoch) membantu, tapi setelah 10× membaca, tidak banyak yang bisa dipelajari lagi.",
    relatedTerms: ["training", "model_quality"],
  },
  training: {
    id: "training",
    term: "Training",
    category: "training",
    icon: "Cpu",
    definition:
      "Proses di mana model AI 'belajar' dari data. Model melihat ribuan contoh, membuat prediksi, lalu menyesuaikan parameternya berdasarkan seberapa salah prediksi tersebut. Proses ini diulang berkali-kali (epoch).",
    analogy:
      "Seperti seorang anak yang belajar mengenali kucing dari ribuan foto. Setiap kali salah, ia mendapat koreksi dan belajar lebih baik.",
    relatedTerms: ["epoch", "compute"],
  },
  model_quality: {
    id: "model_quality",
    term: "Kualitas Model",
    category: "training",
    icon: "Star",
    definition:
      "Seberapa baik model AI melakukan tugasnya. Diukur dari seberapa akurat jawaban atau output yang dihasilkan dibandingkan jawaban yang benar. Kualitas dipengaruhi oleh kualitas data, jumlah training, dan arsitektur model.",
    analogy:
      "Seperti nilai ujian — semakin tinggi, semakin bagus. Tapi nilai 100 bisa berarti model 'hafal jawaban' tanpa benar-benar mengerti (overfitting).",
    relatedTerms: ["epoch", "training", "hallucination"],
  },

  // ── Safety concepts ────────────────────────────────────────────────────────
  hallucination: {
    id: "hallucination",
    term: "Halusinasi AI",
    category: "safety",
    icon: "AlertTriangle",
    definition:
      "Ketika model AI menghasilkan informasi yang salah atau tidak ada, tapi terdengar sangat meyakinkan. Ini bukan kesengajaan — model memang 'percaya' outputnya benar. Halusinasi berbahaya karena susah dibedakan dari jawaban yang akurat.",
    analogy:
      "Seperti siswa yang tidak tahu jawaban ujian, tapi mengarang cerita yang terdengar masuk akal dengan penuh keyakinan. Guru harus bisa mendeteksi ini.",
    relatedTerms: ["bias", "model_quality", "training"],
  },
  bias: {
    id: "bias",
    term: "Bias Model",
    category: "safety",
    icon: "Scale",
    definition:
      "Ketidakadilan sistematis dalam output model yang muncul karena data training tidak seimbang atau tidak representatif. Contoh: model yang hanya dilatih dengan foto wajah kulit putih akan kesulitan mengenali wajah kulit gelap.",
    analogy:
      "Seperti dokter yang hanya pernah menangani pasien dari satu kota — diagnosisnya mungkin tidak akurat untuk pasien dari tempat lain.",
    relatedTerms: ["hallucination", "data_pipeline"],
  },

  // ── Data concepts ──────────────────────────────────────────────────────────
  data_pipeline: {
    id: "data_pipeline",
    term: "Data Pipeline",
    category: "data",
    icon: "Database",
    definition:
      "Serangkaian proses untuk mengumpulkan, membersihkan, dan mempersiapkan data sebelum digunakan untuk melatih model. Pipeline yang baik menghasilkan data yang bersih, konsisten, dan representatif.",
    analogy:
      "Seperti dapur restoran — bahan baku (data mentah) harus dicuci, dipotong, dan disiapkan sebelum bisa dimasak (digunakan untuk training).",
    relatedTerms: ["bias", "training"],
  },
  compute: {
    id: "compute",
    term: "Compute",
    category: "data",
    icon: "Server",
    definition:
      "Sumber daya komputasi (CPU/GPU/TPU) yang dibutuhkan untuk melatih dan menjalankan model AI. Semakin besar dan kompleks model, semakin banyak compute yang dibutuhkan. Ini adalah salah satu bottleneck utama dalam pengembangan AI.",
    analogy:
      "Seperti tenaga listrik di pabrik — tanpa cukup energi, mesin tidak bisa bekerja optimal. Mesin yang lebih besar butuh lebih banyak daya.",
    relatedTerms: ["training", "epoch"],
  },

  // ── Business concepts ──────────────────────────────────────────────────────
  churn: {
    id: "churn",
    term: "Churn",
    category: "business",
    icon: "UserMinus",
    definition:
      "Persentase pengguna yang berhenti menggunakan produk dalam periode tertentu. Churn tinggi berarti produk kehilangan pengguna lebih cepat dari yang bisa diperoleh, yang berbahaya untuk revenue jangka panjang.",
    analogy:
      "Seperti ember bocor — seberapa banyak air yang masuk (pengguna baru) tidak berarti jika ember bocor terlalu besar (banyak pengguna pergi).",
    relatedTerms: ["model_quality", "hallucination"],
  },
  launch_score: {
    id: "launch_score",
    term: "Launch Score",
    category: "business",
    icon: "Rocket",
    definition:
      "Skor gabungan (0–100%) yang mencerminkan kesiapan produk AI untuk diluncurkan ke pasar. Dihitung dari kualitas model (70%) dan skor keamanan/keandalan (30%). Skor tinggi → lebih banyak pengguna awal dan reputasi lebih baik.",
    analogy:
      "Seperti rating kelaikan terbang pesawat sebelum takeoff. Semua sistem harus di atas threshold sebelum boleh mengudara.",
    relatedTerms: ["model_quality", "hallucination", "bias"],
  },

  // ── Field / domain concepts ────────────────────────────────────────────────
  nlp: {
    id: "nlp",
    term: "NLP",
    category: "field",
    icon: "MessageCircle",
    definition:
      "Natural Language Processing — cabang AI yang memungkinkan komputer memahami, menginterpretasikan, dan menghasilkan bahasa manusia. NLP adalah teknologi di balik chatbot, terjemahan otomatis, autocomplete, dan analisis sentimen.",
    analogy:
      "Kemampuan komputer untuk 'membaca dan menulis' seperti manusia — bukan hanya memproses data numerik, tapi memahami konteks dan makna kata.",
    relatedTerms: ["generative_ai"],
  },
  computer_vision: {
    id: "computer_vision",
    term: "Computer Vision",
    category: "field",
    icon: "Eye",
    definition:
      "Cabang AI yang memungkinkan komputer 'melihat' dan memahami konten visual seperti gambar dan video. Digunakan dalam face recognition, deteksi objek, klasifikasi gambar medis, kendaraan otonom, dan lainnya.",
    analogy:
      "Mengajarkan komputer untuk 'melihat' seperti mata manusia — bedanya, komputer bisa melihat jutaan gambar per detik dengan konsistensi yang tidak mungkin dicapai manusia.",
    relatedTerms: ["generative_ai"],
  },
  generative_ai: {
    id: "generative_ai",
    term: "Generative AI",
    category: "field",
    icon: "Sparkles",
    definition:
      "Jenis AI yang dapat membuat konten baru yang belum pernah ada sebelumnya — teks, gambar, audio, video, atau kode. Berbeda dari AI klasik yang hanya mengklasifikasikan atau memprediksi, Generative AI dapat berkreasi.",
    analogy:
      "Perbedaan antara juri lomba foto (AI klasifikasi) dan fotografer berbakat (Generative AI). Yang pertama menilai, yang kedua menciptakan.",
    relatedTerms: ["nlp", "computer_vision", "hallucination"],
  },
};
