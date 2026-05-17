---
outline: deep
---

# Provinces

Province endpoints expose Turkey's province records and province-scoped child collections.

Base path:

```http
/v2/provinces
```

## Endpoints

| Method | Path                                        | Description                       |
| ------ | ------------------------------------------- | --------------------------------- |
| `GET`  | `/v2/provinces`                             | List provinces                    |
| `GET`  | `/v2/provinces/{provinceId}`                | Get one province by ID            |
| `GET`  | `/v2/provinces/{provinceId}/districts`      | List districts in a province      |
| `GET`  | `/v2/provinces/{provinceId}/municipalities` | List municipalities in a province |
| `GET`  | `/v2/provinces/{provinceId}/neighborhoods`  | List neighborhoods in a province  |
| `GET`  | `/v2/provinces/{provinceId}/villages`       | List villages in a province       |

## Province Object

| Field                     | Type      | Description                              |
| ------------------------- | --------- | ---------------------------------------- |
| `id`                      | integer   | Province ID                              |
| `name`                    | string    | Province name                            |
| `slug`                    | string    | URL-safe province name                   |
| `population`              | integer   | Province population                      |
| `area.value`              | number    | Province area value                      |
| `area.unit`               | string    | Area unit, always `km2`                  |
| `altitude.value`          | number    | Province altitude in meters              |
| `altitude.unit`           | string    | Altitude unit, always `m`                |
| `phoneAreaCodes`          | integer[] | Province phone area codes                |
| `isCoastal`               | boolean   | Whether the province is coastal          |
| `isMetropolitan`          | boolean   | Whether the province is metropolitan     |
| `region.tr`               | string    | Province region in Turkish               |
| `region.en`               | string    | Province region in English               |
| `coordinates.latitude`    | number    | Province latitude                        |
| `coordinates.longitude`   | number    | Province longitude                       |
| `stats.districtCount`     | integer   | Number of districts in the province      |
| `stats.municipalityCount` | integer   | Number of municipalities in the province |
| `stats.neighborhoodCount` | integer   | Number of neighborhoods in the province  |
| `stats.villageCount`      | integer   | Number of villages in the province       |

::: tip
Istanbul province has two phone area codes because it spans both sides of the Bosphorus strait, which divides the city into European and Asian parts. The European side uses the 212 area code, while the Asian side uses the 216 area code. All other provinces in Turkey have only one area code. That's why `phoneAreaCodes` is an array, even though it contains only one element for most provinces.
:::

Example province:

```json
{
  "id": 34,
  "name": "İstanbul",
  "slug": "istanbul",
  "population": 15754053,
  "area": {
    "value": 5461,
    "unit": "km2"
  },
  "altitude": {
    "value": 25,
    "unit": "m"
  },
  "phoneAreaCodes": [212, 216],
  "isCoastal": true,
  "isMetropolitan": true,
  "region": {
    "tr": "Marmara",
    "en": "Marmara"
  },
  "coordinates": {
    "latitude": 41.006381,
    "longitude": 28.9758715
  },
  "stats": {
    "districtCount": 39,
    "municipalityCount": 39,
    "neighborhoodCount": 961,
    "villageCount": 0
  }
}
```

## List Provinces

```http
GET /v2/provinces
```

Returns a paginated list of provinces.

### Query Parameters

| Parameter        | Type    | Default | Description                                                           |
| ---------------- | ------- | ------- | --------------------------------------------------------------------- |
| `search`         | string  | -       | Filters by province name                                              |
| `fields`         | string  | -       | Comma-separated province fields to include                            |
| `sort`           | string  | `id`    | Sorts by a: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`          | integer | `100`   | Number of records to return, from `1` to `1000`                       |
| `offset`         | integer | `0`     | Number of records to skip                                             |
| `minPopulation`  | integer | -       | Minimum population                                                    |
| `maxPopulation`  | integer | -       | Maximum population                                                    |
| `minArea`        | number  | -       | Minimum area in square kilometers                                     |
| `maxArea`        | number  | -       | Maximum area in square kilometers                                     |
| `minAltitude`    | number  | -       | Minimum altitude in meters                                            |
| `maxAltitude`    | number  | -       | Maximum altitude in meters                                            |
| `isCoastal`      | string  | -       | Filters coastal provinces. Allowed values: `true`, `false`            |
| `isMetropolitan` | string  | -       | Filters metropolitan provinces. Allowed values: `true`, `false`       |

::: tip
`isCoastal` and `isMetropolitan` accept string values `true` and `false` for ease of use in query parameters. They look like boolean values, but they are sent as strings in the query string.
:::

### Allowed Fields

```text
id,name,slug,population,area,altitude,phoneAreaCodes,isCoastal,isMetropolitan,region,coordinates,stats
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul&fields=id,name,population,area"
```

### Response

```json
{
  "data": [
    {
      "id": 34,
      "name": "İstanbul",
      "population": 15754053,
      "area": {
        "value": 5461,
        "unit": "km2"
      }
    }
  ],
  "meta": {
    "count": 1,
    "total": 1,
    "limit": 100,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-10"
  }
}
```

## Get Province by ID

```http
GET /v2/provinces/{provinceId}
```

Returns one province by numeric province ID.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `provinceId` | integer | Province ID |

### Query Parameters

| Parameter | Type   | Default | Description                                          |
| --------- | ------ | ------- | ---------------------------------------------------- |
| `fields`  | string | -       | Comma-separated province fields to include           |
| `include` | string | -       | Comma-separated list of related resources to include |

### Includes

```text
districts,municipalities,neighborhoods,villages
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts,municipalities"
```

### Response

```json
{
  "data": {
    "id": 34,
    "name": "İstanbul",
    "slug": "istanbul",
    "population": 15754053,
    "area": {
      "value": 5461,
      "unit": "km2"
    },
    "altitude": {
      "value": 25,
      "unit": "m"
    },
    "phoneAreaCodes": [212, 216],
    "isCoastal": true,
    "isMetropolitan": true,
    "region": {
      "tr": "Marmara",
      "en": "Marmara"
    },
    "coordinates": {
      "latitude": 41.006381,
      "longitude": 28.9758715
    },
    "stats": {
      "districtCount": 39,
      "municipalityCount": 39,
      "neighborhoodCount": 961,
      "villageCount": 0
    },
    "districts": [],
    "municipalities": []
  },
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-10"
  }
}
```

Included resources use their own schemas. The example above shortens nested arrays for readability.

## List Districts in a Province

```http
GET /v2/provinces/{provinceId}/districts
```

Returns districts whose `provinceId` matches the path parameter.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `provinceId` | integer | Province ID |

### Query Parameters

| Parameter | Type    | Default | Description                                     |
| --------- | ------- | ------- | ----------------------------------------------- |
| `fields`  | string  | -       | Comma-separated district fields to include      |
| `limit`   | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`  | integer | `0`     | Number of records to skip                       |

### Allowed Fields

```text
id,name,slug,provinceId,population,area,stats
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts"
```

## List Municipalities in a Province

```http
GET /v2/provinces/{provinceId}/municipalities
```

Returns municipalities whose `provinceId` matches the path parameter.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `provinceId` | integer | Province ID |

### Query Parameters

| Parameter | Type    | Default | Description                                     |
| --------- | ------- | ------- | ----------------------------------------------- |
| `fields`  | string  | -       | Comma-separated municipality fields to include  |
| `limit`   | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`  | integer | `0`     | Number of records to skip                       |

### Allowed Fields

```text
id,name,slug,type,provinceId,districtId,population,stats
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/municipalities"
```

## List Neighborhoods in a Province

```http
GET /v2/provinces/{provinceId}/neighborhoods
```

Returns neighborhoods whose `provinceId` matches the path parameter.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `provinceId` | integer | Province ID |

### Query Parameters

| Parameter | Type    | Default | Description                                     |
| --------- | ------- | ------- | ----------------------------------------------- |
| `fields`  | string  | -       | Comma-separated neighborhood fields to include  |
| `limit`   | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`  | integer | `0`     | Number of records to skip                       |

### Allowed Fields

```text
id,name,slug,provinceId,districtId,municipalityId,population,postalCode
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/neighborhoods?fields=id,name,population"
```

## List Villages in a Province

```http
GET /v2/provinces/{provinceId}/villages
```

Returns villages whose `provinceId` matches the path parameter.

### Path Parameters

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `provinceId` | integer | Province ID |

### Query Parameters

| Parameter | Type    | Default | Description                                     |
| --------- | ------- | ------- | ----------------------------------------------- |
| `fields`  | string  | -       | Comma-separated village fields to include       |
| `limit`   | integer | `100`   | Number of records to return, from `1` to `1000` |
| `offset`  | integer | `0`     | Number of records to skip                       |

### Allowed Fields

```text
id,name,slug,provinceId,districtId,population,postalCode
```

### Request

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/villages"
```

## Common Errors

| Status | Code                    | When it happens                                               |
| ------ | ----------------------- | ------------------------------------------------------------- |
| `400`  | `BAD_REQUEST`           | Query or path parameter validation fails                      |
| `400`  | `INVALID_FIELDS`        | `fields` contains an unknown field for the requested resource |
| `400`  | `INVALID_INCLUDE`       | `include` contains an unsupported relation                    |
| `404`  | `PROVINCE_NOT_FOUND`    | The requested province does not exist                         |
| `429`  | -                       | Rate limit exceeded                                           |
| `500`  | `INTERNAL_SERVER_ERROR` | Unexpected server error                                       |

Error response:

```json
{
  "error": {
    "code": "PROVINCE_NOT_FOUND",
    "message": "Province not found.",
    "status": 404
  }
}
```
