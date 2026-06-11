---
outline: deep
---

# Veri Setleri

Veri seti endpoint'leri statik JSON veri seti dosyalarını döndürür. Sayfalanmış API yanıtları yerine tüm veri setini yerel olarak kullanmanız gerektiğinde bu endpoint'leri tercih edin.

Temel path:

```http
/v2/datasets
```

## Endpoint'ler

| Method | Path                                          | Açıklama                                          |
| ------ | --------------------------------------------- | ------------------------------------------------- |
| `GET`  | `/v2/datasets/{datasetFile}`                  | En güncel veri seti dosyasını indirir             |
| `GET`  | `/v2/datasets/{datasetVersion}/{datasetFile}` | Belirli bir sürümdeki veri seti dosyasını indirir |

## Veri Seti Dosyaları

| Dosya                 | İçerik             |
| --------------------- | ------------------ |
| `provinces.json`      | İl kayıtları       |
| `districts.json`      | İlçe kayıtları     |
| `municipalities.json` | Belediye kayıtları |
| `neighborhoods.json`  | Mahalle kayıtları  |
| `villages.json`       | Köy kayıtları      |

## Güncel Veri Setini İndirme

```http
GET /v2/datasets/{datasetFile}
```

Bir veri seti dosyasının en güncel sürümünü döndürür.

### Path Parametreleri

| Parametre     | Tip    | Açıklama                                                                                                                                     |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `datasetFile` | string | Veri seti dosya adı. İzin verilen değerler: `provinces.json`, `districts.json`, `municipalities.json`, `neighborhoods.json`, `villages.json` |

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
```

### Yanıt

Yanıt gövdesi, ilgili kaynak şemasını kullanan bir JSON dizisidir.

```json
[
  {
    "id": 1,
    "name": "Adana"
  }
]
```

Yukarıdaki örnekte nesne okunabilirlik için kısaltılmıştır.

### Cache Header'ları

Güncel veri seti yanıtları şunları içerir:

| Header          | Açıklama                                             |
| --------------- | ---------------------------------------------------- |
| `Cache-Control` | `public, max-age=3600, stale-while-revalidate=86400` |
| `Content-Type`  | `application/json; charset=utf-8`                    |
| `ETag`          | Veri seti içerik doğrulayıcısı                       |
| `Last-Modified` | Veri seti değiştirilme tarihi                        |

İstek eşleşen bir `If-None-Match` header'ı gönderirse API `304 Not Modified` döndürür.

## Sürümlü Veri Setini İndirme

```http
GET /v2/datasets/{datasetVersion}/{datasetFile}
```

Belirli bir veri seti sürümünü döndürür. Güncel sürüm `2025` değeridir.

### Path Parametreleri

| Parametre        | Tip    | Açıklama                                                                                                                                     |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `datasetVersion` | string | Veri seti sürümü. Güncel izin verilen değer: `2025`                                                                                          |
| `datasetFile`    | string | Veri seti dosya adı. İzin verilen değerler: `provinces.json`, `districts.json`, `municipalities.json`, `neighborhoods.json`, `villages.json` |

### İstek

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

### Cache Header'ları

Sürümlü veri seti yanıtları şunları içerir:

| Header          | Açıklama                              |
| --------------- | ------------------------------------- |
| `Cache-Control` | `public, max-age=31536000, immutable` |
| `Content-Type`  | `application/json; charset=utf-8`     |
| `ETag`          | Veri seti içerik doğrulayıcısı        |
| `Last-Modified` | Veri seti değiştirilme tarihi         |

## Yaygın Hatalar

| Status | Kod                     | Ne zaman oluşur                                  |
| ------ | ----------------------- | ------------------------------------------------ |
| `400`  | `BAD_REQUEST`           | Path parametresi doğrulaması başarısız olduğunda |
| `404`  | `DATASET_NOT_FOUND`     | Veri seti dosyası veya sürümü bulunamadığında    |
| `429`  | -                       | Rate limit aşıldığında                           |
| `500`  | `INTERNAL_SERVER_ERROR` | Beklenmeyen sunucu hatasında                     |

Hata yanıtı:

```json
{
  "error": {
    "code": "DATASET_NOT_FOUND",
    "message": "Dataset not found.",
    "status": 404
  }
}
```
