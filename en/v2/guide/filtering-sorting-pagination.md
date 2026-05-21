---
outline: deep
---

# Filtering, Sorting and Pagination

Most v2 list endpoints share the same query behavior. This page explains the common parameters and shows how to combine them in real requests.

## List Endpoint Shape

List endpoints return a `data` array and a `meta` object:

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

`count` is the number of records in the current response. `total` is the number of records matching your filters.

## Common Parameters

| Parameter | Purpose |
| --------- | ------- |
| `search` | Filters by resource name |
| `fields` | Limits the response to selected fields |
| `sort` | Sorts by supported fields |
| `limit` | Sets page size, from `1` to `1000` |
| `offset` | Skips records before returning the page |
| `minPopulation` | Filters records with population greater than or equal to the value |
| `maxPopulation` | Filters records with population less than or equal to the value |

Resource-specific parameters include `provinceId`, `districtId`, `municipalityId`, `type`, `minArea`, `maxArea`, `minAltitude`, `maxAltitude`, `isCoastal`, and `isMetropolitan`, depending on the endpoint.

## Search

Use `search` to filter by name:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul"
```

The parameter searches resource names, not IDs. To fetch a known ID, use the single-resource endpoint:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34"
```

## Fields

Use `fields` to reduce response size:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name,population"
```

Each resource has its own allowed field list. If `fields` contains an unsupported field, the API returns an `INVALID_FIELDS` error.

## Sorting

Most settlement list endpoints support:

```text
id,-id,name,-name,population,-population
```

Prefix a field with `-` for descending order:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&sort=-population&fields=id,name,population"
```

## Pagination

Use `limit` and `offset` to page through large collections:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?provinceId=34&limit=100&offset=0"
```

For the next page, increase `offset` by the page size:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?provinceId=34&limit=100&offset=100"
```

The maximum `limit` is `1000`. If you need every record from a large collection for offline processing, consider [dataset downloads](./datasets.md).

## Population Filters

Population filters can be combined with location filters:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&minPopulation=100000&maxPopulation=500000&sort=name"
```

This returns İstanbul districts whose population is between `100000` and `500000`.

## Location Filters

Use parent IDs to scope child collections:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?districtId=1104"
```

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?municipalityId=937"
```

```bash
curl "https://api.turkiyeapi.dev/v2/villages?districtId=1105"
```

## Combining Parameters

This request lists the first 20 neighborhoods in a municipality, sorted by population, with only fields needed for a picker:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?municipalityId=937&fields=id,name,population,postalCode,postalCodeStatus&sort=-population&limit=20&offset=0"
```

## Validation

Invalid query values return `400 Bad Request`. Common causes include:

- `limit` below `1` or above `1000`.
- `offset` below `0`.
- Unsupported `sort` values.
- Unknown `fields`.
- Query parameters with the wrong type.
