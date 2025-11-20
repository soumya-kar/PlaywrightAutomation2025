import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.formLayoutPage();
    await pm.navigateTo.datePickerPage();
    await pm.navigateTo.smartTablePage();
    await pm.navigateTo.toastrPage();
    await pm.navigateTo.toolTipPage();
});

test('parameterized method', async ({ page })=>{
    const pm = new PageManager(page);

    await pm.navigateTo.formLayoutPage();
    await pm.onFormLayoutPage.submitUsingGridForm('test@test.com', 'welcome1', 'Option 1' );
    await pm.onFormLayoutPage.submitInlineForm('Karan Arjun', 'kararn@test.com', true);
    await pm.navigateTo.datePickerPage();
    await pm.onDatePickerPage.selectCommonDatePickerDate(14);
    await pm.onDatePickerPage.selectDatePickerWithRangeFromToday(10, 15);
})