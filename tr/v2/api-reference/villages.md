---
outline: deep
---

# Köyler

Köy endpoint'leri Türkiye'deki köy kayıtlarını sunar.

Temel path:

```http
/v2/villages
```

## Endpoint'ler

| Method | Path                       | Açıklama              |
| ------ | -------------------------- | --------------------- |
| `GET`  | `/v2/villages`             | Köyleri listeler      |
| `GET`  | `/v2/villages/{villageId}` | ID ile tek köy getirir |

## Köy Nesnesi

| Alan               | Tip     | Açıklama                                  |
| ------------------ | ------- | ----------------------------------------- |
| `id`               | integer | Köy ID'si                                 |
| `name`             | string  | Köy adı                                   |
| `slug`             | string  | URL uyumlu köy adı                        |
| `provinceId`       | integer | Bağlı olduğu il ID'si                     |
| `districtId`       | integer | Bağlı olduğu ilçe ID'si                   |
| `population`       | integer | Köy nüfusu                                |
| `postalCode`       | string  | Beş haneli köy posta kodu                 |
| `postalCodeStatus` | string  | Posta kodu durumu: `official` veya `estimated` |

::: tip
Posta kodları sayısal görünse de `postalCode` alanı beş haneli string olarak döner. Türkiye'deki bazı posta kodları sıfır ile başlar ve integer olarak saklanırsa baştaki sıfır kaybolur.
:::

## Posta Kodu Durumu

Posta kodunun nasıl belirlendiğini anlamak için `postalCodeStatus` alanını kullanın:

| Değer | Anlamı |
| ----- | ------ |
| `official` | Posta kodu resmi PTT posta kodu verisinde bulunur ve doğrudan bu kaynaktan kullanılır. |
| `estimated` | Posta kodu PTT verisinde yoktur. Değer ek kamusal kaynaklardan, yakındaki yerleşimlerden, ilçe düzeyi posta kodu örüntülerinden veya belgelenmiş idari değişikliklerden çıkarılır. |

`derived` yalnızca mahallelerde kullanılır; köylerde kullanılmaz.

Kesin resmi posta kodu verisine ihtiyaç duyan istemciler `postalCodeStatus` alanını kontrol etmelidir. Yalnızca resmi kullanım için `postalCodeStatus` değeri `official` olan kayıtları filtreleyin.

Güncel köy durumu dağılımı:

| Durum | Sayı |
| ----- | ---- |
| `official` | `18,162` |
| `estimated` | `21` |
| Toplam | `18,183` |

Örnek köy:

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

## Köyleri Listeleme

```http
GET /v2/villages
```

Sayfalanmış köy listesi döndürür.

### Sorgu Parametreleri

| Parametre       | Tip     | Varsayılan | Açıklama                                                                 |
| --------------- | ------- | ---------- | ------------------------------------------------------------------------ |
| `search`        | string  | -          | Köy adına göre filtreler                                                 |
| `fields`        | string  | -          | Döndürülecek köy alanlarının virgülle ayrılmış listesi                   |
| `sort`          | string  | `id`       | Sıralama değeri: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit`         | integer | `100`      | Döndürülecek kayıt sayısı, `1` ile `1000` arası                          |
| `offset`        | integer | `0`        | Atlanacak kayıt sayısı                                                   |
| `minPopulation` | integer | -          | Minimum nüfus                                                            |
| `maxPopulation` | integer | -          | Maksimum nüfus                                                           |
| `provinceId`    | integer | -          | Bağlı olduğu il ID'sine göre filtreler                                   |
| `districtId`    | integer | -          | Bağlı olduğu ilçe ID'sine göre filtreler                                 |

### İzin Verilen Alanlar

```text
id,name,slug,provinceId,districtId,population,postalCode,postalCodeStatus
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/villages?districtId=1105&limit=2&fields=id,name,provinceId,population"
```

### Yanıt

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

## ID ile Köy Getirme

```http
GET /v2/villages/{villageId}
```

Sayısal köy ID'si ile tek köy döndürür.

### Path Parametreleri

| Parametre   | Tip     | Açıklama  |
| ----------- | ------- | --------- |
| `villageId` | integer | Köy ID'si |

### Sorgu Parametreleri

| Parametre | Tip    | Varsayılan | Açıklama                                                      |
| --------- | ------ | ---------- | ------------------------------------------------------------- |
| `fields`  | string | -          | Döndürülecek köy alanlarının virgülle ayrılmış listesi        |
| `include` | string | -          | Dahil edilecek ilişkili kaynakların virgülle ayrılmış listesi |

### Include Değerleri

```text
province,district
```

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/villages/547?include=province,district"
```

### Yanıt

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

## Yaygın Hatalar

| Status | Kod                     | Ne zaman oluşur                                        |
| ------ | ----------------------- | ------------------------------------------------------ |
| `400`  | `BAD_REQUEST`           | Sorgu veya path parametresi doğrulaması başarısız olduğunda |
| `400`  | `INVALID_FIELDS`        | `fields` istenen kaynak için bilinmeyen bir alan içerdiğinde |
| `400`  | `INVALID_INCLUDE`       | `include` desteklenmeyen bir ilişki içerdiğinde       |
| `404`  | `VILLAGE_NOT_FOUND`     | İstenen köy bulunamadığında                           |
| `429`  | -                       | Rate limit aşıldığında                                |
| `500`  | `INTERNAL_SERVER_ERROR` | Beklenmeyen sunucu hatasında                          |

Hata yanıtı:

```json
{
  "error": {
    "code": "VILLAGE_NOT_FOUND",
    "message": "Village not found.",
    "status": 404
  }
}
```
