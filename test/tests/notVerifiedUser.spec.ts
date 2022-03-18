import { test, Page, BrowserContext } from "@playwright/test";
import { Application } from "../po/pages";
import { expectElementVisibility, expectElementToHaveText, useState } from "../utils";
import { FUNDS_VERIFICATION_MESSAGE, BROKERAGE_VERIFICATION_MESSAGE, TEST_USERS } from "../config";
let context: BrowserContext;
let page: Page;
let app: Application;

test.describe("Not Verified Users", () => {
  useState("clean");

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    app = new Application(page);
    await app.loginPage.goto();
    await app.loginPage.login(TEST_USERS.EMPTY);
  });

  test.afterAll(async () => await page.close());

  test.describe("Transfer Funds Page @jira(PWU-292)", () => {
    test.beforeAll(async () => {
      await app.fundsPage.goto();
      await app.fundsPage.paymentIn.click();
    });
    test("should display a message when user needs a verification @criticalPath @jira(BCTGWEBPWU-167)", async () => {
      await expectElementVisibility(app.fundsPage.verificationMessage, true);
      await expectElementToHaveText(app.fundsPage.verificationMessage, FUNDS_VERIFICATION_MESSAGE);
    });

    test("should navigate to the proper page after clicking Verification Link @criticalPath @jira(BCTGWEBPWU-168)", async () => {
      await app.fundsPage.verificationLink.click();
      await app.fundsPage.expectUrlContains(/verify/);
    });
  });

  test.describe("Brokerage Page @jira(PWU-71)", () => {
    test("should display a message when user needs a verification @criticalPath @jira(BCTGWEBPWU-766)", async () => {
      await app.brokeragePage.goto();
      await expectElementVisibility(app.brokeragePage.nonVerifiedUserMessage, true);
      await expectElementToHaveText(app.brokeragePage.nonVerifiedUserMessage, BROKERAGE_VERIFICATION_MESSAGE);
    });
  });
});
