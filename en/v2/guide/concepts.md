---
outline: deep
---

# Concepts

TurkiyeAPI v2 models Türkiye's administrative data as a small set of related resources. Understanding these resources makes it easier to choose the right endpoint and interpret parent-child relationships in responses.

## Province

A province is the top-level administrative unit in the API. Türkiye has 81 provinces.

Province records include identity fields, demographic fields, geography, region data, coordinates, phone area codes, and aggregate counts:

- `id`, `name`, `slug`
- `population`
- `area`, `altitude`
- `phoneAreaCodes`
- `isCoastal`, `isMetropolitan`
- `region`, `coordinates`
- `stats.districtCount`, `stats.municipalityCount`, `stats.neighborhoodCount`, `stats.villageCount`

Use provinces when your workflow starts with a city-level selection, such as "choose İstanbul, then list districts."

## District

A district belongs to one province. District records include `provinceId`, so you can connect each district back to its parent province.

District records include:

- `id`, `name`, `slug`
- `provinceId`
- `population`
- `area`
- `stats.municipalityCount`, `stats.neighborhoodCount`, `stats.villageCount`

Use districts when users need a second-level location under a province.

## Municipality

A municipality represents a local government unit. In v2, municipalities replace the older v1 `towns` concept with a clearer model and a `type` field.

Municipality records include:

- `id`, `name`, `slug`
- `type`
- `provinceId`, `districtId`
- `population`
- `stats.neighborhoodCount`

Allowed municipality types are:

| Type              | Meaning                      |
| ----------------- | ---------------------------- |
| `province_center` | Province center municipality |
| `district_center` | District center municipality |
| `town`            | Town municipality            |

Use municipalities when your workflow needs the local government level, especially before loading neighborhoods by `municipalityId`.

## Neighborhood

A neighborhood belongs to a province, district, and municipality.

Neighborhood records include:

- `id`, `name`, `slug`
- `provinceId`, `districtId`, `municipalityId`
- `population`
- `postalCode`, `postalCodeStatus`

`postalCode` is a five-digit string because Turkish postal codes can start with `0`, and numeric storage would remove leading zeros. `postalCodeStatus` indicates how the postal code was assigned:

- `official`: available in official PTT postal code data and used directly.
- `derived`: not available for the current neighborhood in PTT data, but derived from a previous village or settlement with a known PTT postal code. This status is used only for neighborhoods.
- `estimated`: not available in PTT data and inferred from supplementary public sources, nearby settlements, district-level postal code patterns, or documented administrative changes.

Clients that require strict official postal code data should filter records where `postalCodeStatus` is `official`. Current neighborhood records include `32,142` official, `76` derived, and `36` estimated postal codes.

## Village

A village belongs to a province and district. Unlike neighborhoods, villages do not have a `municipalityId` field.

Village records include:

- `id`, `name`, `slug`
- `provinceId`, `districtId`
- `population`
- `postalCode`, `postalCodeStatus`

Village `postalCodeStatus` values can be `official` or `estimated`. Current village records include `18,162` official and `21` estimated postal codes.

Use villages for rural settlement workflows and district-scoped rural lists.

## IDs and Slugs

Path parameters use numeric IDs:

```http
GET /v2/provinces/34
GET /v2/districts/1103
```

`slug` is a URL-safe version of the name and is useful for display URLs or client-side routing, but resource lookup endpoints use IDs.

## Parent IDs

Child resources carry parent IDs so you can filter and join records without nested responses:

| Resource     | Parent fields                                |
| ------------ | -------------------------------------------- |
| District     | `provinceId`                                 |
| Municipality | `provinceId`, `districtId`                   |
| Neighborhood | `provinceId`, `districtId`, `municipalityId` |
| Village      | `provinceId`, `districtId`                   |

For example, all districts in İstanbul can be requested with:

```http
GET /v2/districts?provinceId=34
```

## Includes

Single-resource endpoints can include related resources. For example:

```http
GET /v2/neighborhoods/3?include=province,district,municipality
```

Use `include` when you need a complete detail view. For list screens, filtering by parent IDs is usually lighter and easier to paginate.
