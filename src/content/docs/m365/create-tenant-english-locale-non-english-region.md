---
title: Create a Microsoft 365 tenant in a non-English region with an English locale
description: Microsoft 365 sign-up sets a new tenant's region but not its language. Override the culture URL parameter to get an English tenant in a non-English region.
---

Microsoft 365 sign-up lets you pick the tenant's region but never its language. Choose Germany as the region & the whole thing comes up in German: the admin center, the other portals, & the notification emails. The flow has no language control, so the region choice decides the language for you.

The sign-up page carries a `culture` query parameter. Set it to `en-us` & the page, plus the tenant it creates, come up in English while the region stays German.

## Summary

- **Problem:** the normal sign-up sets region, not language.
- **Fix:** load the target region's sign-up page through the Microsoft site, then change the URL's `culture` parameter to `en-us` before you continue.
- **Why the detour:** each region maps to a different product SKU, so you let the site fill in the region-correct `mproducts` value & change only `culture`.

## Steps

1. Set the Microsoft site's locale to your target region: [https://www.microsoft.com/en-US/microsoft-365/locale](https://www.microsoft.com/en-US/microsoft-365/locale)
2. Open the plans & pricing page: [https://www.microsoft.com/microsoft-365/business/microsoft-365-plans-and-pricing](https://www.microsoft.com/microsoft-365/business/microsoft-365-plans-and-pricing). With the locale stripped from the path (normally the first path segment), this URL keeps the locale you just set, so the region sticks.
3. Find the plan you want & click its trial sign-up button.
4. The sign-up page opens, likely in a new tab, at a URL like this:

   ```
   https://signup.microsoft.com/get-started/signup?mproducts=CFQ7TTC0LDPB:002C&renewalterm=P1Y&renewalbillingterm=P1Y&culture=de-de&country=de&ali=1
   ```

   Replace `culture=de-de` with `culture=en-us` & navigate to the edited URL:

   ```
   https://signup.microsoft.com/get-started/signup?mproducts=CFQ7TTC0LDPB:002C&renewalterm=P1Y&renewalbillingterm=P1Y&culture=en-us&country=de&ali=1
   ```

5. The page now renders in English & shows the same pricing as before. `mproducts` & `country` are untouched, so only the language changed.
6. Continue through the sign-up as normal.

## Verify the tenant

A fresh tenant takes a few minutes to settle, so give it time before you trust these checks.

1. **Data location:** open [Org settings](https://admin.cloud.microsoft/#/Settings/OrganizationProfile) and click **Data location**. On a freshly created tenant this needs a minute to initialize; if it's blank, wait & reload. It should show the data locality for your region.
2. **Language:** the admin center & every other admin portal should render in English.
3. **Region & notification language:** open the [Entra admin center overview](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/TenantOverview.ReactView/initialValue//tabId//recommendationResourceId//fromNav/Identity?Microsoft_AAD_IAM_legacyAADRedirect=true), then the **Properties** tab. `Tenant Country/Region` should match your region & `Notification language` should match your language. The overview tab also carries the `Tenant ID` if you need it.
