---
outline: deep
---

# Yaygın Kullanım Senaryoları

Bu sayfa, yaygın entegrasyon senaryoları için doğru v2 endpoint yaklaşımını seçmenize yardımcı olur.

## Önerilen Kalıplar

| Senaryo | Önerilen yaklaşım |
| ------- | ----------------- |
| İl -> ilçe -> mahalle adres formu | Nested endpoint'ler |
| Kompakt il seçici | `/v2/provinces?fields=id,name` |
| İl seçildikten sonra ilçeler | `/v2/provinces/{provinceId}/districts?fields=id,name` |
| İlçe seçildikten sonra mahalleler | `/v2/districts/{districtId}/neighborhoods?fields=id,name,postalCode,postalCodeStatus` |
| Mahalle arama veya autocomplete | `/v2/neighborhoods?search=...&fields=id,name,districtId,provinceId,postalCode` |
| Belediye veya köy tablosu | Filtreleme, sıralama ve sayfalama içeren collection endpoint |
| ID'si bilinen tek kayıt | Tekil kaynak endpoint'i |
| Detay yanıtında ilişkili veri | Bilinçli kullanılan `include` |
| Tam import, offline kullanım veya build-time veri | Veri seti endpoint'leri |

## Adres Formları ve Hiyerarşik Seçiciler

Adres formlarında nested endpoint'leri tercih edin ve her seçici için yalnızca gereken alanları isteyin.

İllerle başlayın:

```http
GET /v2/provinces?fields=id,name&sort=name
```

Kullanıcı il seçtikten sonra:

```http
GET /v2/provinces/{provinceId}/districts?fields=id,name
```

Kullanıcı ilçe seçtikten sonra mahalleleri yükleyin:

```http
GET /v2/districts/{districtId}/neighborhoods?fields=id,name,postalCode,postalCodeStatus
```

Formunuzda köy gerekiyorsa:

```http
GET /v2/districts/{districtId}/villages?fields=id,name,postalCode,postalCodeStatus
```

Formunuzda belediye adımı varsa:

```http
GET /v2/districts/{districtId}/municipalities?fields=id,name,type
GET /v2/municipalities/{municipalityId}/neighborhoods?fields=id,name,postalCode,postalCodeStatus
```

Bu akış yanıtları küçük tutar, tüm child kayıtları baştan indirmeyi önler, client-side cache ile iyi çalışır ve kullanıcının seçim akışıyla doğrudan örtüşür.

## Arama, Tablolar ve Admin Ekranları

UI tek bir parent-child seçim zincirini takip etmiyorsa collection endpoint'leri kullanın. Collection endpoint'leri arama, filtreleme, sıralama, sayfalama ve daha geniş kapsamlı veri keşfi için daha uygundur.

Örnekler:

```http
GET /v2/districts?provinceId=34&fields=id,name,provinceId&sort=name
```

```http
GET /v2/neighborhoods?search=kizilay&fields=id,name,districtId,provinceId,postalCode&limit=20
```

```http
GET /v2/municipalities?provinceId=34&type=district_center&fields=id,name,type,districtId&sort=name
```

Bir tabloda parent adları gerekiyorsa parent kayıtları bir kez çekip `provinceId`, `districtId` veya `municipalityId` ile client tarafında birleştirin. Kullanıcı tek bir kaydı açtığında ilişkili veriye ihtiyaç varsa tekil detay endpoint'inde `include` kullanabilirsiniz.

## Detay Ekranları

Elinizde ID varsa ve tek kayıt gerekiyorsa tekil kaynak endpoint'ini kullanın:

```http
GET /v2/provinces/34
GET /v2/districts/1103
GET /v2/neighborhoods/3
```

Detay yanıtını odaklı tutmak için `fields` kullanın:

```http
GET /v2/provinces/34?fields=id,name,population,area
```

Detay ekranı ilişkili kayıtları özellikle aynı yanıtta istiyorsa `include` kullanın:

```http
GET /v2/neighborhoods/3?include=province,district,municipality
```

Dropdown'lar için `include` varsayılan yol olmamalıdır. Seçicilerde child koleksiyonları, kullanıcı parent kaydı seçtikten sonra yükleyin.

## Tam Veri Seti ve Offline Kullanım

Tüm Türkiye verisini import etmek, yerel arama indeksi oluşturmak, batch processing çalıştırmak veya uygulamanızla offline veri göndermek istiyorsanız canlı API endpoint'lerinde sayfalama yapmak yerine veri seti dosyalarını tercih edin:

```http
GET /v2/datasets/provinces.json
GET /v2/datasets/districts.json
GET /v2/datasets/neighborhoods.json
GET /v2/datasets/villages.json
```

Tekrarlanabilir build'ler için sürümlü veri seti URL'i kullanın:

```http
GET /v2/datasets/2025/neighborhoods.json
```

Canlı API endpoint'lerini interaktif kullanıcı akışları için kullanın. Bulk veya offline akışlar için veri seti endpoint'lerini kullanın.
