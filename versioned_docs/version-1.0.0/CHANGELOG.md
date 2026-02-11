---
id: changelog
title: Changelog
sidebar_position: 999
---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog,
and this project adheres to Semantic Versioning.

## [Unreleased]

> Status: In Staging (belum rilis produksi)

### Added

- Penambahan informasi detail klien pada menu **Detail Consultation** di dashboard praktisi.
- Penambahan kolom **Organisasi Klien** pada laporan keuangan Partner Assessment (Topup & Invoice).
- Peningkatan struktur pengambilan data tabel partner agar lebih terorganisir dan mudah difilter.
- Modularisasi proses manajemen partner (pembuatan, update, operator, dan referensi asesmen) agar lebih rapi dan terpisah dari controller.
- Sistem transaksi partner yang lebih terstruktur, termasuk:
  - Pembuatan transaksi bulanan otomatis.
  - Proses pembelian kuota asesmen.
  - Upload dan validasi bukti pembayaran.
  - Otomatisasi update status transaksi.
  - Pengurangan kuota saat asesmen digunakan atau diunduh.
- Penambahan sistem notifikasi email otomatis untuk:
  - Partner baru.
  - Operator partner.
  - Invoice transaksi.
  - Notifikasi ke admin saat bukti pembayaran diunggah.
- Dukungan skema harga spesial untuk partner atau event tertentu, dengan periode tanggal mulai dan akhir yang dapat diatur.
- Penambahan komponen tampilan detail partner agar informasi transaksi dan asesmen klien lebih lengkap dan interaktif.
- Validasi input yang lebih ketat dan terstandarisasi pada seluruh proses partner, asesmen, dan transaksi.

---

### Changed

- Refactor struktur backend agar controller lebih ringan dan logika bisnis dipisahkan ke layer yang lebih modular.
- Peningkatan stabilitas fitur **Bulk Download**, terutama untuk data dalam jumlah besar, sehingga mengurangi risiko timeout.
- Perubahan mekanisme validasi download asesmen: tidak lagi bergantung pada timer per modul, melainkan pada durasi dan status penyelesaian asesmen.
- Penyempurnaan tampilan UI pada modul partner, invoice, dan topup agar lebih konsisten.
- Penyempurnaan sistem DataTables untuk mencegah error saat proses sorting pertama kali dimuat.
- Dukungan multi-bahasa pada proses download report.

---

### Removed

- Penghapusan kolom **PPH** dan **PPH Rate** pada laporan Topup & Invoice.
- Penghapusan logika bisnis kompleks yang sebelumnya langsung berada di dalam controller.

---

## [1.0.0] - 2025-02-09

### Added

- Initial release of Talents Mapping documentation.
- Architecture blueprints and functional specs.
- Database schema documentation.
- API endpoints reference.
