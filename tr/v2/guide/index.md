---
outline: deep
---

# Rehber

TurkiyeAPI v2, Türkiye'nin idari verileri için salt okunur bir REST API'dir. Bu rehber; veri modelini, kaynakların birbirleriyle ilişkisini ve endpoint'lerin gerçek kullanım akışlarında nasıl birleştirileceğini açıklar.

API'yi öğrenirken veya entegrasyon tasarlarken rehberi kullanın. Endpoint sözleşmeleri, alan listeleri, izin verilen sorgu değerleri ve hata kodları için [API Referansı](../api-reference/) bölümüne bakın.

## Ne Geliştirebilirsiniz?

API; adres formları, konum seçiciler, raporlama araçları, dashboard'lar, açık veri çalışmaları ve Türkiye idari birimlerine ihtiyaç duyan doğrulama akışları için kullanılabilir.

Yaygın kullanım akışları:

- Seçilen bir ilin ilçelerini listelemek.
- Bir ilçe içindeki belediyeleri bulmak.
- Bir belediyeye bağlı mahalleleri yüklemek.
- Yerleşimleri nüfusa göre filtrelemek.
- Tüm veri setini offline işleme için indirmek.

## Rehber Bölümleri

| Bölüm | Ne açıklar? |
| ----- | ----------- |
| [Başlarken](./getting-started.md) | Base URL, v2 prefix'i, auth gerektirmeyen erişim, ilk istek ve yanıt yapısı |
| [Kavramlar](./concepts.md) | İl, ilçe, belediye, mahalle, köy, ID'ler, slug'lar ve parent ID'ler |
| [İdari Yapı](./administrative-structure.md) | Türkiye idari hiyerarşisinin API'de nasıl temsil edildiği |
| [Filtreleme, Sıralama ve Sayfalama](./filtering-sorting-pagination.md) | Liste endpoint'lerindeki ortak sorgu parametreleri ve örnekler |
| [Veri Setleri](./datasets.md) | Canlı API endpoint'leri ile statik veri seti dosyalarının ne zaman kullanılacağı |
| [Örnekler](./examples.md) | İstanbul'un ilçeleri ve belediyeye göre mahalleler gibi gerçek kullanım akışları |
| [v1'den v2'ye Geçiş](./migration-from-v1.md) | Mevcut entegrasyonlar için v1 ve v2 farkları |
| [SSS](./faq.md) | Erişim, metadata, veri setleri ve destek hakkında referans dışı yanıtlar |

## API Yapısı

Tüm v2 yerleşim kaynakları aynı base URL altında bulunur:

```http
https://api.turkiyeapi.dev/v2
```

API, JSON yanıt envelope yapıları kullanır:

- Liste endpoint'leri `data` dizisi ve sayfalama metadata'sı döndürür.
- Tekil kaynak endpoint'leri `data` objesi ve veri seti metadata'sı döndürür.
- Hatalar sabit bir kod, mesaj ve HTTP status içeren `error` objesi döndürür.

## Kaynak Haritası

Temel kaynaklar:

- `provinces`: Türkiye'nin 81 ili.
- `districts`: İllere bağlı ilçeler.
- `municipalities`: İllere ve ilçelere bağlı yerel yönetimler.
- `neighborhoods`: İl, ilçe ve belediyeye bağlı mahalle kayıtları.
- `villages`: İl ve ilçeye bağlı köy kayıtları.

Alanlar ve endpoint listeleri için [API Referansı](../api-reference/) bölümüne bakın.
