---
outline: deep
---

# Schemas

This page summarizes the shared v2 response envelopes and resource schemas. Field-level details for settlement resources are also documented on their dedicated reference pages.

## Response Envelopes

### Data Response

Single-resource endpoints return:

```json
{
  "data": {},
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-10"
  }
}
```

### List Response

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
    "lastUpdated": "2026-05-10"
  }
}
```

| Field | Type | Description |
| ----- | ---- | ----------- |
| `meta.count` | integer | Number of records in the current response |
| `meta.total` | integer | Number of records matching the filters |
| `meta.limit` | integer | Requested page size |
| `meta.offset` | integer | Requested offset |
| `meta.datasetVersion` | string | Dataset version used by the response |
| `meta.lastUpdated` | string | Dataset update date |

## Resource Schemas

| Schema | Description | Reference |
| ------ | ----------- | --------- |
| `Province` | Province record with geography, region, coordinates, and aggregate counts | [Provinces](./provinces.md) |
| `District` | District record with parent province, area, population, and aggregate counts | [Districts](./districts.md) |
| `Municipality` | Municipality record with type, parent IDs, population, and neighborhood count | [Municipalities](./municipalities.md) |
| `Neighborhood` | Neighborhood record with parent IDs, population, and postal code | [Neighborhoods](./neighborhoods.md) |
| `Village` | Village record with parent IDs, population, and postal code | [Villages](./villages.md) |

## Shared Field Types

| Field pattern | Type | Notes |
| ------------- | ---- | ----- |
| `id` | integer | Positive resource ID |
| `name` | string | Human-readable Turkish name |
| `slug` | string | URL-safe resource name |
| `population` | integer | Non-negative population |
| `area.value` | number | Area value |
| `area.unit` | string | Always `km2` |
| `altitude.value` | number | Altitude value |
| `altitude.unit` | string | Always `m` |
| `postalCode` | string \| null | Postal code can be null for some records |
| `stats.*Count` | integer | Non-negative aggregate count |

## Municipality Types

| Value | Meaning |
| ----- | ------- |
| `province_center` | Province center municipality |
| `district_center` | District center municipality |
| `town` | Town municipality |

## Meta Schema

`GET /v2/meta` returns:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `apiVersion` | string | API version |
| `datasetVersion` | string | Dataset version |
| `lastUpdated` | string | Dataset update date |
| `sources` | array | Dataset source list |
| `counts.provinces` | integer | Province count |
| `counts.districts` | integer | District count |
| `counts.municipalities` | integer | Municipality count |
| `counts.neighborhoods` | integer | Neighborhood count |
| `counts.villages` | integer | Village count |

## Error Schema

Error responses use:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message.",
    "status": 400
  }
}
```

See [Errors](./errors.md) for error codes and examples.
