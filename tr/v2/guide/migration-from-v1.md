---
outline: deep
---

# v1'den Geçiş

Bu sayfa, TurkiyeAPI v1 kullanan bir entegrasyonu v2'ye taşırken değiştirmeniz gereken ana noktaları özetler.

v1, `/v1` ve `/api/v1` altında salt okunur endpoint'ler sunuyordu. v2 yine salt okunurdur; ancak sözleşme daha açık hale getirildi: rotalar `/v2` altında toplanır, yanıtlar metadata içerir, ilişkili kaynaklar bilinçli olarak istenir ve eski `towns` modeli daha kapsamlı `municipalities` modeliyle değiştirilmiştir.

## Hızlı Kontrol Listesi

- API prefix'ini `/v1` veya `/api/v1` yerine `/v2` olarak değiştirin.
- Başarılı yanıtlarda üst seviye `status` alanını okumayı bırakın.
- Sayfalama ve veri seti bilgilerini yeni `meta` nesnesinden okuyun.
- `name` filtrelerini `search` ile değiştirin.
- `province` ve `district` gibi üst kaynak ad filtrelerini ID filtreleri veya iç içe rotalarla değiştirin.
- `extend=true` yerine `include=...` kullanın.
- Sadece belde belediyelerini istiyorsanız `/towns` yerine `/municipalities?type=town` kullanın.
- Alan adlarını gözden geçirin; v1'de düz sayı olan bazı alanlar v2'de nesne yapısına taşındı.
- Hata işleme mantığını `error.code`, `error.message` ve `error.status` alanlarına göre güncelleyin.

## Base URL ve Sürüm Prefix'i

v1 iki prefix kabul ediyordu:

```text
/v1
/api/v1
```

v2 şunu kullanır:

```text
/v2
```

Örnekler:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces"
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts"
```

## Yanıt Formatı

v1 başarılı yanıtlarda `status` alanı kullanıyordu:

```json
{
  "status": "OK",
  "data": []
}
```

v2 başarılı yanıtlarda `data` ve `meta` kullanır:

```json
{
  "data": [],
  "meta": {
    "count": 10,
    "total": 81,
    "limit": 10,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

Tekil kaynak endpoint'leri de veri seti metadata'sı içerir:

```json
{
  "data": {
    "id": 34,
    "name": "İstanbul"
  },
  "meta": {
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

## Hata Formatı

v1 hata formatı:

```json
{
  "status": "ERROR",
  "error": "No province found."
}
```

v2 yapılandırılmış hata nesnesi döndürür:

```json
{
  "error": {
    "code": "PROVINCE_NOT_FOUND",
    "message": "Province not found.",
    "status": 404
  }
}
```

Doğrulama sorunları `400 Bad Request` olarak döner. Bulunamayan kaynaklar `404 Not Found` olarak döner. Bilinmeyen rotalar `ROUTE_NOT_FOUND` kodunu kullanır.

## Endpoint Eşleştirmesi

| v1 | v2 |
| --- | --- |
| `GET /` | API metadata'sı için dokümantasyonu veya `GET /v2/meta` endpoint'ini kullanın |
| `GET /provinces` | `GET /v2/provinces` |
| `GET /provinces/:id` | `GET /v2/provinces/{provinceId}` |
| İlçeler il yanıtına varsayılan olarak eklenirdi | `GET /v2/provinces/{provinceId}?include=districts` veya `GET /v2/provinces/{provinceId}/districts` |
| `extend=true` ile il mahalleleri | `GET /v2/provinces/{provinceId}?include=neighborhoods` veya `GET /v2/provinces/{provinceId}/neighborhoods` |
| `extend=true` ile il köyleri | `GET /v2/provinces/{provinceId}?include=villages` veya `GET /v2/provinces/{provinceId}/villages` |
| `GET /districts` | `GET /v2/districts` |
| `GET /districts/:id` | `GET /v2/districts/{districtId}` |
| Mahalleler ilçe detayına varsayılan olarak eklenirdi | `GET /v2/districts/{districtId}?include=neighborhoods` veya `GET /v2/districts/{districtId}/neighborhoods` |
| Köyler ilçe detayına varsayılan olarak eklenirdi | `GET /v2/districts/{districtId}?include=villages` veya `GET /v2/districts/{districtId}/villages` |
| `GET /neighborhoods` | `GET /v2/neighborhoods` |
| `GET /neighborhoods/:id` | `GET /v2/neighborhoods/{neighborhoodId}` |
| `GET /villages` | `GET /v2/villages` |
| `GET /villages/:id` | `GET /v2/villages/{villageId}` |
| `GET /towns` | `GET /v2/municipalities?type=town` |
| `GET /towns/:id` | `GET /v2/municipalities/{municipalityId}` |
| `GET /swagger` | OpenAPI dokümanı için `GET /v2/openapi.json` |

v2 ayrıca belediye odaklı iç içe rotalar ekler:

| Rota | Amaç |
| --- | --- |
| `GET /v2/provinces/{provinceId}/municipalities` | Bir ildeki belediyeleri listeler |
| `GET /v2/districts/{districtId}/municipalities` | Bir ilçedeki belediyeleri listeler |
| `GET /v2/municipalities/{municipalityId}/neighborhoods` | Bir belediyedeki mahalleleri listeler |

## Sorgu Parametresi Değişiklikleri

### Arama

v1 `name`, `province` ve `district` gibi kaynağa özel ad filtreleri kullanıyordu.

v2 liste endpoint'lerinde ad eşleştirme için `search` kullanır:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul"
curl "https://api.turkiyeapi.dev/v2/districts?search=kadikoy"
```

Üst kaynak filtreleri için ID veya iç içe rotalar kullanılmalıdır:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34"
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts"
```

### Sayfalama

v1 varsayılanları kaynağa göre değişiyordu. İller ve ilçeler pratikte tüm kayıtları döndürebilirken mahalleler, köyler ve beldeler 1000 kayıtla başlıyordu.

v2 tüm liste endpoint'lerinde aynı sayfalama modelini kullanır:

| Parametre | v2 davranışı |
| --- | --- |
| `limit` | Varsayılan `100`, minimum `1`, maksimum `1000` |
| `offset` | Varsayılan `0`, minimum `0` |
| `meta.count` | Bu yanıttaki kayıt sayısı |
| `meta.total` | Filtrelere uyan toplam kayıt sayısı |

### Sıralama

v1 virgülle ayrılmış çok alanlı sıralama kabul ediyordu ve herhangi bir alanı desteklemeye çalışıyordu.

v2 tek bir sıralama değeri kabul eder:

| Değer | Anlamı |
| --- | --- |
| `id` | ID artan |
| `-id` | ID azalan |
| `name` | Ad artan |
| `-name` | Ad azalan |
| `population` | Nüfus artan |
| `-population` | Nüfus azalan |

### Alan Seçimi

`fields` hala virgülle ayrılmıştır; ancak izin verilen alanlar v2 şemalarıyla değişmiştir.

Örnek:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name,population"
```

Önemli alan değişiklikleri:

| v1 | v2 |
| --- | --- |
| Sayı olarak `area` | `area` nesnesi içinde `area.value` ve `area.unit` |
| Sayı olarak `altitude` | `altitude` nesnesi içinde `altitude.value` ve `altitude.unit` |
| `areaCode` | `phoneAreaCodes` |
| `nuts` | v2 il şemasında yok |
| `maps` | v2 il şemasında yok |
| Hesaplanan alanlar otomatik eklenirdi | `include` veya iç içe rotalar kullanılır |

### Include

v1 bazı endpoint'lerde ilişkili verileri otomatik ekliyordu:

- İl yanıtları `districts` içeriyordu.
- İlçe detay yanıtları `neighborhoods` ve `villages` içeriyordu.
- İl detayında daha derin alt kaynaklar için `extend=true` kullanılıyordu.

v2'de ilişkili veriler açıkça istenir:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts,municipalities"
curl "https://api.turkiyeapi.dev/v2/districts/1103?include=province,neighborhoods"
```

Desteklenen include değerleri:

| Endpoint | Desteklenen `include` değerleri |
| --- | --- |
| `/v2/provinces/{provinceId}` | `districts`, `municipalities`, `neighborhoods`, `villages` |
| `/v2/districts/{districtId}` | `province`, `municipalities`, `neighborhoods`, `villages` |
| `/v2/municipalities/{municipalityId}` | `province`, `district`, `neighborhoods` |
| `/v2/neighborhoods/{neighborhoodId}` | `province`, `district`, `municipality` |
| `/v2/villages/{villageId}` | `province`, `district` |

## Towns Artık Municipalities Altında

v1'de ayrı `towns` endpoint'leri vardı. v2'de beldeler `type` alanına sahip belediyeler olarak modellenir.

| v1 belde kavramı | v2 belediye kavramı |
| --- | --- |
| `/towns` | `/v2/municipalities?type=town` |
| `/towns/:id` | `/v2/municipalities/{municipalityId}` |
| Belde kaydı | `type: "town"` olan belediye kaydı |

v2 belediye tipi şu değerlerden biri olabilir:

| Tip | Anlamı |
| --- | --- |
| `province_center` | İl merkezi belediyesi |
| `district_center` | İlçe merkezi belediyesi |
| `town` | Belde belediyesi |

Bu, v1'den v2'ye geçişteki en büyük model değişikliğidir. v1 entegrasyonunuz yalnızca beldeleri kullanıyorsa v2 belediyelerini `type=town` ile filtreleyin. Tüm yerel belediyelere ihtiyacınız varsa `/v2/municipalities` endpoint'ini type filtresi olmadan kullanın.

## Posta Kodları

v1, `activatePostalCodes=true` verilmediği sürece il ve ilçe posta kodlarını gizliyordu; ayrıca tekil endpoint'lerde farklı truthy davranışı vardı.

v2 `activatePostalCodes` parametresini kaldırır. Posta kodu verisi mahalle ve köy kayıtlarında modellenir:

| Kaynak | v2 posta kodu alanları |
| --- | --- |
| İl | İl şemasında yok |
| İlçe | İlçe şemasında yok |
| Mahalle | `postalCode`, `postalCodeStatus` |
| Köy | `postalCode`, `postalCodeStatus` |

`postalCode` artık zorunlu beş haneli string olarak döner. `postalCodeStatus` da zorunludur; mahallelerde `official`, `derived` veya `estimated`, köylerde `official` veya `estimated` değerleri kullanılabilir.

## Veri Seti ve Metadata

v2 API ve veri seti metadata'sını şu endpoint ile sunar:

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

Güncel v2 veri seti metadata'sı:

| Alan | Değer |
| --- | --- |
| API sürümü | `2.0.0` |
| Veri seti sürümü | `2025` |
| Son güncelleme | `2026-05-21` |
| İller | `81` |
| İlçeler | `973` |
| Belediyeler | `1377` |
| Mahalleler | `32254` |
| Köyler | `18183` |

v2 ayrıca statik veri seti indirme endpoint'leri ekler:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

## Yaygın Geçiş Örnekleri

### İlleri Listeleme

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/provinces"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces"
```

### Ada Göre Arama

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/provinces?name=istanbul"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?search=istanbul"
```

### İlçelerle Birlikte İl Getirme

v1 il ilçelerini varsayılan olarak döndürüyordu:

```bash
curl "https://api.turkiyeapi.dev/v1/provinces/34"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts"
```

Alternatif olarak iç içe koleksiyonu kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts"
```

### Beldeleri Listeleme

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/towns"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?type=town"
```

### İlçeye Göre Mahalle Filtreleme

v1:

```bash
curl "https://api.turkiyeapi.dev/v1/neighborhoods?districtId=1103"
```

v2:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?districtId=1103"
```

Veya:

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/neighborhoods"
```

## Uyumluluk Notları

- v2, `/api/v1` benzeri alias'ları desteklemez.
- v2 liste yanıtları varsayılan olarak `limit=100` ile sayfalanır.
- v2 iç içe alt kaynakları varsayılan olarak eklemez.
- v2 bilinmeyen alanları ve bilinmeyen include değerlerini `400 Bad Request` ile reddeder.
- v2 için daha sıkı OpenAPI 3.1 sözleşmesi `/v2/openapi.json` üzerinde bulunur.
- v2 `search` için Türkçe metin normalizasyonu yapar; v1 ad eşleştirmesinde daha fazla uyumluluk kusuru vardı.
