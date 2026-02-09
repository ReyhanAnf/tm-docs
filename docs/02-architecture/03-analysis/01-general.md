---
title: 'Umum'
slug: /talents-mapping/2026-q1-technical-specification-document/arsitektur/umum
---

| **Fitur Bisnis Baru (To-Be)** | **Kondisi Database Lama (As-Is)** | **Gap / Masalah** |
| --- | --- | --- |
| **4 Pintu Masuk Berbeda** (Organic, Practitioner, Affiliate, Influencer) | `utm_source`, `utm_medium` di tabel `users` & `transaction`. | UTM hanya string teks untuk tracking, tidak bisa mengontrol *logic* (diskon otomatis, skip halaman, produk eksklusif). Kita butuh entitas `acquisition_channels`. |
| **Produk Eksklusif** (Hanya Praktisi bisa beli "PSS GRIT") | Tabel `product` bersifat *flat* (semua aktif bisa dilihat semua orang). | Tidak ada mekanisme pembatasan produk berdasarkan *channel* masuk. |
| **Bundling Otomatis** (TMA + Konsultasi di flow Praktisi) | Tabel `product` berdiri sendiri. | Tidak ada struktur *hard-bundle* yang otomatis masuk keranjang saat *flow* tertentu dipilih. |
| **Logic Diskon Dinamis** (Member Affiliate 8%, Influencer via Kode) | Tabel `discounts` dan `vouchers`. | Struktur diskon lama bersifat manual (input kode). Sistem baru butuh diskon yang *auto-apply* berdasarkan referal URL tanpa input kode (untuk Affiliate & Praktisi). |
| **Upselling Berjenjang** (Tier 1 & Tier 2) | Tidak ada. | Tidak ada relasi di database yang mendefinisikan: "Jika beli A, tawarkan B dengan harga X". |
