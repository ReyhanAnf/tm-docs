---
id: frontend-architecture
title: Frontend & UI Architecture
sidebar_position: 10
---

# Frontend & UI Architecture

Dokumen ini menjelaskan struktur antarmuka pengguna (Frontend), manajemen aset, dan pustaka UI yang digunakan dalam aplikasi `tm-web`.

## Tech Stack Overview

Aplikasi menggunakan pendekatan **Hybrid Traditional** dengan server-side rendering (Blade) yang diperkaya dengan interaktivitas JavaScript modern.

| Komponen | Teknologi | Versi | Keterangan |
| :--- | :--- | :--- | :--- |
| **Build Tool** | **Laravel Mix** | v6.x | (Webpack wrapper) Untuk kompilasi SCSS & JS. |
| **CSS Framework** | **Bootstrap** | v5.3 | Framework utama UI. |
| **Utility CSS** | **TailwindCSS** | v3.x | Digunakan terbatas untuk utility classes. |
| **JS Framework** | **Alpine.js** | v3.x | Interaktivitas ringan (dropdown, modal). |
| **Legacy JS** | **jQuery** | v3.7 | Support plugin legacy (Select2, Datatables). |
| **Admin Theme** | **Metronic** | v8.x | (Keenthemes) Template dasar dashboard admin. |

## Folder Structure (`resources/views`)

Struktur view dipisahkan secara tegas antara halaman publik (Front) dan halaman back-office (Admin).

```bash
resources/views/
├── front/              # PUBLIC FACING PAGES
│   ├── layouts/        # Base layouts (Header, Footer, Meta)
│   ├── pages/          # Content pages (Home, About, Checkout)
│   └── components/     # Reusable blades (Card, Button)
│
├── layout/             # ADMIN DASHBOARD LAYOUTS (Metronic)
│   ├── _default.blade.php      # Main admin wrapper
│   ├── master.blade.php        # Base HTML structure
│   └── partials/               # Sidebar, Topbar, Toolbar
│
├── pages/              # ADMIN CONTENT PAGES
│   ├── user-assessment/        # CRUD Views
│   ├── master/                 # Management Views
│   └── ...
│
├── livewire/           # DYNAMIC COMPONENTS (Admin)
│   └── ...
└── emails/             # EMAIL TEMPLATES
```

## 1. Public Frontend Architecture

Halaman yang diakses oleh **Member** dan **Partner** (non-login atau setelah login).

*   **entry point**: `resources/views/front/layouts/base.blade.php`
*   **stying**: Menggunakan custom CSS di `public/front/assets/css/` yang dikombinasikan dengan Bootstrap.
*   **navigation**:
    *   Responsive Navbar.
    *   Footer dengan sitemap link.

### Key Libraries (Frontend):
*   `OwlCarousel` / `Swiper`: Untuk slider banner & testimoni.
*   `AOS` (Animate On Scroll): Efek animasi saat scroll.
*   `Select2`: Dropdown pencarian wilayah (Provinsi/Kota).

## 2. Admin Dashboard Architecture

Halaman Back-office untuk **Internal Team**. Menggunakan tema **Metronic 8** (Laravel Starter Kit).

*   **entry point**: `resources/views/layout/_default.blade.php`
*   **features**:
    *   **DataTables Server-side**: Digunakan hampir di semua halaman listing data.
    *   **SweetAlert2**: Untuk konfirmasi aksi (Delete, Approve).
    *   **Livewire**: Digunakan untuk komponen filter yang kompleks atau form wizard.
    *   **KTUtil**: Helper JS bawaan Metronic untuk menu toggle, drawer, dll.

### Layout Components:
1.  **Sidebar**: Menu navigasi utama (`layout/partials/_aside`).
2.  **Header**: User profile & notifications (`layout/partials/_header`).
3.  **Toolbar**: Breadcrumb & action buttons (`layout/partials/_toolbar`).
4.  **Content**: Area utama yang dirender via `@yield('content')`.

## Asset Management

Aplikasi menggunakan `laravel-mix` untuk memproses aset statis.

**Configuration**: `webpack.mix.js`

```javascript
// Contoh konfigurasi umum
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .postCss('resources/css/tailwind.css', 'public/css', [
        require('tailwindcss'),
   ]);
```

> **Note**: Aset Metronic seringkali di-copy langsung ke folder `public/assets/` atau di-bundle terpisah untuk performa.

## Custom Directives & Helpers

*   `@stack('scripts')`: Digunakan untuk menyisipkan JS khusus per halaman (misal: inisialisasi Datatable).
*   `@stack('styles')`: Untuk CSS khusus per halaman.
*   `<x-layouts.app>`: Blade component wrapper untuk layout modern (jika digunakan).
