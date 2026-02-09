---
title: 'Data Migration & Compatibility Strategy (DMS)'
slug: /talents-mapping/2026-q1-technical-specification-document/data-migration-and-compatibility-strategy-dms
---

## 1. Mapping Skema Database (Schema Mapping)

### 1.1. Visualisasi Strategi Koeksistensi (*Side-by-Side*)

Diagram ini menjelaskan bagaimana aplikasi baru "hidup" di atas database lama tanpa merusaknya.

```mermaid
classDiagram
    direction LR

    namespace Legacy_Zone_ReadOnly {
        class transactions {
            +id
            +status: PAID
            +user_id
        }
        class users {
            +id
            +email
        }
    }

    namespace New_Zone_ReadWrite {
        class entitlements {
            +id
            +user_id (FK)
            +source_trx_id (FK)
            +status
        }
        class commission_rules {
            +id
            +logic_json
        }
    }

    %% RELASI MAPPING
    users "1" -- "Many" transactions : Existing
    users "1" .. "Many" entitlements : New Relation
    transactions "1" .. "Many" entitlements : Mapped To (1-to-Many)

    note for Legacy_Zone_ReadOnly "Area Terlarang!\nApp Baru DILARANG UPDATE/DELETE disini.\nHanya boleh SELECT (Read)."
    note for New_Zone_ReadWrite "Area Operasional Baru.\nSemua logic baru tulis disini."

```

---

## 2. Data Seeding Strategy (Skenario Migrasi)

### 2.1. Alur Script Migrasi (*Backfilling Logic*)

Diagram ini menggambarkan logika skrip otomatis yang akan dijalankan oleh tim dev untuk "memberikan" tiket kepada user lama.

```mermaid
flowchart TD
    Start([Mulai Script Migrasi]) --> FetchTrx[Ambil Transaksi PAID 2023 - 2025]
    FetchTrx --> LoopTrx{Loop per Transaksi}

    LoopTrx -- Selesai --> Stop([Selesai])
    LoopTrx -- Ada Data --> MapSKU[Mapping ID Produk Lama ke SKU Baru]

    MapSKU --> CheckLegacy{Cek Tabel user_assessments}

    CheckLegacy -- Ada Data Jawaban --> CreateDone[Insert Entitlement Status COMPLETED]
    CheckLegacy -- Kosong atau Belum Tes --> CreateActive[Insert Entitlement Status ACTIVE]

    CreateDone --> Next[Lanjut Record Berikutnya]
    CreateActive --> Next
    Next --> LoopTrx

```

---

## 3. Rollback Plan (Rencana Darurat)

### 3.1. Visualisasi Mekanisme *Kill Switch*

Diagram ini menjelaskan bagaimana admin bisa mematikan sistem baru dalam hitungan detik jika terjadi *bug* fatal, tanpa perlu *deploy* ulang.

```mermaid
flowchart TD
    Request([User Klik Checkout]) --> CheckEnv{Cek .ENV Config:<br/>ENABLE_NEW_COMMERCE?}

    %% SKENARIO NORMAL
    CheckEnv -- "TRUE (Normal)" --> NewLogic[New Commerce Controller]
    NewLogic --> CalcBundle[Hitung Harga Bundle]
    NewLogic --> NewDB[(Insert ke Tabel Baru)]

    %% SKENARIO DARURAT
    CheckEnv -- "FALSE (Panic Mode)" --> OldLogic[Legacy Controller]
    OldLogic --> CalcNormal[Hitung Harga Normal]
    OldLogic --> OldDB[(Insert ke Tabel Lama)]

    NewDB --> PayGW[Payment Gateway]
    OldDB --> PayGW

    style CheckEnv fill:#ffcc00,stroke:#333,stroke-width:2px
    style OldLogic fill:#ffcccc,stroke:#cc0000,stroke-width:2px

```
