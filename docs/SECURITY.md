# Protecting djphantom.tech: assets, CDN, DoS / DDoS

## The honest limits
- **Anything a browser can show can be saved.** Right-click blocking, drag blocking and overlays only stop casual copying. DevTools, the network tab, "view source" and screenshots always work. No website can prevent that.
- **What really protects the artwork:** (1) a watermark baked into the pixels, (2) reduced resolution, (3) never publishing the original photos, (4) a clear copyright/licence, (5) CDN rules that block hot-linking and scraping bots. All five are set up here.
- **Your resume PDF is meant to be downloaded.** Leave it public.
- **Public repo = public files.** Everything in `public/` is visible on GitHub. Only the watermarked, downscaled WebP files live there; the originals stay on your computer.

## What is already in the code
| Measure | Where |
|---|---|
| Watermark ("© Dhiraj Rajput · djphantom.tech", diagonal tiled + corner) baked into all 6 drawings, 1100px max, WebP | `public/art/*` |
| Originals never committed | not in repo |
| Right-click / drag / long-press blocked, transparent shield over images | `ArtSection.tsx`, `useAssetShield.ts` |
| Video: no download button, no PiP, no context menu | `AutoPlayResearchVideo.tsx` |
| Strict Content-Security-Policy (hash-pinned inline scripts, no third-party origins, `object-src none`, `frame-src none`) injected at build | `scripts/inject-csp.mjs` |
| AI-training crawlers + generic bots told not to fetch `/art/` | `public/robots.txt` |
| Licence: MIT for code, all rights reserved for content | `LICENSE` |

## GitHub Pages already gives you
GitHub serves Pages through a global CDN (Fastly) with built-in DDoS mitigation, HTTPS and caching. You cannot be "taken down" by a small flood the way a single server can. What it lacks: custom headers, rate limiting, hot-link protection and bot rules. A free **Cloudflare** layer adds those.

## Cloudflare setup (free plan), step by step
1. **Add the site** at cloudflare.com, then change your domain's nameservers at the registrar to the two Cloudflare gives you.
2. **DNS records** (orange cloud = proxied):
   - `A  @  185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (proxied)
   - `CNAME  www  dhiraj-rajput.github.io` (proxied)
3. **SSL/TLS → Overview:** set mode to **Full (strict)**. Then **Edge Certificates:** Always Use HTTPS = on, Automatic HTTPS Rewrites = on, **HSTS** = on (max-age 6 months, include subdomains, no preload until you are sure).
4. **Security → Settings:** Security Level **Medium**; **Bot Fight Mode = on**; Browser Integrity Check = on. Leave "Block AI bots" **off** if you want AI search engines to cite you; the robots.txt already blocks `/art/` for trainers.
5. **DDoS:** the Cloudflare HTTP DDoS managed rules are always on at no cost. If you are ever attacked: Security → Settings → **Under Attack Mode**.
6. **Rate limiting** (Security → WAF → Rate limiting rules): rule "Throttle": expression `(http.request.uri.path contains "/art/")` → 60 requests per 10 seconds per IP → Block for 10 minutes. This stops bulk scraping of the artwork.
7. **Hot-link protection:** Scrape Shield → **Hotlink Protection = on**, and add a WAF custom rule (block):
   ```
   (http.request.uri.path contains "/art/" and http.referer ne "" and not http.referer contains "djphantom.tech")
   ```
8. **Security response headers** (Rules → Transform Rules → Modify Response Header → Add static headers, for all requests):
   - `Content-Security-Policy`: copy the policy from `dist/index.html` (printed by `scripts/inject-csp.mjs`) and append `; frame-ancestors 'none'`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
   - `Cross-Origin-Opener-Policy: same-origin`
   - `Strict-Transport-Security: max-age=15552000; includeSubDomains` (if you did not enable HSTS in step 3)
   - For `/art/*` only add `X-Robots-Tag: noai, noimageai, noindex`
9. **Caching / speed:** Caching → Configuration → Browser Cache TTL "Respect existing headers". Add a Cache Rule: URI path starts with `/assets/` or `/art/` → Eligible for cache, Edge TTL 1 month. Turn on **Brotli** and **HTTP/3**.
10. **Email protection:** Scrape Shield → **Email Address Obfuscation = on** hides your email from address-harvesting bots (check that the mailto button still works).
11. **After it works:** Search Console and Bing Webmaster tools verification via DNS TXT in Cloudflare DNS.

## If the artwork is copied anyway
- Your watermark and the file `public/art/*` plus the original photos' metadata (dates in the camera roll) prove authorship.
- Send a DMCA takedown to the host or platform (they act on a written notice that cites your original).
- Keep the original photos and their dates somewhere safe (not in the repo).

## Optional hardening later
- Serve the artwork from a Cloudflare R2 bucket or Cloudflare Images with **signed, expiring URLs**. Visitors then get links that stop working after a few minutes, so direct linking and bulk downloading is much harder. This needs a Cloudflare Worker and is a small paid-tier feature if traffic grows.
- Lower the resolution further if you want less value per file; at 1100px the pieces are poor for printing.
