# ShopEase QA Test Plan & Bug Report Sample

## Purpose

This document is a QA portfolio sample for the ShopEase React e-commerce frontend. It demonstrates how I structure manual test coverage, edge cases, and bug reports for a web application.

> Note: The test cases below are based on the application's implemented flows and source review. Items marked as findings are code-review findings and should be validated in the deployed environment before release decisions.

## Application Under Test

- **Project:** ShopEase React E-commerce Frontend
- **Repository:** `deshrajvermay9517-png/shopease-react-ecommerce`
- **Main flows:** product listing, search, category filtering, price sorting, product details, cart management, quantity updates, localStorage persistence, responsive UI

## Test Objectives

1. Verify core shopping flows behave correctly.
2. Validate empty states and invalid routes.
3. Verify cart totals and quantity changes.
4. Check cart persistence after page reload.
5. Check responsive behavior on mobile layouts.
6. Identify routing/deployment risks and data-handling edge cases.

## Test Environment

Recommended manual test matrix:

- Chrome latest — Desktop 1440×900
- Chrome responsive mode — 375×812
- Firefox latest — Desktop
- GitHub Pages production deployment

## Manual Test Cases

| ID | Area | Test Scenario | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-01 | Product Listing | Load homepage | Open the application | Product cards should be visible with name, category, rating, price and actions | High |
| TC-02 | Search | Search using a valid product name | Enter `Wireless` in search | Only matching products should remain visible | High |
| TC-03 | Search | Search with a non-existing value | Enter `xyz12345` | `No products found.` should be shown | Medium |
| TC-04 | Category Filter | Filter by Electronics | Select `Electronics` | Only Electronics products should appear | High |
| TC-05 | Sorting | Sort Low to High | Select `Price: Low to High` | Products should be ordered by ascending price | Medium |
| TC-06 | Sorting | Sort High to Low | Select `Price: High to Low` | Products should be ordered by descending price | Medium |
| TC-07 | Product Details | Open valid product | Click `View Details` | Correct product details should appear | High |
| TC-08 | Product Details | Open invalid product id | Navigate to `/product/999` | `Product not found` and a home link should appear | Medium |
| TC-09 | Cart | Add a new product | Click `Add to Cart` | Cart count should increase and item should appear in cart | Critical |
| TC-10 | Cart | Add same product twice | Click `Add to Cart` twice | Existing cart item quantity should increment instead of creating duplicate rows | High |
| TC-11 | Cart | Increase quantity | Click `+` in cart | Quantity and item total should increase | High |
| TC-12 | Cart | Decrease quantity | Click `-` in cart | Quantity should decrease; quantity 0 should remove the item | High |
| TC-13 | Cart | Remove item | Click `Remove` | Item should be removed and total should update | High |
| TC-14 | Cart | Clear cart | Click `Clear Cart` | Cart should become empty and empty-state UI should appear | High |
| TC-15 | Cart Persistence | Refresh with item in cart | Add item, refresh page | Cart contents should persist from localStorage | High |
| TC-16 | Cart Total | Validate price calculation | Add multiple quantities/products | Total should equal sum of `price × quantity` | Critical |
| TC-17 | Responsive UI | Test mobile layout | Set viewport around 375px width | No horizontal overflow; controls and cards should remain usable | High |
| TC-18 | Checkout | Click checkout | Click `Checkout` | Informational `Checkout feature coming soon!` alert should appear | Low |

## Code-Review Finding 1 — GitHub Pages Routing Risk

**ID:** BUG-01  
**Severity:** High  
**Area:** Routing / Deployment

### Observation

The Vite configuration deploys the application under:

`/shopease-react-ecommerce/`

while the application uses `BrowserRouter` without a `basename`, and the declared routes are rooted at `/`, `/cart`, and `/product/:id`.

### Risk

On a project-site deployment such as GitHub Pages, browser URLs include the repository path. This can cause route mismatch or refresh/deep-link failures depending on how the static host handles the URL.

### Reproduction Test

1. Open the GitHub Pages deployment.
2. Navigate to a product details page.
3. Copy the full product URL.
4. Open that URL in a new tab or refresh it directly.
5. Repeat for the cart route.

### Expected

The requested React route should render normally.

### Potential Actual Result

The static host may return a 404 or the React router may fail to match the path correctly.

### Suggested Fix

Use a router basename matching the deployment path, for example:

```jsx
<BrowserRouter basename="/shopease-react-ecommerce">
```

or use a deployment-friendly routing strategy such as `HashRouter` for GitHub Pages.

---

## Code-Review Finding 2 — Invalid localStorage Data Can Break Cart Initialization

**ID:** BUG-02  
**Severity:** Medium  
**Area:** Cart / Persistence

### Observation

Cart state initializes with `JSON.parse(savedCart)` directly when `cartItems` exists in localStorage.

### Risk

If the stored value becomes corrupted or is manually modified to invalid JSON, `JSON.parse` throws an exception during application initialization.

### Reproduction Test

1. Open browser DevTools.
2. Set the `cartItems` localStorage key to invalid JSON, for example `not-json`.
3. Refresh the application.

### Expected

The application should recover gracefully, reset the cart, and continue rendering.

### Potential Actual Result

The application can throw during startup and fail to render.

### Suggested Fix

Wrap localStorage parsing in `try/catch` and fall back to an empty cart.

Example:

```js
const [cartItems, setCartItems] = useState(() => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});
```

## Bug Report Template I Use

For future QA work, I document issues with this structure:

- **Title**
- **Environment**
- **Severity / Priority**
- **Preconditions**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots / screen recording**
- **Console or network evidence when relevant**
- **Suggested scope for retesting**

## Exit Criteria

Testing can be considered complete when:

- All critical and high-priority flows have been executed.
- Critical defects are resolved or explicitly accepted.
- Cart calculations and persistence are verified.
- Main routes are checked both through in-app navigation and direct refresh.
- Mobile layout is usable without blocking overlap or horizontal overflow.

## Summary

This test plan focuses on real user flows, reproducibility, edge cases, and concise defect documentation. The same structure can be adapted for trading, fintech, payment, or other web applications by replacing the domain-specific test scenarios while keeping the reporting discipline consistent.
