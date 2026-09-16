---
title: Create a Microsoft 365 tenant in a non-English region with an English locale
description: Microsoft 365 sign-up sets a new tenant's region but not its language. Override the culture URL parameter to get an English tenant in a non-English region.
---

## Summary

- **Problem:** Microsoft 365 sign-up sets the tenant's region but gives no language control; the region decides the language for you.
- **Fix:** load the target region's plans & pricing page in that region's locale, start the trial, then change the sign-up URL's `culture` parameter to `en-us` before you continue.
- **Why the detour:** each region maps to a different product SKU, so you let the site fill in the region-correct `mproducts` value & change only `culture`.

## Steps

The examples below use Italy (`it-it`) & Germany (`de-de`); substitute your target region's codes.

1. Get the plans & pricing page in your target region's locale. Two paths:
   - **A. Your browser is already set to the target region.** Go straight to [https://www.microsoft.com/microsoft-365/business/microsoft-365-plans-and-pricing](https://www.microsoft.com/microsoft-365/business/microsoft-365-plans-and-pricing). It resolves to your region's locale.
   - **B. Set it manually.** Open [https://www.microsoft.com/en-US/microsoft-365/locale](https://www.microsoft.com/en-US/microsoft-365/locale) & pick your region. That redirects you to a localized URL like `https://www.microsoft.com/it-it/microsoft-365/?market=it`. Copy the locale segment (`it-it`) & put it in the plans & pricing path: `https://www.microsoft.com/it-it/microsoft-365/business/microsoft-365-plans-and-pricing`.
2. Find the plan you want & click its trial sign-up button.
3. The sign-up page opens, likely in a new tab, at a URL like this:

   ```
   https://signup.microsoft.com/get-started/signup?mproducts=CFQ7TTC0LDPB:002C&renewalterm=P1Y&renewalbillingterm=P1Y&culture=de-de&country=de&ali=1
   ```

   Replace the `culture` value with `en-us` & navigate to the edited URL:

   ```
   https://signup.microsoft.com/get-started/signup?mproducts=CFQ7TTC0LDPB:002C&renewalterm=P1Y&renewalbillingterm=P1Y&culture=en-us&country=de&ali=1
   ```

4. The page now renders in English & shows the same pricing as before. `mproducts` & `country` are untouched, so only the language changed.
5. Continue through the sign-up as normal.

## Verify the tenant

A fresh tenant takes a few minutes to settle, so give it time before you trust these checks.

1. **Data location:** open [Org settings](https://admin.cloud.microsoft/#/Settings/OrganizationProfile) and click **Data location**. On a freshly created tenant this needs a minute to initialize; if it's blank, wait & reload. It should show the data locality for your region.
2. **Language:** the admin center & every other admin portal should render in English.
3. **Region & notification language:** open the [Entra admin center overview](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/TenantOverview.ReactView/initialValue//tabId//recommendationResourceId//fromNav/Identity?Microsoft_AAD_IAM_legacyAADRedirect=true), then the **Properties** tab. `Tenant Country/Region` should match your region & `Notification language` should match your language. The overview tab also carries the `Tenant ID` if you need it.
