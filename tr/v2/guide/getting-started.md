---
outline: deep
---

# Başlarken

Bu sayfa TurkiyeAPI v2 ile ilk isteğinizi yapmanız için gereken temel bilgileri açıklar. v2, herkese açık ve salt okunur bir API'dir; bu yüzden tarayıcıdan, backend servisinden, script'ten veya API istemcisinden doğrudan çağrılabilir.

## Base URL

Production API adresi:

```http
https://api.turkiyeapi.dev
```

v2 endpoint'leri `/v2` prefix'i ile kullanılır:

```http
https://api.turkiyeapi.dev/v2
```

Örneğin iller endpoint'i:

```http
https://api.turkiyeapi.dev/v2/provinces
```

## Kimlik Doğrulama

TurkiyeAPI v2 API key veya authentication header gerektirmez.

Yalnızca URL ile istek yapabilirsiniz:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces"
```

Servis herkese açık olduğu için gereksiz yüksek hacimli polling'den kaçının. Tüm veri setine tekrar tekrar ihtiyacınız varsa [statik veri seti dosyalarını](./datasets.md) tercih edin.

## İlk İstek

Yalnızca ihtiyaç duyduğunuz alanları döndüren küçük bir istekle başlayın:

::: code-group

```bash [curl]
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name,population&limit=5"
```

```javascript [fetch]
const response = await fetch('https://api.turkiyeapi.dev/v2/provinces?fields=id,name,population&limit=5');

const result = await response.json();
console.log(result.data);
```

:::

Yanıt bir JSON envelope yapısıdır:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Adana",
      "population": 2283609
    },
    {
      "id": 2,
      "name": "Adıyaman",
      "population": 617821
    },
    {
      "id": 3,
      "name": "Afyonkarahisar",
      "population": 751808
    },
    {
      "id": 4,
      "name": "Ağrı",
      "population": 491489
    },
    {
      "id": 5,
      "name": "Amasya",
      "population": 342242
    }
  ],
  "meta": {
    "count": 5,
    "total": 81,
    "limit": 5,
    "offset": 0,
    "datasetVersion": "2025",
    "lastUpdated": "2026-05-21"
  }
}
```

`data` kayıtları içerir. `meta`, kaç kayıt döndüğünü, filtrelerle toplam kaç kayıt eşleştiğini ve yanıtın hangi veri seti sürümünden üretildiğini gösterir.

## Tek Kaynak Getirme

Path parametrelerinde numeric ID kullanılır:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34"
```

Bu istek İstanbul'u tek bir `data` objesi olarak döndürür. Tekil kaynak endpoint'leri `fields` destekler; birçoğu ilişkili kaynaklar için `include` da destekler:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34?include=districts,municipalities"
```

## Servis Metadata'sını Kontrol Etme

API sürümü, veri seti sürümü, güncelleme tarihi, veri kaynakları ve kayıt sayıları için `/v2/meta` endpoint'ini kullanın:

```bash
curl "https://api.turkiyeapi.dev/v2/meta"
```

Uptime kontrolleri için `/health` kullanılabilir:

```bash
curl "https://api.turkiyeapi.dev/health"
```

## Sonraki Adımlar

- Kaynak modelini anlamak için [Kavramlar](./concepts.md) sayfasını okuyun.
- Liste ekranları geliştirmeden önce [Filtreleme, Sıralama ve Sayfalama](./filtering-sorting-pagination.md) sayfasına bakın.
- Kesin endpoint sözleşmeleri için [API Referansı](../api-reference/) bölümünü kullanın.
