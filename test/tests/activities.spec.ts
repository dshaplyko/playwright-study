import {
  test, Page, expect,
} from "@playwright/test";
import { App } from "../po/pages";
import {
  verifyPageUrlContains, expectElementVisibility, expectAllItemsFromArrayAreEqual,
} from "../utils";

let page: Page;
let app: App;
test.describe("Activities Page Test Suite @jira(PWU-25)", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    app = new App(page);
    await app.loginPage.login();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("should open Activities Page by clicking header link @smoke", async () => {
    await app.portfolioPage.header.activitiesLink.click();
    await verifyPageUrlContains(page, app.activitiesPage.url);
  });

  test("should contain all needed elements @smoke", async () => {
    await app.activitiesPage.goto();
    await expectElementVisibility(app.activitiesPage.buttonActivityFilter, true);
    await expectElementVisibility(app.activitiesPage.buttonGetHistoricalReports, true);
    await expectElementVisibility(app.activitiesPage.transactionActivity.el, true);
  });

  test("should open Activity Filter", async () => {
    await app.activitiesPage.goto();
    await app.activitiesPage.buttonActivityFilter.click();
    await expectElementVisibility(app.activitiesPage.activityFilter.el, true);

    const title: string = await app.activitiesPage.activityFilter.title.innerText();
    expect(title).toContain("Activity Filter");
  });

  test("should filter Transaction Activity by Status", async () => {
    await app.activitiesPage.goto();
    await app.activitiesPage.buttonActivityFilter.click();
    await app.activitiesPage.activityFilter.filterByStatus("Processed");
    await expectElementVisibility(app.activitiesPage.activityFilter.el, false);

    const statuses: string[] = await app.activitiesPage.transactionActivity.getStatusesText();
    expectAllItemsFromArrayAreEqual(statuses, "Processed");
  });
});
