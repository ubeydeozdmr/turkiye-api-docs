---
outline: deep
---

# Migration from v1

This page summarizes the main changes required when moving an integration from TurkiyeAPI v1 to v2.

v1 exposed a compact set of read-only endpoints under `/v1` and `/api/v1`. v2 keeps the API read-only, but it makes the contract more explicit: routes are grouped under `/v2`, responses include metadata, related resources are requested intentionally, and the old `towns` model is replaced by the broader `municipalities` model.

## Quick Checklist

- Change the API prefix from `/v1` or `/api/v1` to `/v2`.
- Stop reading the top-level `status` field from successful responses.
- Read pagination and dataset details from the new `meta` object.
- Replace `name` filters with `search`.
- Replace parent name filters such as `province` and `district` with ID filters or nested routes.
- Replace `extend=true` with `include=...`.
- Replace `/towns` with `/municipalities?type=town` when you only need town municipalities.
- Review field names because several v1 scalar fields became structured objects in v2.
- Update error handling to use `error.code`, `error.message`, and `error.status`.

## Base URL and Version Prefix

v1 accepted both prefixes:

```text
/v1
/api/v1
```

v2 uses:

```text
/v2
```

Examples:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces"
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts"
```

## Response Format

v1 successful responses used a `status` field:

```json
{
  "status": "OK",
  "data": []
}
```

v2 successful responses use `data` and `meta`:

```json
{
  "data": [],
  "meta": {
    "count": 10,
    "total": 81,
    "limit": 10,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

Single-resource endpoints also include dataset metadata:

```json
{
  "data": {
    "id": 34,
    "name": "İstanbul"
  },
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## Error Format

v1 errors used:

```json
{
  "status": "ERROR",
  "error": "No province found."
}
```

v2 errors use a structured object:

```json
{
  "error": {
    "code": "PROVINCE_NOT_FOUND",
    "message": "Province not found.",
    "status": 404
  }
}
```

Validation problems are reported as `400 Bad Request`. Missing resources are reported as `404 Not Found`. Unknown routes return `ROUTE_NOT_FOUND`.

## Endpoint Mapping

| v1 | v2 |
| --- | --- |
| `GET /` | Use documentation or `GET /v2/meta` for API metadata |
| `GET /provinces` | `GET /v2/provinces` |
| `GET /provinces/:id` | `GET /v2/provinces/{provinceId}` |
| Province districts embedded by default | `GET /v2/provinces/{provinceId}?include=districts` or `GET /v2/provinces/{provinceId}/districts` |
| Province neighborhoods via `extend=true` | `GET /v2/provinces/{provinceId}?include=neighborhoods` or `GET /v2/provinces/{provinceId}/neighborhoods` |
| Province villages via `extend=true` | `GET /v2/provinces/{provinceId}?include=villages` or `GET /v2/provinces/{provinceId}/villages` |
| `GET /districts` | `GET /v2/districts` |
| `GET /districts/:id` | `GET /v2/districts/{districtId}` |
| District neighborhoods embedded by default | `GET /v2/districts/{districtId}?include=neighborhoods` or `GET /v2/districts/{districtId}/neighborhoods` |
| District villages embedded by default | `GET /v2/districts/{districtId}?include=villages` or `GET /v2/districts/{districtId}/villages` |
| `GET /neighborhoods` | `GET /v2/neighborhoods` |
| `GET /neighborhoods/:id` | `GET /v2/neighborhoods/{neighborhoodId}` |
| `GET /villages` | `GET /v2/villages` |
| `GET /villages/:id` | `GET /v2/villages/{villageId}` |
| `GET /towns` | `GET /v2/municipalities?type=town` |
| `GET /towns/:id` | `GET /v2/municipalities/{municipalityId}` |
| `GET /swagger` | `GET /v2/openapi.json` for the OpenAPI document |

v2 also adds nested municipality routes:

| Route | Purpose |
| --- | --- |
| `GET /v2/provinces/{provinceId}/municipalities` | List municipalities in a province |
| `GET /v2/districts/{districtId}/municipalities` | List municipalities in a district |
| `GET /v2/municipalities/{municipalityId}/neighborhoods` | List neighborhoods in a municipality |

## Query Parameter Changes

### Search

v1 used resource-specific name filters such as `name`, `province`, and `district`.

v2 uses `search` for name matching on list endpoints:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul"
curl "https://api.turkiyeapi.dev/v2/districts?search=kadikoy"
```

Parent filters should use IDs or nested routes:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34"
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts"
```

### Pagination

v1 defaults varied by resource. Provinces and districts could effectively return all records, while neighborhoods, villages, and towns defaulted to 1000.

v2 uses the same pagination model across list endpoints:

| Parameter | v2 behavior |
| --- | --- |
| `limit` | Default `100`, minimum `1`, maximum `1000` |
| `offset` | Default `0`, minimum `0` |
| `meta.count` | Number of records in this response |
| `meta.total` | Number of records matching the filters |

### Sorting

v1 accepted comma-separated multi-field sorts and attempted to support any field.

v2 accepts one sort value:

| Value | Meaning |
| --- | --- |
| `id` | ID ascending |
| `-id` | ID descending |
| `name` | Name ascending |
| `-name` | Name descending |
| `population` | Population ascending |
| `-population` | Population descending |

### Field Selection

`fields` is still comma-separated, but the allowed fields changed with the v2 schemas.

Example:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name,population"
```

Important field changes:

| v1 | v2 |
| --- | --- |
| `area` as a number | `area.value` and `area.unit` inside an `area` object |
| `altitude` as a number | `altitude.value` and `altitude.unit` inside an `altitude` object |
| `areaCode` | `phoneAreaCodes` |
| `nuts` | Not part of the v2 province schema |
| `maps` | Not part of the v2 province schema |
| Computed fields added automatically | Use `include` or nested routes |

### Includes

v1 added related data automatically on some endpoints:

- Province responses included `districts`.
- District detail responses included `neighborhoods` and `villages`.
- Province detail used `extend=true` for deeper children.

v2 requires related data to be requested explicitly:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts,municipalities"
curl "https://api.turkiyeapi.dev/v2/districts/1103?include=province,neighborhoods"
```

Supported includes:

| Endpoint | Supported `include` values |
| --- | --- |
| `/v2/provinces/{provinceId}` | `districts`, `municipalities`, `neighborhoods`, `villages` |
| `/v2/districts/{districtId}` | `province`, `municipalities`, `neighborhoods`, `villages` |
| `/v2/municipalities/{municipalityId}` | `province`, `district`, `neighborhoods` |
| `/v2/neighborhoods/{neighborhoodId}` | `province`, `district`, `municipality` |
| `/v2/villages/{villageId}` | `province`, `district` |

## Towns Are Now Municipalities

v1 had separate `towns` endpoints. In v2, towns are represented as municipalities with a `type` field.

| v1 town concept | v2 municipality concept |
| --- | --- |
| `/towns` | `/v2/municipalities?type=town` |
| `/towns/:id` | `/v2/municipalities/{municipalityId}` |
| Town record | Municipality record with `type: "town"` |

The v2 municipality type can be:

| Type | Meaning |
| --- | --- |
| `province_center` | Province center municipality |
| `district_center` | District center municipality |
| `town` | Town municipality |

This is the largest model change from v1. If your v1 integration only used towns, filter v2 municipalities by `type=town`. If your integration needs all local municipalities, use `/v2/municipalities` without the type filter.

## Postal Codes

v1 hid province and district postal codes unless `activatePostalCodes=true`, and exact endpoints had different truthiness behavior.

v2 removes `activatePostalCodes`. Postal code data is modeled on neighborhood and village records:

| Resource | v2 postal code fields |
| --- | --- |
| Province | Not part of the province schema |
| District | Not part of the district schema |
| Neighborhood | `postalCode`, `postalCodeStatus` |
| Village | `postalCode`, `postalCodeStatus` |

`postalCode` is now a required five-digit string. `postalCodeStatus` is also required; neighborhoods can use `official`, `derived`, or `estimated`, while villages can use `official` or `estimated`.

For official-only usage, filter records where `postalCodeStatus` is `official`. `derived` is used only for neighborhoods whose previous village or settlement postal code exists in official PTT data. `estimated` values improve searchability but should not be treated as official PTT records.

## Dataset and Metadata

v2 exposes API and dataset metadata through:

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

Current v2 dataset metadata includes:

| Field | Value |
| --- | --- |
| API version | `2.0.0` |
| Dataset version | `2025` |
| Last updated | `2026-05-21` |
| Provinces | `81` |
| Districts | `973` |
| Municipalities | `1377` |
| Neighborhoods | `32254` |
| Villages | `18183` |

v2 also adds static dataset downloads:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

## Common Migration Examples

### List Provinces

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/provinces"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces"
```

### Search by Name

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/provinces?name=istanbul"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul"
```

### Get Province with Districts

v1 returned province districts by default:

```bash
curl "https://api.turkiyeapi.dev/v1/provinces/34"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts"
```

Or use the nested collection:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts"
```

### List Towns

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/towns"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?type=town"
```

### Filter Neighborhoods by District

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/neighborhoods?districtId=1103"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?districtId=1103"
```

Or:

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/neighborhoods"
```

## Compatibility Notes

- v2 does not support `/api/v1` style aliases.
- v2 list responses are paginated by default with `limit=100`.
- v2 does not add nested children by default.
- v2 rejects unknown fields and unknown includes with `400 Bad Request`.
- v2 has a stricter OpenAPI 3.1 contract available at `/v2/openapi.json`.
- v2 normalizes Turkish text for `search`; v1 name matching had more compatibility quirks.
