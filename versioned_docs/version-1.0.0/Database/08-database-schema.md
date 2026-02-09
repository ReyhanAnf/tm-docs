---
id: database-schema
title: Database Schema
sidebar_position: 8
---

# Database Schema & Models

Dokumen ini menjelaskan detail setiap Model Eloquent yang ada dalam aplikasi `tm-web`. Model dikelompokkan berdasarkan domain fungsionalnya.

## 1. Core Users & Authentication

Group Model ini menangani manajemen pengguna, otentikasi, dan hak akses.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **User** | `users` | Entitas utama akun pengguna. Menangani login (Member, Partner, Practitioner), token, dan relasi global. Menggunakan UUID. |
| **Profile** | `profiles` | Menyimpan detail biodata user (Retail/Practitioner) seperti Nama Lengkap, HP, Alamat, Jenis Kelamin via relasi `hasOne`. |
| **PartnerProfile** | `partner_profile` | Profil khusus untuk akun dengan role **Partner** atau **Partner Operator**. Menyimpan info instansi/sekolah. |
| **Admin** | `admins` | Entitas khusus untuk login halaman Back-office (Filament/Dashboard Admin). Terpisah dari User member. |
| **Role** | `roles` | (Spatie Permission) Definisi peran user (e.g., `member`, `partner`, `practitioner`). |
| **Permission** | `permissions` | (Spatie Permission) Hak akses granular untuk setiap role. |
| **MemberLog** | `member_logs` | Log aktivitas khusus user Member. |
| **PractitionerLog** | `practitioner_logs` | Log aktivitas khusus user Practitioner. |
| **UserAPI** | `user_apis` | Token atau kredensial akses API khusus user. |
| **UserBank** | `user_banks` | Informasi rekening bank user untuk pencairan dana. |
| **UserNpwp** | `user_npwps` | Data NPWP user untuk keperluan pajak. |
| **UserPaymentMethod** | `user_payment_methods` | Metode pembayaran tersimpan (Saved Cards/E-Wallet). |
| **MasterProfession** | `master_professions` | Master data pilihan profesi untuk profil user. |

## 2. Assessments & Quiz System

Model yang menangani produk asesmen, soal, dan hasil pengerjaan user perorangan.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **Assessment** | `assessment` | Master data produk asesmen. Menghubungkan `Product` dengan `QuestionGroup` (Product TMA, ST-30, dll). |
| **UserAssessment** | `user_assessment` | Record pengerjaan asesmen oleh User. Menyimpan status pengerjaan, relasi ke `Transaction`, dan hasil akhir. |
| **UserStrengthTypologyTest** | `user_strength_typology_tests` | Tabel spesifik untuk menyimpan jawaban mentah atau intermediate result tes ST-30. |
| **UserFeedbackSessionOnly** | `user_feedback_session_only` | Record khusus untuk user yang hanya membeli sesi konsultasi tanpa tes baru (bundling result lama). |
| **QuestionGroup** | `quiz_question_groups` | (Namespace `Quiz`) Pengelompokan soal dalam satu asesmen. |
| **AdditionalInfoQuestion** | `additional_info_questions` | Pertanyaan tambahan (Kuisioner) sebelum/sesudah tes. |
| **AdditionalInfoQuestionOption** | `additional_info_question_options` | Opsi jawaban untuk pertanyaan tambahan. |
| **AdditionalInfoQuestionResponse** | `additional_info_question_responses` | Jawaban user untuk pertanyaan tambahan. |
| **SharingAssessment** | `sharing_assessments` | Fitur berbagi hasil asesmen ke orang lain (Share Result). |
| **Quiz\\Question** | `quiz_questions` | Master data butir soal. |
| **Quiz\\QuestionAnswer** | `quiz_question_answers` | Opsi jawaban untuk soal pilihan ganda. |
| **Quiz\\AnswerTemplate** | `quiz_answer_templates` | Template sekumpulan opsi jawaban (e.g., Skala Likert 1-5). |
| **Quiz\\AnswerTemplateItem** | `quiz_answer_template_items` | Item dalam template jawaban. |
| **Quiz\\MasterQuestionCategory** | `quiz_master_question_categories` | Kategori soal (Daya Juang, Kepribadian, dll). |

## 3. Partner (B2B) System

Model untuk ekosistem Partner, Corporate, dan Reseller.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **PartnerAssessment** | `partner_assessments` | Mengatur akses Partner terhadap tipe asesmen tertentu (TMA/ST-30). |
| **PartnerClientAssessment** | `partner_client_assessments` | Record pengerjaan asesmen oleh klien/karyawan Partner. Menyimpan hasil (`content_result`) dan timer. |
| **PartnerTransaction** | `partner_transactions` | Transaksi B2B (Top-up Quota atau Invoice Tagihan). Berbeda dengan retail Transaction. |
| **PartnerCredits** | `partner_credits` | (Deprecated/Specific) Log penggunaan kredit untuk partner model Post-paid. |
| **PartnerQuotaDownload** | `partner_quota_downloads` | Menyimpan sisa kuota download laporan untuk partner Pre-paid. |
| **PartnerQuotaLog** | `partner_quota_logs` | Log history penambahan atau pengurangan kuota partner. |
| **PartnerLog** | `partner_logs` | Audit trail aktivitas spesifik partner. |
| **PartnerPricing** | `partner_pricings` | Konfigurasi harga khusus (Custom B2B Price) untuk partner tertentu. |
| **PartnerInvoiceReminder** | `partner_invoice_reminders` | Log pengingat tagihan invoice partner. |
| **PartnerClientStrengthTypologyTest** | `partner_client_strength_typology_tests` | Tabel jawaban ST-30 khusus untuk client partner (jika terpisah). |

## 4. Retail Transactions & Payment

Menangani pembelian produk oleh user perorangan.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **Transaction** | `transaction` | Header transaksi pembelian. Menyimpan Subtotal, Total, Status Pembayaran, dan Snap Token (Payment Gateway). |
| **TransactionItem** | `transaction_item` | Detail item produk dalam satu transaksi. Menyimpan harga saat beli dan diskon per item. |
| **TransactionStatus** | `transaction_status` | History log perubahan status pembayaran (Pending -> Paid -> Expired) dari webhook Xendit/Midtrans. |
| **TransactionDiscount** | `transaction_discounts` | Mencatat potongan harga global yang diterapkan pada transaksi. |
| **Voucher** | `vouchers` | Master data kode voucher diskon. |
| **Discount** | `discounts` | Aturan diskon (Nominal/Persen). |
| **ConfigFee** | `config_fees` | Konfigurasi biaya admin atau biaya layanan platform. |
| **Product** | `products` | Master data produk yang dijual (Nama, Harga, Deskripsi). |
| **StrengthTypologyTransaction** | `strength_typology_transactions` | Transaksi spesifik untuk produk ST-30 (Legacy/Specific). |
| **StrengthTypologyTransactionItem** | `strength_typology_transaction_items` | Item dalam transaksi ST-30. |
| **ExecutiveTransaction** | `executive_transactions` | Transaksi untuk layanan tes Eksekutif (B2B/Premium). |
| **ExecutiveTransactionAssignment** | `executive_transaction_assignments` | Penugasan tes eksekutif ke user/karyawan. |

## 5. Booking & Consultation (Practitioner)

Sistem penjadwalan dan feedback session antara User dan Practitioner.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **FeedbackSession** | `feedback_session` | Inti dari sesi konsultasi. Menghubungkan User, Practitioner, dan Jadwal yang dipilih. |
| **PractitionerSchedule** | `practitioner_schedule` | Definisi hari kerja / ketersediaan Praktisi. |
| **PractitionerScheduleTime** | `practitioner_schedule_time` | Slot jam spesifik (e.g., 09:00-10:00) dalam jadwal praktisi. |
| **UserSchedule** | `user_schedule` | Jadwal yang sudah dibooking oleh User. Mengunci slot praktisi. |
| **CommissionFeedbackSession** | `commission_feedback_sessions` | Perhitungan komisi bagi hasil untuk praktisi setelah sesi selesai. |
| **PractitionerRating** | `practitioner_ratings` | Review dan rating bintang dari user untuk praktisi. |
| **FeedbackReminder** | `feedback_reminders` | Log pengingat jadwal via Email/WA. |
| **RattingReminder** | `ratting_reminders` | Log pengingat user untuk mengisi rating praktisi. |

## 6. Content & CMS

Manajemen konten statis dan dinamis website.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **Blog** | `blogs` | Artikel atau berita. |
| **BlogCategory** | `blog_categories` | Kategori artikel. |
| **Banner** | `banners` | Banner slide promosi di halaman depan. |
| **Faqs** | `faqs` | Daftar pertanyaan umum (FAQ). |
| **Tutorial** | `tutorials` | Konten panduan penggunaan aplikasi. |
| **WebSetting** | `web_settings` | Konfigurasi global website (Judul, Meta, Contact Info). |
| **MessageTemplate** | `message_templates` | Template pesan WhatsApp/Email dinamis. |
| **BlogComment** | `blog_comments` | Komentar user pada artikel blog. |
| **BlogLike** | `blog_likes` | Like user pada artikel blog. |
| **Content** | `contents` | Konten dinamis lainnya (Slider, Info). |
| **Event** | `events` | Manajemen acara/event (Webinar, Workshop). |
| **HomepageSetting** | `homepage_settings` | Konfigurasi tampilan halaman depan (Highlight produk, dll). |
| **ProductFaq** | `product_faqs` | FAQ spesifik per produk. |
| **FaqRole** | `faq_roles` | Mapping FAQ untuk role tertentu (e.g FAQ khusus Partner). |
| **SocialMedia** | `social_medias` | Link sosial media footer. |
| **Testimonial** | `testimonials` | Data testimoni user. |
| **TestimonialHistory** | `testimonial_histories` | Log perubahan testimoni. |
| **TutorialCategory** | `tutorial_categories` | Kategori tutorial. |
| **TutorialCategoryRole** | `tutorial_category_roles` | Akses kategori tutorial per role. |
| **TutorialRole** | `tutorial_roles` | Akses tutorial spesifik per role. |
| **VisitReferral** | `visit_referrals` | Log kunjungan dari link referral. |

## 7. Regional (Wilayah Indonesia)

Data wilayah administratif untuk form profil, bersumber dari database wilayah Kemendagri.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **Province** | `provinces` | Data Provinsi. |
| **Regency** | `regencies` | Data Kota/Kabupaten. |
| **District** | `districts` | Data Kecamatan. |
| **Village** | `villages` | Data Kelurahan/Desa. |

## 8. Logs & Support

Utilitas logging dan fitur pendukung.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **ActivityLog** | `activity_log` | (Spatie Activitylog) Menyimpan riwayat aktivitas user (Create, Update, Delete) untuk audit trail. |
| **ContactUs** | `contact_us` | Pesan masuk dari form "Hubungi Kami". |
| **ShortLink** | `short_links` | Fitur pemendek URL internal. |
| **Reminder** | `reminders` | Global reminder system. |
| **ReminderHistory** | `reminder_histories` | History pengiriman reminder. |
| **ReminderLog** | `reminder_logs` | Log teknis eksekusi reminder. |
| **ReminderRecipient** | `reminder_recipients` | Daftar penerima reminder. |
| **ManualNotificationHistory** | `manual_notification_histories` | Log notifikasi manual yang dikirim admin. |

## 9. Financial & Wallet System

Sistem keuangan, dompet digital, dan pencairan dana.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **Wallet** | `wallets` | Dompet saldo user (Member/Affiliate/Practitioner). |
| **Balance** | `balances` | Mencatat saldo mengendap atau hold. |
| **Bank** | `banks` | Master data Bank (BCA, Mandiri, dll). |
| **MasterPaymentChannel** | `master_payment_channels` | Channel pembayaran (VA, E-Wallet, Retail Outlet). |
| **RefundRequest** | `refund_requests` | Pengajuan pengembalian dana oleh user. |
| **Withdrawal** | `withdrawals` | Pengajuan penarikan dana dari Wallet ke Rekening Bank. |
| **WithdrawalHistory** | `withdrawal_histories` | Log status penarikan dana. |
| **XenditTransaction** | `xendit_transactions` | Log callback raw dari Xendit. |
| **VoucherLog** | `voucher_logs` | Log penggunaan voucher. |
| **VoucherRedemption** | `voucher_redemptions` | Pencatatan klaim voucher. |
| **DiscountLog** | `discount_logs` | Log penggunaan diskon. |
| **ConfigGlobal** | `config_globals` | Pengaturan variabel global sistem (e.g., Min Withdraw, Tax Rate). |
| **ConfigGlobalLog** | `config_global_logs` | Audit trail perubahan config global. |
| **ConfigFeeLog** | `config_fee_logs` | Audit trail perubahan config fee. |

## 10. Analyst & Projects

Fitur khusus untuk Analis TM dalam mengelola project asesmen massal.

| Model | Tabel | Deskripsi |
| :--- | :--- | :--- |
| **AnalystProject** | `analyst_projects` | Project asesmen yang dikelola analis. |
| **AnalystProjectMember** | `analyst_project_members` | Member/Peserta dalam project analis. |
