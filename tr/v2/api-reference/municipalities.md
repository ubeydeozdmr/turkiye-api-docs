---
outline: deep
---

# Belediyeler

Belediye endpoint'leri Türkiye'deki belediye kayıtlarını ve belediye kapsamındaki alt koleksiyonları sunar.

Temel path:

```http
/v2/municipalities
```

## Endpoint'ler

| Method | Path                                                | Açıklama                              |
| ------ | --------------------------------------------------- | ------------------------------------- |
| `GET`  | `/v2/municipalities`                                | Belediyeleri listeler                 |
| `GET`  | `/v2/municipalities/{municipalityId}`               | ID ile tek belediye getirir           |
| `GET`  | `/v2/municipalities/{municipalityId}/neighborhoods` | Bir belediyedeki mahalleleri listeler |

## Belediye Nesnesi

| Alan                      | Tip     | Açıklama                                                                           |
| ------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `id`                      | integer | Belediye ID'si                                                                     |
| `name`                    | string  | Belediye adı                                                                       |
| `slug`                    | string  | URL uyumlu belediye adı                                                            |
| `type`                    | string  | Belediye tipi. İzin verilen değerler: `province_center`, `district_center`, `town` |
| `provinceId`              | integer | Bağlı olduğu il ID'si                                                              |
| `districtId`              | integer | Bağlı olduğu ilçe ID'si                                                            |
| `population`              | integer | Belediye nüfusu                                                                    |
| `stats.neighborhoodCount` | integer | Belediyedeki mahalle sayısı                                                        |

Örnek belediye:

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

## Belediyeleri Listeleme

```http
GET /v2/municipalities
```

Sayfalanmış belediye listesi döndürür.

### Sorgu Parametreleri

| Parametre       | Tip     | Varsayılan | Açıklama                                                                                            |
| --------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `search`        | string  | -          | Belediye adına göre filtreler                                                                       |
| `fields`        | string  | -          | Döndürülecek belediye alanlarının virgülle ayrılmış listesi                                         |
| `sort`          | string  | `id`       | Sıralama değeri: `id`, `-id`, `name`, `-name`, `population`, `-population`                          |
| `limit`         | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası                                                     |
| `offset`        | integer | `0`        | Atlanacak kayıt sayısı                                                                              |
| `minPopulation` | integer | -          | Minimum nüfus                                                                                       |
| `maxPopulation` | integer | -          | Maksimum nüfus                                                                                      |
| `provinceId`    | integer | -          | Bağlı olduğu il ID'sine göre filtreler                                                              |
| `districtId`    | integer | -          | Bağlı olduğu ilçe ID'sine göre filtreler                                                            |
| `type`          | string  | -          | Belediye tipine göre filtreler. İzin verilen değerler: `province_center`, `district_center`, `town` |

`minPopulation` ve `maxPopulation` birlikte verildiğinde `minPopulation`, `maxPopulation` değerinden küçük veya ona eşit olmalıdır. `provinceId` ve `districtId` birlikte kullanıldığında ilçe seçilen ile ait olmalıdır.

### İzin Verilen Alanlar

```text
id,name,slug,type,provinceId,districtId,population,stats
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?provinceId=1&limit=2&fields=id,name,provinceId,population"
```

### Yanıt

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

## ID ile Belediye Getirme

```http
GET /v2/municipalities/{municipalityId}
```

Sayısal belediye ID'si ile tek belediye döndürür.

### Path Parametreleri

| Parametre        | Tip     | Açıklama       |
| ---------------- | ------- | -------------- |
| `municipalityId` | integer | Belediye ID'si |

### Sorgu Parametreleri

| Parametre | Tip    | Açıklama                                                      |
| --------- | ------ | ------------------------------------------------------------- |
| `fields`  | string | Döndürülecek belediye alanlarının virgülle ayrılmış listesi   |
| `include` | string | Dahil edilecek ilişkili kaynakların virgülle ayrılmış listesi |

### Include Değerleri

```text
province,district,neighborhoods
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities/926?include=province,district,neighborhoods"
```

### Yanıt

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

Dahil edilen kaynaklar kendi şemalarını kullanır. Yukarıdaki örnekte iç içe nesneler okunabilirlik için kısaltılmıştır.

## Belediyedeki Mahalleleri Listeleme

```http
GET /v2/municipalities/{municipalityId}/neighborhoods
```

Path parametresindeki `municipalityId` ile eşleşen mahalleleri döndürür.

### Path Parametreleri

| Parametre        | Tip     | Açıklama       |
| ---------------- | ------- | -------------- |
| `municipalityId` | integer | Belediye ID'si |

### Sorgu Parametreleri

| Parametre          | Tip     | Varsayılan | Açıklama                                                         |
| ------------------ | ------- | ---------- | ---------------------------------------------------------------- |
| `fields`           | string  | -          | Döndürülecek mahalle alanlarının virgülle ayrılmış listesi       |
| `postalCode`       | string  | -          | Tam beş haneli posta koduna göre filtreler                       |
| `postalCodePrefix` | string  | -          | Bir ile beş hane arasındaki posta kodu prefix'ine göre filtreler |
| `postalCodeStatus` | string  | -          | Virgülle ayrılmış posta kodu durumu filtresi                     |
| `limit`            | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası                  |
| `offset`           | integer | `0`        | Atlanacak kayıt sayısı                                           |

### İzin Verilen Alanlar

```text
id,name,slug,provinceId,districtId,municipalityId,population,postalCode,postalCodeStatus
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities/926/neighborhoods?postalCodeStatus=official"
```

## Yaygın Hatalar

| Status | Kod                        | Ne zaman oluşur                                               |
| ------ | -------------------------- | ------------------------------------------------------------- |
| `400`  | `BAD_REQUEST`              | Sorgu veya path parametresi doğrulaması başarısız olduğunda   |
| `400`  | `INVALID_RANGE_FILTER`     | `minPopulation`, `maxPopulation` değerinden büyük olduğunda   |
| `400`  | `INVALID_HIERARCHY_FILTER` | `provinceId` ve `districtId` aynı hiyerarşiyi göstermediğinde |
| `400`  | `INVALID_FIELDS`           | `fields` istenen kaynak için bilinmeyen bir alan içerdiğinde  |
| `400`  | `INVALID_INCLUDE`          | `include` desteklenmeyen bir ilişki içerdiğinde               |
| `404`  | `MUNICIPALITY_NOT_FOUND`   | İstenen belediye bulunamadığında                              |
| `429`  | -                          | Rate limit aşıldığında                                        |
| `500`  | `INTERNAL_SERVER_ERROR`    | Beklenmeyen sunucu hatasında                                  |

Hata yanıtı:

```json
{
  "error": {
    "code": "MUNICIPALITY_NOT_FOUND",
    "message": "Municipality not found.",
    "status": 404
  }
}
```
