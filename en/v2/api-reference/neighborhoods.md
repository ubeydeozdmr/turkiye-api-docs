---
outline: deep
---

# Neighborhoods

Neighborhood endpoints expose Turkey's neighborhood records.

Base path:

```http
/v2/neighborhoods
```

## Endpoints

| Method | Path                                 | Description                |
| ------ | ------------------------------------ | -------------------------- |
| `GET`  | `/v2/neighborhoods`                  | List neighborhoods         |
| `GET`  | `/v2/neighborhoods/{neighborhoodId}` | Get one neighborhood by ID |

## Neighborhood Object

| Field              | Type    | Description                                                  |
| ------------------ | ------- | ------------------------------------------------------------ |
| `id`               | integer | Neighborhood ID                                              |
| `name`             | string  | Neighborhood name                                            |
| `slug`             | string  | URL-safe neighborhood name                                   |
| `provinceId`       | integer | Parent province ID                                           |
| `districtId`       | integer | Parent district ID                                           |
| `municipalityId`   | integer | Parent municipality ID                                       |
| `population`       | integer | Neighborhood population                                      |
| `postalCode`       | string  | Five-digit neighborhood postal code                          |
| `postalCodeStatus` | string  | Postal code status: `official`, `derived`, or `estimated`    |

::: tip
Despite postal codes being numeric, the `postalCode` field is a five-digit string because some postal codes in Turkey start with leading zeros, which would be lost if stored as integers.
:::

## Postal Code Status

Use `postalCodeStatus` to understand how the postal code was determined:

| Value | Meaning |
| ----- | ------- |
| `official` | The postal code is available in the official PTT postal code data and is used directly from that source. |
| `derived` | The postal code is not available for the current neighborhood in the PTT data, but the neighborhood was previously a village or part of another settlement with a known postal code that exists in PTT data. The previous settlement's postal code is used. |
| `estimated` | The postal code is not available in the PTT data and could not be derived from a previous settlement. The value is inferred from supplementary public sources, nearby settlements, district-level postal code patterns, or documented administrative changes. |

Clients that require strict official postal code data should check `postalCodeStatus`. For official-only usage, filter records where `postalCodeStatus` is `official`.

Current neighborhood status distribution:

| Status | Count |
| ------ | ----- |
| `official` | `32,142` |
| `derived` | `76` |
| `estimated` | `36` |
| Total | `32,254` |

Example neighborhood:

```json
{
  "id": 3,
  "name": "Alidede",
  "slug": "alidede",
  "provinceId": 1,
  "districtId": 1104,
  "municipalityId": 937,
  "population": 1116,
  "postalCode": "01020",
  "postalCodeStatus": "official"
}
```

## List Neighborhoods

```http
GET /v2/neighborhoods
```

Returns a paginated list of neighborhoods.

### Query Parameters

| Parameter        | Type    | Default | Description                                                                                              |
| ---------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `search`         | string  | -       | Filters by neighborhood name                                                                             |
| `fields`         | string  | -       | Comma-separated list of fields to include                                                                |
| `sort`           | string  | `id`    | Sorts by a neighborhood field. Allowed values: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`          | integer | `100`   | Number of records to return, from `1` to `1000`                                                          |
| `offset`         | integer | `0`     | Number of records to skip                                                                                |
| `minPopulation`  | integer | -       | Minimum population                                                                                       |
| `maxPopulation`  | integer | -       | Maximum population                                                                                       |
| `provinceId`     | integer | -       | Filters neighborhoods by parent province ID                                                              |
| `districtId`     | integer | -       | Filters neighborhoods by parent district ID                                                              |
| `municipalityId` | integer | -       | Filters neighborhoods by parent municipality ID                                                          |

### Allowed Fields

```text
id,name,slug,provinceId,districtId,municipalityId,population,postalCode,postalCodeStatus
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?districtId=1104&limit=2&fields=id,name,postalCode,postalCodeStatus"
```

### Response

```json
{
  "data": [
    {
      "id": 1,
      "name": "Ahmet Remzi Yüreğir",
      "postalCode": "01130",
      "postalCodeStatus": "official"
    },
    {
      "id": 2,
      "name": "Akkapı",
      "postalCode": "01040",
      "postalCodeStatus": "official"
    }
  ],
  "meta": {
    "count": 2,
    "total": 96,
    "limit": 2,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## Get Neighborhood by ID

```http
GET /v2/neighborhoods/{neighborhoodId}
```

Returns one neighborhood by numeric neighborhood ID.

### Path Parameters

| Parameter        | Type    | Description             |
| ---------------- | ------- | ----------------------- |
| `neighborhoodId` | integer | Numeric neighborhood ID |

### Query Parameters

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| `fields`  | string | Comma-separated neighborhood fields to include |
| `include` | string | Comma-separated related resources to include.  |

### Includes

```text
province,district,municipality
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods/3?include=province,district,municipality"
```

### Response

```json
{
  "data": {
    "id": 3,
    "name": "Alidede",
    "slug": "alidede",
    "provinceId": 1,
    "districtId": 1104,
    "municipalityId": 937,
    "population": 1116,
    "postalCode": "01020",
    "postalCodeStatus": "official",
    "province": {
      "id": 1,
      "name": "Adana",
      "slug": "adana",
      "population": 2283609,
      "area": {
        "value": 13844,
        "unit": "km2"
      },
      "altitude": {
        "value": 25,
        "unit": "m"
      },
      "phoneAreaCodes": [322],
      "isCoastal": true,
      "isMetropolitan": true,
      "region": {
        "tr": "Akdeniz",
        "en": "Mediterranean"
      },
      "coordinates": {
        "latitude": 36.9863599,
        "longitude": 35.3252861
      },
      "stats": {
        "districtCount": 15,
        "municipalityCount": 15,
        "neighborhoodCount": 831,
        "villageCount": 0
      }
    },
    "district": {
      "id": 1104,
      "name": "Seyhan",
      "slug": "seyhan",
      "provinceId": 1,
      "population": 782204,
      "area": {
        "value": 444,
        "unit": "km2"
      },
      "stats": {
        "municipalityCount": 1,
        "neighborhoodCount": 96,
        "villageCount": 0
      }
    },
    "municipality": {
      "id": 937,
      "name": "Seyhan",
      "slug": "seyhan",
      "type": "district_center",
      "provinceId": 1,
      "districtId": 1104,
      "population": 782204,
      "stats": {
        "neighborhoodCount": 96
      }
    }
  },
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## Common Errors

| Status | Code                     | When it happens                                               |
| ------ | ------------------------ | ------------------------------------------------------------- |
| `400`  | `BAD_REQUEST`            | Query or path parameter validation fails                      |
| `400`  | `INVALID_FIELDS`         | `fields` contains an unknown field for the requested resource |
| `400`  | `INVALID_INCLUDE`        | `include` contains an unsupported relation                    |
| `404`  | `NEIGHBORHOOD_NOT_FOUND` | The requested neighborhood does not exist                     |
| `429`  | -                        | Rate limit exceeded                                           |
| `500`  | `INTERNAL_SERVER_ERROR`  | Unexpected server error                                       |

Error response:

```json
{
  "error": {
    "code": "NEIGHBORHOOD_NOT_FOUND",
    "message": "Neighborhood not found.",
    "status": 404
  }
}
```
