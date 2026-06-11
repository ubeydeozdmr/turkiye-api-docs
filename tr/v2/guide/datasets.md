---
outline: deep
---

# Veri Setleri

TurkiyeAPI v2 hem canlı API endpoint'leri hem de statik JSON veri seti dosyaları sağlar. Etkileşimli sorgular ve filtrelenmiş yanıtlar için API'yi kullanın. Tam yerel kopyalara ihtiyacınız olduğunda veri seti dosyalarını kullanın.

## API mi Statik Dosya mı?

| Kullanım                                                     | Önerilen seçenek         |
| ------------------------------------------------------------ | ------------------------ |
| Kullanıcı bir il seçer ve ilçeleri yüklersiniz               | API endpoint'i           |
| Görünür UI verisini arama, filtreleme, sıralama ve sayfalama | API endpoint'i           |
| Bilinen tek bir kaynak için server-side doğrulama            | API endpoint'i           |
| Yerel arama indeksi oluşturma                                | Statik veri seti dosyası |
| Offline analiz veya batch işleme                             | Statik veri seti dosyası |
| Tüm mahalleleri veya köyleri tekrar tekrar senkronize etme   | Statik veri seti dosyası |

## Kullanılabilir Dosyalar

Veri seti endpoint'i her kaynak tipi için bir JSON dosyası sunar:

| Dosya                 | İçerik             |
| --------------------- | ------------------ |
| `provinces.json`      | İl kayıtları       |
| `districts.json`      | İlçe kayıtları     |
| `municipalities.json` | Belediye kayıtları |
| `neighborhoods.json`  | Mahalle kayıtları  |
| `villages.json`       | Köy kayıtları      |

## Güncel Veriyi İndirme

Her zaman güncel veri setini almak için latest dosya endpoint'ini kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
```

Yanıt, API Referansı'nda belgelenen aynı kaynak şemasını kullanan bir JSON dizisidir.

Güncel veri seti yanıtları, client ve CDN'lerin içeriği verimli şekilde revalidate etmesini sağlayan cache header'ları içerir.

## Sürümlü Veri Seti İndirme

Tekrarlanabilir build'ler veya sabit snapshot'lar için sürümlü endpoint'i kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

Sürümlü dosyalar daha uzun süre cache edilebilir çünkü ilgili veri seti sürümü için içerikleri değişmez kabul edilir.

## Revalidation

Veri seti yanıtları `ETag` ve `Last-Modified` header'ları içerir. Client önceki `ETag` değerini saklıyorsa bir sonraki istekte `If-None-Match` gönderebilir.

İçerik değişmemişse API şunu döndürebilir:

```http
304 Not Modified
```

`304` yanıtları normal HTTP cache yanıtlarıdır; JSON hata envelope yapısını kullanmaz.

## Doğru Stratejiyi Seçme

Uygulama ekranları için API endpoint'lerini tercih edin; çünkü yalnızca gereken sayfayı ve alanları döndürürler:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name"
```

Veri işleme işleri için statik dosyaları tercih edin; böylece büyük koleksiyonlarda sayfalama yapmanız gerekmez:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/neighborhoods.json"
```

İki strateji birlikte de kullanılabilir: planlı veri alımı için veri seti dosyaları, canlı kullanıcı akışları için API endpoint'leri.
