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

| Field            | Type           | Description                |
| ---------------- | -------------- | -------------------------- |
| `id`             | integer        | Neighborhood ID            |
| `name`           | string         | Neighborhood name          |
| `slug`           | string         | URL-safe neighborhood name |
| `provinceId`     | integer        | Parent province ID         |
| `districtId`     | integer        | Parent district ID         |
| `municipalityId` | integer        | Parent municipality ID     |
| `population`     | integer        | Neighborhood population    |
| `postalCode`     | string \| null | Neighborhood postal code   |

::: tip
Despite postal codes being numeric, the `postalCode` field is a string because some postal codes in Turkey start with leading zeros, which would be lost if stored as integers.
:::

::: tip
In rare cases, some neighborhoods may have a `null` value for `postalCode` if they do not have an assigned postal code.
:::

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
  "postalCode": "01020"
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
id,name,slug,provinceId,districtId,municipalityId,population,postalCode
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?districtId=1104&limit=2&fields=id,name,postalCode"
```

### Response

```json
{
  "data": [
    {
      "id": 1,
      "name": "Ahmet Remzi Yüreğir",
      "postalCode": "01130"
    },
    {
      "id": 2,
      "name": "Akkapı",
      "postalCode": "01040"
    }
  ],
  "meta": {
    "count": 2,
    "total": 96,
    "limit": 2,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-10"
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
    "lastUpdated": "2026-05-10"
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
