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

### Added

(#TMP-679) [Staging]
- Penambahan detail informasi klien pada menu `Detail Consultation` di dashboard praktisi.
- Penambahan kolom **Organisasi Klien** pada menu `Report -> Finance -> Partner Assessment Topup & Invoice`.
- Method baru untuk pengambilan data DataTable Partner (optimasi query & filter).

(#TMP-675) [Staging]
- Service Action Class untuk modularisasi Partner Management:
  - `CreatePartnerAction`
  - `CreatePartnerAssessmentAction`
  - `UpdatePartnerAction`
  - `CreatePartnerOperatorAction`
  - `UpdatePartnerOperatorAction`
  - `UpdatePartnerAssessmentReferenceAction`
  - `DeletePartnerOperatorAction`
  - `DeletePartnerAssessmentZipAction`
- Service Action Class untuk modul Transaksi & Keuangan:
  - `CreateMonthlyTransactionAction`
  - `CreatePartnerAssessmentTransactionAction`
  - `UploadProofOfPaymentAction`
  - `UpdateTransactionStatusAction`
  - `DeductPartnerQuotaAction`
- Service Action Class untuk Assessment & Data Retrieval:
  - `GetPartnerClientAssessmentsAction`
  - `GetPartnerTransactionsAction`
- Notifikasi Email baru:
  - `InvoiceNotification`
  - `WelcomePartnerNotification`
  - `WelcomePartnerOperatorNotification`
  - `PaymentProofUploadedNotification`
- Validasi terstandarisasi melalui Form Request:
  - `StorePartnerRequest`
  - `UpdatePartnerRequest`
  - `StorePartnerAssessmentRequest`
  - `UpdatePartnerAssessmentRequest`
  - `UpdatePartnerQuotaRequest`
  - `BulkUpdatePartnerRequest`
  - `UpdatePartnerStatusRequest`
  - `GetPartnerClientAssessmentsRequest`
  - `GetPartnerTransactionsRequest`
  - `UpdatePartnerReferenceCodeRequest`
- Skema harga spesial Partner Assessment:
  - Support periode tanggal mulai & akhir
  - Otomatisasi perubahan harga sesuai rentang waktu
- Komponen View baru untuk detail partner:
  - Transaction card
  - Client assessment card
  - Modal create/edit
  - Modal pembayaran/topup
  - Modal bulk update
  - Modal change password
  - Script terpisah untuk halaman partner & partner detail

---

### Changed

(#TMP-675) [Staging]

- Refactor total struktur Partner Management menjadi **Thin Controller + Service Layer**.
- Refactor Bulk Download:
  - `BulkDownloadCrossPartnerAction`
  - `BulkDownloadAssessmentPartnerResultAction`
  - Stabilitas meningkat, mengatasi timeout dan curl error 28.
- Perubahan status validasi download asesmen:
  - Tidak lagi bergantung pada timer modul,
  - Berdasarkan durasi dan status penyelesaian asesmen.
- Update repository & service layer:
  - `MasterPartnerRepository`
  - `PartnerStrengthTypologyRepository`
  - `ExecutiveServiceImpl` (support multi-bahasa report)
  - `PartnerServiceImpl`
- Update UI:
  - Dropdown bahasa pada tombol download report.
  - Penyesuaian invoice & topup.
  - Konsistensi layout profile & sidebar.
- Peningkatan helper DataTables:
  - Penambahan default sorting (`?? 'asc'`) untuk mencegah error `Undefined array key "order"`.

---

### Removed

(#TMP-679) [Staging]
- Kolom **PPH** dan **PPH Rate** pada menu `Report -> Finance -> Partner Assessment Topup & Invoice`.

(#TMP-675) [Staging]
- Penghapusan logika bisnis kompleks langsung dari Controller Partner dan Controller Lain (dipindahkan ke Service Action Layer).

---

## [1.0.0] - 2025-02-09

### Added
- Initial release of Talents Mapping documentation.
- Architecture blueprints and functional specs.
- Database schema documentation.
- API endpoints reference.
