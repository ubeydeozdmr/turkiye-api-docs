---
outline: deep
---

# Privacy Policy

Last updated: June 13, 2026

This page explains what TurkiyeAPI logs and how operational data is used for the public v2 API. It is intended as a clear project policy, not as legal advice.

## Summary

TurkiyeAPI is a public, read-only API for administrative data. The API does not require accounts, API keys, or authentication.

The service uses limited logs for security, abuse prevention, rate limiting, debugging, and reliability.

## Data We May Process

Application logs may include technical request metadata such as:

- Request ID.
- API version.
- HTTP method.
- Request path and matched route.
- Query parameter names, without full query values.
- HTTP status code.
- Response time.
- Cache status.
- Rate limit status.
- Timestamp, service name, and environment.

Server or proxy access logs may also include:

- IP address.
- User agent.
- Request path or URI.
- Timestamp.
- Status code.
- Response size.
- Response time.

## Data We Do Not Intentionally Log

Application logs are designed not to store:

- Request bodies.
- Response bodies.
- Cookies.
- Authorization headers.
- Full request headers.
- Full query parameter values.

Because the API is public and does not require authentication, users should not send secrets, personal data, tokens, or confidential information in requests.

## Why Logs Are Used

Logs are used to:

- Keep the API reliable.
- Debug operational issues.
- Detect and prevent abuse.
- Enforce rate limits.
- Investigate errors and outages.

Logs are not used for advertising or marketing profiling.

## Hosting Provider

TurkiyeAPI infrastructure may be hosted on servers provided by Hetzner Online GmbH in Germany or the European Union.

The hosting provider may process operational data as part of providing server infrastructure.

## Retention

Operational logs are kept only as long as needed for security, abuse prevention, debugging, and service reliability.

The intended retention period for raw server access logs is short-term, generally around 7 to 14 days unless a longer period is needed to investigate abuse, security incidents, or operational issues.

## Cookies and Analytics

TurkiyeAPI does not need cookies for API access.

The documentation site may store local browser preferences such as theme or language using browser storage. These preferences stay in your browser.

If third-party analytics, marketing pixels, or tracking cookies are added later, this policy should be updated before or when those tools are enabled.

## Third Parties

TurkiyeAPI does not sell personal data.

Operational data may be processed by infrastructure providers needed to run the API and documentation, such as the hosting provider.

## Contact

For privacy questions or requests, contact the maintainer through the [GitHub repository](https://github.com/ubeydeozdmr/turkiye-api) or by email at [ubeydeozdmr@gmail.com](mailto:ubeydeozdmr@gmail.com).
