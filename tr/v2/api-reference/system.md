---
outline: deep
---

# Sistem

Sistem endpoint'leri servis sağlık durumunu, veri seti metadata'sını ve OpenAPI dokümanını sunar.

## Endpoint'ler

| Method | Path | Açıklama |
| ------ | ---- | -------- |
| `GET` | `/health` | Servis sağlık durumunu kontrol eder |
| `GET` | `/v2/meta` | API ve veri seti metadata'sını getirir |
| `GET` | `/v2/openapi.json` | OpenAPI dokümanını getirir |

## Sağlık Kontrolü

```http
GET /health
```

İzleme ve uptime kontrolleri için minimal sağlık yanıtı döndürür.

### İstek

```bash
curl "https://api.turkiyeapi.dev/health"
```

### Yanıt

```json
{
  "status": "ok"
}
```

## Metadata

```http
GET /v2/meta
```

API sürümünü, veri seti sürümünü, güncelleme tarihini, veri kaynaklarını ve kayıt sayılarını döndürür.

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

### Yanıt

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

## OpenAPI Dokümanı

```http
GET /v2/openapi.json
```

v2 için OpenAPI 3.1 dokümanını döndürür.

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/openapi.json"
```

### Yanıt

Yanıt; `openapi`, `info`, `servers`, `tags`, `paths` ve `components` alanlarını içeren JSON formatında bir OpenAPI dokümanıdır.

## Yaygın Hatalar

| Status | Kod | Ne zaman oluşur |
| ------ | --- | --------------- |
| `400` | `BAD_REQUEST` | İstek doğrulaması başarısız olduğunda |
| `429` | - | Rate limit aşıldığında |
| `500` | `INTERNAL_SERVER_ERROR` | Beklenmeyen sunucu hatasında |
