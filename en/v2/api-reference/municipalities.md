---
outline: deep
---

# Municipalities

Municipality endpoints expose Turkey's municipality records and municipality-scoped child collections.

Base path:

```http
/v2/municipalities
```

## Endpoints

| Method | Path                                                | Description                          |
| ------ | --------------------------------------------------- | ------------------------------------ |
| `GET`  | `/v2/municipalities`                                | List municipalities                  |
| `GET`  | `/v2/municipalities/{municipalityId}`               | Get one municipality by ID           |
| `GET`  | `/v2/municipalities/{municipalityId}/neighborhoods` | List neighborhoods in a municipality |

## Municipality Object

| Field                     | Type    | Description                                                                     |
| ------------------------- | ------- | ------------------------------------------------------------------------------- |
| `id`                      | integer | Municipality ID                                                                 |
| `name`                    | string  | Municipality name                                                               |
| `slug`                    | string  | URL-safe municipality name                                                      |
| `type`                    | string  | Municipality type. Allowed values: `province_center`, `district_center`, `town` |
| `provinceId`              | integer | Parent province ID                                                              |
| `districtId`              | integer | Parent district ID                                                              |
| `population`              | integer | Municipality population                                                         |
| `stats.neighborhoodCount` | integer | Number of neighborhoods in the municipality                                     |

Example municipality:

```json
{
  "id": 926,
  "name": "Yumurtalık",
  "slug": "yumurtalik",
  "type": "district_center",
  "provinceId": 1,
  "districtId": 1734,
  "population": 17806,
  "stats": {
    "neighborhoodCount": 24
  }
}
```

## List Municipalities

```http
GET /v2/municipalities
```

Returns a paginated list of municipalities.

### Query Parameters

| Parameter       | Type    | Default | Description                                                                                              |
| --------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `search`        | string  | -       | Filters by municipality name                                                                             |
| `fields`        | string  | -       | Comma-separated municipality fields to include                                                           |
| `sort`          | string  | `id`    | Sorts by a municipality field. Allowed values: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`         | integer | `100`   | Number of records to return, from `1` to `1000`                                                          |
| `offset`        | integer | `0`     | Number of records to skip                                                                                |
| `minPopulation` | integer | -       | Minimum population                                                                                       |
| `maxPopulation` | integer | -       | Maximum population                                                                                       |
| `provinceId`    | integer | -       | Filters municipalities by parent province ID                                                             |
| `districtId`    | integer | -       | Filters municipalities by parent district ID                                                             |
| `type`          | string  | -       | Filters by municipality type. Allowed values: `province_center`, `district_center`, `town`               |

### Allowed Fields

```text
id,name,slug,type,provinceId,districtId,population,stats
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?provinceId=1&limit=2&fields=id,name,provinceId,population"
```

### Response

```json
{
  "data": [
    {
      "id": 926,
      "name": "Yumurtalık",
      "provinceId": 1,
      "population": 17806
    },
    {
      "id": 927,
      "name": "Tufanbeyli",
      "provinceId": 1,
      "population": 16027
    }
  ],
  "meta": {
    "count": 2,
    "total": 15,
    "limit": 2,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## Get Municipality by ID

```http
GET /v2/municipalities/{municipalityId}
```

Returns one municipality by numeric municipality ID.

### Path Parameters

| Parameter        | Type    | Description     |
| ---------------- | ------- | --------------- |
| `municipalityId` | integer | Municipality ID |

### Query Parameters

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| `fields`  | string | Comma-separated municipality fields to include |
| `include` | string | Comma-separated related resources to include.  |

### Includes

```text
province,district,neighborhoods
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities/926?include=province,district,neighborhoods"
```

### Response

```json
{
  "data": {
    "id": 926,
    "name": "Yumurtalık",
    "slug": "yumurtalik",
    "type": "district_center",
    "provinceId": 1,
    "districtId": 1734,
    "population": 17806,
    "stats": {
      "neighborhoodCount": 24
    },
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
      "id": 1734,
      "name": "Yumurtalık",
      "slug": "yumurtalik",
      "provinceId": 1,
      "population": 17806,
      "area": {
        "value": 447,
        "unit": "km2"
      },
      "stats": {
        "municipalityCount": 1,
        "neighborhoodCount": 24,
        "villageCount": 0
      }
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

## List Neighborhoods in a Municipality

```http
GET /v2/municipalities/{municipalityId}/neighborhoods
```

Returns neighborhoods whose `municipalityId` matches the path parameter.

### Path Parameters

| Parameter        | Type    | Description     |
| ---------------- | ------- | --------------- |
| `municipalityId` | integer | Municipality ID |

### Query Parameters

| Parameter | Type    | Default | Description                                     |
| --------- | ------- | ------- | ----------------------------------------------- |
| `fields`  | string  | -       | Comma-separated neighborhood fields to include  |
| `limit`   | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`  | integer | `0`     | Number of records to skip                       |

### Allowed Fields

```text
id,name,slug,provinceId,districtId,municipalityId,population,postalCode,postalCodeStatus
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities/926/neighborhoods"
```

## Common Errors

| Status | Code                     | When it happens                                               |
| ------ | ------------------------ | ------------------------------------------------------------- |
| `400`  | `BAD_REQUEST`            | Query or path parameter validation fails                      |
| `400`  | `INVALID_FIELDS`         | `fields` contains an unknown field for the requested resource |
| `400`  | `INVALID_INCLUDE`        | `include` contains an unsupported relation                    |
| `404`  | `MUNICIPALITY_NOT_FOUND` | The requested municipality does not exist                     |
| `429`  | -                        | Rate limit exceeded                                           |
| `500`  | `INTERNAL_SERVER_ERROR`  | Unexpected server error                                       |

Error response:

```json
{
  "error": {
    "code": "MUNICIPALITY_NOT_FOUND",
    "message": "Municipality not found.",
    "status": 404
  }
}
```
