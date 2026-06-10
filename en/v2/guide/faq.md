---
outline: deep
---

# FAQ

## Do I Need an API Key?

No. TurkiyeAPI v2 is public and does not require authentication.

## What Is the Base URL?

Use:

```http
https://api.turkiyeapi.dev
```

v2 endpoints are under:

```http
/v2
```

For example:

```http
https://api.turkiyeapi.dev/v2/provinces
```

## Is the API Read-Only?

Yes. v2 exposes read-only endpoints for administrative data. It does not provide create, update, or delete endpoints.

## Where Can I See the Current Dataset Version?

Call:

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

The response includes `apiVersion`, `datasetVersion`, `lastUpdated`, `sources`, and record counts.

## Should I Use API Endpoints or Dataset Files?

Use API endpoints for interactive screens, filtering, sorting, pagination, and single-resource lookups.

Use dataset files when you need the entire dataset locally, such as for analytics, search indexing, offline processing, or scheduled imports.

## Why Is `postalCode` a String?

Postal codes can start with `0`. If postal codes were returned as numbers, leading zeros would be lost. In v2, `postalCode` is a five-digit string on neighborhood and village records.

Use `postalCodeStatus` to understand how the value was assigned. `official` values come directly from official PTT postal code data. `derived` values are used only for neighborhoods when the current neighborhood is missing from PTT data but can use a previous village or settlement postal code that exists in PTT data. `estimated` values are inferred from supplementary public sources, nearby settlements, district-level postal code patterns, or documented administrative changes.

If your client requires strict official postal code data, filter records where `postalCodeStatus` is `official`.

## Why Does İstanbul Have Two Phone Area Codes?

İstanbul spans both sides of the Bosphorus. The European side uses `212`, and the Asian side uses `216`. For consistency, `phoneAreaCodes` is always an array.

## How Do I Report an Issue?

Open an issue in the project repository:

[github.com/ubeydeozdmr/turkiye-api](https://github.com/ubeydeozdmr/turkiye-api)

Include the endpoint, query parameters, expected result, actual result, and any relevant response body.

## Where Is the Exact Endpoint Documentation?

Use the [API Reference](../api-reference/) for endpoint contracts, query parameters, field lists, includes, response schemas, and error codes.
