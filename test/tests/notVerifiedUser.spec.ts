import { test, Page, BrowserContext } from "@playwright/test";
import { Application } from "../po/pages";
import { expectElementVisibility, expectElementToHaveText, useState } from "../utils";
import { FUNDS_VERIFICATION_MESSAGE, BROKERAGE_VERIFICATION_MESSAGE, TEST_USERS, VERIFY_DIALOG_TEXT } from "../config";
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
    test("should display a message when user needs a verification @criticalPath @jira(XRT-180)", async () => {
      await app.fundsPage.goto();
      await app.fundsPage.paymentIn.click();
      await expectElementVisibility(app.fundsPage.verificationMessage, true);
      await expectElementToHaveText(app.fundsPage.verificationMessage, FUNDS_VERIFICATION_MESSAGE);

      await app.fundsPage.menuBar.paymentOut.click();
      await expectElementVisibility(app.fundsPage.verificationMessage, true);
      await expectElementToHaveText(app.fundsPage.verificationMessage, FUNDS_VERIFICATION_MESSAGE);

      await app.fundsPage.menuBar.transferFunds.click();
      await expectElementVisibility(app.fundsPage.verificationMessage, true);
      await expectElementToHaveText(app.fundsPage.verificationMessage, FUNDS_VERIFICATION_MESSAGE);
    });

    test("should navigate to the proper page after clicking Verification Link @criticalPath @jira(XRT-181)", async () => {
      await app.fundsPage.goto();
      await app.fundsPage.paymentIn.click();
      await app.fundsPage.verificationLink.click();
      await app.fundsPage.expectUrlContains(/verify/);
    });
  });

  test.describe("Brokerage Page @jira(PWU-71)", () => {
    test("should display a message when user needs a verification @criticalPath @jira(XRT-259)", async () => {
      await app.brokeragePage.goto();
      await expectElementVisibility(app.brokeragePage.nonVerifiedUserMessage, true);
      await expectElementToHaveText(app.brokeragePage.nonVerifiedUserMessage, BROKERAGE_VERIFICATION_MESSAGE);
    });
  });

  test.describe("Portfolio Page @jira(PWU-440)", () => {
    test("should display and close Get Verified popup message @smoke @jira(XRT-340)", async () => {
      await app.portfolioPage.goto();
      await expectElementVisibility(app.portfolioPage.verifyDialog.rootEl, true);
      await expectElementToHaveText(app.portfolioPage.verifyDialog.body, VERIFY_DIALOG_TEXT);

      await app.portfolioPage.verifyDialog.buttonClose.click();
      await expectElementVisibility(app.portfolioPage.verifyDialog.rootEl, false);
    });

    test("should redirect to Settings page after clicking Verify button @criticalPath @jira(XRT-341)", async () => {
      await app.portfolioPage.goto();
      await app.portfolioPage.verifyDialog.verifyButton.click();
      await app.portfolioPage.expectUrlContains(/verify/);
    });
  });
});
