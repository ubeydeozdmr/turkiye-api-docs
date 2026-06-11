---
outline: deep
---

# Örnekler

Bu sayfa pratik v2 kullanım akışlarını gösterir. Her örnek küçük bir yanıt yapısı kullanır; aynı kalıbı frontend formlarında, backend servislerinde, script'lerde veya veri pipeline'larında uyarlayabilirsiniz.

## Hiyerarşik Adres Seçici

İl -> ilçe -> mahalle formlarında her child koleksiyonu yalnızca kullanıcı parent kaydı seçtikten sonra yükleyin.

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name&sort=name"
```

Kullanıcı İstanbul'u (`34`) seçtikten sonra:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts?fields=id,name"
```

Kullanıcı Adalar'ı (`1103`) seçtikten sonra:

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/neighborhoods?fields=id,name,postalCode,postalCodeStatus"
```

Dropdown ve adım adım seçiciler için bu nested kalıbı kullanın. Daha geniş bir sonuç kümesinde arama, filtreleme, sıralama veya sayfalama gerekiyorsa collection endpoint'lerini kullanın.

## İstanbul'un İlçeleri

İstanbul'un il ID'si `34`'tür. İlçelerini listelemek için:

::: code-group

```bash [curl]
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name,population&sort=name"
```

```javascript [fetch]
const response = await fetch(
  'https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name,population&sort=name',
);

const { data } = await response.json();
console.log(data);
```

:::

Nested endpoint de kullanılabilir:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts?fields=id,name,population"
```

Kullanıcı az önce bir il seçtiyse nested endpoint'i tercih edin. Parent filtresiyle birlikte `search`, `sort`, sayfalama veya nüfus filtreleri kullanmak istiyorsanız collection query daha pratiktir.

## Belediyeye Göre Mahalleler

Kullanıcı bir belediye seçtiğinde mahalleleri `municipalityId` ile yükleyin.

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?municipalityId=937&fields=id,name,postalCode,postalCodeStatus&sort=name&limit=100"
```

Bu akış adres formları için kullanışlıdır:

```text
İl -> İlçe -> Belediye -> Mahalle
```

Zaten belediye detay sayfasındaysanız nested endpoint de kullanılabilir:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities/937/neighborhoods?fields=id,name,postalCode,postalCodeStatus"
```

## İl Seçici

Kompakt bir il seçici için yalnızca `id` ve `name` isteyin:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name&sort=name&limit=100"
```

Yanıtta yine `meta` bulunur; böylece seçiciyi hangi veri seti sürümünün doldurduğunu doğrulayabilirsiniz.

## Nüfus Aralığındaki İlçeler

İstanbul'da nüfusu `100000` ile `500000` arasında olan ilçeleri bulmak için:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&minPopulation=100000&maxPopulation=500000&fields=id,name,population&sort=-population"
```

Bu kalıp dashboard ve raporlama araçları için kullanışlıdır.

Minimum değer maksimum değerden büyükse API `400 INVALID_RANGE_FILTER` döndürür.

## Posta Kodu Filtreleme

Tam posta koduyla kayıt bulmak için:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?postalCode=01020&fields=id,name,provinceId,districtId,postalCode"
```

Kısmi posta kodu girişini desteklemek için:

```bash
curl "https://api.turkiyeapi.dev/v2/villages?postalCodePrefix=020&fields=id,name,provinceId,districtId,postalCode"
```

Yalnızca resmi PTT posta kodu verisine dayanan kayıtları istiyorsanız `postalCodeStatus=official` ekleyin.

## Tipe Göre Belediyeler

Belde belediyelerini listelemek için:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?type=town&fields=id,name,provinceId,districtId,population&limit=50"
```

İzin verilen belediye tipleri `province_center`, `district_center` ve `town` değerleridir.

## İlişkili Verilerle Kaynak Detayı

Parent kaynaklara ihtiyaç duyan detay ekranları için `include` kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods/3?include=province,district,municipality"
```

Bu istek mahalleyi; il, ilçe ve belediye bilgileriyle birlikte tek yanıtta döndürür.

Liste ekranları ve dropdown'larda büyük ilişkili dizileri `include` ile yüklemek yerine parent filtrelerini veya nested child route'ları tercih edin.

## Statik Veri Seti İndirme

Tüm il kayıtlarına yerelde ihtiyacınız varsa:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
```

Sabit bir snapshot için:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

Tam import işlemleri için statik dosyaları, filtrelenmiş ve sayfalanmış uygulama akışları için API endpoint'lerini kullanın.
