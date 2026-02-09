---
title: '[Komisi] GAP Komisi'
slug: /talents-mapping/gap/komisi-gap
updated: 2026-02-05 12:57:45Z
created: 2026-02-05 09:43:04Z
latitude: -6.29573950
longitude: 107.82284590
altitude: 0.0000
---

| **Fitur** | **Sistem Lama (Legacy)** | **Sistem Baru (Unified Engine)** |
| --- | --- | --- |
| **Penyimpanan Rule** | `config_fee` (Key-Value Pair).  <br /><br /><br /><br />*Contoh: `FEE_EXPERT` = 50000* | `commission_rules` (Relational Matrix).  <br /><br /><br /><br />*Contoh: Tier `EXP` + Produk `TMA` = 70%* |
| **Jenis Komisi** | Terpisah Fisik:  <br /><br /><br /><br />1\. `commission_feedback_session` (Jasa)  <br /><br /><br /><br />2\. `commission_referral` (Marketing) | Terpadu Logis:  <br /><br /><br /><br />Satu tabel `commissions` dengan tipe `service_fee` atau `referral_fee`. |
| **Fleksibilitas** | **Kaku.** Satu nilai untuk semua produk. | **Granular.** Bisa beda per produk, per tier, dan per waktu (promo). |
| **Pencatatan Saldo** | `balance` table. (Ini sudah bagus, bisa dipertahankan). | `wallet_transactions`. (Kita bisa *reuse* tabel `balance` lama). |
