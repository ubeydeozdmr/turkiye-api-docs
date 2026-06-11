---
outline: deep
---

# Errors

v2 error responses use a consistent JSON envelope with an `error` object.

## Error Response

```json
{
  "error": {
    "code": "PROVINCE_NOT_FOUND",
    "message": "Province not found.",
    "status": 404
  }
}
```

| Field           | Type    | Description                        |
| --------------- | ------- | ---------------------------------- |
| `error.code`    | string  | Stable machine-readable error code |
| `error.message` | string  | Human-readable error message       |
| `error.status`  | integer | HTTP status code                   |

## HTTP Status Codes

| Status | Meaning                                   |
| ------ | ----------------------------------------- |
| `400`  | Request validation failed                 |
| `404`  | Route or requested resource was not found |
| `429`  | Rate limit exceeded                       |
| `500`  | Unexpected server error                   |

Cacheable `GET /v2/*` responses can return `304 Not Modified` when the client sends a matching `If-None-Match` header. `304` responses do not use the error envelope.

## Common Error Codes

| Code                       | Status | When it happens                                                 |
| -------------------------- | ------ | --------------------------------------------------------------- |
| `BAD_REQUEST`              | `400`  | Query or path parameter validation fails                        |
| `INVALID_RANGE_FILTER`     | `400`  | A minimum range filter is greater than its matching maximum     |
| `INVALID_HIERARCHY_FILTER` | `400`  | Parent ID filters do not describe the same administrative chain |
| `INVALID_FIELDS`           | `400`  | `fields` contains an unknown field for the requested resource   |
| `INVALID_INCLUDE`          | `400`  | `include` contains an unsupported relation                      |
| `ROUTE_NOT_FOUND`          | `404`  | The requested route does not exist                              |
| `DATASET_NOT_FOUND`        | `404`  | Dataset file or version does not exist                          |
| `PROVINCE_NOT_FOUND`       | `404`  | The requested province does not exist                           |
| `DISTRICT_NOT_FOUND`       | `404`  | The requested district does not exist                           |
| `MUNICIPALITY_NOT_FOUND`   | `404`  | The requested municipality does not exist                       |
| `NEIGHBORHOOD_NOT_FOUND`   | `404`  | The requested neighborhood does not exist                       |
| `VILLAGE_NOT_FOUND`        | `404`  | The requested village does not exist                            |
| `INTERNAL_SERVER_ERROR`    | `500`  | Unexpected server error                                         |

## Validation Errors

Validation errors are returned as `400 Bad Request`. They can occur when:

- A path parameter is not a positive integer.
- `limit` is lower than `1` or greater than `1000`.
- `offset` is lower than `0`.
- `sort` is not one of the supported sort values.
- `fields` contains an unknown field.
- `include` contains an unknown relation.
- A typed query parameter does not match the OpenAPI schema.
- A minimum range filter is greater than its matching maximum.
- Parent ID filters contradict the administrative hierarchy.

## Range Filter Errors

Contradictory range filters return `INVALID_RANGE_FILTER`:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?minPopulation=1000000&maxPopulation=1000"
```

```json
{
  "error": {
    "code": "INVALID_RANGE_FILTER",
    "message": "Minimum population must be less than or equal to maximum population.",
    "status": 400
  }
}
```

The same validation applies to supported `min*` and `max*` pairs such as population, area, and altitude.

## Hierarchy Filter Errors

Contradictory parent filters return `INVALID_HIERARCHY_FILTER`:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?provinceId=34&districtId=1104"
```

```json
{
  "error": {
    "code": "INVALID_HIERARCHY_FILTER",
    "message": "Hierarchy filters are inconsistent.",
    "status": 400
  }
}
```

Use this error to detect combinations such as a `districtId` that belongs to another `provinceId`, or a `municipalityId` combined with a mismatching `provinceId` or `districtId`.

## Not Found Errors

Resource endpoints return resource-specific `404` codes:

```json
{
  "error": {
    "code": "DISTRICT_NOT_FOUND",
    "message": "District not found.",
    "status": 404
  }
}
```

Unknown routes return:

```json
{
  "error": {
    "code": "ROUTE_NOT_FOUND",
    "message": "Route not found.",
    "status": 404
  }
}
```
