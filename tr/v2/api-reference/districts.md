---
outline: deep
---

# İlçeler

İlçe endpoint'leri Türkiye'deki ilçe kayıtlarını ve ilçe kapsamındaki alt koleksiyonları sunar.

Temel path:

```http
/v2/districts
```

## Endpoint'ler

| Method | Path                                        | Açıklama                           |
| ------ | ------------------------------------------- | ---------------------------------- |
| `GET`  | `/v2/districts`                             | İlçeleri listeler                  |
| `GET`  | `/v2/districts/{districtId}`                | ID ile tek ilçe getirir            |
| `GET`  | `/v2/districts/{districtId}/municipalities` | Bir ilçedeki belediyeleri listeler |
| `GET`  | `/v2/districts/{districtId}/neighborhoods`  | Bir ilçedeki mahalleleri listeler  |
| `GET`  | `/v2/districts/{districtId}/villages`       | Bir ilçedeki köyleri listeler      |

## İlçe Nesnesi

| Alan                      | Tip     | Açıklama                     |
| ------------------------- | ------- | ---------------------------- |
| `id`                      | integer | İlçe ID'si                   |
| `name`                    | string  | İlçe adı                     |
| `slug`                    | string  | URL uyumlu ilçe adı          |
| `provinceId`              | integer | Bağlı olduğu il ID'si        |
| `population`              | integer | İlçe nüfusu                  |
| `area.value`              | number  | İlçe alan değeri             |
| `area.unit`               | string  | Alan birimi, her zaman `km2` |
| `stats.municipalityCount` | integer | İlçedeki belediye sayısı     |
| `stats.neighborhoodCount` | integer | İlçedeki mahalle sayısı      |
| `stats.villageCount`      | integer | İlçedeki köy sayısı          |

Örnek ilçe:

```json
{
  "data": {
    "id": 1103,
    "name": "Adalar",
    "slug": "adalar",
    "provinceId": 34,
    "population": 17489,
    "area": {
      "value": 11,
      "unit": "km2"
    },
    "stats": {
      "municipalityCount": 1,
      "neighborhoodCount": 5,
      "villageCount": 0
    }
  },
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-10"
  }
}
```

## İlçeleri Listeleme

```http
GET /v2/districts
```

Sayfalanmış ilçe listesi döndürür.

### Sorgu Parametreleri

| Parametre       | Tip     | Varsayılan | Açıklama                                                                   |
| --------------- | ------- | ---------- | -------------------------------------------------------------------------- |
| `search`        | string  | -          | İlçe adına göre filtreler                                                  |
| `fields`        | string  | -          | Döndürülecek ilçe alanlarının virgülle ayrılmış listesi                    |
| `sort`          | string  | `id`       | Sıralama değeri: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`         | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası                            |
| `offset`        | integer | `0`        | Atlanacak kayıt sayısı                                                     |
| `minPopulation` | integer | -          | Minimum nüfus                                                              |
| `maxPopulation` | integer | -          | Maksimum nüfus                                                             |
| `minArea`       | number  | -          | Kilometrekare cinsinden minimum alan                                       |
| `maxArea`       | number  | -          | Kilometrekare cinsinden maksimum alan                                      |
| `provinceId`    | integer | -          | Bağlı olduğu il ID'sine göre filtreler                                     |

### İzin Verilen Alanlar

```text
id,name,slug,provinceId,population,area,stats
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&limit=2&fields=id,name,provinceId,population"
```

### Yanıt

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
    "lastUpdated": "2026-05-10"
  }
}
```

## ID ile İlçe Getirme

```http
GET /v2/districts/{districtId}
```

Sayısal ilçe ID'si ile tek ilçe döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama   |
| ------------ | ------- | ---------- |
| `districtId` | integer | İlçe ID'si |

### Sorgu Parametreleri

| Parametre | Tip    | Açıklama                                                      |
| --------- | ------ | ------------------------------------------------------------- |
| `fields`  | string | Döndürülecek ilçe alanlarının virgülle ayrılmış listesi       |
| `include` | string | Dahil edilecek ilişkili kaynakların virgülle ayrılmış listesi |

### Include Değerleri

```text
province,municipalities,neighborhoods,villages
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103?include=province,neighborhoods"
```

### Yanıt

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
    "lastUpdated": "2026-05-10"
  }
}
```

Dahil edilen kaynaklar kendi şemalarını kullanır. Yukarıdaki örnekte iç içe nesneler okunabilirlik için kısaltılmıştır.

## İlçedeki Belediyeleri Listeleme

```http
GET /v2/districts/{districtId}/municipalities
```

Path parametresindeki `districtId` ile eşleşen belediyeleri döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama   |
| ------------ | ------- | ---------- |
| `districtId` | integer | İlçe ID'si |

### Sorgu Parametreleri

| Parametre | Tip     | Varsayılan | Açıklama                                                    |
| --------- | ------- | ---------- | ----------------------------------------------------------- |
| `fields`  | string  | -          | Döndürülecek belediye alanlarının virgülle ayrılmış listesi |
| `limit`   | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası             |
| `offset`  | integer | `0`        | Atlanacak kayıt sayısı                                      |

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/municipalities"
```

## İlçedeki Mahalleleri Listeleme

```http
GET /v2/districts/{districtId}/neighborhoods
```

Path parametresindeki `districtId` ile eşleşen mahalleleri döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama   |
| ------------ | ------- | ---------- |
| `districtId` | integer | İlçe ID'si |

### Sorgu Parametreleri

| Parametre | Tip     | Varsayılan | Açıklama                                                   |
| --------- | ------- | ---------- | ---------------------------------------------------------- |
| `fields`  | string  | -          | Döndürülecek mahalle alanlarının virgülle ayrılmış listesi |
| `limit`   | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası            |
| `offset`  | integer | `0`        | Atlanacak kayıt sayısı                                     |

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/neighborhoods?fields=id,name,population"
```

## İlçedeki Köyleri Listeleme

```http
GET /v2/districts/{districtId}/villages
```

Path parametresindeki `districtId` ile eşleşen köyleri döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama   |
| ------------ | ------- | ---------- |
| `districtId` | integer | İlçe ID'si |

### Sorgu Parametreleri

| Parametre | Tip     | Varsayılan | Açıklama                                               |
| --------- | ------- | ---------- | ------------------------------------------------------ |
| `fields`  | string  | -          | Döndürülecek köy alanlarının virgülle ayrılmış listesi |
| `limit`   | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası        |
| `offset`  | integer | `0`        | Atlanacak kayıt sayısı                                 |

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/villages"
```

## Yaygın Hatalar

| Status | Kod                     | Ne zaman oluşur                                              |
| ------ | ----------------------- | ------------------------------------------------------------ |
| `400`  | `BAD_REQUEST`           | Sorgu veya path parametresi doğrulaması başarısız olduğunda  |
| `400`  | `INVALID_FIELDS`        | `fields` istenen kaynak için bilinmeyen bir alan içerdiğinde |
| `400`  | `INVALID_INCLUDE`       | `include` desteklenmeyen bir ilişki içerdiğinde              |
| `404`  | `DISTRICT_NOT_FOUND`    | İstenen ilçe bulunamadığında                                 |
| `429`  | -                       | Rate limit aşıldığında                                       |
| `500`  | `INTERNAL_SERVER_ERROR` | Beklenmeyen sunucu hatasında                                 |

Hata yanıtı:

```json
{
  "error": {
    "code": "DISTRICT_NOT_FOUND",
    "message": "District not found.",
    "status": 404
  }
}
```
