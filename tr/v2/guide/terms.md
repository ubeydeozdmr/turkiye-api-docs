---
outline: deep
---

# Kullanım Şartları

Son güncelleme: 13 Haziran 2026

Bu şartlar, public TurkiyeAPI servisinin kabul edilebilir kullanımını açıklar. Amaç, ücretsiz bir public API için beklentileri netleştirmektir.

## Bağımsız Proje

TurkiyeAPI bağımsız bir açık/public API projesidir. Herhangi bir resmi devlet kurumu ile bağlantılı değildir, resmi olarak desteklenmez ve bir devlet kurumu tarafından işletilmez.

## Ücretsiz Public Erişim

TurkiyeAPI ücretsiz olarak sunulur ve normal public erişim için kimlik doğrulama gerektirmez.

Servisi korumak, kötüye kullanımı önlemek veya API'yi diğer kullanıcılar için erişilebilir tutmak gerektiğinde erişim sınırlandırılabilir, değiştirilebilir veya engellenebilir.

## Kabul Edilebilir Kullanım

TurkiyeAPI'yi adres formları, konum seçiciler, raporlama araçları, açık veri incelemeleri ve dahili veri iş akışları gibi yasal uygulamalar için kullanabilirsiniz.

API'yi şu amaçlarla kullanamazsınız:

- Yasa dışı faaliyet yürütmek.
- Dolandırıcılık, aldatma, phishing, spam veya yanıltıcı servisler oluşturmak ya da desteklemek.
- Servise saldırmak, aşırı yük bindirmek, servisi bozmak, kötüye kullanım amaçlı scraping yapmak veya zararlı şekilde tersine mühendislik uygulamak.
- Rate limit'leri veya diğer koruyucu kontrolleri aşmak.
- Query parametreleri veya request payload'ları içinde secret, kimlik bilgisi, kişisel veri veya gizli bilgi göndermek.
- TurkiyeAPI'yi resmi bir devlet servisi gibi göstermek.

## Rate Limit ve Engelleme

API rate limit uygulayabilir. Aşırı, otomatik, zararlı veya anormal trafik yavaşlatılabilir ya da engellenebilir.

Daha yüksek hacimli kullanım gerekiyorsa, mümkün olduğunda veri seti indirmelerini tercih edin veya kullanım senaryosunu görüşmek için maintainer ile iletişime geçin.

## Garanti veya SLA Yoktur

TurkiyeAPI; servis seviyesi anlaşması, uptime garantisi veya doğruluk, eksiksizlik, belirli bir amaca uygunluk ya da kesintisiz erişilebilirlik garantisi olmadan "olduğu gibi" sunulur.

Veriler birçok iş akışı için faydalıdır; ancak kritik, hukuki, finansal, acil durum veya güvenlik açısından hassas sistemlerde kullanmadan önce bağımsız olarak doğrulamalısınız.

## Değişiklikler

Endpoint'ler, response alanları, veri setleri, rate limit'ler ve altyapı zaman içinde değişebilir.

Proje, özellikle stabil API sürümleri için breaking change'leri ve geçiş yollarını mümkün olduğunda dokümante etmeyi hedefler.

## v1 ve v2

v1 legacy API'dir. v2, bu rehberde belgelenen güncel API yüzeyidir.

Yeni entegrasyonlar, özellikle v1 davranışına bağlı değilse v2 kullanmalıdır.

## İletişim

Sorular için [GitHub deposu](https://github.com/ubeydeozdmr/turkiye-api) üzerinden issue açabilir veya tartışma başlatabilirsiniz.
