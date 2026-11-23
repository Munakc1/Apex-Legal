# Security Headers for Hosting Providers

Because this site is built as a pure static SPA (`output: "export"`), HTTP response headers cannot be set dynamically at runtime by Next.js server middleware. Instead, configure your static hosting provider (Cloudflare Pages, Vercel, Netlify, AWS CloudFront / S3, Nginx, or Apache) with the following hardened security headers generated using `@lacspace/headers`.

## Recommended Security Headers

```http
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Frame-Options: SAMEORIGIN
Cross-Origin-Opener-Policy: same-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';
```

## Hosting Configuration Examples

### Cloudflare Pages (`_headers`)
```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=15552000; includeSubDomains
  X-Frame-Options: SAMEORIGIN
  Cross-Origin-Opener-Policy: same-origin
```

### Netlify (`_headers`)
```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=15552000; includeSubDomains
  X-Frame-Options: SAMEORIGIN
  Cross-Origin-Opener-Policy: same-origin
```

### Nginx
```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=15552000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
```
