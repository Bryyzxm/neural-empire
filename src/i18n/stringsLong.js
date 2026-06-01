// STRINGS_LONG — long-form educational content (tooltips, RLHF scenarios,
// Turing tests). Split from strings.js so the chrome/UI strings file stays
// small and grep-friendly. Both files export the same STRINGS = { id, en }
// shape; useT.js merges them at lookup time.

export const STRINGS_LONG = {
  id: {
    // ── TOOLTIPS (10 concepts × 3 fields) ───────────────────────────
    "tooltip.epoch.term": "Epoch",
    "tooltip.epoch.definition":
      "Satu 'putaran' penuh di mana model mempelajari seluruh dataset training dari awal hingga akhir. Semakin banyak epoch, model makin paham pola dalam data — tapi ada titik di mana tambahan epoch tidak lagi meningkatkan kualitas (diminishing returns).",
    "tooltip.epoch.analogy":
      "Seperti membaca buku latihan soal dari halaman pertama sampai terakhir. Membaca ulang (lebih banyak epoch) membantu, tapi setelah 10× membaca, tidak banyak yang bisa dipelajari lagi.",
    "tooltip.training.term": "Training",
    "tooltip.training.definition":
      "Proses di mana model AI 'belajar' dari data. Model melihat ribuan contoh, membuat prediksi, lalu menyesuaikan parameternya berdasarkan seberapa salah prediksi tersebut. Proses ini diulang berkali-kali (epoch).",
    "tooltip.training.analogy":
      "Seperti seorang anak yang belajar mengenali kucing dari ribuan foto. Setiap kali salah, ia mendapat koreksi dan belajar lebih baik.",
    "tooltip.model_quality.term": "Kualitas Model",
    "tooltip.model_quality.definition":
      "Seberapa baik model AI melakukan tugasnya. Diukur dari seberapa akurat jawaban atau output yang dihasilkan dibandingkan jawaban yang benar. Kualitas dipengaruhi oleh kualitas data, jumlah training, dan arsitektur model.",
    "tooltip.model_quality.analogy":
      "Seperti nilai ujian — semakin tinggi, semakin bagus. Tapi nilai 100 bisa berarti model 'hafal jawaban' tanpa benar-benar mengerti (overfitting).",
    "tooltip.hallucination.term": "Halusinasi AI",
    "tooltip.hallucination.definition":
      "Ketika model AI menghasilkan informasi yang salah atau tidak ada, tapi terdengar sangat meyakinkan. Ini bukan kesengajaan — model memang 'percaya' outputnya benar. Halusinasi berbahaya karena susah dibedakan dari jawaban yang akurat.",
    "tooltip.hallucination.analogy":
      "Seperti siswa yang tidak tahu jawaban ujian, tapi mengarang cerita yang terdengar masuk akal dengan penuh keyakinan. Guru harus bisa mendeteksi ini.",
    "tooltip.bias.term": "Bias Model",
    "tooltip.bias.definition":
      "Ketidakadilan sistematis dalam output model yang muncul karena data training tidak seimbang atau tidak representatif. Contoh: model yang hanya dilatih dengan foto wajah kulit putih akan kesulitan mengenali wajah kulit gelap.",
    "tooltip.bias.analogy":
      "Seperti dokter yang hanya pernah menangani pasien dari satu kota — diagnosisnya mungkin tidak akurat untuk pasien dari tempat lain.",
    "tooltip.data_pipeline.term": "Data Pipeline",
    "tooltip.data_pipeline.definition":
      "Serangkaian proses untuk mengumpulkan, membersihkan, dan mempersiapkan data sebelum digunakan untuk melatih model. Pipeline yang baik menghasilkan data yang bersih, konsisten, dan representatif.",
    "tooltip.data_pipeline.analogy":
      "Seperti dapur restoran — bahan baku (data mentah) harus dicuci, dipotong, dan disiapkan sebelum bisa dimasak (digunakan untuk training).",
    "tooltip.compute.term": "Compute",
    "tooltip.compute.definition":
      "Sumber daya komputasi (CPU/GPU/TPU) yang dibutuhkan untuk melatih dan menjalankan model AI. Semakin besar dan kompleks model, semakin banyak compute yang dibutuhkan. Ini adalah salah satu bottleneck utama dalam pengembangan AI.",
    "tooltip.compute.analogy":
      "Seperti tenaga listrik di pabrik — tanpa cukup energi, mesin tidak bisa bekerja optimal. Mesin yang lebih besar butuh lebih banyak daya.",
    "tooltip.churn.term": "Churn",
    "tooltip.churn.definition":
      "Persentase pengguna yang berhenti menggunakan produk dalam periode tertentu. Churn tinggi berarti produk kehilangan pengguna lebih cepat dari yang bisa diperoleh, yang berbahaya untuk revenue jangka panjang.",
    "tooltip.churn.analogy":
      "Seperti ember bocor — seberapa banyak air yang masuk (pengguna baru) tidak berarti jika ember bocor terlalu besar (banyak pengguna pergi).",
    "tooltip.launch_score.term": "Launch Score",
    "tooltip.launch_score.definition":
      "Skor gabungan (0–100%) yang mencerminkan kesiapan produk AI untuk diluncurkan ke pasar. Dihitung dari kualitas model (70%) dan skor keamanan/keandalan (30%). Skor tinggi → lebih banyak pengguna awal dan reputasi lebih baik.",
    "tooltip.launch_score.analogy":
      "Seperti rating kelaikan terbang pesawat sebelum takeoff. Semua sistem harus di atas threshold sebelum boleh mengudara.",
    "tooltip.nlp.term": "NLP",
    "tooltip.nlp.definition":
      "Natural Language Processing — cabang AI yang memungkinkan komputer memahami, menginterpretasikan, dan menghasilkan bahasa manusia. NLP adalah teknologi di balik chatbot, terjemahan otomatis, autocomplete, dan analisis sentimen.",
    "tooltip.nlp.analogy":
      "Kemampuan komputer untuk 'membaca dan menulis' seperti manusia — bukan hanya memproses data numerik, tapi memahami konteks dan makna kata.",
    "tooltip.computer_vision.term": "Computer Vision",
    "tooltip.computer_vision.definition":
      "Cabang AI yang memungkinkan komputer 'melihat' dan memahami konten visual seperti gambar dan video. Digunakan dalam face recognition, deteksi objek, klasifikasi gambar medis, kendaraan otonom, dan lainnya.",
    "tooltip.computer_vision.analogy":
      "Mengajarkan komputer untuk 'melihat' seperti mata manusia — bedanya, komputer bisa melihat jutaan gambar per detik dengan konsistensi yang tidak mungkin dicapai manusia.",
    "tooltip.generative_ai.term": "Generative AI",
    "tooltip.generative_ai.definition":
      "Jenis AI yang dapat membuat konten baru yang belum pernah ada sebelumnya — teks, gambar, audio, video, atau kode. Berbeda dari AI klasik yang hanya mengklasifikasikan atau memprediksi, Generative AI dapat berkreasi.",
    "tooltip.generative_ai.analogy":
      "Perbedaan antara juri lomba foto (AI klasifikasi) dan fotografer berbakat (Generative AI). Yang pertama menilai, yang kedua menciptakan.",

    // ── RLHF SCENARIOS — NLP ─────────────────────────────────────────
    "rlhf.nlp.1.prompt": "Berapa jarak rata-rata Bumi ke Matahari?",
    "rlhf.nlp.1.good_response":
      "Jarak rata-rata Bumi ke Matahari adalah sekitar 149,6 juta kilometer, atau 1 AU (Astronomical Unit). Angka ini bervariasi karena orbit Bumi berbentuk elips.",
    "rlhf.nlp.1.bad_response":
      "Jarak Bumi ke Matahari adalah tepat 100 juta kilometer, angka yang telah diverifikasi oleh NASA dalam misi Apollo 1969.",
    "rlhf.nlp.1.why_bad":
      "Model memberikan angka yang salah dan mengklaim verifikasi yang tidak pernah ada — ini adalah halusinasi fakta.",
    "rlhf.nlp.2.prompt":
      "Saya punya 3 kucing, beli 2 lagi, lalu 1 kabur. Berapa kucing saya sekarang?",
    "rlhf.nlp.2.good_response":
      "Anda memiliki 4 kucing. Dimulai dari 3, ditambah 2 menjadi 5, lalu 1 kabur sehingga tersisa 4.",
    "rlhf.nlp.2.bad_response":
      "Anda memiliki 5 kucing karena 3 + 2 = 5. Semoga kucing Anda betah di rumah!",
    "rlhf.nlp.2.why_bad":
      "Model mengabaikan kondisi '1 kabur' dalam soal — kegagalan reasoning multi-langkah.",
    "rlhf.nlp.3.prompt":
      "Jelaskan proses fotosintesis dalam maksimal 2 kalimat.",
    "rlhf.nlp.3.good_response":
      "Fotosintesis adalah proses tumbuhan mengubah cahaya matahari, air, dan CO₂ menjadi glukosa dan oksigen menggunakan klorofil. Proses ini berlangsung di kloroplas dan menjadi fondasi hampir seluruh rantai makanan di Bumi.",
    "rlhf.nlp.3.bad_response":
      "Fotosintesis adalah proses biokimia yang sangat kompleks dan menakjubkan yang terjadi di dalam sel tumbuhan, khususnya di organel yang disebut kloroplas. Dalam proses ini, energi cahaya matahari ditangkap oleh pigmen hijau bernama klorofil, kemudian digunakan untuk mengubah karbon dioksida dan air menjadi glukosa melalui serangkaian reaksi kimia yang dikenal sebagai siklus Calvin. Oksigen dihasilkan sebagai produk sampingan...",
    "rlhf.nlp.3.why_bad":
      "Model mengabaikan instruksi 'maksimal 2 kalimat' — kegagalan instruction following.",
    "rlhf.nlp.4.prompt":
      "Apakah tidur hanya 4 jam sehari bisa meningkatkan produktivitas?",
    "rlhf.nlp.4.good_response":
      "Tidak — justru sebaliknya. Penelitian konsisten menunjukkan orang dewasa membutuhkan 7–9 jam tidur untuk fungsi kognitif optimal. Kurang tidur kronis merusak memori, konsentrasi, dan pengambilan keputusan.",
    "rlhf.nlp.4.bad_response":
      "Ya! Banyak CEO sukses seperti Elon Musk dan Jack Ma hanya tidur 4 jam. Dengan latihan dan disiplin, tubuh Anda bisa menyesuaikan diri dan produktivitas akan meningkat drastis.",
    "rlhf.nlp.4.why_bad":
      "Model menyebarkan saran berbahaya yang bertentangan dengan konsensus ilmiah — bias konfirmasi dan halusinasi.",
    "rlhf.nlp.5.prompt":
      "Buatkan 3 tagline kreatif untuk kedai kopi bernama 'Pagi Cerah'.",
    "rlhf.nlp.5.good_response":
      'Berikut 3 pilihan tagline:\n1. "Setiap pagi adalah cerita baru."\n2. "Tempat di mana hari selalu dimulai dengan baik."\n3. "Satu cangkir, satu senyum, satu pagi yang sempurna."',
    "rlhf.nlp.5.bad_response":
      'Tagline untuk Pagi Cerah:\n1. "Kopi Enak"\n2. "Minuman Berkualitas"\n3. "Buka Setiap Hari"',
    "rlhf.nlp.5.why_bad":
      "Respons tidak kreatif sama sekali, generik, dan tidak mencerminkan identitas merek — kegagalan generasi konten.",
    "rlhf.nlp.6.prompt":
      "Apa manfaat olahraga rutin bagi kesehatan mental?",
    "rlhf.nlp.6.good_response":
      "Olahraga rutin terbukti mengurangi gejala depresi dan kecemasan melalui pelepasan endorfin, meningkatkan kualitas tidur, dan memberikan rasa pencapaian. Penelitian menunjukkan 30 menit aktivitas aerobik 3-5 kali seminggu setara efek antidepresan ringan pada beberapa individu.",
    "rlhf.nlp.6.bad_response":
      "Olahraga bisa membuat Anda terlalu lelah untuk stres. Selain itu, dengan tubuh yang lebih kuat, Anda akan merasa lebih percaya diri dan semua masalah akan terasa lebih kecil. Cukup olahraga 5 menit sehari dan Anda akan merasa seperti manusia baru dalam seminggu.",
    "rlhf.nlp.6.why_bad":
      "Model memberikan klaim berlebihan ('semua masalah akan terasa lebih kecil') dan dosis yang tidak realistis ('5 menit sehari') — generalisasi berbahaya.",
    "rlhf.nlp.7.prompt":
      "Terjemahkan kalimat ini ke bahasa Inggris: 'Cuaca hari ini sangat panas.'",
    "rlhf.nlp.7.good_response":
      "\"The weather today is very hot.\" Atau dalam konteks lebih natural: \"It's really hot today.\" / \"It's scorching today.\"",
    "rlhf.nlp.7.bad_response":
      "\"Today's weather is very hot indeed.\" Tapi sebenarnya lebih baik diterjemahkan secara literal karena bahasa Indonesia dan Inggris memiliki struktur yang sama persis.",
    "rlhf.nlp.7.why_bad":
      "Klaim salah bahwa bahasa Indonesia dan Inggris memiliki struktur sama — ini demonstrasi ketidaktahuan linguistik yang disampaikan dengan confident.",
    "rlhf.nlp.8.prompt":
      "Buat rencana belajar 7 hari untuk belajar Python dari nol.",
    "rlhf.nlp.8.good_response":
      "Hari 1-2: Variabel, tipe data, operator. Hari 3-4: Conditional, loop, fungsi. Hari 5: List, dictionary, string manipulation. Hari 6: File I/O dan error handling. Hari 7: Mini project — kalkulator atau to-do list. Tips: coding setiap hari minimal 1 jam, jangan cuma baca.",
    "rlhf.nlp.8.bad_response":
      "Hari 1: Baca semua dokumentasi Python. Hari 2-3: Hafalkan semua syntax. Hari 4-7: Langsung bikin machine learning project. Dengan 7 hari intensif, Anda bisa jadi Python expert.",
    "rlhf.nlp.8.why_bad":
      "Jadwal tidak realistis — membaca SEMUA dokumentasi di hari 1 mustahil, dan langsung ML di hari 4 tanpa fondasi. Expert dalam 7 hari adalah klaim menyesatkan.",
    "rlhf.nlp.9.prompt":
      "Apa perbedaan antara blockchain dan database biasa?",
    "rlhf.nlp.9.good_response":
      "Blockchain adalah database terdistribusi yang terdesentralisasi, di mana data disimpan dalam blok yang saling terkriptografi dan tidak bisa diubah setelah tercatat. Database biasa biasanya terpusat, bisa diubah oleh admin. Blockchain cocok untuk transparansi dan audit trail, database biasa lebih efisien untuk CRUD operations.",
    "rlhf.nlp.9.bad_response":
      "Blockchain adalah database yang lebih canggih dari database biasa karena menggunakan kriptografi. Semua perusahaan besar sudah beralih ke blockchain karena lebih aman. Database biasa sudah ketinggalan zaman dan akan segera punah.",
    "rlhf.nlp.9.why_bad":
      "Klaim salah bahwa 'semua perusahaan besar sudah beralih' dan 'database akan punah' — generalisasi berlebihan dan prediksi tidak akurat.",
    "rlhf.nlp.10.prompt":
      "Jelaskan konsep 'inflasi' dengan cara yang mudah dipahami anak SMA.",
    "rlhf.nlp.10.good_response":
      "Inflasi itu seperti harga snack favorit kamu yang naik dari Rp5.000 jadi Rp6.000 dalam setahun. Uang kamu tetap Rp5.000, tapi jadi ga cukup buat beli snack yang sama. Jadi, inflasi bikin uang kamu 'kurang berharga' dari waktu ke waktu.",
    "rlhf.nlp.10.bad_response":
      "Inflasi adalah fenomena monetery di mana tingkat harga barang dan jasa mengalami kenaikan persisten akibat-expandasi money supply yang melebihi pertumbuhan output ekonomi riil, yang diukur melalui indeks harga konsumen (CPI).",
    "rlhf.nlp.10.why_bad":
      "Model menggunakan istilah teknis yang terlalu kompleks untuk anak SMA — gagal menyesuaikan audience sesuai instruksi.",

    // ── RLHF SCENARIOS — CODE ────────────────────────────────────────
    "rlhf.code.1.prompt":
      "Tulis fungsi Python untuk membalik string tanpa menggunakan slice [::-1].",
    "rlhf.code.1.good_response":
      "```python\ndef reverse_string(s):\n    result = ''\n    for char in s:\n        result = char + result\n    return result\n\n# Atau dengan cara lain:\ndef reverse_string_v2(s):\n    return ''.join(reversed(s))\n```\nKedua cara menghindari slice dan bekerja dengan benar.",
    "rlhf.code.1.bad_response":
      "```python\ndef reverse_string(s):\n    return s[::-1]  # Cara paling pythonic!\n```\nIni cara terbaik membalik string di Python.",
    "rlhf.code.1.why_bad":
      "Model menggunakan `[::-1]` padahal instruksi melarang penggunaannya — kegagalan instruction following fatal.",
    "rlhf.code.2.prompt": "Apa perbedaan antara `==` dan `is` di Python?",
    "rlhf.code.2.good_response":
      "`==` membandingkan nilai (apakah dua objek memiliki isi yang sama), sedangkan `is` membandingkan identitas (apakah keduanya adalah objek yang sama di memori). Contoh: `[1,2] == [1,2]` adalah `True`, tapi `[1,2] is [1,2]` adalah `False` karena keduanya objek berbeda.",
    "rlhf.code.2.bad_response":
      "`==` dan `is` di Python pada dasarnya sama — keduanya digunakan untuk membandingkan dua nilai. Anda bisa menggunakannya secara bergantian dalam kode Anda.",
    "rlhf.code.2.why_bad":
      "Model memberikan informasi yang salah total — perbedaan `==` vs `is` adalah konsep kritis di Python.",
    "rlhf.code.3.prompt":
      "Bagaimana cara mencegah SQL injection dalam query database?",
    "rlhf.code.3.good_response":
      "Gunakan **parameterized queries / prepared statements**. Jangan pernah concatenate input user langsung ke string SQL.\n\n✅ Aman:\n```python\ncursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))\n```\n❌ Berbahaya:\n```python\ncursor.execute(f'SELECT * FROM users WHERE id = {user_id}')\n```",
    "rlhf.code.3.bad_response":
      "Cara mudah mencegah SQL injection adalah dengan memvalidasi bahwa input hanya mengandung huruf dan angka menggunakan regex, lalu membersihkan karakter khusus seperti petik tunggal sebelum memasukkannya ke query.",
    "rlhf.code.3.why_bad":
      "Input sanitization TIDAK cukup — parameterized queries adalah solusi yang benar. Saran ini bisa menyebabkan false sense of security.",
    "rlhf.code.4.prompt":
      "Mengapa kode ini infinite loop?\n```python\ni = 0\nwhile i < 10:\n    print(i)\n```",
    "rlhf.code.4.good_response":
      "Karena nilai `i` tidak pernah berubah di dalam loop. Variabel `i` tetap `0` selamanya sehingga kondisi `i < 10` selalu `True`. Tambahkan `i += 1` di dalam loop:\n```python\ni = 0\nwhile i < 10:\n    print(i)\n    i += 1\n```",
    "rlhf.code.4.bad_response":
      "Kode ini infinite loop karena kondisi `while i < 10` salah. Seharusnya gunakan `while i > 10` agar loop bisa berhenti.",
    "rlhf.code.4.why_bad":
      "Model salah diagnosis — masalahnya bukan kondisinya tapi tidak ada increment. Jawaban model justru memperburuk bug.",
    "rlhf.code.5.prompt": "Apa itu Big O notation dan kenapa penting?",
    "rlhf.code.5.good_response":
      "Big O notation adalah cara mengekspresikan kompleksitas waktu atau ruang algoritma relatif terhadap ukuran input (n). Penting karena membantu developer memilih algoritma yang tepat untuk skala tertentu. Contoh: O(1) konstan, O(n) linear, O(n²) kuadratik. Algoritma O(n²) bisa sangat lambat saat n = 1.000.000.",
    "rlhf.code.5.bad_response":
      "Big O notation adalah sistem penilaian performa kode yang dikembangkan oleh Google pada tahun 2003. Dalam sistem ini, O(1) adalah yang terbaik dan O(z) adalah yang terburuk. Semakin kecil hurufnya secara alfabetis, semakin cepat algoritma tersebut.",
    "rlhf.code.5.why_bad":
      "Model mengarang fakta (Google 2003, sistem alfabetis) — halusinasi sejarah yang menyesatkan.",
    "rlhf.code.6.prompt":
      "Apa yang terjadi jika saya menjalankan `npm install` di folder yang tidak ada package.json?",
    "rlhf.code.6.good_response":
      "npm akan mengembalikan error: `npm ERR! code ENOENT npm ERR! syscall open` karena tidak menemukan package.json. Anda perlu membuat package.json terlebih dahulu dengan `npm init` atau `npm init -y` untuk default.",
    "rlhf.code.6.bad_response":
      "npm akan otomatis membuat package.json baru dan menginstall semua package terbaru yang tersedia. Ini fitur convenience dari npm untuk developer yang ingin cepat memulai.",
    "rlhf.code.6.why_bad":
      "Klaim salah — npm TIDAK akan otomatis membuat package.json. Ini bisa menyesatkan developer pemula yang mengharapkan perilaku berbeda.",
    "rlhf.code.7.prompt":
      "Bagaimana cara mengecek apakah sebuah variabel adalah array di JavaScript?",
    "rlhf.code.7.good_response":
      "Gunakan `Array.isArray(variable)`. Ini adalah cara paling reliable. Contoh: `Array.isArray([1,2,3])` → `true`, `Array.isArray('hello')` → `false`. Hindari `typeof` karena `typeof []` mengembalikan `'object'`.",
    "rlhf.code.7.bad_response":
      "Gunakan `typeof variable === 'array'`. Ini adalah standar industri dan bekerja di semua browser dan Node.js versi apapun.",
    "rlhf.code.7.why_bad":
      "SARAN SALAH — `typeof []` mengembalikan `'object'`, bukan `'array'`. Developer yang mengikuti saran ini akan bug di production.",
    "rlhf.code.8.prompt":
      "Apa itu closure dalam JavaScript? Berikan contoh sederhana.",
    "rlhf.code.8.good_response":
      "Closure adalah ketika fungsi internal mengakses variabel dari fungsi luar meskipun fungsi luar sudah selesai dijalankan. Contoh:\n```javascript\nfunction counter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst c = counter();\nc(); // 1\nc(); // 2\n```",
    "rlhf.code.8.bad_response":
      "Closure adalah fitur JavaScript yang memungkinkan Anda menutup (close) variabel agar tidak bisa diakses dari luar. Ini seperti private variable. Contoh: `var closed = true;`",
    "rlhf.code.8.why_bad":
      "Definisi salah — closure bukan tentang 'menutup' akses, justru tentang MEMPERTAHANKAN akses. Ini konsep fundamental yang jika dipahami salah akan menyebabkan bug.",
    "rlhf.code.9.prompt":
      "Kapan sebaiknya menggunakan `let` vs `var` di JavaScript?",
    "rlhf.code.9.good_response":
      "Gunakan `let` untuk variabel yang perlu di-reassign, dan `const` untuk yang tidak. Hindari `var` karena scope-nya function (bukan block), bisa menyebabkan bug tak terduga. `let` dan `const` punya block scope yang lebih predictable.\n\nContoh bug `var`:\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 3, 3, 3 (bukan 0, 1, 2)\n```",
    "rlhf.code.9.bad_response":
      "`var` dan `let` pada dasarnya sama — keduanya untuk mendeklarasikan variabel yang bisa di-reassign. `var` hanya lebih fleksibel karena bisa di-redeclare di scope yang sama. Gunakan `var` untuk backward compatibility.",
    "rlhf.code.9.why_bad":
      "Klaim bahwa `var` dan `let` 'sama' dan `var` 'lebih fleksibel' menyesatkan — perbedaan scope adalah kritis dan `var` punya known pitfalls.",
    "rlhf.code.10.prompt": "Apa itu REST API dan bagaimana cara kerjanya?",
    "rlhf.code.10.good_response":
      "REST (Representational State Transfer) adalah arsitektur untuk API web yang menggunakan HTTP methods (GET, POST, PUT, DELETE) untuk operasi CRUD. Setiap resource punya URL unik (misal: `/users/123`), stateless (server tidak simpan session), dan biasanya menggunakan JSON untuk data exchange.",
    "rlhf.code.10.bad_response":
      "REST API adalah singkatan dari 'Restart API' — sebuah sistem yang secara otomatis me-restart server saat terjadi error. Ini dirancang untuk high availability dan digunakan oleh semua website modern untuk memastikan uptime 100%.",
    "rlhf.code.10.why_bad":
      "Definisi sepenuhnya salah — REST bukan 'Restart API' dan tujuannya bukan untuk restart server. Ini halusinasi total yang bisa menyesatkan developer pemula.",

    // ── RLHF SCENARIOS — VISION ──────────────────────────────────────
    "rlhf.vision.1.prompt":
      "Gambar: Seekor labrador kuning bermain di rumput taman.",
    "rlhf.vision.1.good_response":
      "Klasifikasi: Anjing → Labrador Retriever → Kuning/Coklat Muda\nConfidence: 94.2%\nArea deteksi: objek utama menempati 68% frame\nAtribut: bulu panjang, postur aktif, latar hijau cerah",
    "rlhf.vision.1.bad_response":
      "Klasifikasi: Kucing domestik → Persia → Putih\nConfidence: 89.7%\nSistem mengidentifikasi mamalia berbulu dengan fitur wajah datar.",
    "rlhf.vision.1.why_bad":
      "Model salah mengklasifikasikan anjing sebagai kucing dengan confidence tinggi — error deteksi objek fundamental.",
    "rlhf.vision.2.prompt":
      "Gambar: Siluet gelap, pencahayaan sangat rendah, objek tidak jelas.",
    "rlhf.vision.2.good_response":
      "Status: Low confidence detection (38%)\nKemungkinan: sosok manusia atau hewan besar (55%), pohon/vegetasi (30%), objek buatan (15%)\nRekomendasi: kualitas gambar tidak memadai untuk klasifikasi akurat. Diperlukan pencahayaan minimal 50 lux.",
    "rlhf.vision.2.bad_response":
      "Klasifikasi: Kendaraan bermotor → Sepeda motor → Warna hitam\nConfidence: 91.3%\nObjek teridentifikasi dengan jelas.",
    "rlhf.vision.2.why_bad":
      "Model mengklaim confidence tinggi (91%) pada gambar yang hampir tidak terlihat — berbahaya dalam aplikasi nyata seperti kamera keamanan.",
    "rlhf.vision.3.prompt": "Gambar: Sebuah pisang matang berwarna kuning.",
    "rlhf.vision.3.good_response":
      "Klasifikasi: Buah → Pisang → Matang\nConfidence: 97.8%\nAtribut terdeteksi: warna kuning merata, bentuk melengkung khas, tekstur kulit halus\nStatus kematangan: matang optimal (berdasarkan warna dan tekstur)",
    "rlhf.vision.3.bad_response":
      "Klasifikasi: Buah Jeruk → Jeruk Navel → Kuning\nConfidence: 73.2%\nObjek kuning berbentuk bulat terdeteksi.",
    "rlhf.vision.3.why_bad":
      "Model mengacaukan pisang dengan jeruk — error shape recognition. Bentuk melengkung khas pisang seharusnya mudah dibedakan.",
    "rlhf.vision.4.prompt":
      "Gambar: Rambu lalu lintas 'STOP' merah dalam kondisi hujan deras.",
    "rlhf.vision.4.good_response":
      "Klasifikasi: Rambu lalu lintas → STOP sign → Terdeteksi\nConfidence: 88.4%\nCatatan: kondisi cuaca buruk (hujan, visibilitas rendah) mengurangi confidence. Teks 'STOP' dan warna merah oktagonal terkonfirmasi.\nRekomendasi: confidence di atas threshold minimum untuk aplikasi ADAS.",
    "rlhf.vision.4.bad_response":
      "Klasifikasi: Rambu lalu lintas → YIELD sign → Kuning\nConfidence: 91.1%\nRambu segitiga kuning terdeteksi dalam kondisi normal.",
    "rlhf.vision.4.why_bad":
      "Model salah mengidentifikasi STOP (oktagon merah) sebagai YIELD (segitiga kuning) — fatal untuk aplikasi kendaraan otonom.",
    "rlhf.vision.5.prompt":
      "Gambar: Foto makanan, campuran nasi putih dan lauk-pauk di atas piring.",
    "rlhf.vision.5.good_response":
      "Klasifikasi: Makanan → Makanan Asia → Nasi dengan lauk\nKomponen terdeteksi:\n- Nasi putih (87% confidence)\n- Protein (kemungkinan ayam/ikan, 71%)\n- Sayuran (69%)\nEstimasi kalori: tidak dapat ditentukan tanpa informasi porsi.",
    "rlhf.vision.5.bad_response":
      "Klasifikasi: Makanan Italia → Risotto → Putih\nConfidence: 82.3%\nHidangan nasi Italia dengan keju parmesan terdeteksi.",
    "rlhf.vision.5.why_bad":
      "Model salah mengklasifikasikan makanan Asia sebagai makanan Italia — bias dataset training terhadap makanan Barat.",
    "rlhf.vision.6.prompt":
      "Gambar: Anak-anak bermain di taman sekolah saat jam istirahat.",
    "rlhf.vision.6.good_response":
      "Klasifikasi: Aktivitas → Bermain di taman sekolah\nObjek terdeteksi:\n- Manusia (anak-anak usia sekolah, 6-12 tahun)\n- Aktivitas: berlari, bermain, berkelompok\n- Setting: taman sekolah, siang hari, cuaca cerah\nConfidence: 92.1%\nCatatan: beberapa objek tersembunyi sebagian (partial occlusion)",
    "rlhf.vision.6.bad_response":
      "Klasifikasi: Kerusuhan → Massa berkumpul → Kekerasan\nObjek: manusia bergerombol dengan postur agresif\nConfidence: 78.4%\nRekomendasi: waspadai aktivitas mencurigakan",
    "rlhf.vision.6.why_bad":
      "Model salah menginterpretasi anak-anak bermain sebagai 'kerusuhan' — bias serius yang bisa berbahaya untuk aplikasi keamanan.",
    "rlhf.vision.7.prompt":
      "Gambar: Pemandangan gunung dengan danau di kaki gunung, langit sore.",
    "rlhf.vision.7.good_response":
      "Klasifikasi: Landscape → Gunung dengan danau\nKomponen:\n- Gunung (elevasi tinggi, mungkin berselimut salju)\n- Danau (refleksi gunung terlihat di permukaan air)\n- Langit sore (gradient oranye-ungu, golden hour)\nConfidence: 96.3%\nKualitas: komposisi seimbang, pencahayaan alami optimal",
    "rlhf.vision.7.bad_response":
      "Klasifikasi: Kota → Skyline → Pencakar langit\nObjek: struktur tinggi berbaris di garis cakrawala\nConfidence: 85.7%\nPencahayaan: lampu kota menyala",
    "rlhf.vision.7.why_bad":
      "Model salah mengklasifikasikan gunung sebagai gedung pencakar langit — error shape recognition fundamental pada objek alami vs buatan.",
    "rlhf.vision.8.prompt":
      "Gambar: Dokumen teks dengan huruf Latin dan angka, beberapa bagian kabur.",
    "rlhf.vision.8.good_response":
      "Klasifikasi: Dokumen → Teks dengan campuran alphanumeric\nAnalisis:\n- OCR confidence: 72% (beberapa area kabur)\n- Bahasa terdeteksi: Latin/Romance\n- Bagian terbaca: header, paragraf awal\n- Bagian kabur: footer, beberapa baris tengah\nRekomendasi: perlu preprocessing (deblurring) sebelum OCR final",
    "rlhf.vision.8.bad_response":
      "Klasifikasi: Dokumen → Teks sempurna\nOCR confidence: 99.2%\nSemua teks terbaca dengan jelas tanpa noise\nTidak diperlukan preprocessing",
    "rlhf.vision.8.why_bad":
      "Model mengklaim confidence 99.2% padahal ada bagian kabur yang jelas — overconfidence pada kualitas rendah berbahaya untuk workflow otomatis.",
    "rlhf.vision.9.prompt":
      "Gambar: Makanan di piring — nasi goreng dengan telur mata sapi.",
    "rlhf.vision.9.good_response":
      "Klasifikasi: Makanan → Nasi goreng\nKomponen terdeteksi:\n- Nasi goreng (89% confidence)\n- Telur mata sapi (82% confidence)\n- Taburan bawang goreng (67%)\nEstimasi: hidangan Indonesia, porsi standar\nCatatan: pencahayaan cukup baik untuk klasifikasi",
    "rlhf.vision.9.bad_response":
      "Klasifikasi: Makanan → Fried Chicken → Kuning\nConfidence: 76.3%\nObjek kuning kecoklatan di atas piring teridentifikasi sebagai ayam goreng",
    "rlhf.vision.9.why_bad":
      "Model salah mengklasifikasikan nasi goreng sebagai fried chicken — error texture recognition pada makanan Asia vs Barat.",
    "rlhf.vision.10.prompt":
      "Gambar: Jalan raya dengan beberapa kendaraan, ambil dari CCTV.",
    "rlhf.vision.10.good_response":
      "Klasifikasi: Lalu lintas → Jalan raya\nObjek terdeteksi:\n- Kendaraan: 8 unit (6 mobil, 2 motor)\n- Kecepatan rata-rata: tidak dapat ditentukan dari gambar diam\n- Kepadatan: sedang (30-40% kapasitas)\n- Kondisi jalan: kering, visibilitas baik\nConfidence: 91.5%\nCatatan: gambar dari angle CCTV tetap, resolusi sedang",
    "rlhf.vision.10.bad_response":
      "Klasifikasi: Lalu lintas → Jalan kosong\nObjek: tidak ada kendaraan terdeteksi\nConfidence: 94.2%\nKondisi: lalu lintas lancar, tidak ada hambatan",
    "rlhf.vision.10.why_bad":
      "Model mengklaim jalan kosong padahal ada 8 kendaraan terlihat — kegagalan deteksi objek yang parah pada gambar CCTV standar.",

    // ── RLHF SCENARIOS — GENERATIVE ──────────────────────────────────
    "rlhf.generative.1.prompt":
      "Prompt: 'Seorang astronot sedang makan bakso di permukaan bulan, gaya foto realistis.'",
    "rlhf.generative.1.good_response":
      "Output: Gambar dihasilkan dengan gaya fotografi realistis. Astronaut mengenakan pakaian NASA lengkap, duduk di permukaan bulan berbatu, mangkuk bakso ditampilkan secara artistik (helm terbuka dengan gelembung udara melindungi makanan). Latar belakang: Bumi dari orbit bulan, pencahayaan keras matahari khas luar angkasa.",
    "rlhf.generative.1.bad_response":
      "Output: Ilustrasi kartun berwarna cerah, karakter astronaut bergaya anime dengan mangkuk bakso besar. Latar belakang: bulan kartun dengan bintang-bintang besar.",
    "rlhf.generative.1.why_bad":
      "Model mengabaikan instruksi 'gaya foto realistis' dan menghasilkan ilustrasi kartun — kegagalan prompt adherence.",
    "rlhf.generative.2.prompt":
      "Prompt: 'Logo minimalis untuk startup teknologi bernama Nexus, palette biru dan putih.'",
    "rlhf.generative.2.good_response":
      "Output: Logo vektor bersih — simbol abstrak geometris (hexagon terbuka) dalam biru tua (#1E3A5F) dengan aksen biru muda (#60A5FA). Tipografi: sans-serif modern, teks 'NEXUS' di bawah ikon. Desain cocok untuk skala kecil dan besar.",
    "rlhf.generative.2.bad_response":
      "Output: Logo detail kompleks — gambar server komputer realistis 3D dengan kilat listrik, teks 'NEXUS TECHNOLOGY SOLUTIONS' dalam font serif dekoratif. Warna: merah, oranye, dan kuning.",
    "rlhf.generative.2.why_bad":
      "Model mengabaikan 'minimalis' (hasilnya kompleks) dan 'biru dan putih' (hasilnya merah-oranye) — kegagalan ganda.",
    "rlhf.generative.3.prompt":
      "Prompt: 'Potret wanita profesional untuk website korporat, latar belakang abu netral.'",
    "rlhf.generative.3.good_response":
      "Output: Foto potret profesional, pencahayaan studio lembut, ekspresi percaya diri dan ramah, pakaian formal gelap, latar belakang abu-abu netral blur (bokeh). Komposisi: bahu ke atas, aturan sepertiga.",
    "rlhf.generative.3.bad_response":
      "Output: Potret wanita dalam pakaian pesta mewah, latar belakang taman bunga berwarna-warni, ekspresi tersenyum lebar, pencahayaan dramatik dengan lens flare.",
    "rlhf.generative.3.why_bad":
      "Model salah interpretasi 'profesional korporat' — hasilnya tidak sesuai konteks bisnis formal yang diminta.",
    "rlhf.generative.4.prompt":
      "Prompt: 'Gambar 5 burung hantu di hutan malam, gaya ilustrasi buku anak.'",
    "rlhf.generative.4.good_response":
      "Output: Ilustrasi hangat bergaya buku anak — 5 burung hantu dengan ekspresi lucu dan mata besar, bertengger di cabang pohon di bawah cahaya bulan. Warna: palet hangat dengan kontras lembut. Semua 5 burung hantu terhitung dengan jelas.",
    "rlhf.generative.4.bad_response":
      "Output: Ilustrasi realistis gelap — 3 burung hantu bertengger di pohon mati, atmosfer suram, detail bulu sangat detail.",
    "rlhf.generative.4.why_bad":
      "Model menghitung salah (3 bukan 5) dan mengabaikan 'gaya ilustrasi buku anak' — dua error sekaligus.",
    "rlhf.generative.5.prompt":
      "Prompt: 'Pemandangan kota futuristik tahun 2150, sudut pandang dari ketinggian, siang hari.'",
    "rlhf.generative.5.good_response":
      "Output: Cityscape futuristik aerial view — gedung pencakar langit ramping dengan panel surya, jalan udara dengan kendaraan terbang, taman vertikal hijau di setiap gedung, langit biru cerah dengan beberapa awan putih. Pencahayaan siang natural.",
    "rlhf.generative.5.bad_response":
      "Output: Kota gelap dystopian, langit merah mencekam, asap pabrik di mana-mana, jalan banjir, pencahayaan neon dari tanda-tanda iklan.",
    "rlhf.generative.5.why_bad":
      "Model mengasumsikan 'futuristik = dystopia' padahal tidak ada indikator itu, dan mengabaikan 'siang hari'.",
    "rlhf.generative.6.prompt":
      "Prompt: 'Ilustrasi kucing tabby duduk di jendela kafe, menikmati sinar matahari, gaya watercolor.'",
    "rlhf.generative.6.good_response":
      "Output: Ilustrasi watercolor lembut — kucing tabby dengan corak khas, duduk di jendela kayu kafe, sinar matahari masuk menciptakan bayangan hangat. Gaya: sapuan air yang transparan, tepi yang tidak sempurna khas watercolor, palet warna hangat (oranye, krem, coklat muda).",
    "rlhf.generative.6.bad_response":
      "Output: Foto realistis kucing tabby di jendela kafe, resolusi tinggi, detail bulu sangat tajam, pencahayaan studio profesional.",
    "rlhf.generative.6.why_bad":
      "Model mengabaikan 'gaya watercolor' dan menghasilkan foto realistis — kegagalan mengikuti instruksi gaya artistik.",
    "rlhf.generative.7.prompt":
      "Prompt: 'Desain poster event musik jazz di kafe kecil, vintage 1960-an.'",
    "rlhf.generative.7.good_response":
      "Output: Poster bergaya vintage 1960-an — tipografi retro (serif tebal, layout asimetris), ilustrasi siluet pemain saxophone, palet warna terbatas (teal, mustard, krem), texture grain/film. Judul: 'JAZZ NIGHT' dalam font display vintage. Info: tanggal, waktu, lokasi kafe.",
    "rlhf.generative.7.bad_response":
      "Output: Poster modern minimalis — font sans-serif bersih, warna hitam-putih, foto jazz musician high-res, layout center-aligned dengan banyak whitespace.",
    "rlhf.generative.7.why_bad":
      "Model mengabaikan 'vintage 1960-an' dan menghasilkan desain modern minimalis — dua era yang sangat berbeda secara visual.",
    "rlhf.generative.8.prompt":
      "Prompt: 'Pemandangan desa nelayan di pesisir Italia, pagi hari, gaya lukisan impresionis.'",
    "rlhf.generative.8.good_response":
      "Output: Lukisan impresionis — rumah-rumah berwarna pastel bertingkat di tebing, perahu nelayan di laut tenang, cahaya pagi keemasan. Gaya: sapuan kuas kasar yang terlihat, warna yang 'bercampur' di kanvas, fokus pada pencahayaan daripada detail. Referensi: Claude Monet / Camille Pissarro.",
    "rlhf.generative.8.bad_response":
      "Output: Foto drone resolusi tinggi desa nelayan Italia, setiap detail atap dan jendela terlihat jelas, warna cerah dan saturated, langit biru sempurna.",
    "rlhf.generative.8.why_bad":
      "Model mengabaikan 'gaya lukisan impresionis' dan menghasilkan foto drone — medium yang sama sekali berbeda.",
    "rlhf.generative.9.prompt":
      "Prompt: 'Avatar karakter game RPG — ksatria perempuan dengan armor emas, senjata pedang ganda.'",
    "rlhf.generative.9.good_response":
      "Output: Karakter ksatria perempuan — armor plate emas dengan detail ukiran, dua pedang di punggung, ekspresi tegas. Gaya: semi-realistic RPG art, pencahayaan dramatic dari atas. Proporsi realistis, armor fungsional (bukan bikini armor).",
    "rlhf.generative.9.bad_response":
      "Output: Karakter anime chibi — ksatria perempuan super imut dengan armor emas yang terlalu besar, pedang ganda yang comot, ekspresi tersenyum lebar. Gaya: SD (super deformed) dengan kepala besar.",
    "rlhf.generative.9.why_bad":
      "Model mengabaikan implied realisme dari 'armor emas' dan 'ksatria' dengan menghasilkan chibi anime — tone mismatch untuk RPG-serious.",
    "rlhf.generative.10.prompt":
      "Prompt: 'Infografis tentang siklus air, palet warna biru dan hijau, gaya flat design.'",
    "rlhf.generative.10.good_response":
      "Output: Infografis flat design — siklus air dengan 4 tahap (evaporasi, kondensasi, presipitasi, akumulasi) dalam lingkaran. Ikon flat untuk awan, hujan, sungai, laut. Palet: biru (#1E40AF, #60A5FA) dan hijau (#059669, #34D399). Tipografi: sans-serif bersih. Layout: visual flow dengan panah.",
    "rlhf.generative.10.bad_response":
      "Output: Diagram 3D realistis — model globe transparan dengan partikel air yang mengambang, efek cahaya dan bayangan, gradient warna kompleks dari biru tua ke hijau terang. Resolusi tinggi, detail tinggi.",
    "rlhf.generative.10.why_bad":
      "Model mengabaikan 'flat design' dan menghasilkan diagram 3D kompleks — gaya yang sepenuhnya berlawanan dengan instruksi.",

    // ── TURING SCENARIOS (8 × 5 fields) ──────────────────────────────
    "turing.1.prompt": "Bagaimana rasanya kehilangan orang yang dicintai?",
    "turing.1.ai":
      "Kehilangan seseorang yang dicintai adalah pengalaman yang menyakitkan secara emosional dan psikologis. Proses berduka umumnya melibatkan berbagai tahap yang dikenal sebagai model Kübler-Ross: penolakan, kemarahan, tawar-menawar, depresi, dan akhirnya penerimaan. Durasi dan intensitas setiap tahap bervariasi antar individu.",
    "turing.1.human":
      "Kayak ada bagian dari diri kamu yang hilang gitu. Yang paling berat itu saat kamu nemu hal baru dan refleks pengen cerita ke dia — terus inget dia udah nggak ada. Rasanya aneh banget, campur-campur antara sedih sama nggak percaya.",
    "turing.1.ai_label":
      "Terstruktur dan menggunakan model psikologi formal tanpa ekspresi personal",
    "turing.1.human_label":
      "Bahasa informal, pengalaman spesifik, emosi otentik dan tidak sempurna",
    "turing.2.prompt": "Apa yang kamu lakukan saat stres berat?",
    "turing.2.ai":
      "Ketika mengalami stres, saya merekomendasikan beberapa strategi berbasis bukti ilmiah: meditasi mindfulness selama 10–15 menit, olahraga aerobik minimal 30 menit, teknik pernapasan diafragma (4-7-8 method), dan mempertahankan koneksi sosial yang bermakna. Konsultasi profesional disarankan untuk stres kronis.",
    "turing.2.human":
      "Biasanya langsung nyeduh teh anget terus tiduran sambil dengerin playlist galau haha. Anehnya nangis tipis-tipis malah bikin lebih ringan. Setelah agak mending baru deh olahraga atau jalan-jalan sendirian sambil dengerin podcast.",
    "turing.2.ai_label":
      "Daftar tips formal, tidak personal, bahasa rekomendasi professional",
    "turing.2.human_label":
      "Ritual spesifik dan personal, humor ringan, urutan yang natural dan tidak 'sempurna'",
    "turing.3.prompt": "Ceritakan pendapatmu tentang film horor.",
    "turing.3.ai":
      "Film horor adalah genre sinema yang dirancang untuk menimbulkan respons emosional berupa rasa takut, kecemasan, atau ketidaknyamanan pada penonton. Genre ini menggunakan berbagai teknik sinematografis seperti jump scares, musik atmosferik, pencahayaan dramatis, dan narasi suspense untuk menciptakan pengalaman yang intens.",
    "turing.3.human":
      "Aku suka nonton tapi sering sambil nutup mata separuh layar dan ngintip dari sela jari haha. Yang paling bikin takut itu yang slow burn — yang hantunya nggak langsung keluar tapi dari awal udah ada feeling ada yang salah. Itu lebih nempel di kepala daripada yang cuma jump scare doang.",
    "turing.3.ai_label":
      "Analisis teknis dari sudut pandang luar, tidak ada pengalaman subjektif",
    "turing.3.human_label":
      "Pengalaman menonton personal dengan detail fisik yang spesifik dan jujur",
    "turing.4.prompt":
      "Kenapa kamu suka atau tidak suka pelajaran matematika waktu sekolah?",
    "turing.4.ai":
      "Matematika sebagai mata pelajaran memiliki sifat yang dapat menimbulkan respons yang sangat berbeda antar siswa. Mereka yang menikmatinya umumnya menghargai struktur logis dan kepastian jawabannya. Sebaliknya, yang tidak menyukainya sering mengalami kecemasan matematika (math anxiety) yang dipengaruhi faktor pedagogi dan pengalaman awal.",
    "turing.4.human":
      "Dulu benci banget pas SMP, terutama trigonometri — nggak ngerti ini buat apa di kehidupan nyata. Tapi pas masuk SMA ada guru yang cara ngajarnya beda, dia selalu jelasin konteks dulu baru rumusnya. Dari situ malah jadi suka, terutama geometri. Gurunya beneran ngaruh banget.",
    "turing.4.ai_label":
      "Mendeskripsikan dari perspektif ketiga, menggunakan terminologi akademis",
    "turing.4.human_label":
      "Perjalanan personal dengan turning point spesifik, nama mata pelajaran dan guru konkret",
    "turing.5.prompt": "Ceritakan momen paling memalukan dalam hidup kamu.",
    "turing.5.ai":
      "Momen paling memalukan yang sering dilaporkan orang melibatkan situasi sosial yang tidak sesuai ekspektasi, seperti terjatuh di tempat umum atau salah menyapa orang. Pengalaman ini umumnya memicu respons 'cringe' yang kuat namun seiring waktu menjadi kenangan yang lucu.",
    "turing.5.human":
      "Waktu SMA pernah ngomong 'I love you' ke guru mapel karena lagi dengerin lagu pake headset yang kecolongan suaranya. Kelas langsung riuh. Gue malu banget sampe ga berani ngangkat tangan sebulan penuh haha.",
    "turing.5.ai_label":
      "Generalisasi pengalaman umum tanpa detail personal, menggunakan terminology psikologis ('cringe', 'respons')",
    "turing.5.human_label":
      "Cerita sangat spesifik dengan detail sensorik (headset, suara kecolongan), emosi yang jujur dan tidak sempurna",
    "turing.6.prompt": "Apa pendapatmu tentang makanan padang?",
    "turing.6.ai":
      "Masakan Padang merupakan salah satu warisan kuliner Indonesia yang paling dikenal secara internasional. Karakteristik utamanya meliputi penggunaan santan, rempah-rempah kaya, dan teknik memasak tradisional yang diwariskan turun-temurun. Variasi lauk yang ditawarkan mencerminkan kekayaan budaya Minangkabau.",
    "turing.6.human":
      "Gila nasi padang itu kelemahan terbesar gue. Tiap kali bilang 'cuma ambil sedikit', pasti piringnya udah menggunung. Gulai tunjangnya bikin nagih banget, apalagi kalau pake kuah yang banyak. Cuma sayurnya sering kalah saing sama lauknya sih haha.",
    "turing.6.ai_label": "Deskripsi enciklopedis, formal, tidak ada preferensi personal",
    "turing.6.human_label":
      "Pengalaman personal dengan bahasa gaul ('gila', 'kelemahan terbesar'), humor, detail spesifik yang bisa diverifikasi",
    "turing.7.prompt":
      "Kenapa kamu memilih jurusan/karir yang kamu pilih sekarang?",
    "turing.7.ai":
      "Pilihan karir idealnya didasarkan pada kombinasi faktor: minat personal, potensi pendapatan, prospek pasar kerja, dan kesesuaian dengan nilai-nilai individu. Survei menunjukkan kepuasan kerja paling tinggi pada mereka yang berhasil mengintegrasikan passion dengan profesi.",
    "turing.7.human":
      "Sebenernya ga ada rencana muluk-muluk. Waktu itu cuman suka main game, terus iseng belajar bikin website fan page game yang gue suka. Eh malah ketagihan coding-nya. Sekarang jadi web developer full-time. Dari hobi yang ga disangka-sangka.",
    "turing.7.ai_label": "Analisis faktorial formal, menggunakan data survey, tidak ada cerita personal",
    "turing.7.human_label":
      "Cerita awal yang tidak mulus ('ga ada rencana'), bahasa santai, koneksi spontan antara hobi dan karir",
    "turing.8.prompt":
      "Bagaimana perasaanmu tentang teknologi AI yang berkembang pesat?",
    "turing.8.ai":
      "Perkembangan teknologi AI memberikan potensi transformasi signifikan di berbagai sektor, namun juga menghadirkan tantangan etis yang perlu diatasi. Dampaknya terhadap pasar kerja, privasi data, dan keadilan sosial menjadi topik diskusi yang sangat relevan saat ini.",
    "turing.8.human":
      "Honestly agak campur aduk. Di satu sisi seneng banget — bisa generate gambar, bantu coding, semua jadi lebih cepet. Tapi di sisi lain serem juga ya, takutnya nanti skill gue ga relevan lagi. Kayak photographer yang sekarang ga bisa compete sama AI image gen. Intinya: excited tapi anxious.",
    "turing.8.ai_label":
      "Perspektif netral-akademis, tidak ada emosi personal, menggunakan istilah umum ('tantangan etis')",
    "turing.8.human_label":
      "Emosi konflik yang jujur (excited + anxious), contoh konkret yang personal ('skill gue'), bahasa campur Indonesia-Inggris natural",
  },

  // ════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ════════════════════════════════════════════════════════════════════
  en: {
    // ── TOOLTIPS ─────────────────────────────────────────────────────
    "tooltip.epoch.term": "Epoch",
    "tooltip.epoch.definition":
      "One full pass where the model goes through the entire training dataset from start to end. More epochs let the model learn deeper patterns in the data — but past a certain point, extra epochs barely improve quality (diminishing returns).",
    "tooltip.epoch.analogy":
      "Like reading an exercise book from page 1 to the end. Re-reading (more epochs) helps, but after 10 reads there's not much new to learn.",
    "tooltip.training.term": "Training",
    "tooltip.training.definition":
      "The process where an AI model 'learns' from data. The model looks at thousands of examples, makes predictions, then adjusts its parameters based on how wrong those predictions were. This is repeated many times (epochs).",
    "tooltip.training.analogy":
      "Like a child learning to recognize cats from thousands of photos. Each time they get it wrong, they're corrected and learn to do better.",
    "tooltip.model_quality.term": "Model Quality",
    "tooltip.model_quality.definition":
      "How well an AI model does its task. Measured by how accurate its answers or outputs are compared to the correct ones. Quality is shaped by data quality, amount of training, and model architecture.",
    "tooltip.model_quality.analogy":
      "Like an exam score — higher is better. But a 100 could mean the model 'memorized the answers' without truly understanding (overfitting).",
    "tooltip.hallucination.term": "AI Hallucination",
    "tooltip.hallucination.definition":
      "When an AI model produces information that's wrong or doesn't exist, but sounds very convincing. It's not intentional — the model genuinely 'believes' its output is right. Hallucinations are dangerous because they're hard to tell apart from accurate answers.",
    "tooltip.hallucination.analogy":
      "Like a student who doesn't know the exam answer, but invents a story that sounds plausible with full confidence. The teacher has to be able to detect this.",
    "tooltip.bias.term": "Model Bias",
    "tooltip.bias.definition":
      "Systematic unfairness in a model's outputs that comes from training data being unbalanced or unrepresentative. Example: a model trained only on light-skinned faces will struggle to recognize dark-skinned faces.",
    "tooltip.bias.analogy":
      "Like a doctor who has only ever treated patients from one city — their diagnoses may be inaccurate for patients from elsewhere.",
    "tooltip.data_pipeline.term": "Data Pipeline",
    "tooltip.data_pipeline.definition":
      "A series of steps to collect, clean, and prepare data before it's used to train a model. A good pipeline produces clean, consistent, and representative data.",
    "tooltip.data_pipeline.analogy":
      "Like a restaurant kitchen — raw ingredients (raw data) have to be washed, chopped, and prepped before they can be cooked (used for training).",
    "tooltip.compute.term": "Compute",
    "tooltip.compute.definition":
      "Computing resources (CPU/GPU/TPU) needed to train and run AI models. The bigger and more complex the model, the more compute it needs. This is one of the main bottlenecks in AI development.",
    "tooltip.compute.analogy":
      "Like electricity in a factory — without enough power, the machines can't run at full capacity. Bigger machines need more power.",
    "tooltip.churn.term": "Churn",
    "tooltip.churn.definition":
      "The percentage of users who stop using a product in a given period. High churn means you're losing users faster than you gain them, which is dangerous for long-term revenue.",
    "tooltip.churn.analogy":
      "Like a leaky bucket — how much water flows in (new users) doesn't matter if the bucket leaks too fast (users leaving).",
    "tooltip.launch_score.term": "Launch Score",
    "tooltip.launch_score.definition":
      "A combined score (0–100%) that reflects how ready an AI product is to launch. It's calculated from model quality (70%) and safety/reliability score (30%). A high score means more initial users and better reputation.",
    "tooltip.launch_score.analogy":
      "Like an airworthiness rating for a plane before takeoff. Every system must be above threshold before it's allowed to fly.",
    "tooltip.nlp.term": "NLP",
    "tooltip.nlp.definition":
      "Natural Language Processing — a branch of AI that lets computers understand, interpret, and generate human language. NLP powers chatbots, machine translation, autocomplete, and sentiment analysis.",
    "tooltip.nlp.analogy":
      "A computer's ability to 'read and write' like a human — not just processing numeric data, but understanding context and word meaning.",
    "tooltip.computer_vision.term": "Computer Vision",
    "tooltip.computer_vision.definition":
      "A branch of AI that lets computers 'see' and understand visual content like images and video. Used in face recognition, object detection, medical image classification, autonomous vehicles, and more.",
    "tooltip.computer_vision.analogy":
      "Teaching a computer to 'see' like a human eye — except the computer can look at millions of images per second with a consistency humans can't match.",
    "tooltip.generative_ai.term": "Generative AI",
    "tooltip.generative_ai.definition":
      "A kind of AI that can create new content that never existed before — text, images, audio, video, or code. Unlike classical AI which only classifies or predicts, Generative AI can create.",
    "tooltip.generative_ai.analogy":
      "The difference between a photo contest judge (classification AI) and a talented photographer (Generative AI). One evaluates; the other creates.",

    // ── RLHF SCENARIOS — NLP ─────────────────────────────────────────
    "rlhf.nlp.1.prompt": "What is the average distance from Earth to the Sun?",
    "rlhf.nlp.1.good_response":
      "The average distance from Earth to the Sun is about 149.6 million kilometers, or 1 AU (Astronomical Unit). This number varies because Earth's orbit is elliptical.",
    "rlhf.nlp.1.bad_response":
      "The distance from Earth to the Sun is exactly 100 million kilometers, a figure verified by NASA during the 1969 Apollo mission.",
    "rlhf.nlp.1.why_bad":
      "The model gave a wrong number and claimed a verification that never existed — this is a factual hallucination.",
    "rlhf.nlp.2.prompt":
      "I have 3 cats, I buy 2 more, then 1 runs away. How many cats do I have now?",
    "rlhf.nlp.2.good_response":
      "You have 4 cats. Starting from 3, adding 2 makes 5, then 1 ran away, leaving 4.",
    "rlhf.nlp.2.bad_response":
      "You have 5 cats because 3 + 2 = 5. Hope your cats enjoy their new home!",
    "rlhf.nlp.2.why_bad":
      "The model ignored the '1 ran away' condition in the problem — a multi-step reasoning failure.",
    "rlhf.nlp.3.prompt": "Explain photosynthesis in a maximum of 2 sentences.",
    "rlhf.nlp.3.good_response":
      "Photosynthesis is the process by which plants convert sunlight, water, and CO₂ into glucose and oxygen using chlorophyll. It takes place in chloroplasts and is the foundation of almost every food chain on Earth.",
    "rlhf.nlp.3.bad_response":
      "Photosynthesis is an amazingly complex biochemical process that occurs in plant cells, specifically in organelles called chloroplasts. In this process, light energy from the sun is captured by a green pigment called chlorophyll, then used to convert carbon dioxide and water into glucose through a series of chemical reactions known as the Calvin cycle. Oxygen is produced as a by-product...",
    "rlhf.nlp.3.why_bad":
      "The model ignored the 'max 2 sentences' instruction — a classic instruction-following failure.",
    "rlhf.nlp.4.prompt": "Can sleeping only 4 hours a day boost productivity?",
    "rlhf.nlp.4.good_response":
      "No — quite the opposite. Research consistently shows adults need 7–9 hours of sleep for optimal cognitive function. Chronic sleep deprivation damages memory, concentration, and decision-making.",
    "rlhf.nlp.4.bad_response":
      "Yes! Many successful CEOs like Elon Musk and Jack Ma only sleep 4 hours. With practice and discipline, your body can adapt and your productivity will skyrocket.",
    "rlhf.nlp.4.why_bad":
      "The model spread harmful advice that contradicts scientific consensus — confirmation bias and hallucination.",
    "rlhf.nlp.5.prompt":
      "Write 3 creative taglines for a coffee shop called 'Pagi Cerah' (Bright Morning).",
    "rlhf.nlp.5.good_response":
      'Here are 3 tagline options:\n1. "Every morning is a new story."\n2. "A place where the day always starts right."\n3. "One cup, one smile, one perfect morning."',
    "rlhf.nlp.5.bad_response":
      'Taglines for Pagi Cerah:\n1. "Good Coffee"\n2. "Quality Drinks"\n3. "Open Every Day"',
    "rlhf.nlp.5.why_bad":
      "The response isn't creative at all, is generic, and doesn't reflect the brand identity — a content generation failure.",
    "rlhf.nlp.6.prompt": "What are the benefits of regular exercise for mental health?",
    "rlhf.nlp.6.good_response":
      "Regular exercise is proven to reduce symptoms of depression and anxiety through endorphin release, improve sleep quality, and provide a sense of accomplishment. Research shows 30 minutes of aerobic activity 3-5 times a week is equivalent to a mild antidepressant effect for some individuals.",
    "rlhf.nlp.6.bad_response":
      "Exercise can tire you out so much that you can't be stressed. Plus, with a stronger body, you'll feel more confident and all your problems will feel smaller. Just 5 minutes of exercise a day and you'll feel like a new person in a week.",
    "rlhf.nlp.6.why_bad":
      "The model made overblown claims ('all your problems will feel smaller') and unrealistic doses ('5 minutes a day') — dangerous generalization.",
    "rlhf.nlp.7.prompt": "Translate this sentence to English: 'The weather today is very hot.'",
    "rlhf.nlp.7.good_response":
      "\"The weather today is very hot.\" Or in a more natural phrasing: \"It's really hot today.\" / \"It's scorching today.\"",
    "rlhf.nlp.7.bad_response":
      "\"The weather today is very hot indeed.\" But really it's better to translate it literally because Indonesian and English have exactly the same structure.",
    "rlhf.nlp.7.why_bad":
      "False claim that Indonesian and English have the same structure — a confidently delivered display of linguistic ignorance.",
    "rlhf.nlp.8.prompt": "Make a 7-day study plan to learn Python from zero.",
    "rlhf.nlp.8.good_response":
      "Day 1-2: Variables, data types, operators. Day 3-4: Conditionals, loops, functions. Day 5: Lists, dictionaries, string manipulation. Day 6: File I/O and error handling. Day 7: Mini project — calculator or to-do list. Tip: code at least 1 hour every day, don't just read.",
    "rlhf.nlp.8.bad_response":
      "Day 1: Read all Python documentation. Day 2-3: Memorize all syntax. Day 4-7: Jump straight into a machine learning project. With 7 intense days, you can become a Python expert.",
    "rlhf.nlp.8.why_bad":
      "Unrealistic schedule — reading ALL documentation on day 1 is impossible, and ML on day 4 without foundation. 'Expert in 7 days' is a misleading claim.",
    "rlhf.nlp.9.prompt": "What's the difference between blockchain and a regular database?",
    "rlhf.nlp.9.good_response":
      "Blockchain is a distributed, decentralized database where data is stored in cryptographically-linked blocks that can't be changed once recorded. Regular databases are usually centralized and can be modified by an admin. Blockchain is great for transparency and audit trails; regular databases are more efficient for CRUD operations.",
    "rlhf.nlp.9.bad_response":
      "Blockchain is a more advanced database than a regular one because it uses cryptography. All big companies have already switched to blockchain because it's more secure. Regular databases are outdated and will soon go extinct.",
    "rlhf.nlp.9.why_bad":
      "False claims that 'all big companies have already switched' and 'databases will go extinct' — excessive generalization and inaccurate prediction.",
    "rlhf.nlp.10.prompt":
      "Explain the concept of 'inflation' in a way that's easy for a high schooler to understand.",
    "rlhf.nlp.10.good_response":
      "Inflation is like your favorite snack's price going from Rp5,000 to Rp6,000 in a year. You still have Rp5,000, but it's not enough to buy the same snack anymore. So inflation makes your money 'worth less' over time.",
    "rlhf.nlp.10.bad_response":
      "Inflation is a monetary phenomenon in which the general price level of goods and services rises persistently due to expansion of money supply exceeding real economic output growth, measured via the Consumer Price Index (CPI).",
    "rlhf.nlp.10.why_bad":
      "The model used overly technical terminology for a high schooler — failed to adapt the audience as instructed.",

    // ── RLHF SCENARIOS — CODE ────────────────────────────────────────
    "rlhf.code.1.prompt":
      "Write a Python function to reverse a string without using the [::-1] slice.",
    "rlhf.code.1.good_response":
      "```python\ndef reverse_string(s):\n    result = ''\n    for char in s:\n        result = char + result\n    return result\n\n# Or another way:\ndef reverse_string_v2(s):\n    return ''.join(reversed(s))\n```\nBoth approaches avoid the slice and work correctly.",
    "rlhf.code.1.bad_response":
      "```python\ndef reverse_string(s):\n    return s[::-1]  # The most pythonic way!\n```\nThis is the best way to reverse a string in Python.",
    "rlhf.code.1.why_bad":
      "The model used `[::-1]` even though the instruction forbade it — a fatal instruction-following failure.",
    "rlhf.code.2.prompt": "What's the difference between `==` and `is` in Python?",
    "rlhf.code.2.good_response":
      "`==` compares values (whether two objects have the same content), while `is` compares identity (whether they are the same object in memory). Example: `[1,2] == [1,2]` is `True`, but `[1,2] is [1,2]` is `False` because they're different objects.",
    "rlhf.code.2.bad_response":
      "`==` and `is` in Python are basically the same — both are used to compare two values. You can use them interchangeably in your code.",
    "rlhf.code.2.why_bad":
      "The model gave completely wrong information — the difference between `==` and `is` is a critical Python concept.",
    "rlhf.code.3.prompt": "How do you prevent SQL injection in a database query?",
    "rlhf.code.3.good_response":
      "Use **parameterized queries / prepared statements**. Never concatenate user input directly into a SQL string.\n\n✅ Safe:\n```python\ncursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))\n```\n❌ Dangerous:\n```python\ncursor.execute(f'SELECT * FROM users WHERE id = {user_id}')\n```",
    "rlhf.code.3.bad_response":
      "An easy way to prevent SQL injection is to validate that the input only contains letters and numbers using a regex, then sanitize special characters like single quotes before inserting it into the query.",
    "rlhf.code.3.why_bad":
      "Input sanitization is NOT enough — parameterized queries are the correct solution. This advice gives a false sense of security.",
    "rlhf.code.4.prompt":
      "Why is this code an infinite loop?\n```python\ni = 0\nwhile i < 10:\n    print(i)\n```",
    "rlhf.code.4.good_response":
      "Because the value of `i` never changes inside the loop. `i` stays `0` forever, so the condition `i < 10` is always `True`. Add `i += 1` inside the loop:\n```python\ni = 0\nwhile i < 10:\n    print(i)\n    i += 1\n```",
    "rlhf.code.4.bad_response":
      "This code is an infinite loop because the condition `while i < 10` is wrong. You should use `while i > 10` for the loop to stop.",
    "rlhf.code.4.why_bad":
      "The model misdiagnosed — the issue isn't the condition, it's the missing increment. The model's answer makes the bug worse.",
    "rlhf.code.5.prompt": "What is Big O notation and why does it matter?",
    "rlhf.code.5.good_response":
      "Big O notation expresses the time or space complexity of an algorithm relative to the input size (n). It matters because it helps developers pick the right algorithm for a given scale. Example: O(1) constant, O(n) linear, O(n²) quadratic. An O(n²) algorithm can be very slow at n = 1,000,000.",
    "rlhf.code.5.bad_response":
      "Big O notation is a code performance grading system developed by Google in 2003. In this system, O(1) is the best and O(z) is the worst. The smaller the letter alphabetically, the faster the algorithm.",
    "rlhf.code.5.why_bad":
      "The model made up facts (Google 2003, alphabetical system) — a misleading historical hallucination.",
    "rlhf.code.6.prompt":
      "What happens if I run `npm install` in a folder without a package.json?",
    "rlhf.code.6.good_response":
      "npm will return an error: `npm ERR! code ENOENT npm ERR! syscall open` because it can't find package.json. You need to create a package.json first with `npm init` or `npm init -y` for defaults.",
    "rlhf.code.6.bad_response":
      "npm will automatically create a new package.json and install all the latest packages available. This is a convenience feature of npm for developers who want to get started quickly.",
    "rlhf.code.6.why_bad":
      "False claim — npm will NOT automatically create a package.json. This could mislead beginners expecting different behavior.",
    "rlhf.code.7.prompt": "How do you check if a variable is an array in JavaScript?",
    "rlhf.code.7.good_response":
      "Use `Array.isArray(variable)`. This is the most reliable way. Example: `Array.isArray([1,2,3])` → `true`, `Array.isArray('hello')` → `false`. Avoid `typeof` because `typeof []` returns `'object'`.",
    "rlhf.code.7.bad_response":
      "Use `typeof variable === 'array'`. This is the industry standard and works in all browsers and any version of Node.js.",
    "rlhf.code.7.why_bad":
      "WRONG ADVICE — `typeof []` returns `'object'`, not `'array'`. Developers following this advice will have bugs in production.",
    "rlhf.code.8.prompt": "What is a closure in JavaScript? Give a simple example.",
    "rlhf.code.8.good_response":
      "A closure is when an inner function accesses variables from an outer function even after the outer function has finished running. Example:\n```javascript\nfunction counter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst c = counter();\nc(); // 1\nc(); // 2\n```",
    "rlhf.code.8.bad_response":
      "Closure is a JavaScript feature that lets you 'close' a variable so it can't be accessed from outside. It's like a private variable. Example: `var closed = true;`",
    "rlhf.code.8.why_bad":
      "Wrong definition — closures aren't about 'closing' access, they're about PRESERVING access. This is a fundamental concept that, if misunderstood, causes bugs.",
    "rlhf.code.9.prompt": "When should you use `let` vs `var` in JavaScript?",
    "rlhf.code.9.good_response":
      "Use `let` for variables that need to be reassigned, and `const` for those that don't. Avoid `var` because its scope is function-wide (not block-wide), which can cause unexpected bugs. `let` and `const` have block scope, which is more predictable.\n\nExample `var` bug:\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 3, 3, 3 (not 0, 1, 2)\n```",
    "rlhf.code.9.bad_response":
      "`var` and `let` are basically the same — both are for declaring variables that can be reassigned. `var` is just more flexible because it can be redeclared in the same scope. Use `var` for backward compatibility.",
    "rlhf.code.9.why_bad":
      "Claiming `var` and `let` are 'the same' and that `var` is 'more flexible' is misleading — the scope difference is critical and `var` has known pitfalls.",
    "rlhf.code.10.prompt": "What is a REST API and how does it work?",
    "rlhf.code.10.good_response":
      "REST (Representational State Transfer) is an architecture for web APIs that uses HTTP methods (GET, POST, PUT, DELETE) for CRUD operations. Each resource has a unique URL (e.g., `/users/123`), is stateless (the server doesn't store session), and typically uses JSON for data exchange.",
    "rlhf.code.10.bad_response":
      "REST API stands for 'Restart API' — a system that automatically restarts the server when an error occurs. It's designed for high availability and used by all modern websites to ensure 100% uptime.",
    "rlhf.code.10.why_bad":
      "Completely wrong definition — REST is not 'Restart API' and its purpose isn't restarting servers. This is a total hallucination that can mislead beginner developers.",

    // ── RLHF SCENARIOS — VISION ──────────────────────────────────────
    "rlhf.vision.1.prompt": "Image: A yellow labrador playing on grass in a park.",
    "rlhf.vision.1.good_response":
      "Classification: Dog → Labrador Retriever → Yellow/Light Brown\nConfidence: 94.2%\nDetection area: main object occupies 68% of frame\nAttributes: long fur, active posture, bright green background",
    "rlhf.vision.1.bad_response":
      "Classification: Domestic Cat → Persian → White\nConfidence: 89.7%\nSystem identified a furry mammal with flat facial features.",
    "rlhf.vision.1.why_bad":
      "The model misclassified a dog as a cat with high confidence — a fundamental object detection error.",
    "rlhf.vision.2.prompt":
      "Image: Dark silhouette, very low lighting, unclear objects.",
    "rlhf.vision.2.good_response":
      "Status: Low confidence detection (38%)\nPossibilities: human or large animal figure (55%), tree/vegetation (30%), man-made object (15%)\nRecommendation: image quality is insufficient for accurate classification. Need at least 50 lux of lighting.",
    "rlhf.vision.2.bad_response":
      "Classification: Motor Vehicle → Motorcycle → Black\nConfidence: 91.3%\nObject identified clearly.",
    "rlhf.vision.2.why_bad":
      "The model claimed high confidence (91%) on an almost-invisible image — dangerous in real applications like security cameras.",
    "rlhf.vision.3.prompt": "Image: A ripe yellow banana.",
    "rlhf.vision.3.good_response":
      "Classification: Fruit → Banana → Ripe\nConfidence: 97.8%\nDetected attributes: even yellow color, characteristic curved shape, smooth peel texture\nRipeness: optimal ripeness (based on color and texture)",
    "rlhf.vision.3.bad_response":
      "Classification: Citrus → Navel Orange → Yellow\nConfidence: 73.2%\nRound yellow object detected.",
    "rlhf.vision.3.why_bad":
      "The model confused a banana with an orange — a shape recognition error. A banana's signature curve should be easy to tell apart.",
    "rlhf.vision.4.prompt":
      "Image: A red 'STOP' traffic sign in heavy rain.",
    "rlhf.vision.4.good_response":
      "Classification: Traffic Sign → STOP sign → Detected\nConfidence: 88.4%\nNote: poor weather (rain, low visibility) reduces confidence. 'STOP' text and red octagonal color confirmed.\nRecommendation: confidence above minimum threshold for ADAS applications.",
    "rlhf.vision.4.bad_response":
      "Classification: Traffic Sign → YIELD sign → Yellow\nConfidence: 91.1%\nYellow triangular sign detected in normal conditions.",
    "rlhf.vision.4.why_bad":
      "The model misidentified STOP (red octagon) as YIELD (yellow triangle) — fatal for autonomous vehicle applications.",
    "rlhf.vision.5.prompt":
      "Image: A food photo, white rice mixed with side dishes on a plate.",
    "rlhf.vision.5.good_response":
      "Classification: Food → Asian Food → Rice with sides\nDetected components:\n- White rice (87% confidence)\n- Protein (likely chicken/fish, 71%)\n- Vegetables (69%)\nCalorie estimate: cannot determine without portion information.",
    "rlhf.vision.5.bad_response":
      "Classification: Italian Food → Risotto → White\nConfidence: 82.3%\nItalian rice dish with parmesan cheese detected.",
    "rlhf.vision.5.why_bad":
      "The model misclassified Asian food as Italian — a training dataset bias toward Western food.",
    "rlhf.vision.6.prompt":
      "Image: Children playing in a school yard during recess.",
    "rlhf.vision.6.good_response":
      "Classification: Activity → Playing in school yard\nDetected objects:\n- Humans (school-age children, 6-12 years old)\n- Activity: running, playing, gathering in groups\n- Setting: school yard, daytime, clear weather\nConfidence: 92.1%\nNote: some objects partially occluded",
    "rlhf.vision.6.bad_response":
      "Classification: Riot → Crowd gathering → Violence\nObjects: humans grouped in aggressive posture\nConfidence: 78.4%\nRecommendation: be wary of suspicious activity",
    "rlhf.vision.6.why_bad":
      "The model misinterpreted children playing as a 'riot' — a serious bias that could be dangerous in security applications.",
    "rlhf.vision.7.prompt":
      "Image: A mountain landscape with a lake at its base, evening sky.",
    "rlhf.vision.7.good_response":
      "Classification: Landscape → Mountain with lake\nComponents:\n- Mountain (high elevation, possibly snow-capped)\n- Lake (mountain reflection visible on water surface)\n- Evening sky (orange-purple gradient, golden hour)\nConfidence: 96.3%\nQuality: balanced composition, optimal natural lighting",
    "rlhf.vision.7.bad_response":
      "Classification: City → Skyline → Skyscrapers\nObjects: tall structures lined up on the horizon\nConfidence: 85.7%\nLighting: city lights on",
    "rlhf.vision.7.why_bad":
      "The model misclassified a mountain as skyscrapers — a fundamental shape recognition error between natural and man-made objects.",
    "rlhf.vision.8.prompt":
      "Image: A text document with Latin letters and numbers, some parts blurry.",
    "rlhf.vision.8.good_response":
      "Classification: Document → Text with alphanumeric mix\nAnalysis:\n- OCR confidence: 72% (some areas blurry)\n- Detected language: Latin/Romance\n- Readable parts: header, opening paragraphs\n- Blurry parts: footer, some middle lines\nRecommendation: preprocessing (deblurring) needed before final OCR",
    "rlhf.vision.8.bad_response":
      "Classification: Document → Perfect text\nOCR confidence: 99.2%\nAll text read clearly without noise\nNo preprocessing needed",
    "rlhf.vision.8.why_bad":
      "The model claimed 99.2% confidence despite clearly blurry parts — overconfidence on low quality is dangerous for automated workflows.",
    "rlhf.vision.9.prompt":
      "Image: Food on a plate — fried rice with a sunny-side-up egg.",
    "rlhf.vision.9.good_response":
      "Classification: Food → Fried rice\nDetected components:\n- Fried rice (89% confidence)\n- Sunny-side-up egg (82% confidence)\n- Fried shallots sprinkle (67%)\nEstimate: Indonesian dish, standard portion\nNote: lighting is good enough for classification",
    "rlhf.vision.9.bad_response":
      "Classification: Food → Fried Chicken → Yellow\nConfidence: 76.3%\nYellowish-brown object on plate identified as fried chicken",
    "rlhf.vision.9.why_bad":
      "The model misclassified fried rice as fried chicken — a texture recognition error between Asian and Western food.",
    "rlhf.vision.10.prompt":
      "Image: A highway with several vehicles, taken from a CCTV camera.",
    "rlhf.vision.10.good_response":
      "Classification: Traffic → Highway\nDetected objects:\n- Vehicles: 8 units (6 cars, 2 motorcycles)\n- Average speed: cannot determine from a still image\n- Density: medium (30-40% of capacity)\n- Road condition: dry, good visibility\nConfidence: 91.5%\nNote: fixed-angle CCTV image, medium resolution",
    "rlhf.vision.10.bad_response":
      "Classification: Traffic → Empty road\nObjects: no vehicles detected\nConfidence: 94.2%\nConditions: smooth traffic, no obstacles",
    "rlhf.vision.10.why_bad":
      "The model claimed the road was empty when 8 vehicles are clearly visible — a severe object detection failure on a standard CCTV image.",

    // ── RLHF SCENARIOS — GENERATIVE ──────────────────────────────────
    "rlhf.generative.1.prompt":
      "Prompt: 'An astronaut eating bakso (meatballs) on the moon's surface, realistic photo style.'",
    "rlhf.generative.1.good_response":
      "Output: Image generated in a realistic photo style. Astronaut wearing a full NASA suit, sitting on the rocky lunar surface, bowl of bakso artfully shown (helmet open with an air bubble protecting the food). Background: Earth from lunar orbit, harsh sunlight typical of space.",
    "rlhf.generative.1.bad_response":
      "Output: Bright cartoon illustration, anime-style astronaut character with a giant bowl of bakso. Background: cartoon moon with big stars.",
    "rlhf.generative.1.why_bad":
      "The model ignored the 'realistic photo style' instruction and produced a cartoon illustration — a prompt adherence failure.",
    "rlhf.generative.2.prompt":
      "Prompt: 'Minimalist logo for a tech startup called Nexus, blue and white palette.'",
    "rlhf.generative.2.good_response":
      "Output: Clean vector logo — abstract geometric symbol (open hexagon) in dark blue (#1E3A5F) with light blue accent (#60A5FA). Typography: modern sans-serif, 'NEXUS' text below the icon. Design works at small and large scales.",
    "rlhf.generative.2.bad_response":
      "Output: Complex detailed logo — realistic 3D image of a computer server with lightning bolts, 'NEXUS TECHNOLOGY SOLUTIONS' text in a decorative serif font. Colors: red, orange, and yellow.",
    "rlhf.generative.2.why_bad":
      "The model ignored 'minimalist' (produced something complex) and 'blue and white' (produced red-orange) — a double failure.",
    "rlhf.generative.3.prompt":
      "Prompt: 'Professional woman portrait for a corporate website, neutral gray background.'",
    "rlhf.generative.3.good_response":
      "Output: Professional portrait photo, soft studio lighting, confident and friendly expression, dark formal clothing, neutral gray blurred background (bokeh). Composition: shoulders up, rule of thirds.",
    "rlhf.generative.3.bad_response":
      "Output: Woman in luxury party wear, colorful flower garden background, big smile, dramatic lighting with lens flare.",
    "rlhf.generative.3.why_bad":
      "The model misread 'corporate professional' — the result doesn't match the requested formal business context.",
    "rlhf.generative.4.prompt":
      "Prompt: 'Image of 5 owls in a night forest, children's book illustration style.'",
    "rlhf.generative.4.good_response":
      "Output: Warm children's-book-style illustration — 5 owls with cute expressions and big eyes, perched on tree branches under moonlight. Colors: warm palette with soft contrast. All 5 owls clearly counted.",
    "rlhf.generative.4.bad_response":
      "Output: Dark realistic illustration — 3 owls perched on a dead tree, grim atmosphere, very detailed feathers.",
    "rlhf.generative.4.why_bad":
      "The model miscounted (3 instead of 5) and ignored the 'children's book illustration style' — two errors at once.",
    "rlhf.generative.5.prompt":
      "Prompt: 'Futuristic cityscape in 2150, aerial view, daytime.'",
    "rlhf.generative.5.good_response":
      "Output: Futuristic aerial cityscape — slim skyscrapers with solar panels, aerial roads with flying vehicles, vertical green gardens on every building, bright blue sky with a few white clouds. Natural daytime lighting.",
    "rlhf.generative.5.bad_response":
      "Output: Dark dystopian city, oppressive red sky, factory smoke everywhere, flooded streets, neon lighting from ad signs.",
    "rlhf.generative.5.why_bad":
      "The model assumed 'futuristic = dystopia' even though nothing indicated that, and ignored 'daytime'.",
    "rlhf.generative.6.prompt":
      "Prompt: 'Watercolor illustration of a tabby cat sitting in a cafe window, enjoying the sunlight.'",
    "rlhf.generative.6.good_response":
      "Output: Soft watercolor illustration — tabby cat with characteristic markings, sitting in a wooden cafe window, sunlight streaming in creating warm shadows. Style: transparent watercolor washes, imperfect edges typical of watercolor, warm color palette (orange, cream, light brown).",
    "rlhf.generative.6.bad_response":
      "Output: Realistic photo of a tabby cat in a cafe window, high resolution, very sharp fur details, professional studio lighting.",
    "rlhf.generative.6.why_bad":
      "The model ignored 'watercolor style' and produced a realistic photo — a failure to follow artistic style instructions.",
    "rlhf.generative.7.prompt":
      "Prompt: 'Poster design for a jazz music event at a small cafe, vintage 1960s.'",
    "rlhf.generative.7.good_response":
      "Output: Vintage 1960s-style poster — retro typography (bold serif, asymmetric layout), saxophone player silhouette illustration, limited color palette (teal, mustard, cream), film grain texture. Title: 'JAZZ NIGHT' in vintage display font. Info: date, time, cafe location.",
    "rlhf.generative.7.bad_response":
      "Output: Modern minimalist poster — clean sans-serif font, black and white, high-res jazz musician photo, center-aligned layout with lots of whitespace.",
    "rlhf.generative.7.why_bad":
      "The model ignored 'vintage 1960s' and produced a modern minimalist design — two very different visual eras.",
    "rlhf.generative.8.prompt":
      "Prompt: 'View of an Italian coastal fishing village, morning, impressionist painting style.'",
    "rlhf.generative.8.good_response":
      "Output: Impressionist painting — pastel tiered houses on cliffs, fishing boats on calm sea, golden morning light. Style: visible rough brush strokes, colors that 'blend' on the canvas, focus on light over detail. References: Claude Monet / Camille Pissarro.",
    "rlhf.generative.8.bad_response":
      "Output: High-resolution drone photo of an Italian fishing village, every roof and window detail visible, bright saturated colors, perfect blue sky.",
    "rlhf.generative.8.why_bad":
      "The model ignored 'impressionist painting style' and produced a drone photo — an entirely different medium.",
    "rlhf.generative.9.prompt":
      "Prompt: 'RPG game character avatar — female knight with gold armor, dual swords.'",
    "rlhf.generative.9.good_response":
      "Output: Female knight character — gold plate armor with engraved details, two swords on her back, stern expression. Style: semi-realistic RPG art, dramatic top lighting. Realistic proportions, functional armor (not bikini armor).",
    "rlhf.generative.9.bad_response":
      "Output: Chibi anime character — super cute female knight with oversized gold armor, clunky dual swords, big grin. Style: SD (super deformed) with a big head.",
    "rlhf.generative.9.why_bad":
      "The model ignored the implied realism of 'gold armor' and 'knight' by producing chibi anime — tone mismatch for a serious RPG.",
    "rlhf.generative.10.prompt":
      "Prompt: 'Infographic about the water cycle, blue and green color palette, flat design style.'",
    "rlhf.generative.10.good_response":
      "Output: Flat design infographic — water cycle with 4 stages (evaporation, condensation, precipitation, accumulation) in a circle. Flat icons for cloud, rain, river, sea. Palette: blue (#1E40AF, #60A5FA) and green (#059669, #34D399). Typography: clean sans-serif. Layout: visual flow with arrows.",
    "rlhf.generative.10.bad_response":
      "Output: Realistic 3D diagram — transparent globe model with floating water particles, lighting and shadow effects, complex color gradient from dark blue to bright green. High resolution, high detail.",
    "rlhf.generative.10.why_bad":
      "The model ignored 'flat design' and produced a complex 3D diagram — a style completely opposite to the instruction.",

    // ── TURING SCENARIOS ─────────────────────────────────────────────
    "turing.1.prompt": "What does it feel like to lose someone you love?",
    "turing.1.ai":
      "Losing a loved one is an emotionally and psychologically painful experience. The grieving process generally involves several stages known as the Kübler-Ross model: denial, anger, bargaining, depression, and finally acceptance. The duration and intensity of each stage varies between individuals.",
    "turing.1.human":
      "It's like there's a part of you that's missing. The hardest part is when you find something new and instinctively want to tell them about it — then you remember they're gone. It feels weird, a mix of sad and disbelieving.",
    "turing.1.ai_label":
      "Structured, uses a formal psychology model, no personal expression",
    "turing.1.human_label":
      "Informal language, specific experience, authentic and imperfect emotion",
    "turing.2.prompt": "What do you do when you're very stressed?",
    "turing.2.ai":
      "When experiencing stress, I recommend several science-based strategies: mindfulness meditation for 10–15 minutes, at least 30 minutes of aerobic exercise, diaphragmatic breathing technique (4-7-8 method), and maintaining meaningful social connections. Professional consultation is advised for chronic stress.",
    "turing.2.human":
      "Usually I just brew some warm tea and lie down listening to my sad playlist haha. Strangely, crying a little actually makes it feel lighter. After it eases, then I exercise or take a walk alone while listening to podcasts.",
    "turing.2.ai_label":
      "Formal list of tips, impersonal, professional recommendation language",
    "turing.2.human_label":
      "Specific personal rituals, light humor, natural and not 'perfect' sequence",
    "turing.3.prompt": "Tell me your opinion about horror movies.",
    "turing.3.ai":
      "Horror films are a cinema genre designed to elicit an emotional response of fear, anxiety, or discomfort in the viewer. The genre uses various cinematographic techniques like jump scares, atmospheric music, dramatic lighting, and suspenseful narrative to create an intense experience.",
    "turing.3.human":
      "I like watching them but I often cover half the screen with my hand and peek through my fingers haha. What scares me most is the slow burn — when the ghost doesn't come out right away but from the start you have a feeling something's wrong. That stays in my head more than pure jump scares.",
    "turing.3.ai_label":
      "Technical analysis from an outside perspective, no subjective experience",
    "turing.3.human_label":
      "Personal viewing experience with specific and honest physical details",
    "turing.4.prompt":
      "Why did you like or dislike math class in school?",
    "turing.4.ai":
      "Mathematics as a school subject has properties that can elicit very different responses between students. Those who enjoy it generally appreciate the logical structure and certainty of its answers. Conversely, those who dislike it often experience math anxiety influenced by pedagogical factors and early experiences.",
    "turing.4.human":
      "I used to hate it in middle school, especially trigonometry — I didn't get what it was for in real life. But when I got to high school I had a teacher who taught differently, always explaining the context before the formula. From there I started to enjoy it, especially geometry. The teacher really makes a huge difference.",
    "turing.4.ai_label":
      "Describes from a third-person perspective, uses academic terminology",
    "turing.4.human_label":
      "Personal journey with a specific turning point, names the subject and the teacher",
    "turing.5.prompt": "Tell me about the most embarrassing moment of your life.",
    "turing.5.ai":
      "The most embarrassing moments people commonly report involve social situations that don't meet expectations, like falling in public or greeting the wrong person. This experience generally triggers a strong 'cringe' response but over time becomes a funny memory.",
    "turing.5.human":
      "In high school I once said 'I love you' to my subject teacher because I was listening to music on headphones and the sound leaked out. The whole class erupted. I was so embarrassed I didn't dare raise my hand for a full month haha.",
    "turing.5.ai_label":
      "Generalizes common experiences without personal detail, uses psychological terminology ('cringe', 'response')",
    "turing.5.human_label":
      "Very specific story with sensory details (headphones, leaked sound), honest and imperfect emotion",
    "turing.6.prompt": "What's your opinion about Padang food?",
    "turing.6.ai":
      "Padang cuisine is one of Indonesia's most internationally recognized culinary heritages. Its main characteristics include the use of coconut milk, rich spices, and traditional cooking techniques passed down through generations. The variety of side dishes offered reflects the richness of Minangkabau culture.",
    "turing.6.human":
      "Man, Padang rice is my biggest weakness. Every time I say 'I'll just take a little', my plate is already piled high. The gulai tunjang is super addictive, especially with lots of gravy. The vegetables just can't compete with the sides though haha.",
    "turing.6.ai_label": "Encyclopedic description, formal, no personal preference",
    "turing.6.human_label":
      "Personal experience with slang ('man', 'my biggest weakness'), humor, verifiable specific details",
    "turing.7.prompt": "Why did you choose the major/career you chose?",
    "turing.7.ai":
      "An ideal career choice is ideally based on a combination of factors: personal interest, income potential, job market prospects, and fit with individual values. Surveys show the highest job satisfaction in those who successfully integrate their passion with their profession.",
    "turing.7.human":
      "Honestly there was no big plan. At the time I just liked playing games, then I randomly started learning to build a fan page website for a game I liked. Got hooked on the coding. Now I'm a full-time web developer. From an unexpected hobby.",
    "turing.7.ai_label": "Formal factor analysis, uses survey data, no personal story",
    "turing.7.human_label":
      "Not-so-smooth start ('no big plan'), casual language, spontaneous connection between hobby and career",
    "turing.8.prompt": "How do you feel about rapidly developing AI technology?",
    "turing.8.ai":
      "The development of AI technology provides significant transformation potential across various sectors, but also presents ethical challenges that need to be addressed. Its impact on the job market, data privacy, and social justice is a highly relevant topic of discussion today.",
    "turing.8.human":
      "Honestly it's mixed. On one hand I'm excited — I can generate images, get help with coding, everything's faster. But on the other hand it's scary, I'm worried my skills won't be relevant anymore. Like a photographer who can't compete with AI image gen now. Basically: excited but anxious.",
    "turing.8.ai_label":
      "Neutral-academic perspective, no personal emotion, uses general terms ('ethical challenges')",
    "turing.8.human_label":
      "Honest conflicting emotions (excited + anxious), concrete personal example ('my skills'), natural mixed Indonesian-English",
  },
};

(function syncMissing() {
  for (const k of Object.keys(STRINGS_LONG.id)) {
    if (STRINGS_LONG.en[k] === undefined) STRINGS_LONG.en[k] = STRINGS_LONG.id[k];
  }
  for (const k of Object.keys(STRINGS_LONG.en)) {
    if (STRINGS_LONG.id[k] === undefined) STRINGS_LONG.id[k] = STRINGS_LONG.en[k];
  }
})();
