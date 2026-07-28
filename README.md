# Portfolio Sefni Marcella Pratiwi (Vanilla JS & Claymorphism)

Portfolio web interaktif Sefni Marcella Pratiwi (Mahasiswa Pendidikan Teknologi Informasi UNESA, IPK 3.88) menggunakan **100% Vanilla Web Technologies** (HTML5, Vanilla CSS3, dan Vanilla JavaScript ES6+).

Website ini dapat langsung di-deploy ke **GitHub Pages** tanpa perlu proses build (`npm`, `webpack`, `vite`, dll).

---

## 🚀 Fitur Utama
1. **100% Vanilla Stack**: Bebas dari ketergantungan framework heavy (React/Vue/Node.js). Sangat cepat dan ringan.
2. **Claymorphic UI System**: Desain modern berbahan dasar efek clay 3D, lengkap dengan mode Gelap/Terang (Dark/Light Mode).
3. **Web Audio Synthesizer**: Sound FX interaktif berbasis `Web Audio API` (dapat dimatikan via tombol di navbar).
4. **Interactive Skill & Productivity Simulator**: Simulator XP dan level produktivitas real-time.
5. **Interactive Quiz**: Quiz pilihan ganda seputar administrasi data.
6. **Canvas Confetti Particle System**: Efek partikel selebrasi 60 FPS menggunakan HTML5 `<canvas>`.
7. **Responsive & Accessible**: Tampilan optimal di semua perangkat (Desktop, Tablet, Mobile).

---

## 📂 Struktur Project
```
/
├── index.html          # Halaman utama (HTML5 Semantic)
├── css/
│   └── styles.css      # Styling lengkap & Claymorphic Design Tokens (Vanilla CSS)
├── js/
│   └── main.js         # Logika interaktif & Audio Synthesizer (Vanilla JS ES6+)
├── assets/
│   └── images/         # Asset gambar avatar & karya
├── .nojekyll           # Mencegah Jekyll mengabaikan file di GitHub Pages
├── .gitignore          # Konfigurasi mengabaikan file sementara
└── README.md           # Dokumentasi project
```

---

## 📌 Cara Deploy ke GitHub Pages

### Langkah 1: Push Project ke Repository GitHub
1. Buka terminal di folder project ini.
2. Inisialisasi Git dan commit perubahan:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio Vanilla JS"
   ```
3. Hubungkan ke repository GitHub milik Anda (buat repository baru di GitHub bernama `sefni-portfolio` atau sejenisnya):
   ```bash
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   git push -u origin main
   ```

### Langkah 2: Aktifkan GitHub Pages
1. Masuk ke halaman repository Anda di GitHub (`https://github.com/USERNAME/REPOSITORY-NAME`).
2. Klik tab **Settings** di bagian atas.
3. Pada menu sebelah kiri, pilih **Pages**.
4. Di bagian **Build and deployment** -> **Source**, pilih **Deploy from a branch**.
5. Di bagian **Branch**, pilih `main` dan folder `/ (root)`.
6. Klik **Save**.
7. Tunggu 1 - 2 menit, link website portofolio Anda akan aktif di:
   `https://USERNAME.github.io/REPOSITORY-NAME/`

---

## 💻 Cara Menjalankan Secara Lokal
Cukup buka file `index.html` secara langsung di browser favorit Anda, atau gunakan extension Live Server di VS Code. Tidak memerlukan perintah `npm install` atau `npm start`.
