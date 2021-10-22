import { test, Page } from "@playwright/test";
import { App } from "../po/pages";
import { verifyPageUrlContains, expectElementVisibility } from "../utils";

let page: Page;
let app: App;
test.describe("Activities Page Test Suite @jira(PWU-25)", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    app = new App(page);
    await app.loginPage.login();
  });

  test("> should open Activities Page by clicking header link @smoke", async () => {
    await app.portfolioPage.header.activitiesLink.click();
    await verifyPageUrlContains(page, app.activitiesPage.url);
  });

  test("> should contain all needed elements @smoke", async () => {
    await app.activitiesPage.goto();
    await expectElementVisibility(app.activitiesPage.buttonActivityFilter, true);
    await expectElementVisibility(app.activitiesPage.buttonGetHistoricalReports, true);
  });
});
