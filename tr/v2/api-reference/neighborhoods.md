---
outline: deep
---

# Mahalleler

Mahalle endpoint'leri Türkiye'deki mahalle kayıtlarını sunar.

Temel path:

```http
/v2/neighborhoods
```

## Endpoint'ler

| Method | Path                                 | Açıklama                |
| ------ | ------------------------------------ | ----------------------- |
| `GET`  | `/v2/neighborhoods`                  | Mahalleleri listeler    |
| `GET`  | `/v2/neighborhoods/{neighborhoodId}` | ID ile tek mahalle getirir |

## Mahalle Nesnesi

| Alan               | Tip     | Açıklama                                                |
| ------------------ | ------- | ------------------------------------------------------- |
| `id`               | integer | Mahalle ID'si                                           |
| `name`             | string  | Mahalle adı                                             |
| `slug`             | string  | URL uyumlu mahalle adı                                  |
| `provinceId`       | integer | Bağlı olduğu il ID'si                                   |
| `districtId`       | integer | Bağlı olduğu ilçe ID'si                                 |
| `municipalityId`   | integer | Bağlı olduğu belediye ID'si                             |
| `population`       | integer | Mahalle nüfusu                                          |
| `postalCode`       | string  | Beş haneli mahalle posta kodu                           |
| `postalCodeStatus` | string  | Posta kodu durumu: `official`, `derived` veya `estimated` |

::: tip
Posta kodları sayısal görünse de `postalCode` alanı beş haneli string olarak döner. Türkiye'deki bazı posta kodları sıfır ile başlar ve integer olarak saklanırsa baştaki sıfır kaybolur.
:::

Örnek mahalle:

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

## Mahalleleri Listeleme

```http
GET /v2/neighborhoods
```

Sayfalanmış mahalle listesi döndürür.

### Sorgu Parametreleri

| Parametre        | Tip     | Varsayılan | Açıklama                                                                 |
| ---------------- | ------- | ---------- | ------------------------------------------------------------------------ |
| `search`         | string  | -          | Mahalle adına göre filtreler                                             |
| `fields`         | string  | -          | Döndürülecek alanların virgülle ayrılmış listesi                         |
| `sort`           | string  | `id`       | Sıralama değeri: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`          | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası                          |
| `offset`         | integer | `0`        | Atlanacak kayıt sayısı                                                   |
| `minPopulation`  | integer | -          | Minimum nüfus                                                            |
| `maxPopulation`  | integer | -          | Maksimum nüfus                                                           |
| `provinceId`     | integer | -          | Bağlı olduğu il ID'sine göre filtreler                                   |
| `districtId`     | integer | -          | Bağlı olduğu ilçe ID'sine göre filtreler                                 |
| `municipalityId` | integer | -          | Bağlı olduğu belediye ID'sine göre filtreler                             |

### İzin Verilen Alanlar

```text
id,name,slug,provinceId,districtId,municipalityId,population,postalCode,postalCodeStatus
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?districtId=1104&limit=2&fields=id,name,postalCode,postalCodeStatus"
```

### Yanıt

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

## ID ile Mahalle Getirme

```http
GET /v2/neighborhoods/{neighborhoodId}
```

Sayısal mahalle ID'si ile tek mahalle döndürür.

### Path Parametreleri

| Parametre        | Tip     | Açıklama       |
| ---------------- | ------- | -------------- |
| `neighborhoodId` | integer | Mahalle ID'si  |

### Sorgu Parametreleri

| Parametre | Tip    | Açıklama                                                      |
| --------- | ------ | ------------------------------------------------------------- |
| `fields`  | string | Döndürülecek mahalle alanlarının virgülle ayrılmış listesi    |
| `include` | string | Dahil edilecek ilişkili kaynakların virgülle ayrılmış listesi |

### Include Değerleri

```text
province,district,municipality
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods/3?include=province,district,municipality"
```

### Yanıt

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

## Yaygın Hatalar

| Status | Kod                      | Ne zaman oluşur                                        |
| ------ | ------------------------ | ------------------------------------------------------ |
| `400`  | `BAD_REQUEST`            | Sorgu veya path parametresi doğrulaması başarısız olduğunda |
| `400`  | `INVALID_FIELDS`         | `fields` istenen kaynak için bilinmeyen bir alan içerdiğinde |
| `400`  | `INVALID_INCLUDE`        | `include` desteklenmeyen bir ilişki içerdiğinde       |
| `404`  | `NEIGHBORHOOD_NOT_FOUND` | İstenen mahalle bulunamadığında                       |
| `429`  | -                        | Rate limit aşıldığında                                |
| `500`  | `INTERNAL_SERVER_ERROR`  | Beklenmeyen sunucu hatasında                          |

Hata yanıtı:

```json
{
  "error": {
    "code": "NEIGHBORHOOD_NOT_FOUND",
    "message": "Neighborhood not found.",
    "status": 404
  }
}
```
