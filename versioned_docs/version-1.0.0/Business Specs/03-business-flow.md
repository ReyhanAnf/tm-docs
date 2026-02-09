---
id: business-flow
title: Business Flow & User Journeys
sidebar_position: 3
---

# Business Flow & User Journeys

Dokumen ini menjelaskan alur bisnis utama dalam ekosistem Talents Mapping.

## 1. Retail User Journey (Personal)

Alur untuk pengguna perorangan yang ingin membeli dan mengerjakan asesmen.

```mermaid
graph TD
    Start([User Visits Web]) --> Reg[Register/Login]
    Reg --> Catalog[Browse Products]
    Catalog --> Cart[Add to Cart]
    Cart --> Checkout[Checkout & Payment]

    subgraph Payment
        Checkout --> Xendit{Payment Gateway}
        Xendit -->|Success| Callback[Update Transaction Status]
    end

    Callback --> Assessment[Access Assessment]
    Assessment --> Take[Complete Questions]
    Take --> Result[Result Generated]
    Result --> PDF[Download PDF Report]
```

## 2. Partner B2B Journey

Alur untuk Sekolah, Perusahaan, atau Reseller yang mengelola banyak peserta.

```mermaid
sequenceDiagram
    participant P as Partner (Admin)
    participant S as System
    participant C as Client (Peserta)

    P->>S: Purchase Quota / Request Top-up
    S-->>P: Quota Added (Pre-paid)

    P->>S: Generate Reference Code (e.g., TEAM-A)
    P->>C: Share Assessment Link + Ref Code

    C->>S: Access Link & Fill Profile
    C->>S: Complete Assessment
    S->>S: Deduct Quota (if applicable)

    P->>S: Monitor Dashboard
    P->>S: Bulk Download Reports (ZIP)
```

## 3. Practitioner Consultation Flow

Alur verifikasi dan konsultasi hasil asesmen bersama praktisi.

```mermaid
graph LR
    User[User] -->|Book Session| App[Booking System]
    App -->|Notify| Prac[Practitioner]

    Prac -->|Approve/Reschedule| App
    App -->|Confirm Schedule| User

    subgraph Session
        User <-->|Zoom/Meet| Prac
    end

    Prac -->|Input Feedback| App
    App -->|Complete| User
```
