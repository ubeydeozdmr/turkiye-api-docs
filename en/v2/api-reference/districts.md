---
outline: deep
---

# Districts

District endpoints expose Turkey's district records and district-scoped child collections.

Base path:

```http
/v2/districts
```

## Endpoints

| Method | Path                                        | Description                       |
| ------ | ------------------------------------------- | --------------------------------- |
| `GET`  | `/v2/districts`                             | List districts                    |
| `GET`  | `/v2/districts/{districtId}`                | Get one district by ID            |
| `GET`  | `/v2/districts/{districtId}/municipalities` | List municipalities in a district |
| `GET`  | `/v2/districts/{districtId}/neighborhoods`  | List neighborhoods in a district  |
| `GET`  | `/v2/districts/{districtId}/villages`       | List villages in a district       |

## District Object

| Field                     | Type    | Description                              |
| ------------------------- | ------- | ---------------------------------------- |
| `id`                      | integer | District ID                              |
| `name`                    | string  | District name                            |
| `slug`                    | string  | URL-safe district name                   |
| `provinceId`              | integer | Parent province ID                       |
| `population`              | integer | District population                      |
| `area.value`              | number  | District area value                      |
| `area.unit`               | string  | Area unit, always `km2`                  |
| `stats.municipalityCount` | integer | Number of municipalities in the district |
| `stats.neighborhoodCount` | integer | Number of neighborhoods in the district  |
| `stats.villageCount`      | integer | Number of villages in the district       |

Example district:

```json
{
  "data": [
    {
      "id": 1103,
      "name": "Adalar",
      "provinceId": 34,
      "population": 17489
    },
    {
      "id": 1166,
      "name": "Bakırköy",
      "provinceId": 34,
      "population": 218204
    }
  ],
  "meta": {
    "count": 2,
    "total": 39,
    "limit": 2,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## List Districts

```http
GET /v2/districts
```

Returns a paginated list of districts.

### Query Parameters

| Parameter       | Type    | Default | Description                                                           |
| --------------- | ------- | ------- | --------------------------------------------------------------------- |
| `search`        | string  | -       | Filters by district name                                              |
| `fields`        | string  | -       | Comma-separated district fields to include                            |
| `sort`          | string  | `id`    | Sorts by a: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`         | integer | `100`   | Number of records to return, from `1` to `1000`                       |
| `offset`        | integer | `0`     | Number of records to skip                                             |
| `minPopulation` | integer | -       | Minimum population                                                    |
| `maxPopulation` | integer | -       | Maximum population                                                    |
| `minArea`       | number  | -       | Minimum area in square kilometers                                     |
| `maxArea`       | number  | -       | Maximum area in square kilometers                                     |
| `provinceId`    | integer | -       | Filters districts by parent province ID                               |

If both minimum and maximum range filters are provided, the minimum must be less than or equal to the maximum. This applies to population and area ranges.

### Allowed Fields

```text
id,name,slug,provinceId,population,area,stats
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&limit=2&fields=id,name,provinceId,population"
```

### Response

```json
{
  "data": [
    {
      "id": 1103,
      "name": "Adalar",
      "provinceId": 34,
      "population": 16325
    },
    {
      "id": 2048,
      "name": "Arnavutköy",
      "provinceId": 34,
      "population": 336062
    }
  ],
  "meta": {
    "count": 2,
    "total": 39,
    "limit": 2,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## Get District by ID

```http
GET /v2/districts/{districtId}
```

Returns one district by numeric district ID.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `districtId` | integer | District ID |

### Query Parameters

| Parameter | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| `fields`  | string | Comma-separated district fields to include   |
| `include` | string | Comma-separated related resources to include |

### Includes

```text
province,municipalities,neighborhoods,villages
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103?include=province,neighborhoods"
```

### Response

```json
{
  "data": {
    "id": 1103,
    "name": "Adalar",
    "slug": "adalar",
    "provinceId": 34,
    "population": 16325,
    "area": {
      "value": 11,
      "unit": "km2"
    },
    "stats": {
      "municipalityCount": 1,
      "neighborhoodCount": 5,
      "villageCount": 0
    },
    "province": {
      "id": 34,
      "name": "İstanbul"
    },
    "neighborhoods": []
  },
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

Included resources use their own schemas. The example above shortens nested objects for readability.

## List Municipalities in a District

```http
GET /v2/districts/{districtId}/municipalities
```

Returns municipalities whose `districtId` matches the path parameter.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `districtId` | integer | District ID |

### Query Parameters

| Parameter | Type    | Default | Description                                     |
| --------- | ------- | ------- | ----------------------------------------------- |
| `fields`  | string  | -       | Comma-separated municipality fields to include  |
| `limit`   | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`  | integer | `0`     | Number of records to skip                       |

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/municipalities"
```

## List Neighborhoods in a District

```http
GET /v2/districts/{districtId}/neighborhoods
```

Returns neighborhoods whose `districtId` matches the path parameter.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `districtId` | integer | District ID |

### Query Parameters

| Parameter          | Type    | Default | Description                                     |
| ------------------ | ------- | ------- | ----------------------------------------------- |
| `fields`           | string  | -       | Comma-separated neighborhood fields to include  |
| `postalCode`       | string  | -       | Filters by exact five-digit postal code         |
| `postalCodePrefix` | string  | -       | Filters by one-to-five digit postal code prefix |
| `postalCodeStatus` | string  | -       | Comma-separated postal code status filter       |
| `limit`            | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`           | integer | `0`     | Number of records to skip                       |

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/neighborhoods?postalCodePrefix=34&fields=id,name,population,postalCode"
```

## List Villages in a District

```http
GET /v2/districts/{districtId}/villages
```

Returns villages whose `districtId` matches the path parameter.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `districtId` | integer | District ID |

### Query Parameters

| Parameter          | Type    | Default | Description                                     |
| ------------------ | ------- | ------- | ----------------------------------------------- |
| `fields`           | string  | -       | Comma-separated village fields to include       |
| `postalCode`       | string  | -       | Filters by exact five-digit postal code         |
| `postalCodePrefix` | string  | -       | Filters by one-to-five digit postal code prefix |
| `postalCodeStatus` | string  | -       | Comma-separated postal code status filter       |
| `limit`            | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`           | integer | `0`     | Number of records to skip                       |

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1105/villages?postalCodeStatus=official"
```

## Common Errors

| Status | Code                    | When it happens                                               |
| ------ | ----------------------- | ------------------------------------------------------------- |
| `400`  | `BAD_REQUEST`           | Query or path parameter validation fails                      |
| `400`  | `INVALID_RANGE_FILTER`  | A minimum range filter is greater than its matching maximum   |
| `400`  | `INVALID_FIELDS`        | `fields` contains an unknown field for the requested resource |
| `400`  | `INVALID_INCLUDE`       | `include` contains an unsupported relation                    |
| `404`  | `DISTRICT_NOT_FOUND`    | The requested district does not exist                         |
| `429`  | -                       | Rate limit exceeded                                           |
| `500`  | `INTERNAL_SERVER_ERROR` | Unexpected server error                                       |

Error response:

```json
{
  "error": {
    "code": "DISTRICT_NOT_FOUND",
    "message": "District not found.",
    "status": 404
  }
}
```
