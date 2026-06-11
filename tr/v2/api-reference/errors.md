---
outline: deep
---

# Hatalar

v2 hata yanıtları, `error` nesnesi içeren tutarlı bir JSON envelope yapısı kullanır.

## Hata Yanıtı

```json
{
  "error": {
    "code": "PROVINCE_NOT_FOUND",
    "message": "Province not found.",
    "status": 404
  }
}
```

| Alan            | Tip     | Açıklama                                     |
| --------------- | ------- | -------------------------------------------- |
| `error.code`    | string  | Makine tarafından okunabilir sabit hata kodu |
| `error.message` | string  | İnsan tarafından okunabilir hata mesajı      |
| `error.status`  | integer | HTTP status kodu                             |

## HTTP Status Kodları

| Status | Anlamı                              |
| ------ | ----------------------------------- |
| `400`  | İstek doğrulaması başarısız oldu    |
| `404`  | Rota veya istenen kaynak bulunamadı |
| `429`  | Rate limit aşıldı                   |
| `500`  | Beklenmeyen sunucu hatası           |

Cache edilebilir `GET /v2/*` yanıtları, istemci eşleşen bir `If-None-Match` header'ı gönderdiğinde `304 Not Modified` döndürebilir. `304` yanıtları hata envelope yapısını kullanmaz.

## Yaygın Hata Kodları

| Kod                        | Status | Ne zaman oluşur                                                       |
| -------------------------- | ------ | --------------------------------------------------------------------- |
| `BAD_REQUEST`              | `400`  | Sorgu veya path parametresi doğrulaması başarısız olduğunda           |
| `INVALID_RANGE_FILTER`     | `400`  | Bir minimum aralık filtresi eşleşen maksimum değerden büyük olduğunda |
| `INVALID_HIERARCHY_FILTER` | `400`  | Parent ID filtreleri aynı idari zinciri göstermediğinde               |
| `INVALID_FIELDS`           | `400`  | `fields` istenen kaynak için bilinmeyen bir alan içerdiğinde          |
| `INVALID_INCLUDE`          | `400`  | `include` desteklenmeyen bir ilişki içerdiğinde                       |
| `ROUTE_NOT_FOUND`          | `404`  | İstenen rota bulunamadığında                                          |
| `DATASET_NOT_FOUND`        | `404`  | Veri seti dosyası veya sürümü bulunamadığında                         |
| `PROVINCE_NOT_FOUND`       | `404`  | İstenen il bulunamadığında                                            |
| `DISTRICT_NOT_FOUND`       | `404`  | İstenen ilçe bulunamadığında                                          |
| `MUNICIPALITY_NOT_FOUND`   | `404`  | İstenen belediye bulunamadığında                                      |
| `NEIGHBORHOOD_NOT_FOUND`   | `404`  | İstenen mahalle bulunamadığında                                       |
| `VILLAGE_NOT_FOUND`        | `404`  | İstenen köy bulunamadığında                                           |
| `INTERNAL_SERVER_ERROR`    | `500`  | Beklenmeyen sunucu hatasında                                          |

## Doğrulama Hataları

Doğrulama hataları `400 Bad Request` olarak döner. Şu durumlarda oluşabilir:

- Path parametresi pozitif integer değilse.
- `limit` değeri `1` değerinden küçük veya `1000` değerinden büyükse.
- `offset` değeri `0` değerinden küçükse.
- `sort` desteklenen sıralama değerlerinden biri değilse.
- `fields` bilinmeyen bir alan içeriyorsa.
- `include` bilinmeyen bir ilişki içeriyorsa.
- Tipi belirlenmiş sorgu parametresi OpenAPI şemasına uymuyorsa.
- Bir minimum aralık filtresi eşleşen maksimum değerden büyükse.
- Parent ID filtreleri idari hiyerarşiyle çelişiyorsa.

## Aralık Filtresi Hataları

Çelişkili aralık filtreleri `INVALID_RANGE_FILTER` döndürür:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?minPopulation=1000000&maxPopulation=1000"
```

```json
{
  "error": {
    "code": "INVALID_RANGE_FILTER",
    "message": "Minimum population must be less than or equal to maximum population.",
    "status": 400
  }
}
```

Aynı doğrulama nüfus, alan ve rakım gibi desteklenen `min*` ve `max*` çiftleri için geçerlidir.

## Hiyerarşi Filtresi Hataları

Çelişkili parent filtreleri `INVALID_HIERARCHY_FILTER` döndürür:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?provinceId=34&districtId=1104"
```

```json
{
  "error": {
    "code": "INVALID_HIERARCHY_FILTER",
    "message": "Hierarchy filters are inconsistent.",
    "status": 400
  }
}
```

Bu hatayı başka bir `provinceId` değerine bağlı `districtId` ya da eşleşmeyen `provinceId` veya `districtId` ile kullanılan `municipalityId` gibi kombinasyonları yakalamak için kullanın.

## Bulunamadı Hataları

Kaynak endpoint'leri kaynağa özel `404` kodları döndürür:

```json
{
  "error": {
    "code": "DISTRICT_NOT_FOUND",
    "message": "District not found.",
    "status": 404
  }
}
```

Bilinmeyen rotalar şu yanıtı döndürür:

```json
{
  "error": {
    "code": "ROUTE_NOT_FOUND",
    "message": "Route not found.",
    "status": 404
  }
}
```
