---
title: '[Produk] GAP Arstektur Sistem Lama dan Baru'
slug: /talents-mapping/gap/produk-gap
updated: 2026-02-06 02:35:04Z
created: 2026-02-05 08:01:08Z
latitude: -6.29573950
longitude: 107.82284590
altitude: 0.0000
---

&nbsp;

# Detail Analisis Kesenjangan

## A. Matriks Perbandingan Arsitektur

| **Domain Fungsional** | **Kondisi Saat Ini (As-Is)** | **Kondisi Masa Depan (To-Be)** | **Gap & Implikasi Teknis** |
| --- | --- | --- | --- |
| **Struktur Produk** | **Entitas Tunggal**  <br /><br /><br /><br />Produk adalah satu baris flat di tabel `product`. Variasi dilakukan dengan duplikasi baris manual. | **Hierarki Induk-Varian**  <br /><br /><br /><br />Pemisahan antara Pemasaran (*Parent*) dan SKU Teknis (*Variant*). | **Gap Kritis:** Tabel `product` saat ini tidak mendukung relasi *one-to-many*. Perlu normalisasi tabel `product_variants`. |
| **Strategi Bundling** | **Terikat Lepas (*Loose*)**  <br /><br /><br /><br />Item transaksi hanya merujuk ke produk tunggal. Tidak ada definisi paket di level database. | **Bundling Terintegrasi**  <br /><br /><br /><br />Entitas `product_bundles` mendefinisikan aturan paket sebagai satu kesatuan harga & inventaris. | **Gap Fungsional:** Sulit melacak pendapatan per item dalam paket karena paket dianggap sebagai produk tunggal biasa. |
| **Mekanisme Harga** | **Statis & Terikat Kolom**  <br /><br /><br /><br />Harga mati tersimpan di kolom `price` pada tabel produk. | **Dinamis & Kontekstual**  <br /><br /><br /><br />Harga ditentukan oleh *Pricing Rules* (Channel, User Segment, Promo). | **Gap Logika:** Tidak bisa membedakan harga Organik vs Affiliate untuk produk yang sama tanpa duplikasi data. |
| **Manajemen Akses** | **Berbasis Transaksi**  <br /><br /><br /><br />Hak akses dicek langsung ke keberadaan ID Transaksi di tabel layanan. | **Berbasis Entitlement**  <br /><br /><br /><br />Hak akses dikelola via "Tiket" terpisah. Pembayaran dan Konsumsi layanan terputus (*decoupled*). | **Gap Arsitektur:** Ketergantungan pada tabel transaksi mematikan fitur *partial upgrade* dan *reschedule*. |
| **Akuisisi Pengguna** | **Linear Tunggal**  <br /><br /><br /><br />Satu alur: Beranda -> Checkout. Atribusi hanya via UTM sederhana. | **Multi-Channel**  <br /><br /><br /><br />4 Alur (Organik, Praktisi, Affiliate, Influencer) dengan logika UI unik. | **Gap Pengalaman:** Tidak ada *logic layer* untuk adaptasi UI otomatis berdasarkan sumber trafik. |

* * *

## B. Analisis Visual & Rinci per Domain

### 1\. Transformasi Data Produk

**Masalah As-Is:** Tabel `product` yang "gemuk" (*wide table*). Redundansi data terjadi saat membuat produk serupa (misal: TMA Personal vs TMA Pro).

**Solusi To-Be:** Adopsi pola *Parent-Variant*.

```mermaid
classDiagram
    note "TRANSFORMASI STRUKTUR DATA"

    class As_Is_Flat {
        +ID
        +Name: "TMA Personal"
        +Price: 100k
        +Config_Tier
    }
    class As_Is_Flat_Copy {
        +ID
        +Name: "TMA Pro"
        +Price: 200k
        +Config_Tier
    }
    note for As_Is_Flat "Duplikasi Data Besar </br>(Redundansi)"

    class To_Be_Parent {
        +ID
        +Name: "Asesmen TMA"
        +Marketing_Desc
    }
    class To_Be_Variant_A {
        +SKU: "TMA-PERSONAL"
        +Price: 100k
    }
    class To_Be_Variant_B {
        +SKU: "TMA-PRO"
        +Price: 200k
    }

    To_Be_Parent "1" --* "Many" To_Be_Variant_A : Owns
    To_Be_Parent "1" --* "Many" To_Be_Variant_B : Owns
```

### 2\. Evolusi Mekanisme Penetapan Harga

**Masalah As-Is:** Harga statis. Diskon manual via tabel `discounts`.

**Solusi To-Be:** Implementasi *Pricing Engine* berbasis "Pintu Masuk" (*Entry Point*). Database tidak lagi menyimpan harga akhir, melainkan "Aturan".

```mermaid
flowchart LR
    subgraph OLD [Sistem Lama]
        P1[Produk A] -->|Harga Tetap| Price1[Rp 100.000]
        D1[Diskon] -.->|Apply Manual| Price1
    end

    subgraph NEW [Sistem Baru: Pricing Engine]
        direction TB
        Input[User Request] --> Context{Cek Sumber?}

        Context -- Organik --> Rule1[Base Price]
        Context -- Affiliate Member --> Rule2[Diskon 8%]
        Context -- Influencer --> Rule3[Diskon Spesial]

        Rule1 & Rule2 & Rule3 --> Calc[Kalkulasi Final]
        Calc --> Output[Harga Tayang]
    end

    style OLD fill:#ffebee,stroke:#333
    style NEW fill:#e8f5e9,stroke:#333
```

### 3\. Perubahan Paradigma Fulfillment

**Masalah As-Is:** *Tight Coupling*. Tabel layanan (`user_assessment`) terkunci pada Foreign Key `transaction_id`. Jika transaksi batal, data layanan jadi ambigu.

**Solusi To-Be:** *Service Entitlement*. Transaksi hanya menerbitkan Hak Akses. Layanan Asesmen, Konsultasi, dan Training memiliki tipe fulfillment masing-masing.

```mermaid
erDiagram
    %% ENTITAS
    TRANSACTION_OLD
    USER_ASSESSMENT
    FEEDBACK_SESSION

    TRANSACTION_NEW
    ENTITLEMENT
    INTERNAL_ASSESSMENT
    MANUAL_SERVICE

    %% SISTEM LAMA (AS-IS)
    TRANSACTION_OLD ||--|{ USER_ASSESSMENT : "Mengontrol via ID Transaksi"
    TRANSACTION_OLD ||--|{ FEEDBACK_SESSION : "Mengontrol via ID Transaksi"

    %% SISTEM BARU (TO-BE)
    TRANSACTION_NEW ||--|{ ENTITLEMENT : "Menerbitkan"
    ENTITLEMENT ||--|| INTERNAL_ASSESSMENT : "Membuka Akses Tipe A"
    ENTITLEMENT ||--|| MANUAL_SERVICE : "Membuka Akses Tipe B"

    %% CATATAN (SATU BARIS)
    TRANSACTION_OLD "Masalah: Refund transaksi mematikan semua layanan"
    ENTITLEMENT "Solusi: Setiap tiket dapat dicabut secara independen"
```

* * *

## C. Kesimpulan & Rekomendasi

Kesenjangan utama terletak pada **kekakuan model data transaksional** lama yang didesain untuk penjualan produk putus (*discrete sales*), bukan untuk ekosistem layanan modern.

**Rekomendasi Tindakan: "Expand & Migrate"**

Alih-alih merombak total yang berisiko merusak data (Destruktif), kita gunakan strategi *Side-by-Side*:

1.  **Jangan Hapus:** Tabel lama dibiarkan untuk arsip.

2.  **Bangun Baru:** Buat tabel `product_variants`, `entitlements`, `price_rules` di sebelahnya.

3.  **Migrasi Bertahap:** Pindahkan logika bisnis pelan-pelan ke struktur baru.


```mermaid
flowchart LR
    Step1["Fase 1<br/>Bangun Tabel Baru"] --> Step2["Fase 2<br/>Dual Write (Lama & Baru)"]
    Step2 --> Step3["Fase 3<br/>Switch Read ke Tabel Baru"]
    Step3 --> Step4["Fase 4<br/>Deprecate Tabel Lama"]

    style Step1 fill:#fff9c4,stroke:#fbc02d
    style Step2 fill:#fff9c4,stroke:#fbc02d
    style Step3 fill:#c8e6c9,stroke:#388e3c
    style Step4 fill:#e0e0e0,stroke:#9e9e9e
```
