---
title: '[Product] Upgrading Product'
id: upgrading-product
slug: /talents-mapping/module-product-retail/upgrading-product
updated: 2026-02-06 02:55:04Z
created: 2026-02-05 07:15:41Z
latitude: -6.29573950
longitude: 107.82284590
altitude: 0.0000
---

## 1\. Konsep Pemisahan Domain (Separation of Concerns)

### A. Fase Transaksi (Product Layer)

- **Trigger:** Terjadi saat User membeli produk Upgrade di Dashboard Member.
- **Tugas:** Validasi kepemilikan produk lama -> Hitung Delta Price -> Payment -> Terbitkan Tiket Akses Baru.
- **Output:** Record di tabel `user_assessments` baru dengan status `pending`. Kolom `upgrade_source_id` diisi dengan ID asesmen lama.
- *Note:* Pada fase ini, **BELUM ADA** perpindahan data jawaban.

### B. Fase Pengerjaan (Assessment Layer)

- **Trigger:** Terjadi saat User mengklik tombol "Mulai Tes" (bisa detik itu juga, atau minggu depan).
- **Tugas:** Sistem mendeteksi tiket tersebut memiliki `upgrade_source_id`.
- **Logic:** Tampilkan Prompt ke User: *"Lanjutkan data lama atau Mulai baru?" (Pertanyaan 1 Kali)*.
- **Action:**
- Jika **Lanjut**: Sistem melakukan *Deep Copy* jawaban lama ke lembar baru (SQL `INSERT INTO ... SELECT`).
- Jika **Reset**: Sistem menginisialisasi lembar jawaban kosong.

* * *

## 2\. Struktur Data Pendukung

Tabel transaksi/asesmen memiliki kolom penghubung (Foreign Key) ke dirinya sendiri (Self-Reference) untuk keperluan upgrading.

* * *

## 3\. Alur

```mermaid
flowchart TD
    %% --- STYLE DEFINITIONS ---
    classDef startNode fill:#2962FF,stroke:#0039CB,stroke-width:2px,color:white;
    classDef commerceContext fill:#E1F5FE,stroke:#0277BD,stroke-width:2px;
    classDef engineContext fill:#FFF3E0,stroke:#EF6C00,stroke-width:2px;
    classDef actionBlock fill:#C8E6C9,stroke:#2E7d32,stroke-width:2px;
    classDef decisionBlock fill:#FFF9C4,stroke:#FBC02D,stroke-width:2px;
    classDef dbBlock fill:#EEEEEE,stroke:#616161,stroke-width:1px,stroke-dasharray: 3 3;

    %% ====================================================
    %% FLOW 1: COMMERCE / TRANSACTION (Sisi Produk)
    %% ====================================================
    subgraph FlowCommerce ["FLOW 1: Pembelian"]
        direction TB
        UserDash(("User di Dashboard Member")):::startNode --> ValidCheck{Cek Eligibility}

        ValidCheck -- "Punya Akses Tes dari Produk A" --> ShowUpgrade["Tampilkan Harga Upgrade (Delta)"]:::commerceContext
        ShowUpgrade --> PayProcess[User Bayar]:::actionBlock
        PayProcess --> IssueTicket["ISSUING TICKET:<br/>Create New Assessment ID<br/>Set upgrade_source_id = OLD_ID"]:::commerceContext
        IssueTicket --> FinishBuy((Selesai Beli)):::startNode
    end

    %% Jeda Waktu (User bisa mengerjakan kapan saja)
    FinishBuy -.->|Jeda Waktu: Hari/Minggu| UserStart

    %% ====================================================
    %% FLOW 2: EXECUTION (Sisi Engine Asesmen)
    %% ====================================================
    subgraph FlowEngine ["FLOW 2: Pengerjaan"]
        direction TB
        UserStart(("User Klik 'Mulai Tes'")):::startNode --> CheckSource{Cek Tipe Tiket}

        %% LOGIKA DETEKSI UPGRADE
        CheckSource -- "Tiket Biasa" --> ModeNormal["Mode Standar"]:::engineContext
        CheckSource -- "Tiket Hasil Upgrade<br/>(Ada Source ID)" --> PromptUser{"Prompt Pilihan:<br/>Copy Jawaban Lama<br/>atau Reset?"}:::decisionBlock

        %% CABANG PILIHAN USER
        PromptUser -- "Mulai dari Awal" --> InitEmpty["Inisialisasi Lembar Kosong"]:::engineContext

        PromptUser -- "Lanjut/Resume" --> DeepCopy["Mengambil jawaban tes lama dan di copy ke record baru"]:::dbBlock

        %% KONVERGENSI
        InitEmpty --> TestInterface[Masuk Halaman Ujian]:::actionBlock
        DeepCopy --> TestInterface
        ModeNormal --> TestInterface

        TestInterface --> UserEdit[User Edit / Isi Jawaban]:::engineContext
        UserEdit --> SubmitFinal[Submit Final]:::actionBlock
    end
```

* * *

**Poin Kunci Keberhasilan:**

1.  **Produk Tetap Bersih:** Layer produk tidak perlu memikirkan ribetnya menyalin 170+ jawaban soal. Produk hanya mengurus uang dan hak akses (`upgrade_source_id`).
2.  **User Centric:** User tidak dipaksa melanjutkan jawaban lama (siapa tahu dia ingin tes ulang karena merasa sudah berubah). Pilihan ada di tangan user sesaat sebelum mengerjakan.
