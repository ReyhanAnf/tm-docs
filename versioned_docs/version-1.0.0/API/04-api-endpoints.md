---
id: api-endpoints
title: API Endpoints
sidebar_position: 4
---

# API Endpoints Reference

Dokumen ini berisi daftar endpoint API yang tersedia di `tm-web`, berdasarkan definisi route di `routes/api.php`.

Base URL: `https://api.talentsmapping.id/api` (Production)

## 1. Authentication

Prefix: `/auth`
Middleware: `api` (Throttle login enabled)

| Method | Endpoint | Description | Controller |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | User login (email & password). Returns JWT Token. | `AuthController@login` |
| `POST` | `/auth/logout` | Invalidate current token (Logout). | `AuthController@logout` |
| `POST` | `/auth/refresh` | Refresh expired token. | `AuthController@refresh` |
| `GET` | `/auth/me` | Get current authenticated user profile. | `AuthController@me` |

## 2. Partner & Clients (B2B)

Protected Routes. Requires Bearer Token.
Middleware: `auth:api`

### 2.1. Partner Resource

| Method | Endpoint | Description | Name |
| :--- | :--- | :--- | :--- |
| `GET` | `/partners` | List all partners (with pagination). | `api.partners` |
| `GET` | `/partners/{partner_id}` | Get specific partner details. | `api.partners.show` |
| `GET` | `/partners/{partner_id}/clients` | List all clients belonging to a partner. | `api.clients.for_partner` |

### 2.2. Client Resource

| Method | Endpoint | Description | Name |
| :--- | :--- | :--- | :--- |
| `GET` | `/clients` | List all clients (global/filtered). | `api.clients` |
| `GET` | `/clients/{client_id}` | Get specific client details. | `api.clients.show` |

### 2.3. Assessment Results (PDF & Data)

Prefix: `/clients/{client_id}`
Controller: `ApiPartnerClientResultController`

| Method | Endpoint | Description | Name |
| :--- | :--- | :--- | :--- |
| `GET` | `.../raw` | Get raw assessment result data (JSON). | `api.clients.results.raw` |
| `GET` | `.../pdf/full` | Download **Full Version** PDF Report. | `api.clients.results.full` |
| `GET` | `.../pdf/short` | Download **Short Version** PDF Report. | `api.clients.results.short` |
| `GET` | `.../image/tmm` | (Disabled) Generate TMM Image. | `api.clients.results.tmm` |
| `GET` | `.../image/scm` | (Disabled) Generate SCM Image. | `api.clients.results.scm` |

### 2.4. Dictionaries

| Method | Endpoint | Description | Name |
| :--- | :--- | :--- | :--- |
| `GET` | `/dictionaries/assessment-result` | Get dictionary/metadata for assessment results. | `api.dictionaries.results` |

## 3. Webhooks & Callbacks

Public endpoints for Payment Gateway notifications.

| Method | Endpoint | Provider | Handler Controller |
| :--- | :--- | :--- | :--- |
| `POST` | `/midtrans/notif-hook` | Midtrans | `HandlePaymentMidtransController` |
| `POST` | `/doku/notif-hook` | Doku | `HandlePaymentDokuController` |
| `POST` | `/xendit/notif-hook` | Xendit | `HandlePaymentXenditController` |

## 4. Utilities & Reports

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/user` | Get Sanctum user (Alternative to `/auth/me`). | `auth:sanctum` |
| `GET` | `/summary-report` | Generate summary report. | *Public/Check Controller* |
| `POST` | `/log-client-error` | Log client-side errors to server. | *Public* |
