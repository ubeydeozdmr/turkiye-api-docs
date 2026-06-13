---
outline: deep
---

# Gizlilik Politikası

Son güncelleme: 13 Haziran 2026

Bu sayfa, TurkiyeAPI'nin public v2 API için hangi logları tuttuğunu ve operasyonel verilerin nasıl kullanıldığını açıklar. Bu metin açık bir proje politikasıdır; hukuki danışmanlık niteliği taşımaz.

## Özet

TurkiyeAPI, idari veriler için herkese açık ve salt okunur bir API'dir. API; hesap, API anahtarı veya kimlik doğrulama gerektirmez.

Servis; güvenlik, kötüye kullanımı önleme, rate limit, hata ayıklama ve güvenilirlik için sınırlı loglar kullanır.

## İşlenebilecek Veriler

Uygulama logları şu teknik istek metadata'larını içerebilir:

- Request ID.
- API sürümü.
- HTTP metodu.
- İstek path'i ve eşleşen route.
- Tam sorgu değerleri olmadan sorgu parametresi adları.
- HTTP status code.
- Yanıt süresi.
- Cache durumu.
- Rate limit durumu.
- Zaman damgası, servis adı ve ortam bilgisi.

Sunucu veya proxy access logları ayrıca şunları içerebilir:

- IP adresi.
- User agent.
- İstek path'i veya URI.
- Zaman damgası.
- Status code.
- Yanıt boyutu.
- Yanıt süresi.

## Bilerek Loglamadığımız Veriler

Uygulama logları şu bilgileri tutmayacak şekilde tasarlanmıştır:

- Request body.
- Response body.
- Cookie'ler.
- Authorization header'ları.
- Tam request header'ları.
- Tam sorgu parametresi değerleri.

API public olduğu ve kimlik doğrulama gerektirmediği için kullanıcılar isteklerde secret, kişisel veri, token veya gizli bilgi göndermemelidir.

## Loglar Neden Kullanılır?

Loglar şu amaçlarla kullanılır:

- API'yi güvenilir tutmak.
- Operasyonel sorunları ayıklamak.
- Kötüye kullanımı tespit etmek ve önlemek.
- Rate limit'leri uygulamak.
- Hataları ve kesintileri incelemek.

Loglar reklam veya pazarlama profillemesi için kullanılmaz.

## Hosting Sağlayıcısı

TurkiyeAPI altyapısı, Almanya veya Avrupa Birliği'ndeki Hetzner Online GmbH sunucularında barındırılabilir.

Hosting sağlayıcısı, sunucu altyapısı sağlama kapsamında operasyonel verileri işleyebilir.

## Saklama Süresi

Operasyonel loglar yalnızca güvenlik, kötüye kullanımı önleme, hata ayıklama ve servis güvenilirliği için ihtiyaç duyulduğu sürece saklanır.

Ham sunucu access logları için hedeflenen saklama süresi kısadır; kötüye kullanım, güvenlik olayı veya operasyonel sorun incelemesi daha uzun süre gerektirmediği sürece genellikle yaklaşık 7 ila 14 gündür.

## Cookie ve Analytics

TurkiyeAPI, API erişimi için cookie gerektirmez.

Dokümantasyon sitesi tema veya dil gibi yerel tarayıcı tercihlerini browser storage ile saklayabilir. Bu tercihler tarayıcınızda kalır.

İleride üçüncü taraf analytics, pazarlama pixel'i veya tracking cookie eklenirse bu politika, ilgili araçlar etkinleştirilmeden önce veya etkinleştirildiğinde güncellenmelidir.

## Üçüncü Taraflar

TurkiyeAPI kişisel verileri satmaz.

Operasyonel veriler, API ve dokümantasyonu çalıştırmak için gerekli hosting sağlayıcısı gibi altyapı sağlayıcıları tarafından işlenebilir.

## İletişim

Gizlilik soruları veya talepleri için [GitHub deposu](https://github.com/ubeydeozdmr/turkiye-api) üzerinden maintainer ile iletişime geçebilir veya [ubeydeozdmr@gmail.com](mailto:ubeydeozdmr@gmail.com) adresine e-posta gönderebilirsiniz.
