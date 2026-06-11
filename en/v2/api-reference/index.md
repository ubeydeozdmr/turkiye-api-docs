---
outline: deep
---

# API Reference

TurkiyeAPI v2 is a read-only REST API for Turkey's administrative data. This reference documents endpoint contracts, query parameters, response envelopes, resource schemas, and error formats.

Base URL:

```http
https://api.turkiyeapi.dev
```

v2 API prefix:

```http
/v2
```

## Reference Sections

| Section                               | Description                                                |
| ------------------------------------- | ---------------------------------------------------------- |
| [System](./system.md)                 | Health, metadata, and OpenAPI endpoints                    |
| [Datasets](./datasets.md)             | Static dataset downloads                                   |
| [Provinces](./provinces.md)           | Province resources and province-scoped collections         |
| [Districts](./districts.md)           | District resources and district-scoped collections         |
| [Municipalities](./municipalities.md) | Municipality resources and municipality-scoped collections |
| [Neighborhoods](./neighborhoods.md)   | Neighborhood resources                                     |
| [Villages](./villages.md)             | Village resources                                          |
| [Errors](./errors.md)                 | Error envelope, status codes, and error codes              |
| [Schemas](./schemas.md)               | Shared response envelopes and schema summaries             |

## Endpoint Groups

### System

| Method | Path               | Description                  |
| ------ | ------------------ | ---------------------------- |
| `GET`  | `/health`          | Check service health         |
| `GET`  | `/v2/meta`         | Get API and dataset metadata |
| `GET`  | `/v2/openapi.json` | Get OpenAPI document         |

### Datasets

| Method | Path                                          | Description                     |
| ------ | --------------------------------------------- | ------------------------------- |
| `GET`  | `/v2/datasets/{datasetFile}`                  | Download latest dataset file    |
| `GET`  | `/v2/datasets/{datasetVersion}/{datasetFile}` | Download versioned dataset file |

### Settlement Resources

| Method | Path                                  | Description          |
| ------ | ------------------------------------- | -------------------- |
| `GET`  | `/v2/provinces`                       | List provinces       |
| `GET`  | `/v2/provinces/{provinceId}`          | Get one province     |
| `GET`  | `/v2/districts`                       | List districts       |
| `GET`  | `/v2/districts/{districtId}`          | Get one district     |
| `GET`  | `/v2/municipalities`                  | List municipalities  |
| `GET`  | `/v2/municipalities/{municipalityId}` | Get one municipality |
| `GET`  | `/v2/neighborhoods`                   | List neighborhoods   |
| `GET`  | `/v2/neighborhoods/{neighborhoodId}`  | Get one neighborhood |
| `GET`  | `/v2/villages`                        | List villages        |
| `GET`  | `/v2/villages/{villageId}`            | Get one village      |

## Common Query Parameters

Most list endpoints support:

| Parameter       | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| `search`        | Filters by resource name                                              |
| `fields`        | Comma-separated fields to include                                     |
| `sort`          | Sort value: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`         | Page size, from `1` to `1000`                                         |
| `offset`        | Number of records to skip                                             |
| `minPopulation` | Minimum population                                                    |
| `maxPopulation` | Maximum population                                                    |

Resource-specific filters are documented on each resource page.

## Response Format

List endpoints return:

```json
{
  "data": [],
  "meta": {
    "count": 0,
    "total": 0,
    "limit": 100,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

Single-resource endpoints return:

```json
{
  "data": {},
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

Error responses return:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message.",
    "status": 400
  }
}
```
