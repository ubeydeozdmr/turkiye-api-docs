---
outline: deep
---

# API Referansı

TurkiyeAPI v2, Türkiye'nin idari verileri için salt okunur bir REST API'dir. Bu referans; endpoint sözleşmelerini, sorgu parametrelerini, yanıt envelope yapılarını, kaynak şemalarını ve hata formatlarını belgeler.

Base URL:

```http
https://api.turkiyeapi.dev
```

v2 API prefix'i:

```http
/v2
```

## Referans Bölümleri

| Bölüm | Açıklama |
| ----- | -------- |
| [Sistem](./system.md) | Sağlık, metadata ve OpenAPI endpoint'leri |
| [Veri Setleri](./datasets.md) | Statik veri seti indirmeleri |
| [İller](./provinces.md) | İl kaynakları ve il kapsamındaki koleksiyonlar |
| [İlçeler](./districts.md) | İlçe kaynakları ve ilçe kapsamındaki koleksiyonlar |
| [Belediyeler](./municipalities.md) | Belediye kaynakları ve belediye kapsamındaki koleksiyonlar |
| [Mahalleler](./neighborhoods.md) | Mahalle kaynakları |
| [Köyler](./villages.md) | Köy kaynakları |
| [Hatalar](./errors.md) | Hata envelope yapısı, status kodları ve hata kodları |
| [Şemalar](./schemas.md) | Ortak yanıt envelope yapıları ve şema özetleri |

## Endpoint Grupları

### Sistem

| Method | Path | Açıklama |
| ------ | ---- | -------- |
| `GET` | `/health` | Servis sağlık durumunu kontrol eder |
| `GET` | `/v2/meta` | API ve veri seti metadata'sını getirir |
| `GET` | `/v2/openapi.json` | OpenAPI dokümanını getirir |

### Veri Setleri

| Method | Path | Açıklama |
| ------ | ---- | -------- |
| `GET` | `/v2/datasets/{datasetFile}` | Güncel veri seti dosyasını indirir |
| `GET` | `/v2/datasets/{datasetVersion}/{datasetFile}` | Sürümlü veri seti dosyasını indirir |

### Yerleşim Kaynakları

| Method | Path | Açıklama |
| ------ | ---- | -------- |
| `GET` | `/v2/provinces` | İlleri listeler |
| `GET` | `/v2/provinces/{provinceId}` | Tek il getirir |
| `GET` | `/v2/districts` | İlçeleri listeler |
| `GET` | `/v2/districts/{districtId}` | Tek ilçe getirir |
| `GET` | `/v2/municipalities` | Belediyeleri listeler |
| `GET` | `/v2/municipalities/{municipalityId}` | Tek belediye getirir |
| `GET` | `/v2/neighborhoods` | Mahalleleri listeler |
| `GET` | `/v2/neighborhoods/{neighborhoodId}` | Tek mahalle getirir |
| `GET` | `/v2/villages` | Köyleri listeler |
| `GET` | `/v2/villages/{villageId}` | Tek köy getirir |

## Ortak Sorgu Parametreleri

Çoğu liste endpoint'i şunları destekler:

| Parametre | Açıklama |
| --------- | -------- |
| `search` | Kaynak adına göre filtreler |
| `fields` | Döndürülecek alanların virgülle ayrılmış listesi |
| `sort` | Sıralama değeri: `id`, `-id`, `name`, `-name`, `population`, `-population` |
| `limit` | Sayfa boyutu, `1` ile `1000` arası |
| `offset` | Atlanacak kayıt sayısı |
| `minPopulation` | Minimum nüfus |
| `maxPopulation` | Maksimum nüfus |

Kaynağa özel filtreler her kaynak sayfasında belgelenir.

## Yanıt Formatı

Liste endpoint'leri şunu döndürür:

```json
{
  "data": [],
  "meta": {
    "count": 0,
    "total": 0,
    "limit": 100,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

Tekil kaynak endpoint'leri şunu döndürür:

```json
{
  "data": {},
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

Hata yanıtları şunu döndürür:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message.",
    "status": 400
  }
}
```
