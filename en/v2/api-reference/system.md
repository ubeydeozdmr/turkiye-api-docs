---
outline: deep
---

# System

System endpoints expose service health, dataset metadata, and the OpenAPI document.

## Endpoints

| Method | Path               | Description                  |
| ------ | ------------------ | ---------------------------- |
| `GET`  | `/health`          | Check service health         |
| `GET`  | `/v2/meta`         | Get API and dataset metadata |
| `GET`  | `/v2/openapi.json` | Get the OpenAPI document     |

## Health Check

```http
GET /health
```

Returns a minimal health response for monitoring and uptime checks.

### Request

```bash
curl "https://api.turkiyeapi.dev/health"
```

### Response

```json
{
  "status": "ok"
}
```

## Metadata

```http
GET /v2/meta
```

Returns API version, dataset version, update date, data sources, and record counts.

The `counts` values are derived from the datasets loaded by the API, so they reflect the same records served by list endpoints and dataset downloads.

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

### Response

```json
{
  "data": {
    "apiVersion": "2.0.0",
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21",
    "sources": [
      {
        "name": "TÜİK MEDAS",
        "url": "https://biruni.tuik.gov.tr/medas",
        "description": {
          "tr": "Veri seti iskeletinin kaynağını oluşturur. Yerleşim birimlerinin id, name (ad) ve population (nüfus) bilgilerinin kaynağıdır.",
          "en": "Forms the skeleton of the dataset. It is the source of id, name, and population information for settlements."
        }
      }
    ],
    "counts": {
      "provinces": 81,
      "districts": 973,
      "municipalities": 1377,
      "neighborhoods": 32254,
      "villages": 18183
    }
  }
}
```

## OpenAPI Document

```http
GET /v2/openapi.json
```

Returns the OpenAPI 3.1 document for v2.

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/openapi.json"
```

### Response

The response is a JSON OpenAPI document with `openapi`, `info`, `servers`, `tags`, `paths`, and `components` fields.

## Common Errors

| Status | Code                    | When it happens          |
| ------ | ----------------------- | ------------------------ |
| `400`  | `BAD_REQUEST`           | Request validation fails |
| `429`  | -                       | Rate limit exceeded      |
| `500`  | `INTERNAL_SERVER_ERROR` | Unexpected server error  |
