---
outline: deep
---

# SSS

## API Key Gerekli mi?

Hayır. TurkiyeAPI v2 herkese açıktır ve kimlik doğrulama gerektirmez.

## Base URL Nedir?

Şunu kullanın:

```http
https://api.turkiyeapi.dev
```

v2 endpoint'leri şu prefix altındadır:

```http
/v2
```

Örneğin:

```http
https://api.turkiyeapi.dev/v2/provinces
```

## API Salt Okunur mu?

Evet. v2, idari veriler için salt okunur endpoint'ler sunar. Create, update veya delete endpoint'i sağlamaz.

## Güncel Veri Seti Sürümünü Nereden Görebilirim?

Şu endpoint'i çağırın:

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

Yanıt `apiVersion`, `datasetVersion`, `lastUpdated`, `sources` ve kayıt sayılarını içerir.

## API Endpoint'i mi Veri Seti Dosyası mı Kullanmalıyım?

Etkileşimli ekranlar, filtreleme, sıralama, sayfalama ve tekil kaynak sorguları için API endpoint'lerini kullanın.

Tüm veri setine yerelde ihtiyacınız varsa; örneğin analiz, arama indeksi, offline işleme veya planlı import için veri seti dosyalarını kullanın.

## `postalCode` Neden String?

Posta kodları `0` ile başlayabilir. Posta kodları number olarak dönseydi baştaki sıfırlar kaybolurdu. v2'de `postalCode`, mahalle ve köy kayıtlarında beş haneli string olarak döner.

Değerin nasıl belirlendiğini anlamak için `postalCodeStatus` alanını kullanın. `official` değerler resmi PTT posta kodu verisinden doğrudan gelir. `derived` yalnızca mevcut mahalle PTT verisinde yokken, PTT verisinde yer alan önceki köy veya yerleşim posta kodu kullanılabiliyorsa mahallelerde döner. `estimated` değerler ek kamusal kaynaklardan, yakındaki yerleşimlerden, ilçe düzeyi posta kodu örüntülerinden veya belgelenmiş idari değişikliklerden çıkarılır.

İstemciniz kesin resmi posta kodu verisine ihtiyaç duyuyorsa `postalCodeStatus` değeri `official` olan kayıtları filtreleyin.

## İstanbul'da Neden İki Telefon Alan Kodu Var?

İstanbul Boğaz'ın iki yakasına yayılır. Avrupa yakasında `212`, Anadolu yakasında `216` kullanılır. Tutarlılık için `phoneAreaCodes` her zaman dizi olarak döner.

## Bir Sorunu Nasıl Bildirebilirim?

Proje deposunda issue açın:

[github.com/ubeydeozdmr/turkiye-api](https://github.com/ubeydeozdmr/turkiye-api)

Endpoint'i, sorgu parametrelerini, beklenen sonucu, gerçek sonucu ve ilgili yanıt gövdesini ekleyin.

## Kesin Endpoint Dokümantasyonu Nerede?

Endpoint sözleşmeleri, sorgu parametreleri, alan listeleri, include değerleri, yanıt şemaları ve hata kodları için [API Referansı](../api-reference/) bölümünü kullanın.
