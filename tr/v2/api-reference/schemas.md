---
outline: deep
---

# Şemalar

Bu sayfa v2 yanıt envelope yapılarını ve kaynak şemalarını özetler. Yerleşim kaynaklarının alan detayları kendi referans sayfalarında da belgelenir.

## Yanıt Envelope Yapıları

### Data Response

Tekil kaynak endpoint'leri şu yapıyı döndürür:

```json
{
  "data": {},
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

### List Response

Liste endpoint'leri şu yapıyı döndürür:

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

| Alan | Tip | Açıklama |
| ---- | --- | -------- |
| `meta.count` | integer | Bu yanıttaki kayıt sayısı |
| `meta.total` | integer | Filtrelere uyan toplam kayıt sayısı |
| `meta.limit` | integer | İstenen sayfa boyutu |
| `meta.offset` | integer | İstenen offset değeri |
| `meta.datasetVersion` | string | Yanıtta kullanılan veri seti sürümü |
| `meta.lastUpdated` | string | Veri seti güncelleme tarihi |

## Kaynak Şemaları

| Şema | Açıklama | Referans |
| ---- | -------- | -------- |
| `Province` | Coğrafya, bölge, koordinat ve toplu sayım alanları içeren il kaydı | [İller](./provinces.md) |
| `District` | Bağlı il, alan, nüfus ve toplu sayım alanları içeren ilçe kaydı | [İlçeler](./districts.md) |
| `Municipality` | Tip, bağlı kaynak ID'leri, nüfus ve mahalle sayısı içeren belediye kaydı | [Belediyeler](./municipalities.md) |
| `Neighborhood` | Bağlı kaynak ID'leri, nüfus, posta kodu ve posta kodu durumu içeren mahalle kaydı | [Mahalleler](./neighborhoods.md) |
| `Village` | Bağlı kaynak ID'leri, nüfus, posta kodu ve posta kodu durumu içeren köy kaydı | [Köyler](./villages.md) |

## Ortak Alan Tipleri

| Alan kalıbı | Tip | Notlar |
| ----------- | --- | ------ |
| `id` | integer | Pozitif kaynak ID'si |
| `name` | string | İnsan tarafından okunabilir Türkçe ad |
| `slug` | string | URL uyumlu kaynak adı |
| `population` | integer | Negatif olmayan nüfus |
| `area.value` | number | Alan değeri |
| `area.unit` | string | Her zaman `km2` |
| `altitude.value` | number | Rakım değeri |
| `altitude.unit` | string | Her zaman `m` |
| `postalCode` | string | Beş haneli posta kodu |
| `postalCodeStatus` | string | Posta kodu durumu. Mahallelerde `official`, `derived` veya `estimated`; köylerde `official` veya `estimated` kullanılır |
| `stats.*Count` | integer | Negatif olmayan toplu sayım değeri |

## Belediye Tipleri

| Değer | Anlamı |
| ----- | ------ |
| `province_center` | İl merkezi belediyesi |
| `district_center` | İlçe merkezi belediyesi |
| `town` | Belde belediyesi |

## Meta Şeması

`GET /v2/meta` şu yapıyı döndürür:

| Alan | Tip | Açıklama |
| ---- | --- | -------- |
| `apiVersion` | string | API sürümü |
| `datasetVersion` | string | Veri seti sürümü |
| `lastUpdated` | string | Veri seti güncelleme tarihi |
| `sources` | array | Veri seti kaynak listesi |
| `counts.provinces` | integer | İl sayısı |
| `counts.districts` | integer | İlçe sayısı |
| `counts.municipalities` | integer | Belediye sayısı |
| `counts.neighborhoods` | integer | Mahalle sayısı |
| `counts.villages` | integer | Köy sayısı |

## Hata Şeması

Hata yanıtları şu yapıyı kullanır:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message.",
    "status": 400
  }
}
```

Hata kodları ve örnekler için [Hatalar](./errors.md) sayfasına bakın.
