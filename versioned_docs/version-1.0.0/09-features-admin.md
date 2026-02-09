---
id: features-admin
title: Admin & Back-office
sidebar_position: 9
---

# Admin & Back-office Features

Halaman ini menjelaskan fitur-fitur yang tersedia di panel Admin (Dashboard) yang digunakan oleh internal team Talents Mapping.

**Theme**: Metronic by Keenthemes (Livewire Components).

## 1. User Assessment Management

Admin memiliki kontrol penuh terhadap hasil asesmen user retail.

### Fitur Utama:
*   **Monitoring**: Melihat daftar user yang sudah/sedang mengerjakan asesmen.
*   **Single Download**:
    *   Mengunduh laporan PDF per user.
    *   Trigger `regenerate` report ke API eksternal jika file belum ada.
    *   Mendukung berbagai tipe laporan: `full`, `short`, `student`.
*   **Bulk Download**:
    *   Memilih banyak user sekaligus dan mengunduh hasil dalam format `.zip`.
    *   Menggunakan `ZipArchive` untuk memproses file sementara di server.
*   **Inject/Fix Result**:
    *   Logic khusus untuk memperbaiki hasil yang macet (stuck) dengan parameter bypass tertentu (terlihat di controller).

## 2. Master Data Management

Admin dapat mengelola data referensi utama sistem.

| Modul | Deskripsi |
| :--- | :--- |
| **Products** | Mengelola nama produk, harga, dan deskripsi. |
| **Vouchers & Discounts** | Membuat kode promo dan aturan diskon. |
| **Payments** | Memantau status transaksi dan melakukan verifikasi manual (jika perlu). |

## 3. CMS (Content Management System)

Pengelolaan konten website front-end.

*   **Blogs**: Artikel dan berita edukasi.
*   **Banners**: Slide promosi di halaman utama.
*   **FAQ**: Pertanyaan umum seputar produk.
*   **Tutorials**: Panduan cara pengerjaan tes.

## 4. Partner Management

Fitur untuk memantau aktivitas B2B Partner.

*   **Partner Approval**: Menyetujui pendaftaran partner baru.
*   **Quota Management**: Memantau penggunaan kuota partner Pre-paid.
*   **Transaction History**: Melihat riwayat top-up partner.

## 5. Technical Tools

*   **Activity Logs**: Audit trail untuk melihat siapa melakukan apa (menggunakan `spatie/activitylog`).
*   **Manual Notifications**: Mengirim notifikasi manual ke user (Email/WA).
*   **Payment Simulator**: Alat testing pembayaran (untuk environment non-production).
