---
outline: deep
---

# Changelog

This page tracks notable API changes by version. It is not limited to the v1 to v2 migration; future v2 releases such as bug fixes, new features, endpoint changes, and dataset updates will also be listed here.

For a detailed migration guide from v1, see [Migration from v1](./v2/guide/migration-from-v1.md).

## v2

Initial v2 release of TurkiyeAPI.

### Added

- Added the `/v2` API prefix.
- Added metadata-rich response envelopes with `data` and `meta`.
- Added structured error responses with stable `error.code`, `error.message`, and `error.status` fields.
- Added explicit relationship loading with `include` and nested collection routes.
- Added first-class `municipalities` resources, including province center, district center, and town municipality types.
- Added static JSON dataset downloads under `/v2/datasets`.
- Added versioned dataset downloads, such as `/v2/datasets/2025/provinces.json`.
- Added `/v2/meta` for API, dataset, source, and record count metadata.
- Added OpenAPI 3.1 output at `/v2/openapi.json`.
- Added postal code filters for neighborhood and village list endpoints.

### Changed

- Standardized list pagination with `limit`, `offset`, `meta.count`, and `meta.total`.
- Standardized search around the `search` query parameter.
- Replaced parent name filters with ID filters and nested routes.
- Made related resources opt-in instead of embedding them by default.
- Tightened query parameter, field selection, hierarchy, and range validation.
- Moved scalar measurement fields such as `area` and `altitude` into structured objects with `value` and `unit`.
- Replaced `areaCode` with `phoneAreaCodes`.
- Modeled postal codes only on neighborhood and village records with `postalCode` and `postalCodeStatus`.

### Removed

- Removed support for the legacy `/api/v1` prefix in v2.
- Removed the top-level `status` field from successful responses.
- Removed `extend=true`; use `include` or nested routes instead.
- Removed `/towns`; use `/v2/municipalities?type=town` for town municipalities.
- Removed `activatePostalCodes`; postal code fields are returned directly where supported.
