---
outline: deep
---

# Common Use Cases

This page helps you choose the right v2 endpoint pattern for common integration scenarios.

## Recommended Patterns

| Scenario                                          | Recommended pattern                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Province -> district -> neighborhood address form | Nested endpoints                                                                      |
| Compact province selector                         | `/v2/provinces?fields=id,name`                                                        |
| Districts after a province is selected            | `/v2/provinces/{provinceId}/districts?fields=id,name`                                 |
| Neighborhoods after a district is selected        | `/v2/districts/{districtId}/neighborhoods?fields=id,name,postalCode,postalCodeStatus` |
| Neighborhood search or autocomplete               | `/v2/neighborhoods?search=...&fields=id,name,districtId,provinceId,postalCode`        |
| Postal-code lookup                                | `/v2/neighborhoods?postalCode=01020` or `/v2/villages?postalCodePrefix=020`           |
| Municipality or village table                     | Collection endpoint with filters, sorting, and pagination                             |
| One known record by ID                            | Single-resource endpoint                                                              |
| Related data in one detail response               | `include`, used intentionally                                                         |
| Full import, offline use, or build-time data      | Dataset endpoints                                                                     |

## Address Forms and Hierarchical Selectors

For address forms, prefer nested endpoints and request only the fields needed for each selector.

Start with provinces:

```http
GET /v2/provinces?fields=id,name&sort=name
```

After the user selects a province:

```http
GET /v2/provinces/{provinceId}/districts?fields=id,name
```

After the user selects a district, load neighborhoods:

```http
GET /v2/districts/{districtId}/neighborhoods?fields=id,name,postalCode,postalCodeStatus
```

If your form needs villages instead:

```http
GET /v2/districts/{districtId}/villages?fields=id,name,postalCode,postalCodeStatus
```

If your form has a municipality step:

```http
GET /v2/districts/{districtId}/municipalities?fields=id,name,type
GET /v2/municipalities/{municipalityId}/neighborhoods?fields=id,name,postalCode,postalCodeStatus
```

This flow keeps responses small, avoids downloading all child records up front, works well with client-side caching, and maps directly to the user's selections.

## Search, Tables, and Admin Screens

Use collection endpoints when the UI is not following one strict parent-child selection chain. They are better for search, filtering, sorting, pagination, and broader data exploration.

Examples:

```http
GET /v2/districts?provinceId=34&fields=id,name,provinceId&sort=name
```

```http
GET /v2/neighborhoods?search=kizilay&fields=id,name,districtId,provinceId,postalCode&limit=20
```

```http
GET /v2/municipalities?provinceId=34&type=district_center&fields=id,name,type,districtId&sort=name
```

If a table needs parent names, fetch the parent records once and join them client-side by `provinceId`, `districtId`, or `municipalityId`, or use `include` on a single detail endpoint when the user opens one record.

## Detail Screens

When you already have an ID and need one record, use the single-resource endpoint:

```http
GET /v2/provinces/34
GET /v2/districts/1103
GET /v2/neighborhoods/3
```

Use `fields` to keep the detail response focused:

```http
GET /v2/provinces/34?fields=id,name,population,area
```

Use `include` when the detail screen intentionally needs related records in the same response:

```http
GET /v2/neighborhoods/3?include=province,district,municipality
```

Avoid using `include` as the default path for dropdowns. For selectors, load child collections only after the user selects the parent.

## Full Dataset and Offline Use

If you need to import all Türkiye data, build a local search index, run batch processing, or ship offline data with your app, prefer dataset files instead of paginating through live API endpoints:

```http
GET /v2/datasets/provinces.json
GET /v2/datasets/districts.json
GET /v2/datasets/neighborhoods.json
GET /v2/datasets/villages.json
```

For reproducible builds, use a versioned dataset URL:

```http
GET /v2/datasets/2025/neighborhoods.json
```

Use live API endpoints for interactive user workflows. Use dataset endpoints for bulk or offline workflows.

## Postal Code Lookup

Use `postalCode` for an exact neighborhood or village postal-code match:

```http
GET /v2/neighborhoods?postalCode=01020&fields=id,name,provinceId,districtId,postalCode
```

Use `postalCodePrefix` when the UI accepts partial postal codes:

```http
GET /v2/villages?postalCodePrefix=020&fields=id,name,provinceId,districtId,postalCode
```

When strict official postal data is required, add `postalCodeStatus=official`.
