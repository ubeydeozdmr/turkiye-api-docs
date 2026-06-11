---
outline: deep
---

# Datasets

Dataset endpoints return static JSON dataset files. Use them when you need the full dataset locally instead of paginated API responses.

Base path:

```http
/v2/datasets
```

## Endpoints

| Method | Path                                          | Description                       |
| ------ | --------------------------------------------- | --------------------------------- |
| `GET`  | `/v2/datasets/{datasetFile}`                  | Download the latest dataset file  |
| `GET`  | `/v2/datasets/{datasetVersion}/{datasetFile}` | Download a versioned dataset file |

## Dataset Files

| File                  | Contains             |
| --------------------- | -------------------- |
| `provinces.json`      | Province records     |
| `districts.json`      | District records     |
| `municipalities.json` | Municipality records |
| `neighborhoods.json`  | Neighborhood records |
| `villages.json`       | Village records      |

## Download Latest Dataset

```http
GET /v2/datasets/{datasetFile}
```

Returns the latest available version of a dataset file.

### Path Parameters

| Parameter     | Type   | Description                                                                                                                        |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `datasetFile` | string | Dataset filename. Allowed values: `provinces.json`, `districts.json`, `municipalities.json`, `neighborhoods.json`, `villages.json` |

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
```

### Response

The response body is a JSON array using the matching resource schema.

```json
[
  {
    "id": 1,
    "name": "Adana"
  }
]
```

The example above shortens the object for readability.

### Cache Headers

Latest dataset responses include:

| Header          | Description                                          |
| --------------- | ---------------------------------------------------- |
| `Cache-Control` | `public, max-age=3600, stale-while-revalidate=86400` |
| `Content-Type`  | `application/json; charset=utf-8`                    |
| `ETag`          | Dataset content validator                            |
| `Last-Modified` | Dataset modification date                            |

If the request sends a matching `If-None-Match` header, the API returns `304 Not Modified`.

## Download Versioned Dataset

```http
GET /v2/datasets/{datasetVersion}/{datasetFile}
```

Returns a specific dataset version. The current version is `2025`.

### Path Parameters

| Parameter        | Type   | Description                                                                                                                        |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `datasetVersion` | string | Dataset version. Current allowed value: `2025`                                                                                     |
| `datasetFile`    | string | Dataset filename. Allowed values: `provinces.json`, `districts.json`, `municipalities.json`, `neighborhoods.json`, `villages.json` |

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

### Cache Headers

Versioned dataset responses include:

| Header          | Description                           |
| --------------- | ------------------------------------- |
| `Cache-Control` | `public, max-age=31536000, immutable` |
| `Content-Type`  | `application/json; charset=utf-8`     |
| `ETag`          | Dataset content validator             |
| `Last-Modified` | Dataset modification date             |

## Common Errors

| Status | Code                    | When it happens                        |
| ------ | ----------------------- | -------------------------------------- |
| `400`  | `BAD_REQUEST`           | Path parameter validation fails        |
| `404`  | `DATASET_NOT_FOUND`     | Dataset file or version does not exist |
| `429`  | -                       | Rate limit exceeded                    |
| `500`  | `INTERNAL_SERVER_ERROR` | Unexpected server error                |

Error response:

```json
{
  "error": {
    "code": "DATASET_NOT_FOUND",
    "message": "Dataset not found.",
    "status": 404
  }
}
```
