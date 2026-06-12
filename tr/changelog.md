---
outline: deep
---

# Değişiklik Günlüğü

Bu sayfa API'deki önemli değişiklikleri sürümlere göre takip eder. Yalnızca v1'den v2'ye geçiş için değildir; hata düzeltmeleri, yeni özellikler, endpoint değişiklikleri ve veri seti güncellemeleri gibi gelecekteki v2 sürümleri de burada listelenecektir.

v1'den geçiş detayları için [v1'den v2'ye Geçiş](./v2/guide/migration-from-v1.md) sayfasına bakabilirsiniz.

## v2

TurkiyeAPI'nin ilk v2 sürümü.

### Eklenenler

- `/v2` API prefix'i eklendi.
- `data` ve `meta` alanlarını kullanan metadata zengin yanıt envelope yapıları eklendi.
- Sabit `error.code`, `error.message` ve `error.status` alanlarını kullanan yapılandırılmış hata yanıtları eklendi.
- `include` ve nested collection route'larıyla ilişkili verilerin açıkça yüklenmesi eklendi.
- İl merkezi, ilçe merkezi ve belde belediyesi tiplerini kapsayan birinci sınıf `municipalities` kaynakları eklendi.
- `/v2/datasets` altında statik JSON veri seti indirmeleri eklendi.
- `/v2/datasets/2025/provinces.json` gibi sürümlü veri seti indirmeleri eklendi.
- API, veri seti, kaynak ve kayıt sayısı metadata bilgileri için `/v2/meta` eklendi.
- `/v2/openapi.json` üzerinden OpenAPI 3.1 çıktısı eklendi.
- Mahalle ve köy liste endpoint'leri için posta kodu filtreleri eklendi.

### Değişenler

- Liste sayfalaması `limit`, `offset`, `meta.count` ve `meta.total` ile standart hale getirildi.
- Arama davranışı `search` sorgu parametresi etrafında standart hale getirildi.
- Üst kaynak ad filtreleri ID filtreleri ve nested route'larla değiştirildi.
- İlişkili kaynaklar varsayılan olarak gömülmek yerine isteğe bağlı hale getirildi.
- Sorgu parametresi, alan seçimi, hiyerarşi ve aralık validasyonları sıkılaştırıldı.
- `area` ve `altitude` gibi sayısal ölçüm alanları `value` ve `unit` içeren yapılandırılmış objelere taşındı.
- `areaCode` yerine `phoneAreaCodes` kullanılmaya başlandı.
- Posta kodları yalnızca mahalle ve köy kayıtlarında `postalCode` ve `postalCodeStatus` alanlarıyla modellendi.

### Kaldırılanlar

- v2'de eski `/api/v1` prefix desteği kaldırıldı.
- Başarılı yanıtlardaki üst seviye `status` alanı kaldırıldı.
- `extend=true` kaldırıldı; bunun yerine `include` veya nested route kullanılmalıdır.
- `/towns` kaldırıldı; belde belediyeleri için `/v2/municipalities?type=town` kullanılmalıdır.
- `activatePostalCodes` kaldırıldı; posta kodu alanları desteklenen kaynaklarda doğrudan döner.
