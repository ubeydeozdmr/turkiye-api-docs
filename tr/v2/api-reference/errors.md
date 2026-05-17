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

| Kod                      | Status | Ne zaman oluşur                                              |
| ------------------------ | ------ | ------------------------------------------------------------ |
| `BAD_REQUEST`            | `400`  | Sorgu veya path parametresi doğrulaması başarısız olduğunda  |
| `INVALID_FIELDS`         | `400`  | `fields` istenen kaynak için bilinmeyen bir alan içerdiğinde |
| `INVALID_INCLUDE`        | `400`  | `include` desteklenmeyen bir ilişki içerdiğinde              |
| `ROUTE_NOT_FOUND`        | `404`  | İstenen rota bulunamadığında                                 |
| `DATASET_NOT_FOUND`      | `404`  | Veri seti dosyası veya sürümü bulunamadığında                |
| `PROVINCE_NOT_FOUND`     | `404`  | İstenen il bulunamadığında                                   |
| `DISTRICT_NOT_FOUND`     | `404`  | İstenen ilçe bulunamadığında                                 |
| `MUNICIPALITY_NOT_FOUND` | `404`  | İstenen belediye bulunamadığında                             |
| `NEIGHBORHOOD_NOT_FOUND` | `404`  | İstenen mahalle bulunamadığında                              |
| `VILLAGE_NOT_FOUND`      | `404`  | İstenen köy bulunamadığında                                  |
| `INTERNAL_SERVER_ERROR`  | `500`  | Beklenmeyen sunucu hatasında                                 |

## Doğrulama Hataları

Doğrulama hataları `400 Bad Request` olarak döner. Şu durumlarda oluşabilir:

- Path parametresi pozitif integer değilse.
- `limit` değeri `1` değerinden küçük veya `1000` değerinden büyükse.
- `offset` değeri `0` değerinden küçükse.
- `sort` desteklenen sıralama değerlerinden biri değilse.
- `fields` bilinmeyen bir alan içeriyorsa.
- `include` bilinmeyen bir ilişki içeriyorsa.
- Tipi belirlenmiş sorgu parametresi OpenAPI şemasına uymuyorsa.

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
