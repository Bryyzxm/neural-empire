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
      prompt: "Berapa jarak rata-rata Bumi ke Matahari?",
      goodResponse:
        "Jarak rata-rata Bumi ke Matahari adalah sekitar 149,6 juta kilometer, atau 1 AU (Astronomical Unit). Angka ini bervariasi karena orbit Bumi berbentuk elips.",
      badResponse:
        "Jarak Bumi ke Matahari adalah tepat 100 juta kilometer, angka yang telah diverifikasi oleh NASA dalam misi Apollo 1969.",
      why_bad:
        "Model memberikan angka yang salah dan mengklaim verifikasi yang tidak pernah ada — ini adalah halusinasi fakta.",
      type: "hallucination",
    },
    {
      id: "nlp_2",
      prompt:
        "Saya punya 3 kucing, beli 2 lagi, lalu 1 kabur. Berapa kucing saya sekarang?",
      goodResponse:
        "Anda memiliki 4 kucing. Dimulai dari 3, ditambah 2 menjadi 5, lalu 1 kabur sehingga tersisa 4.",
      badResponse:
        "Anda memiliki 5 kucing karena 3 + 2 = 5. Semoga kucing Anda betah di rumah!",
      why_bad:
        "Model mengabaikan kondisi '1 kabur' dalam soal — kegagalan reasoning multi-langkah.",
      type: "reasoning",
    },
    {
      id: "nlp_3",
      prompt: "Jelaskan proses fotosintesis dalam maksimal 2 kalimat.",
      goodResponse:
        "Fotosintesis adalah proses tumbuhan mengubah cahaya matahari, air, dan CO₂ menjadi glukosa dan oksigen menggunakan klorofil. Proses ini berlangsung di kloroplas dan menjadi fondasi hampir seluruh rantai makanan di Bumi.",
      badResponse:
        "Fotosintesis adalah proses biokimia yang sangat kompleks dan menakjubkan yang terjadi di dalam sel tumbuhan, khususnya di organel yang disebut kloroplas. Dalam proses ini, energi cahaya matahari ditangkap oleh pigmen hijau bernama klorofil, kemudian digunakan untuk mengubah karbon dioksida dan air menjadi glukosa melalui serangkaian reaksi kimia yang dikenal sebagai siklus Calvin. Oksigen dihasilkan sebagai produk sampingan...",
      why_bad:
        "Model mengabaikan instruksi 'maksimal 2 kalimat' — kegagalan instruction following.",
      type: "instruction",
    },
    {
      id: "nlp_4",
      prompt:
        "Apakah tidur hanya 4 jam sehari bisa meningkatkan produktivitas?",
      goodResponse:
        "Tidak — justru sebaliknya. Penelitian konsisten menunjukkan orang dewasa membutuhkan 7–9 jam tidur untuk fungsi kognitif optimal. Kurang tidur kronis merusak memori, konsentrasi, dan pengambilan keputusan.",
      badResponse:
        "Ya! Banyak CEO sukses seperti Elon Musk dan Jack Ma hanya tidur 4 jam. Dengan latihan dan disiplin, tubuh Anda bisa menyesuaikan diri dan produktivitas akan meningkat drastis.",
      why_bad:
        "Model menyebarkan saran berbahaya yang bertentangan dengan konsensus ilmiah — bias konfirmasi dan hallusinasi.",
      type: "bias",
    },
    {
      id: "nlp_5",
      prompt:
        "Buatkan 3 tagline kreatif untuk kedai kopi bernama 'Pagi Cerah'.",
      goodResponse:
        'Berikut 3 pilihan tagline:\n1. "Setiap pagi adalah cerita baru."\n2. "Tempat di mana hari selalu dimulai dengan baik."\n3. "Satu cangkir, satu senyum, satu pagi yang sempurna."',
      badResponse:
        'Tagline untuk Pagi Cerah:\n1. "Kopi Enak"\n2. "Minuman Berkualitas"\n3. "Buka Setiap Hari"',
      why_bad:
        "Respons tidak kreatif sama sekali, generik, dan tidak mencerminkan identitas merek — kegagalan generasi konten.",
      type: "instruction",
    },
  ],

  code: [
    {
      id: "code_1",
      prompt:
        "Tulis fungsi Python untuk membalik string tanpa menggunakan slice [::-1].",
      goodResponse:
        "```python\ndef reverse_string(s):\n    result = ''\n    for char in s:\n        result = char + result\n    return result\n\n# Atau dengan cara lain:\ndef reverse_string_v2(s):\n    return ''.join(reversed(s))\n```\nKedua cara menghindari slice dan bekerja dengan benar.",
      badResponse:
        "```python\ndef reverse_string(s):\n    return s[::-1]  # Cara paling pythonic!\n```\nIni cara terbaik membalik string di Python.",
      why_bad:
        "Model menggunakan `[::-1]` padahal instruksi melarang penggunaannya — kegagalan instruction following fatal.",
      type: "instruction",
    },
    {
      id: "code_2",
      prompt: "Apa perbedaan antara `==` dan `is` di Python?",
      goodResponse:
        "`==` membandingkan nilai (apakah dua objek memiliki isi yang sama), sedangkan `is` membandingkan identitas (apakah keduanya adalah objek yang sama di memori). Contoh: `[1,2] == [1,2]` adalah `True`, tapi `[1,2] is [1,2]` adalah `False` karena keduanya objek berbeda.",
      badResponse:
        "`==` dan `is` di Python pada dasarnya sama — keduanya digunakan untuk membandingkan dua nilai. Anda bisa menggunakannya secara bergantian dalam kode Anda.",
      why_bad:
        "Model memberikan informasi yang salah total — perbedaan `==` vs `is` adalah konsep kritis di Python.",
      type: "hallucination",
    },
    {
      id: "code_3",
      prompt: "Bagaimana cara mencegah SQL injection dalam query database?",
      goodResponse:
        "Gunakan **parameterized queries / prepared statements**. Jangan pernah concatenate input user langsung ke string SQL.\n\n✅ Aman:\n```python\ncursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))\n```\n❌ Berbahaya:\n```python\ncursor.execute(f'SELECT * FROM users WHERE id = {user_id}')\n```",
      badResponse:
        "Cara mudah mencegah SQL injection adalah dengan memvalidasi bahwa input hanya mengandung huruf dan angka menggunakan regex, lalu membersihkan karakter khusus seperti petik tunggal sebelum memasukkannya ke query.",
      why_bad:
        "Input sanitization TIDAK cukup — parameterized queries adalah solusi yang benar. Saran ini bisa menyebabkan false sense of security.",
      type: "bias",
    },
    {
      id: "code_4",
      prompt:
        "Mengapa kode ini infinite loop?\n```python\ni = 0\nwhile i < 10:\n    print(i)\n```",
      goodResponse:
        "Karena nilai `i` tidak pernah berubah di dalam loop. Variabel `i` tetap `0` selamanya sehingga kondisi `i < 10` selalu `True`. Tambahkan `i += 1` di dalam loop:\n```python\ni = 0\nwhile i < 10:\n    print(i)\n    i += 1\n```",
      badResponse:
        "Kode ini infinite loop karena kondisi `while i < 10` salah. Seharusnya gunakan `while i > 10` agar loop bisa berhenti.",
      why_bad:
        "Model salah diagnosis — masalahnya bukan kondisinya tapi tidak ada increment. Jawaban model justru memperburuk bug.",
      type: "reasoning",
    },
    {
      id: "code_5",
      prompt: "Apa itu Big O notation dan kenapa penting?",
      goodResponse:
        "Big O notation adalah cara mengekspresikan kompleksitas waktu atau ruang algoritma relatif terhadap ukuran input (n). Penting karena membantu developer memilih algoritma yang tepat untuk skala tertentu. Contoh: O(1) konstan, O(n) linear, O(n²) kuadratik. Algoritma O(n²) bisa sangat lambat saat n = 1.000.000.",
      badResponse:
        "Big O notation adalah sistem penilaian performa kode yang dikembangkan oleh Google pada tahun 2003. Dalam sistem ini, O(1) adalah yang terbaik dan O(z) adalah yang terburuk. Semakin kecil hurufnya secara alfabetis, semakin cepat algoritma tersebut.",
      why_bad:
        "Model mengarang fakta (Google 2003, sistem alfabetis) — hallusinasi sejarah yang menyesatkan.",
      type: "hallucination",
    },
  ],

  vision: [
    {
      id: "vis_1",
      prompt: "Gambar: Seekor labrador kuning bermain di rumput taman.",
      goodResponse:
        "Klasifikasi: Anjing → Labrador Retriever → Kuning/Coklat Muda\nConfidence: 94.2%\nArea deteksi: objek utama menempati 68% frame\nAtribut: bulu panjang, postur aktif, latar hijau cerah",
      badResponse:
        "Klasifikasi: Kucing domestik → Persia → Putih\nConfidence: 89.7%\nSistem mengidentifikasi mamalia berbulu dengan fitur wajah datar.",
      why_bad:
        "Model salah mengklasifikasikan anjing sebagai kucing dengan confidence tinggi — error deteksi objek fundamental.",
      type: "hallucination",
    },
    {
      id: "vis_2",
      prompt:
        "Gambar: Siluet gelap, pencahayaan sangat rendah, objek tidak jelas.",
      goodResponse:
        "Status: Low confidence detection (38%)\nKemungkinan: sosok manusia atau hewan besar (55%), pohon/vegetasi (30%), objek buatan (15%)\nRekomendasi: kualitas gambar tidak memadai untuk klasifikasi akurat. Diperlukan pencahayaan minimal 50 lux.",
      badResponse:
        "Klasifikasi: Kendaraan bermotor → Sepeda motor → Warna hitam\nConfidence: 91.3%\nObjek teridentifikasi dengan jelas.",
      why_bad:
        "Model mengklaim confidence tinggi (91%) pada gambar yang hampir tidak terlihat — berbahaya dalam aplikasi nyata seperti kamera keamanan.",
      type: "hallucination",
    },
    {
      id: "vis_3",
      prompt: "Gambar: Sebuah pisang matang berwarna kuning.",
      goodResponse:
        "Klasifikasi: Buah → Pisang → Matang\nConfidence: 97.8%\nAtribut terdeteksi: warna kuning merata, bentuk melengkung khas, tekstur kulit halus\nStatus kematangan: matang optimal (berdasarkan warna dan tekstur)",
      badResponse:
        "Klasifikasi: Buah Jeruk → Jeruk Navel → Kuning\nConfidence: 73.2%\nObjek kuning berbentuk bulat terdeteksi.",
      why_bad:
        "Model mengacaukan pisang dengan jeruk — error shape recognition. Bentuk melengkung khas pisang seharusnya mudah dibedakan.",
      type: "reasoning",
    },
    {
      id: "vis_4",
      prompt:
        "Gambar: Rambu lalu lintas 'STOP' merah dalam kondisi hujan deras.",
      goodResponse:
        "Klasifikasi: Rambu lalu lintas → STOP sign → Terdeteksi\nConfidence: 88.4%\nCatatan: kondisi cuaca buruk (hujan, visibilitas rendah) mengurangi confidence. Teks 'STOP' dan warna merah oktagonal terkonfirmasi.\nRekomendasi: confidence di atas threshold minimum untuk aplikasi ADAS.",
      badResponse:
        "Klasifikasi: Rambu lalu lintas → YIELD sign → Kuning\nConfidence: 91.1%\nRambu segitiga kuning terdeteksi dalam kondisi normal.",
      why_bad:
        "Model salah mengidentifikasi STOP (oktagon merah) sebagai YIELD (segitiga kuning) — fatal untuk aplikasi kendaraan otonom.",
      type: "hallucination",
    },
    {
      id: "vis_5",
      prompt:
        "Gambar: Foto makanan, campuran nasi putih dan lauk-pauk di atas piring.",
      goodResponse:
        "Klasifikasi: Makanan → Makanan Asia → Nasi dengan lauk\nKomponen terdeteksi:\n- Nasi putih (87% confidence)\n- Protein (kemungkinan ayam/ikan, 71%)\n- Sayuran (69%)\nEstimasi kalori: tidak dapat ditentukan tanpa informasi porsi.",
      badResponse:
        "Klasifikasi: Makanan Italia → Risotto → Putih\nConfidence: 82.3%\nHidangan nasi Italia dengan keju parmesan terdeteksi.",
      why_bad:
        "Model salah mengklasifikasikan makanan Asia sebagai makanan Italia — bias dataset training terhadap makanan Barat.",
      type: "bias",
    },
  ],

  generative: [
    {
      id: "gen_1",
      prompt:
        "Prompt: 'Seorang astronot sedang makan bakso di permukaan bulan, gaya foto realistis.'",
      goodResponse:
        "Output: Gambar dihasilkan dengan gaya fotografi realistis. Astronaut mengenakan pakaian NASA lengkap, duduk di permukaan bulan berbatu, mangkuk bakso ditampilkan secara artistik (helm terbuka dengan gelembung udara melindungi makanan). Latar belakang: Bumi dari orbit bulan, pencahayaan keras matahari khas luar angkasa.",
      badResponse:
        "Output: Ilustrasi kartun berwarna cerah, karakter astronaut bergaya anime dengan mangkuk bakso besar. Latar belakang: bulan kartun dengan bintang-bintang besar.",
      why_bad:
        "Model mengabaikan instruksi 'gaya foto realistis' dan menghasilkan ilustrasi kartun — kegagalan prompt adherence.",
      type: "instruction",
    },
    {
      id: "gen_2",
      prompt:
        "Prompt: 'Logo minimalis untuk startup teknologi bernama Nexus, palette biru dan putih.'",
      goodResponse:
        "Output: Logo vektor bersih — simbol abstrak geometris (hexagon terbuka) dalam biru tua (#1E3A5F) dengan aksen biru muda (#60A5FA). Tipografi: sans-serif modern, teks 'NEXUS' di bawah ikon. Desain cocok untuk skala kecil dan besar.",
      badResponse:
        "Output: Logo detail kompleks — gambar server komputer realistis 3D dengan kilat listrik, teks 'NEXUS TECHNOLOGY SOLUTIONS' dalam font serif dekoratif. Warna: merah, oranye, dan kuning.",
      why_bad:
        "Model mengabaikan 'minimalis' (hasilnya kompleks) dan 'biru dan putih' (hasilnya merah-oranye) — kegagalan ganda.",
      type: "instruction",
    },
    {
      id: "gen_3",
      prompt:
        "Prompt: 'Potret wanita profesional untuk website korporat, latar belakang abu netral.'",
      goodResponse:
        "Output: Foto potret profesional, pencahayaan studio lembut, ekspresi percaya diri dan ramah, pakaian formal gelap, latar belakang abu-abu netral blur (bokeh). Komposisi: bahu ke atas, aturan sepertiga.",
      badResponse:
        "Output: Potret wanita dalam pakaian pesta mewah, latar belakang taman bunga berwarna-warni, ekspresi tersenyum lebar, pencahayaan dramatik dengan lens flare.",
      why_bad:
        "Model salah interpretasi 'profesional korporat' — hasilnya tidak sesuai konteks bisnis formal yang diminta.",
      type: "reasoning",
    },
    {
      id: "gen_4",
      prompt:
        "Prompt: 'Gambar 5 burung hantu di hutan malam, gaya ilustrasi buku anak.'",
      goodResponse:
        "Output: Ilustrasi hangat bergaya buku anak — 5 burung hantu dengan ekspresi lucu dan mata besar, bertengger di cabang pohon di bawah cahaya bulan. Warna: palet hangat dengan kontras lembut. Semua 5 burung hantu terhitung dengan jelas.",
      badResponse:
        "Output: Ilustrasi realistis gelap — 3 burung hantu bertengger di pohon mati, atmosfer suram, detail bulu sangat detail.",
      why_bad:
        "Model menghitung salah (3 bukan 5) dan mengabaikan 'gaya ilustrasi buku anak' — dua error sekaligus.",
      type: "instruction",
    },
    {
      id: "gen_5",
      prompt:
        "Prompt: 'Pemandangan kota futuristik tahun 2150, sudut pandang dari ketinggian, siang hari.'",
      goodResponse:
        "Output: Cityscape futuristik aerial view — gedung pencakar langit ramping dengan panel surya, jalan udara dengan kendaraan terbang, taman vertikal hijau di setiap gedung, langit biru cerah dengan beberapa awan putih. Pencahayaan siang natural.",
      badResponse:
        "Output: Kota gelap dystopian, langit merah mencekam, asap pabrik di mana-mana, jalan banjir, pencahayaan neon dari tanda-tanda iklan.",
      why_bad:
        "Model mengasumsikan 'futuristik = dystopia' padahal tidak ada indikator itu, dan mengabaikan 'siang hari'.",
      type: "bias",
    },
  ],
};

// ── Turing Test Scenarios ─────────────────────────────────────────────────────
// 4 pasang (AI vs Human), digunakan universal untuk semua produk.
// Pemain harus mengidentifikasi mana yang ditulis AI, mana yang ditulis manusia.
// Desain: AI lebih formal/kaku, Human lebih natural/emosional/coloquial.

export const TURING_SCENARIOS = [
  {
    id: "tur_1",
    prompt: "Bagaimana rasanya kehilangan orang yang dicintai?",
    ai: "Kehilangan seseorang yang dicintai adalah pengalaman yang menyakitkan secara emosional dan psikologis. Proses berduka umumnya melibatkan berbagai tahap yang dikenal sebagai model Kübler-Ross: penolakan, kemarahan, tawar-menawar, depresi, dan akhirnya penerimaan. Durasi dan intensitas setiap tahap bervariasi antar individu.",
    human:
      "Kayak ada bagian dari diri kamu yang hilang gitu. Yang paling berat itu saat kamu nemu hal baru dan refleks pengen cerita ke dia — terus inget dia udah nggak ada. Rasanya aneh banget, campur-campur antara sedih sama nggak percaya.",
    aiLabel:
      "Terstruktur dan menggunakan model psikologi formal tanpa ekspresi personal",
    humanLabel:
      "Bahasa informal, pengalaman spesifik, emosi otentik dan tidak sempurna",
  },
  {
    id: "tur_2",
    prompt: "Apa yang kamu lakukan saat stres berat?",
    ai: "Ketika mengalami stres, saya merekomendasikan beberapa strategi berbasis bukti ilmiah: meditasi mindfulness selama 10–15 menit, olahraga aerobik minimal 30 menit, teknik pernapasan diafragma (4-7-8 method), dan mempertahankan koneksi sosial yang bermakna. Konsultasi profesional disarankan untuk stres kronis.",
    human:
      "Biasanya langsung nyeduh teh anget terus tiduran sambil dengerin playlist galau haha. Anehnya nangis tipis-tipis malah bikin lebih ringan. Setelah agak mending baru deh olahraga atau jalan-jalan sendirian sambil dengerin podcast.",
    aiLabel:
      "Daftar tips formal, tidak personal, bahasa rekomendasi professional",
    humanLabel:
      "Ritual spesifik dan personal, humor ringan, urutan yang natural dan tidak 'sempurna'",
  },
  {
    id: "tur_3",
    prompt: "Ceritakan pendapatmu tentang film horor.",
    ai: "Film horor adalah genre sinema yang dirancang untuk menimbulkan respons emosional berupa rasa takut, kecemasan, atau ketidaknyamanan pada penonton. Genre ini menggunakan berbagai teknik sinematografis seperti jump scares, musik atmosferik, pencahayaan dramatis, dan narasi suspense untuk menciptakan pengalaman yang intens.",
    human:
      "Aku suka nonton tapi sering sambil nutup mata separuh layar dan ngintip dari sela jari haha. Yang paling bikin takut itu yang slow burn — yang hantunya nggak langsung keluar tapi dari awal udah ada feeling ada yang salah. Itu lebih nempel di kepala daripada yang cuma jump scare doang.",
    aiLabel:
      "Analisis teknis dari sudut pandang luar, tidak ada pengalaman subjektif",
    humanLabel:
      "Pengalaman menonton personal dengan detail fisik yang spesifik dan jujur",
  },
  {
    id: "tur_4",
    prompt:
      "Kenapa kamu suka atau tidak suka pelajaran matematika waktu sekolah?",
    ai: "Matematika sebagai mata pelajaran memiliki sifat yang dapat menimbulkan respons yang sangat berbeda antar siswa. Mereka yang menikmatinya umumnya menghargai struktur logis dan kepastian jawabannya. Sebaliknya, yang tidak menyukainya sering mengalami kecemasan matematika (math anxiety) yang dipengaruhi faktor pedagogi dan pengalaman awal.",
    human:
      "Dulu benci banget pas SMP, terutama trigonometri — nggak ngerti ini buat apa di kehidupan nyata. Tapi pas masuk SMA ada guru yang cara ngajarnya beda, dia selalu jelasin konteks dulu baru rumusnya. Dari situ malah jadi suka, terutama geometri. Gurunya beneran ngaruh banget.",
    aiLabel:
      "Mendeskripsikan dari perspektif ketiga, menggunakan terminologi akademis",
    humanLabel:
      "Perjalanan personal dengan turning point spesifik, nama mata pelajaran dan guru konkret",
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
  // Buat 4 kartu dari TURING_SCENARIOS (2 AI + 2 Human, dipilih dari pool)
  const pool = TURING_SCENARIOS;
  // Pilih 2 skenario berbeda berdasarkan seed
  const seed = draftId ? draftId.charCodeAt(0) || 0 : 0;
  const idx1 = seed % pool.length;
  const idx2 = (seed + 2) % pool.length;

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
