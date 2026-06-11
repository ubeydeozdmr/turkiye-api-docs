---
outline: deep
---

# Examples

This page shows practical v2 workflows. Each example uses a small response shape so you can adapt the same pattern in frontend forms, backend services, scripts, or data pipelines.

## Hierarchical Address Selector

For province -> district -> neighborhood forms, load each child collection only after the user selects its parent.

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name&sort=name"
```

After the user selects İstanbul (`34`):

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts?fields=id,name"
```

After the user selects Adalar (`1103`):

```bash
curl "https://api.turkiyeapi.dev/v2/districts/1103/neighborhoods?fields=id,name,postalCode,postalCodeStatus"
```

Use this nested pattern for dropdowns and step-by-step selectors. Use collection endpoints when you need search, filtering, sorting, or pagination across a broader result set.

## Districts of İstanbul

İstanbul's province ID is `34`. To list its districts:

::: code-group

```bash [curl]
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name,population&sort=name"
```

```javascript [fetch]
const response = await fetch(
  'https://api.turkiyeapi.dev/v2/districts?provinceId=34&fields=id,name,population&sort=name'
);

const { data } = await response.json();
console.log(data);
```

:::

You can also use the nested endpoint:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces/34/districts?fields=id,name,population"
```

Prefer the nested endpoint when the user has just selected a province. Use the collection query when you want to combine parent filtering with `search`, `sort`, pagination, or population filters.

## Neighborhoods by Municipality

When a user selects a municipality, load neighborhoods with `municipalityId`.

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods?municipalityId=937&fields=id,name,postalCode,postalCodeStatus&sort=name&limit=100"
```

This is useful for address forms:

```text
Province -> District -> Municipality -> Neighborhood
```

If you are already on a municipality detail page, the nested endpoint is also available:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities/937/neighborhoods?fields=id,name,postalCode,postalCodeStatus"
```

## Province Picker

For a compact province selector, request only `id` and `name`:

```bash
curl "https://api.turkiyeapi.dev/v2/provinces?fields=id,name&sort=name&limit=100"
```

The response still includes `meta`, so you can verify the dataset version used to populate the picker.

## Districts in a Population Range

To find districts in İstanbul with population between `100000` and `500000`:

```bash
curl "https://api.turkiyeapi.dev/v2/districts?provinceId=34&minPopulation=100000&maxPopulation=500000&fields=id,name,population&sort=-population"
```

This pattern is useful for dashboards and reporting tools.

## Municipalities by Type

To list town municipalities:

```bash
curl "https://api.turkiyeapi.dev/v2/municipalities?type=town&fields=id,name,provinceId,districtId,population&limit=50"
```

Allowed municipality types are `province_center`, `district_center`, and `town`.

## Resource Detail with Related Data

Use `include` for detail screens that need parent resources:

```bash
curl "https://api.turkiyeapi.dev/v2/neighborhoods/3?include=province,district,municipality"
```

This returns the neighborhood plus its province, district, and municipality in one response.

For list screens and dropdowns, prefer parent filters or nested child routes instead of loading large related arrays with `include`.

## Download a Static Dataset

If you need all province records locally:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/provinces.json"
```

For a stable snapshot:

```bash
curl "https://api.turkiyeapi.dev/v2/datasets/2025/provinces.json"
```

Use static files for full imports. Use API endpoints for filtered, paginated application workflows.
