# UTS-WEB-AHMAD-NAUFAL-RIFAAH

Interactive Personal Portfolio / Dashboard Web Page — dibuat untuk Ujian Tengah Semester
mata kuliah **Pemrograman Web**, Program Studi Sistem Informasi, Universitas Nusantara PGRI Kediri.

**Nama:** Ahmad Naufal Rifa'ah
**Bidang:** System Administrator · Database Administrator · Information Security Analyst

## 🔗 Tautan

- **Live Demo (GitHub Pages):** `https://ahnaufal.github.io/UTS-WEB-AHMAD-NAUFAL-RIFAAH/` *(isi setelah deploy)*
- **Repository:** `https://github.com/ahnaufal14/UTS-WEB-AHMAD-NAUFAL-RIFAAH` *(isi setelah dibuat)*

## 📖 Deskripsi Proyek

Website ini adalah portfolio profesional interaktif bertema dashboard/terminal, dirancang untuk
mencerminkan profil seseorang yang bekerja di bidang infrastruktur IT dan keamanan sistem. Judul
section ditulis sebagai perintah terminal (mis. `$ whoami`, `$ cat skills.conf`) untuk menyesuaikan
nuansa dengan dunia kerja system administrator.

## ✨ Fitur

1. **Semantik HTML5** — struktur menggunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
   `<aside>`, dan `<footer>` secara konsisten, dengan meta tag lengkap (charset, viewport, description).
2. **Tailwind CSS** sebagai CSS framework utama, dikombinasikan dengan `css/style.css` kustom untuk
   desain tema terminal/dashboard yang responsif di Desktop, Tablet, dan Mobile.
3. **Kalkulator Estimasi Uptime SLA** — fitur JavaScript yang menerima input downtime (menit) dan
   periode (hari), menghitung persentase uptime, lalu menampilkan tingkatan SLA (Two/Three/Four/Five
   Nines) langsung ke DOM.
4. **Dark / Light Mode Toggle** — mengubah tema tampilan dan menyimpan preferensi pengguna di
   `localStorage`.
5. **Filter & Search** pada daftar sertifikat/proyek — pencarian teks dan filter kategori (Sertifikat /
   Proyek) secara real-time memanipulasi DOM.
6. **Validasi Form Kontak** — validasi nama, format email, dan panjang pesan sebelum form "dikirim",
   lengkap dengan pesan error per-kolom dan status sukses/gagal.

## 📁 Struktur Folder

```
UTS-WEB-AHMAD-NAUFAL-RIFAAH/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
│   └── avatar.svg
└── README.md
```

## 🚀 Cara Deploy ke GitHub Pages

1. Buat repository publik baru bernama `UTS-WEB-AHMAD-NAUFAL-RIFAAH` di GitHub.
2. Push seluruh isi folder ini ke repository tersebut (lakukan commit bertahap, bukan sekali commit besar).
3. Buka **Settings → Pages**, pilih branch `main` dan folder `/root`, lalu simpan.
4. Tunggu beberapa menit, lalu akses melalui `https://ahnaufal.github.io/UTS-WEB-AHMAD-NAUFAL-RIFAAH/`.
5. Tempelkan URL live tersebut ke bagian **Tautan** di README ini.

## 🛠️ Teknologi

- HTML5 (semantic)
- Tailwind CSS (CDN) + custom CSS
- Vanilla JavaScript (ES6, DOM manipulation, event listeners)
- Google Fonts: IBM Plex Sans & IBM Plex Mono
