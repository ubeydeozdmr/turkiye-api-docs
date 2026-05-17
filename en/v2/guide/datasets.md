---
outline: deep
---

# Datasets

TurkiyeAPI v2 provides both live API endpoints and static JSON dataset files. Use the API for interactive lookups and filtered responses. Use dataset files when you need full local copies.

## API vs Static Files

| Use case | Recommended option |
| -------- | ------------------ |
| User selects a province and you load its districts | API endpoint |
| Search, filter, sort, and paginate visible UI data | API endpoint |
| Server-side validation for one known resource | API endpoint |
| Building a local search index | Static dataset file |
| Offline analytics or batch processing | Static dataset file |
| Repeatedly syncing all neighborhoods or villages | Static dataset file |

## Available Files

The dataset endpoint exposes one JSON file per resource type:

| File | Contains |
| ---- | -------- |
| `provinces.json` | Province records |
| `districts.json` | District records |
| `municipalities.json` | Municipality records |
| `neighborhoods.json` | Neighborhood records |
| `villages.json` | Village records |

## Download Latest Data

Use the latest file endpoint when you always want the current dataset:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
```

The response is a JSON array using the same resource schema documented in the API Reference.

Latest dataset responses use cache headers that allow clients and CDNs to revalidate content efficiently.

## Download a Versioned Dataset

Use the versioned endpoint when you need reproducible builds or stable snapshots:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

Versioned files can be cached for longer because their contents are immutable for that dataset version.

## Revalidation

Dataset responses include `ETag` and `Last-Modified` headers. If your client stores the previous `ETag`, it can send `If-None-Match` on the next request.

When the content has not changed, the API can return:

```http
304 Not Modified
```

`304` responses do not use the JSON error envelope because they are normal HTTP cache responses.

## Choosing the Right Strategy

For application screens, prefer API endpoints because they return only the page and fields you need:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name"
```

For data processing jobs, prefer static files so you avoid paginating through large collections:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/neighborhoods.json"
```

You can combine both strategies: use dataset files for scheduled ingestion, then use API endpoints for live user workflows.
