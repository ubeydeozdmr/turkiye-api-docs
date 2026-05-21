---
outline: deep
---

# Villages

Village endpoints expose Turkey's village records.

Base path:

```http
/v2/villages
```

## Endpoints

| Method | Path                       | Description           |
| ------ | -------------------------- | --------------------- |
| `GET`  | `/v2/villages`             | List villages         |
| `GET`  | `/v2/villages/{villageId}` | Get one village by ID |

## Village Object

| Field              | Type    | Description                                               |
| ------------------ | ------- | --------------------------------------------------------- |
| `id`               | integer | Village ID                                                |
| `name`             | string  | Village name                                              |
| `slug`             | string  | URL-safe village name                                     |
| `provinceId`       | integer | Parent province ID                                        |
| `districtId`       | integer | Parent district ID                                        |
| `population`       | integer | Village population                                        |
| `postalCode`       | string  | Five-digit village postal code                            |
| `postalCodeStatus` | string  | Postal code status: `official` or `estimated`             |

::: tip
Despite postal codes being numeric, the `postalCode` field is a five-digit string because some postal codes in Turkey start with leading zeros, which would be lost if stored as integers.
:::

Example village:

```json
{
  "id": 547,
  "name": "İncebağ",
  "slug": "incebag",
  "provinceId": 2,
  "districtId": 1105,
  "population": 344,
  "postalCode": "02010",
  "postalCodeStatus": "official"
}
```

## List Villages

```http
GET /v2/villages
```

Returns a paginated list of villages.

### Query Parameters

| Parameter       | Type    | Default | Description                                                                                         |
| --------------- | ------- | ------- | --------------------------------------------------------------------------------------------------- |
| `search`        | string  | -       | Filters by village name                                                                             |
| `fields`        | string  | -       | Comma-separated village fields to include                                                           |
| `sort`          | string  | `id`    | Sorts by a village field. Allowed values: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`         | integer | `100`   | Number of records to return, from `1` to `1000`                                                     |
| `offset`        | integer | `0`     | Number of records to skip                                                                           |
| `minPopulation` | integer | -       | Minimum population                                                                                  |
| `maxPopulation` | integer | -       | Maximum population                                                                                  |
| `provinceId`    | integer | -       | Filters villages by parent province ID                                                              |
| `districtId`    | integer | -       | Filters villages by parent district ID                                                              |

### Allowed Fields

```text
id,name,slug,provinceId,districtId,population,postalCode,postalCodeStatus
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/villages?districtId=1105&limit=2&fields=id,name,provinceId,population"
```

### Response

```json
{
  "data": [
    {
      "id": 523,
      "name": "Ahmethoca",
      "provinceId": 2,
      "population": 213
    },
    {
      "id": 524,
      "name": "Alibey",
      "provinceId": 2,
      "population": 94
    }
  ],
  "meta": {
    "count": 2,
    "total": 136,
    "limit": 2,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## Get Village by ID

```http
GET /v2/villages/{villageId}
```

Returns one village by numeric village ID.

### Path Parameters

| Parameter   | Type    | Description |
| ----------- | ------- | ----------- |
| `villageId` | integer | Village ID  |

### Query Parameters

| Parameter | Type   | Default | Description                                   |
| --------- | ------ | ------- | --------------------------------------------- |
| `fields`  | string | -       | Comma-separated village fields to include     |
| `include` | string | -       | Comma-separated related resources to include. |

### Includes

```text
province,district
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/villages/547?include=province,district"
```

### Response

```json
{
  "data": {
    "id": 547,
    "name": "İncebağ",
    "slug": "incebag",
    "provinceId": 2,
    "districtId": 1105,
    "population": 344,
    "postalCode": "02010",
    "postalCodeStatus": "official",
    "province": {
      "id": 2,
      "name": "Adıyaman",
      "slug": "adiyaman",
      "population": 617821,
      "area": {
        "value": 7337,
        "unit": "km2"
      },
      "altitude": {
        "value": 701,
        "unit": "m"
      },
      "phoneAreaCodes": [416],
      "isCoastal": false,
      "isMetropolitan": false,
      "region": {
        "tr": "Güneydoğu Anadolu",
        "en": "Southeastern Anatolia"
      },
      "coordinates": {
        "latitude": 37.7602985,
        "longitude": 38.2772986
      },
      "stats": {
        "districtCount": 9,
        "municipalityCount": 23,
        "neighborhoodCount": 175,
        "villageCount": 454
      }
    },
    "district": {
      "id": 1105,
      "name": "Merkez",
      "slug": "merkez",
      "provinceId": 2,
      "population": 296876,
      "area": {
        "value": 1814,
        "unit": "km2"
      },
      "stats": {
        "municipalityCount": 3,
        "neighborhoodCount": 49,
        "villageCount": 136
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

| Status | Code                    | When it happens                                               |
| ------ | ----------------------- | ------------------------------------------------------------- |
| `400`  | `BAD_REQUEST`           | Query or path parameter validation fails                      |
| `400`  | `INVALID_FIELDS`        | `fields` contains an unknown field for the requested resource |
| `400`  | `INVALID_INCLUDE`       | `include` contains an unsupported relation                    |
| `404`  | `VILLAGE_NOT_FOUND`     | The requested village does not exist                          |
| `429`  | -                       | Rate limit exceeded                                           |
| `500`  | `INTERNAL_SERVER_ERROR` | Unexpected server error                                       |

Error response:

```json
{
  "error": {
    "code": "VILLAGE_NOT_FOUND",
    "message": "Village not found.",
    "status": 404
  }
}
```
