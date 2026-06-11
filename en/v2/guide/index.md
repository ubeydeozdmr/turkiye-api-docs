---
outline: deep
---

# Guide

TurkiyeAPI v2 is a read-only REST API for Türkiye's administrative data. The guide explains how to think about the data model, how the main resources relate to each other, and how to combine endpoints into practical workflows.

Use the guide when you are learning the API or designing an integration. Use the [API Reference](../api-reference/) when you need exact endpoint contracts, field lists, allowed query values, and error codes.

## What You Can Build

The API is useful for address forms, location pickers, reporting tools, dashboards, public datasets, and validation workflows that need Turkish administrative units.

Common workflows include:

- Building province -> district -> neighborhood address forms.
- Listing the districts of a selected province.
- Finding municipalities inside a district.
- Loading neighborhoods for a municipality.
- Searching neighborhoods across a broader scope.
- Filtering settlements by population.
- Downloading the full dataset for offline processing.

## Guide Sections

| Section                                                                | What it explains                                                                         |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Getting Started](./getting-started.md)                                | Base URL, v2 prefix, no-auth access, first request, and response shape                   |
| [Concepts](./concepts.md)                                              | Province, district, municipality, neighborhood, village, IDs, slugs, and parent IDs      |
| [Administrative Structure](./administrative-structure.md)              | How Türkiye's administrative hierarchy is represented in the API                         |
| [Common Use Cases](./common-use-cases.md)                              | Which endpoint pattern to use for selectors, search screens, detail pages, and bulk data |
| [Filtering, Sorting and Pagination](./filtering-sorting-pagination.md) | Shared query parameters and examples for list endpoints                                  |
| [Datasets](./datasets.md)                                              | When to use live API endpoints and when to download static dataset files                 |
| [Examples](./examples.md)                                              | Real workflows such as districts of İstanbul and neighborhoods by municipality           |
| [Migration from v1](./migration-from-v1.md)                            | v1 to v2 differences for existing integrations                                           |
| [FAQ](./faq.md)                                                        | Non-reference answers about access, metadata, datasets, and support                      |

## API Shape

All v2 settlement resources are available under the same base URL:

```http
https://api.turkiyeapi.dev/v2
```

The API uses JSON response envelopes:

- List endpoints return a `data` array and pagination metadata.
- Single-resource endpoints return a `data` object and dataset metadata.
- Errors return an `error` object with a stable code, message, and HTTP status.

## Resource Map

The core resources are:

- `provinces`: Türkiye's 81 provinces.
- `districts`: Districts that belong to provinces.
- `municipalities`: Local governments attached to provinces and districts.
- `neighborhoods`: Neighborhood records attached to a province, district, and municipality.
- `villages`: Village records attached to a province and district.

For exact fields and endpoint lists, see the [API Reference](../api-reference/).
