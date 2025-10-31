# 🎭 Introduction to Playwright

## What is Playwright?
- Node.js library for browser automation
- Supports Chromium, Firefox, and WebKit
- Useful for end-to-end testing

## Installation

```bash
npm init playwright@latest


---

## 🔹 Run All Tests

```bash
npx playwright test
````

Runs all tests across the **three default browsers**:

* Chromium
* Firefox
* WebKit

---

## 🔹 View Test Report

```bash
npx playwright show-report
```

Opens the HTML report generated after test execution.

---

## 🔹 Run Tests in a Specific Browser

```bash
npx playwright test --project=chromium
```

Replaces `chromium` with `firefox` or `webkit` to run in a different browser.

---

## 🔹 Run in Headed Mode (Visible Browser Window)

```bash
npx playwright test --project=chromium --headed
```

This opens the browser window during the test run — useful for debugging.

---

## 🔹 Run Test by Keyword in Title

```bash
npx playwright test --project=chromium -g "title" --headed
```

Runs only the tests that match the keyword `"title"` in the test title.

---

## 🔹 Skip or Focus Tests

### ➖ Skip a Test

```ts
test.skip('this test will be skipped', async ({ page }) => {
  // Test code
});
```

Use this to **temporarily disable** a test.

---

### ✅ Run Only One Test

```ts
test.only('only this test will run', async ({ page }) => {
  // Test code
});
```

Use this to **focus on one test** while ignoring others during development.

---

```


# Test executiion with CLI

# Run test-  npx playwright test (this will run tests in all 3 browsers)
# To see report- npx playwright show-report
# Run in chromium - npx playwright test --project=chromium
# To run in headed mode- npx playwright test --project=chromium --headed
# To run test based on keyword- npx playwright test --project=chromium -g "title" --headed  
# Use test.skip we can skip a test
# use test.only to run the selected test only
## UI mode- npx playwright test --ui
