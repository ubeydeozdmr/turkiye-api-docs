---
outline: deep
---

# Filtreleme, Sıralama ve Sayfalama

Çoğu v2 liste endpoint'i aynı sorgu davranışını paylaşır. Bu sayfa ortak parametreleri ve gerçek isteklerde nasıl birlikte kullanılacaklarını açıklar.

## Liste Endpoint Yapısı

Liste endpoint'leri `data` dizisi ve `meta` objesi döndürür:

```json
{
  "data": [],
  "meta": {
    "count": 0,
    "total": 0,
    "limit": 100,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-10"
  }
}
```

`count`, mevcut yanıttaki kayıt sayısıdır. `total`, filtrelerle eşleşen toplam kayıt sayısıdır.

## Ortak Parametreler

| Parametre | Amaç |
| --------- | ---- |
| `search` | Kaynak adına göre filtreler |
| `fields` | Yanıtı seçilen alanlarla sınırlar |
| `sort` | Desteklenen alanlara göre sıralar |
| `limit` | Sayfa boyutunu belirler, `1` ile `1000` arası |
| `offset` | Sayfa döndürmeden önce kayıt atlar |
| `minPopulation` | Nüfusu değere eşit veya daha büyük kayıtları filtreler |
| `maxPopulation` | Nüfusu değere eşit veya daha küçük kayıtları filtreler |

Kaynağa özel parametreler endpoint'e göre `provinceId`, `districtId`, `municipalityId`, `type`, `minArea`, `maxArea`, `minAltitude`, `maxAltitude`, `isCoastal` ve `isMetropolitan` olabilir.

## Arama

Ada göre filtrelemek için `search` kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul"
```

Bu parametre kaynak adlarında arama yapar, ID araması yapmaz. Bilinen bir ID'yi getirmek için tekil kaynak endpoint'ini kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34"
```

## Alan Seçimi

Yanıt boyutunu azaltmak için `fields` kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name,population"
```

Her kaynağın kendi izin verilen alan listesi vardır. `fields` desteklenmeyen bir alan içerirse API `INVALID_FIELDS` hatası döndürür.

## Sıralama

Çoğu yerleşim liste endpoint'i şunları destekler:

```text
id,-id,name,-name,population,-population
```

Azalan sıralama için alanın başına `-` ekleyin:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&sort=-population&fields=id,name,population"
```

## Sayfalama

Büyük koleksiyonlarda sayfalama için `limit` ve `offset` kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?provinceId=34&limit=100&offset=0"
```

Sonraki sayfa için `offset` değerini sayfa boyutu kadar artırın:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?provinceId=34&limit=100&offset=100"
```

Maksimum `limit` değeri `1000`'dir. Büyük bir koleksiyondaki tüm kayıtlara offline işleme için ihtiyacınız varsa [veri seti indirmelerini](./datasets.md) değerlendirin.

## Nüfus Filtreleri

Nüfus filtreleri konum filtreleriyle birlikte kullanılabilir:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&minPopulation=100000&maxPopulation=500000&sort=name"
```

Bu istek, İstanbul'da nüfusu `100000` ile `500000` arasında olan ilçeleri döndürür.

## Konum Filtreleri

Child koleksiyonları sınırlandırmak için parent ID'leri kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?districtId=1104"
```

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?municipalityId=937"
```

```bash
curl "https://api.turkiyeapi.dev/v2/villages?districtId=1105"
```

## Parametreleri Birleştirme

Bu istek bir belediyedeki ilk 20 mahalleyi nüfusa göre sıralar ve yalnızca seçici için gereken alanları döndürür:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?municipalityId=937&fields=id,name,population,postalCode&sort=-population&limit=20&offset=0"
```

## Validasyon

Geçersiz sorgu değerleri `400 Bad Request` döndürür. Yaygın nedenler:

- `limit` değerinin `1`'den küçük veya `1000`'den büyük olması.
- `offset` değerinin `0`'dan küçük olması.
- Desteklenmeyen `sort` değerleri.
- Bilinmeyen `fields` alanları.
- Yanlış tipte sorgu parametreleri.
