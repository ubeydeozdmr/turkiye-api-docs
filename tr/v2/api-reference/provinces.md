---
outline: deep
---

# İller

İl endpoint'leri Türkiye'deki il kayıtlarını ve il kapsamındaki alt koleksiyonları sunar.

Temel path:

```http
/v2/provinces
```

## Endpoint'ler

| Method | Path                                        | Açıklama                         |
| ------ | ------------------------------------------- | -------------------------------- |
| `GET`  | `/v2/provinces`                             | İlleri listeler                  |
| `GET`  | `/v2/provinces/{provinceId}`                | ID ile tek il getirir            |
| `GET`  | `/v2/provinces/{provinceId}/districts`      | Bir ildeki ilçeleri listeler     |
| `GET`  | `/v2/provinces/{provinceId}/municipalities` | Bir ildeki belediyeleri listeler |
| `GET`  | `/v2/provinces/{provinceId}/neighborhoods`  | Bir ildeki mahalleleri listeler  |
| `GET`  | `/v2/provinces/{provinceId}/villages`       | Bir ildeki köyleri listeler      |

## İl Nesnesi

| Alan                      | Tip       | Açıklama                     |
| ------------------------- | --------- | ---------------------------- |
| `id`                      | integer   | İl ID'si                     |
| `name`                    | string    | İl adı                       |
| `slug`                    | string    | URL uyumlu il adı            |
| `population`              | integer   | İl nüfusu                    |
| `area.value`              | number    | İl alan değeri               |
| `area.unit`               | string    | Alan birimi, her zaman `km2` |
| `altitude.value`          | number    | Metre cinsinden il rakımı    |
| `altitude.unit`           | string    | Rakım birimi, her zaman `m`  |
| `phoneAreaCodes`          | integer[] | İl telefon alan kodları      |
| `isCoastal`               | boolean   | İlin kıyı ili olup olmadığı  |
| `isMetropolitan`          | boolean   | İlin büyükşehir olup olmadığı |
| `region.tr`               | string    | İlin Türkçe bölge adı        |
| `region.en`               | string    | İlin İngilizce bölge adı     |
| `coordinates.latitude`    | number    | İl enlemi                    |
| `coordinates.longitude`   | number    | İl boylamı                   |
| `stats.districtCount`     | integer   | İldeki ilçe sayısı           |
| `stats.municipalityCount` | integer   | İldeki belediye sayısı       |
| `stats.neighborhoodCount` | integer   | İldeki mahalle sayısı        |
| `stats.villageCount`      | integer   | İldeki köy sayısı            |

::: tip
İstanbul ili, Boğaz'ın iki yakasında yer aldığı için iki telefon alan koduna sahiptir. Avrupa yakası 212 alan kodunu, Anadolu yakası ise 216 alan kodunu kullanır. Türkiye'deki diğer illerin tamamında yalnızca bir alan kodu vardır. Bu nedenle `phoneAreaCodes`, çoğu ilde tek eleman içerse de bir dizi olarak döner.
:::

Örnek il:

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

## İlleri Listeleme

```http
GET /v2/provinces
```

Sayfalanmış il listesi döndürür.

### Sorgu Parametreleri

| Parametre        | Tip     | Varsayılan | Açıklama                                                                 |
| ---------------- | ------- | ---------- | ------------------------------------------------------------------------ |
| `search`         | string  | -          | İl adına göre filtreler                                                  |
| `fields`         | string  | -          | Döndürülecek il alanlarının virgülle ayrılmış listesi                    |
| `sort`           | string  | `id`       | Sıralama değeri: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`          | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası                          |
| `offset`         | integer | `0`        | Atlanacak kayıt sayısı                                                   |
| `minPopulation`  | integer | -          | Minimum nüfus                                                            |
| `maxPopulation`  | integer | -          | Maksimum nüfus                                                           |
| `minArea`        | number  | -          | Kilometrekare cinsinden minimum alan                                     |
| `maxArea`        | number  | -          | Kilometrekare cinsinden maksimum alan                                    |
| `minAltitude`    | number  | -          | Metre cinsinden minimum rakım                                            |
| `maxAltitude`    | number  | -          | Metre cinsinden maksimum rakım                                           |
| `isCoastal`      | string  | -          | Kıyı illerini filtreler. İzin verilen değerler: `true`, `false`          |
| `isMetropolitan` | string  | -          | Büyükşehirleri filtreler. İzin verilen değerler: `true`, `false`         |

::: tip
`isCoastal` ve `isMetropolitan`, sorgu parametrelerinde kolay kullanım için `true` ve `false` string değerlerini kabul eder. Boolean gibi görünseler de query string içinde string olarak gönderilirler.
:::

### İzin Verilen Alanlar

```text
id,name,slug,population,area,altitude,phoneAreaCodes,isCoastal,isMetropolitan,region,coordinates,stats
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul&fields=id,name,population,area"
```

### Yanıt

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

## ID ile İl Getirme

```http
GET /v2/provinces/{provinceId}
```

Sayısal il ID'si ile tek il döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama |
| ------------ | ------- | -------- |
| `provinceId` | integer | İl ID'si |

### Sorgu Parametreleri

| Parametre | Tip    | Varsayılan | Açıklama                                                         |
| --------- | ------ | ---------- | ---------------------------------------------------------------- |
| `fields`  | string | -          | Döndürülecek il alanlarının virgülle ayrılmış listesi            |
| `include` | string | -          | Dahil edilecek ilişkili kaynakların virgülle ayrılmış listesi    |

### Include Değerleri

```text
districts,municipalities,neighborhoods,villages
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts,municipalities"
```

### Yanıt

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

Dahil edilen kaynaklar kendi şemalarını kullanır. Yukarıdaki örnekte iç içe diziler okunabilirlik için kısaltılmıştır.

## İldeki İlçeleri Listeleme

```http
GET /v2/provinces/{provinceId}/districts
```

Path parametresindeki `provinceId` ile eşleşen ilçeleri döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama |
| ------------ | ------- | -------- |
| `provinceId` | integer | İl ID'si |

### Sorgu Parametreleri

| Parametre | Tip     | Varsayılan | Açıklama                                        |
| --------- | ------- | ---------- | ----------------------------------------------- |
| `fields`  | string  | -          | Döndürülecek ilçe alanlarının virgülle ayrılmış listesi |
| `limit`   | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası |
| `offset`  | integer | `0`        | Atlanacak kayıt sayısı                          |

### İzin Verilen Alanlar

```text
id,name,slug,provinceId,population,area,stats
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts"
```

## İldeki Belediyeleri Listeleme

```http
GET /v2/provinces/{provinceId}/municipalities
```

Path parametresindeki `provinceId` ile eşleşen belediyeleri döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama |
| ------------ | ------- | -------- |
| `provinceId` | integer | İl ID'si |

### Sorgu Parametreleri

| Parametre | Tip     | Varsayılan | Açıklama                                          |
| --------- | ------- | ---------- | ------------------------------------------------- |
| `fields`  | string  | -          | Döndürülecek belediye alanlarının virgülle ayrılmış listesi |
| `limit`   | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası   |
| `offset`  | integer | `0`        | Atlanacak kayıt sayısı                            |

### İzin Verilen Alanlar

```text
id,name,slug,type,provinceId,districtId,population,stats
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/municipalities"
```

## İldeki Mahalleleri Listeleme

```http
GET /v2/provinces/{provinceId}/neighborhoods
```

Path parametresindeki `provinceId` ile eşleşen mahalleleri döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama |
| ------------ | ------- | -------- |
| `provinceId` | integer | İl ID'si |

### Sorgu Parametreleri

| Parametre | Tip     | Varsayılan | Açıklama                                          |
| --------- | ------- | ---------- | ------------------------------------------------- |
| `fields`  | string  | -          | Döndürülecek mahalle alanlarının virgülle ayrılmış listesi |
| `limit`   | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası   |
| `offset`  | integer | `0`        | Atlanacak kayıt sayısı                            |

### İzin Verilen Alanlar

```text
id,name,slug,provinceId,districtId,municipalityId,population,postalCode
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/neighborhoods?fields=id,name,population"
```

## İldeki Köyleri Listeleme

```http
GET /v2/provinces/{provinceId}/villages
```

Path parametresindeki `provinceId` ile eşleşen köyleri döndürür.

### Path Parametreleri

| Parametre    | Tip     | Açıklama |
| ------------ | ------- | -------- |
| `provinceId` | integer | İl ID'si |

### Sorgu Parametreleri

| Parametre | Tip     | Varsayılan | Açıklama                                      |
| --------- | ------- | ---------- | --------------------------------------------- |
| `fields`  | string  | -          | Döndürülecek köy alanlarının virgülle ayrılmış listesi |
| `limit`   | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası |
| `offset`  | integer | `0`        | Atlanacak kayıt sayısı                        |

### İzin Verilen Alanlar

```text
id,name,slug,provinceId,districtId,population,postalCode
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/villages"
```

## Yaygın Hatalar

| Status | Kod                     | Ne zaman oluşur                                        |
| ------ | ----------------------- | ------------------------------------------------------ |
| `400`  | `BAD_REQUEST`           | Sorgu veya path parametresi doğrulaması başarısız olduğunda |
| `400`  | `INVALID_FIELDS`        | `fields` istenen kaynak için bilinmeyen bir alan içerdiğinde |
| `400`  | `INVALID_INCLUDE`       | `include` desteklenmeyen bir ilişki içerdiğinde       |
| `404`  | `PROVINCE_NOT_FOUND`    | İstenen il bulunamadığında                            |
| `429`  | -                       | Rate limit aşıldığında                                |
| `500`  | `INTERNAL_SERVER_ERROR` | Beklenmeyen sunucu hatasında                          |

Hata yanıtı:

```json
{
  "error": {
    "code": "PROVINCE_NOT_FOUND",
    "message": "Province not found.",
    "status": 404
  }
}
```
