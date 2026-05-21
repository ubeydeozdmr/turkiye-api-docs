---
outline: deep
---

# Kavramlar

TurkiyeAPI v2, Türkiye'nin idari verilerini birbiriyle ilişkili az sayıda kaynak olarak modeller. Bu kaynakları anlamak, doğru endpoint'i seçmenizi ve yanıtlardaki parent-child ilişkilerini yorumlamanızı kolaylaştırır.

## İl

İl, API'deki en üst seviye idari birimdir. Türkiye'de 81 il vardır.

İl kayıtları kimlik, demografi, coğrafya, bölge, koordinat, telefon alan kodu ve toplam sayı alanlarını içerir:

- `id`, `name`, `slug`
- `population`
- `area`, `altitude`
- `phoneAreaCodes`
- `isCoastal`, `isMetropolitan`
- `region`, `coordinates`
- `stats.districtCount`, `stats.municipalityCount`, `stats.neighborhoodCount`, `stats.villageCount`

"İstanbul seçilsin, sonra ilçeleri listelensin" gibi il seviyesinden başlayan akışlarda il kaynağını kullanın.

## İlçe

İlçe bir ile bağlıdır. İlçe kayıtlarında `provinceId` bulunur; bu alan ilçeyi parent iline bağlar.

İlçe kayıtları şunları içerir:

- `id`, `name`, `slug`
- `provinceId`
- `population`
- `area`
- `stats.municipalityCount`, `stats.neighborhoodCount`, `stats.villageCount`

Kullanıcının il altında ikinci seviye bir konum seçmesi gereken akışlarda ilçeleri kullanın.

## Belediye

Belediye, yerel yönetim birimini temsil eder. v2'de belediyeler, v1'deki `towns` kavramının yerine daha açık bir model ve `type` alanıyla gelir.

Belediye kayıtları şunları içerir:

- `id`, `name`, `slug`
- `type`
- `provinceId`, `districtId`
- `population`
- `stats.neighborhoodCount`

İzin verilen belediye tipleri:

| Tip | Anlamı |
| --- | ------ |
| `province_center` | İl merkezi belediyesi |
| `district_center` | İlçe merkezi belediyesi |
| `town` | Belde belediyesi |

Özellikle `municipalityId` ile mahalleleri yüklemeden önce yerel yönetim seviyesine ihtiyaç duyduğunuzda belediye kayıtlarını kullanın.

## Mahalle

Mahalle bir ile, ilçeye ve belediyeye bağlıdır.

Mahalle kayıtları şunları içerir:

- `id`, `name`, `slug`
- `provinceId`, `districtId`, `municipalityId`
- `population`
- `postalCode`, `postalCodeStatus`

`postalCode` beş haneli string olarak döner. Türkiye'deki bazı posta kodları `0` ile başlayabildiği için numeric saklama baştaki sıfırları kaybettirir. `postalCodeStatus`, posta kodunun nasıl atandığını belirtir. Mahallelerde `official`, `derived` veya `estimated` değerleri kullanılabilir.

## Köy

Köy bir ile ve ilçeye bağlıdır. Mahallelerden farklı olarak köylerde `municipalityId` alanı yoktur.

Köy kayıtları şunları içerir:

- `id`, `name`, `slug`
- `provinceId`, `districtId`
- `population`
- `postalCode`, `postalCodeStatus`

Köylerde `postalCodeStatus` değeri `official` veya `estimated` olabilir.

Kırsal yerleşim akışları ve ilçe kapsamındaki köy listeleri için köyleri kullanın.

## ID'ler ve Slug'lar

Path parametrelerinde numeric ID kullanılır:

```http
GET /v2/provinces/34
GET /v2/districts/1103
```

`slug`, adın URL uyumlu halidir ve gösterim URL'leri veya client-side routing için kullanışlıdır. Ancak kaynak getirme endpoint'leri ID kullanır.

## Parent ID'ler

Child kaynaklar parent ID'leri taşır. Böylece nested yanıt almadan kayıtları filtreleyebilir ve ilişkilendirebilirsiniz:

| Kaynak | Parent alanları |
| ------ | --------------- |
| İlçe | `provinceId` |
| Belediye | `provinceId`, `districtId` |
| Mahalle | `provinceId`, `districtId`, `municipalityId` |
| Köy | `provinceId`, `districtId` |

Örneğin İstanbul'daki tüm ilçeler:

```http
GET /v2/districts?provinceId=34
```

## Include Kullanımı

Tekil kaynak endpoint'leri ilişkili kaynakları include edebilir. Örneğin:

```http
GET /v2/neighborhoods/3?include=province,district,municipality
```

Detay görünümü için `include` kullanın. Liste ekranlarında parent ID ile filtrelemek genellikle daha hafif ve sayfalamaya daha uygundur.
