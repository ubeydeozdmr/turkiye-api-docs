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
    "lastUpdated": "2026-05-21"
  }
}
```

`count`, mevcut yanıttaki kayıt sayısıdır. `total`, filtrelerle eşleşen toplam kayıt sayısıdır.

## Ortak Parametreler

| Parametre       | Amaç                                                   |
| --------------- | ------------------------------------------------------ |
| `search`        | Kaynak adına göre filtreler                            |
| `fields`        | Yanıtı seçilen alanlarla sınırlar                      |
| `sort`          | Desteklenen alanlara göre sıralar                      |
| `limit`         | Sayfa boyutunu belirler, `1` ile `1000` arası          |
| `offset`        | Sayfa döndürmeden önce kayıt atlar                     |
| `minPopulation` | Nüfusu değere eşit veya daha büyük kayıtları filtreler |
| `maxPopulation` | Nüfusu değere eşit veya daha küçük kayıtları filtreler |

Kaynağa özel parametreler endpoint'e göre `provinceId`, `districtId`, `municipalityId`, `type`, `postalCode`, `postalCodePrefix`, `postalCodeStatus`, `minArea`, `maxArea`, `minAltitude`, `maxAltitude`, `isCoastal` ve `isMetropolitan` olabilir.

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

Aralık filtreleri çift olarak doğrulanır. Minimum değer eşleşen maksimum değerden büyükse API `400 INVALID_RANGE_FILTER` döndürür.

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?minArea=10000&maxArea=1000"
```

Aynı kural desteklenen nüfus, alan ve rakım aralıkları için geçerlidir.

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

Hiyerarşik seçicilerde nested route'lar genellikle daha nettir:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts?fields=id,name"
```

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1104/neighborhoods?fields=id,name,postalCode,postalCodeStatus"
```

Arama, sıralama, sayfalama veya daha geniş kapsamlı tablo ihtiyacınız varsa filtreli collection endpoint'lerini kullanın. Senaryo bazlı yönlendirme için [Yaygın Kullanım Senaryoları](./common-use-cases.md) sayfasına bakın.

Collection endpoint'lerinde parent ID filtrelerini birlikte kullandığınızda aynı idari zinciri göstermeleri gerekir. Örneğin `districtId` verilen `provinceId` değerine ait olmalı, `municipalityId` de verilen `provinceId` veya `districtId` ile eşleşmelidir. Çelişkili kombinasyonlar `400 INVALID_HIERARCHY_FILTER` döndürür.

## Posta Kodu Filtreleri

Mahalle ve köy liste endpoint'leri posta kodu filtrelerini destekler:

| Parametre          | Amaç                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| `postalCode`       | Tam beş haneli posta kodu eşleşmesi                                      |
| `postalCodePrefix` | Bir ile beş hane arasında prefix eşleşmesi                               |
| `postalCodeStatus` | `official` veya `official,derived` gibi virgülle ayrılmış durum filtresi |

Örnekler:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?postalCode=01020&fields=id,name,postalCode"
```

```bash
curl "https://api.turkiyeapi.dev/v2/villages?provinceId=2&postalCodePrefix=020&fields=id,name,postalCode"
```

Aynı filtreler `/v2/districts/{districtId}/neighborhoods` ve `/v2/provinces/{provinceId}/villages` gibi nested mahalle ve köy route'larında da kullanılabilir.

## Parametreleri Birleştirme

Bu istek bir belediyedeki ilk 20 mahalleyi nüfusa göre sıralar ve yalnızca seçici için gereken alanları döndürür:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?municipalityId=937&fields=id,name,population,postalCode,postalCodeStatus&sort=-population&limit=20&offset=0"
```

## Validasyon

Geçersiz sorgu değerleri `400 Bad Request` döndürür. Yaygın nedenler:

- `limit` değerinin `1`'den küçük veya `1000`'den büyük olması.
- `offset` değerinin `0`'dan küçük olması.
- Desteklenmeyen `sort` değerleri.
- Bilinmeyen `fields` alanları.
- Yanlış tipte sorgu parametreleri.
- `minPopulation > maxPopulation` gibi çelişkili aralık filtreleri.
- Farklı bir `provinceId` değerine bağlı `districtId` gibi çelişkili hiyerarşi filtreleri.
