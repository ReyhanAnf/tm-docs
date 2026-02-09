---
title: 'Roadmap Implementation'
slug: /talents-mapping/2026-q1-technical-specification-document/roadmap-implementation
---

# Roadmap Implementasi 2026 (Q1 - Q2)

Dokumen ini menjabarkan lini masa (*timeline*) implementasi transformasi sistem Talents Mapping menuju arsitektur baru yang mendukung Multi-Varian Produk dan Tiering Komisi.

## Fase 1: Foundation
**Fokus:** Persiapan Infrastruktur Database & Backend Core.

*   **Database Schema & Migration**
    *   [x] Finalisasi ERD Baru (`product_variants`, `entitlements`, `product_prices`).
    *   [ ] Create Migration Scripts di Laravel.
    *   [ ] Setup Model & Relationship di Codebase.

*   **Core Logic Implementation**
    *   [ ] Implementasi `EntitlementService` (Logic penerbitan tiket).
    *   [ ] Implementasi `PricingEngine` (Logic hitung harga dinamis).
    *   [ ] Penyesuaian API Checkout untuk mendukung *Dual-Write* (Simpan ke tabel lama & baru).

> **Deliverable:** Sistem Hybrid Database siap. Admin bisa input data varian produk via backend (API/Seeder).

---

## Fase 2: Internal Pilot
**Fokus:** Uji Coba Internal & Admin Dashboard.

*   **Admin Dashboard Update**
    *   [ ] Modul Manajemen Produk Varian (CRUD Varian).
    *   [ ] Modul Manajemen Aturan Komisi (CRUD Pricing Rules).
    *   [ ] Input Data Produk Baru (e.g., "TMA Pro", "Bundling Konsul").

*   **Internal Testing (Alpha)**
    *   [ ] Simulasi Transaksi oleh Tim Internal menggunakan produk baru.
    *   [ ] Validasi Alur Entitlement (Pastikan tiket terbit & bisa dipakai).
    *   [ ] Audit Perhitungan Komisi (Cek akurasi angka).

> **Deliverable:** Dashboard Admin siap digunakan. Produk varian baru sudah tersedia di sistem (Hidden/Private Mode).

---

## Fase 3: Public Rollout
**Fokus:** Peluncuran Fitur ke User Terpilih (Soft Launch).

*   **Frontend Integration**
    *   [ ] Update Halaman Detail Produk (Support Varian Selector).
    *   [ ] Update Halaman Checkout (Support Rincian Harga Dinamis).
    *   [ ] Update Halaman "My Services" (Tampilan Tiket Baru).

*   **Feature Launch (Beta)**
    *   [ ] Rilis Produk "TMA Pro" ke publik.
    *   [ ] Aktifkan Fitur Upgrade untuk segmen user tertentu.
    *   [ ] Monitoring Log Error & Performance.

> **Deliverable:** User publik bisa membeli produk varian baru. Fitur Upgrade mulai berjalan.

---

## Fase 4: Full Migration & Stabilization (Q2)
**Fokus:** Migrasi Data Lama & Deprecate Legacy Code.

*   **Data Backfilling**
    *   [ ] Jalankan script untuk menerbitkan *Entitlement* bagi transaksi lama (Tahun 2024-2025).
    *   [ ] Pastikan user lama bisa melakukan Upgrade.

*   **Deprecation**
    *   [ ] Tandai kolom legacy (`products.price`, `products.stock`) sebagai *Deprecated*.
    *   [ ] Arahkan semua *Read Query* ke tabel baru.
    *   [ ] Hapus kode-kode logika lama yang tidak terpakai (Dead Code Removal).

*   **Optimization**
    *   [ ] Performance Tuning (Indexing, Caching).
    *   [ ] Documentation Update (API Docs, User Guide).

> **Deliverable:** Sistem sepenuhnya berjalan di atas arsitektur baru. Tabel lama hanya sebagai arsip read-only.
