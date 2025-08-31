---
title: "Wait! Honey is actually too good to be true"
date: "2025-01-05"
---


Recently, a video by MegaLag went viral, exposing how the popular browser extension Honey could be quietly hijacking revenue from creators.

Honey presents itself as a helpful tool for finding coupons, but it engages in a deceptive practice: replacing affiliate tracking cookies with its own, EVEN WHEN NO DISCOUNT IS FOUND. This effectively steals commissions from content creators they rightfully earned. Can you believe that?

The tech behind this? Just a simple JavaScript cookie overwrite:
```javascript
document.cookie = "referrer=PayPal Inc; path=/; expires=Fri, 31 Dec 2090 23:59:59 GMT";
```
![Honey LinkedIn GIF](/images/honey-linkedin.gif)

This practice is called "cookie stuffing" — an unethical technique where the referral cookie is forcefully swapped, redirecting commissions away from the original source. (search Shawn Hogan vs eBay)
