---
outline: deep
---

# Getting Started

This page gets you from zero to your first TurkiyeAPI v2 request. v2 is a public, read-only API, so you can call it directly from a browser, backend service, script, or API client.

## Base URL

The production API is available at:

```http
https://api.turkiyeapi.dev
```

v2 endpoints use the `/v2` prefix:

```http
https://api.turkiyeapi.dev/v2
```

For example, the provinces endpoint is:

```http
https://api.turkiyeapi.dev/v2/provinces
```

## Authentication

TurkiyeAPI v2 does not require an API key or authentication header.

You can make a request with only the URL:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces"
```

Because the service is public, use it responsibly and avoid unnecessary high-volume polling. If you need the entire dataset repeatedly, prefer [static dataset files](./datasets.md).

## First Request

Start with a small request that returns only the fields you need:

::: code-group

```bash [curl]
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name,population&limit=5"
```

```javascript [fetch]
const response = await fetch('https://api.turkiyeapi.dev/v2/provinces?fields=id,name,population&limit=5');

const result = await response.json();
console.log(result.data);
```

:::

The response is a JSON envelope:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Adana",
      "population": 2283609
    },
    {
      "id": 2,
      "name": "Adıyaman",
      "population": 617821
    },
    {
      "id": 3,
      "name": "Afyonkarahisar",
      "population": 751808
    },
    {
      "id": 4,
      "name": "Ağrı",
      "population": 491489
    },
    {
      "id": 5,
      "name": "Amasya",
      "population": 342242
    }
  ],
  "meta": {
    "count": 5,
    "total": 81,
    "limit": 5,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

`data` contains the records. `meta` tells you how many records were returned, how many matched the query, and which dataset version served the response.

## Getting One Resource

Use numeric IDs in path parameters:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34"
```

This returns İstanbul as a single `data` object. Single-resource endpoints also support `fields`, and many support `include` for related resources:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts,municipalities"
```

## Checking Service Metadata

Use `/v2/meta` to check API version, dataset version, update date, data sources, and record counts:

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

Use `/health` for uptime checks:

```bash
curl "https://api.turkiyeapi.dev/health"
```

## Next Steps

- Read [Concepts](./concepts.md) to understand the resource model.
- Read [Filtering, Sorting and Pagination](./filtering-sorting-pagination.md) before building list screens.
- Use the [API Reference](../api-reference/) for exact endpoint contracts.
