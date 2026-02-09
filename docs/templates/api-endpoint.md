---
id: api-template
title: "[Method] /api/v1/[resource]"
sidebar_label: "[Method] [Resource]"
---

# API: [Method] /api/v1/[resource]

**Description**: *Short description of what this endpoint does.*

| Detail | Value |
| :--- | :--- |
| **Method** | `GET` / `POST` / `PUT` / `DELETE` |
| **Route Name** | `api.resource.action` |
| **Controller** | `Api\V1\ResourceController@action` |
| **Auth** | Required (`Bearer Token`) |
| **Throttle** | 60 requests / min |

## Request

### Headers
```json
{
  "Accept": "application/json",
  "Authorization": "Bearer {token}"
}
```

### Body Parameters
| Field | Type | Required | Description | Validation Rule |
| :--- | :--- | :--- | :--- | :--- |
| `name` | String | Yes | Name of resource | `required|string|max:255` |
| `status` | Enum | No | active, inactive | `in:active,inactive` |

#### Example Request
```json
{
  "name": "New Project",
  "status": "active"
}
```

## Response

### Success (200 OK)
```json
{
  "data": {
    "id": 1,
    "name": "New Project",
    "status": "active",
    "created_at": "2026-02-08T12:00:00Z"
  },
  "message": "Resource retrieved successfully"
}
```

### Error (422 Unprocessable Entity)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "name": [
      "The name field is required."
    ]
  }
}
```
