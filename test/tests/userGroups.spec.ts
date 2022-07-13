import { ACCOUNT_GROUPS, CURRENCIES, TEST_USERS, userPersmissionsMap, fundsPersmissionsMap } from "../config";
import { test, Page, BrowserContext } from "@playwright/test";
import { Application, test as _test } from "../po/pages";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectToHaveCount,
  useState,
  expectElementToContainText,
} from "../utils";

test.describe("Sub-Accounts @jira(PWU-677)", () => {
  useState("clean");

  let context: BrowserContext;
  let page: Page;
  let app: Application;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    app = new Application(page);
    await app.loginPage.goto();
    await app.loginPage.login(TEST_USERS.WITH_GROUPS);
  });

  test.describe("Funds Page @jira(PWU-719)", () => {
    test.beforeEach(async () => {
      await app.fundsPage.goto();
    });

    test.afterEach(async () => {
      await app.fundsPage.switchUserAccount(ACCOUNT_GROUPS.DEFAULT);
    });
  });

  test.describe("General Cases @jira(PWU-130)", () => {
    test.beforeEach(async () => {
      await app.portfolioPage.goto();
    });

    test("should expand/collapse account groups @criticalPath @jira(XRT-343)", async () => {
      await app.portfolioPage.tableGroupHead.expandCollapseAll("expand");
      await app.portfolioPage.isTableExpanded(true);

      await app.portfolioPage.tableGroupHead.expandCollapseAll("collapse");
      await app.portfolioPage.isTableExpanded(false);
    });

    test("should search within account group @criticalPath @jira(XRT-337)", async () => {
      const searchQuery = "2fa";

      await app.portfolioPage.header.profileButton.click();
      await app.portfolioPage.profile.switchAccount.click();
      const accountGroups = await app.portfolioPage.chooseAccount.accountNames.allInnerTexts();

      await app.portfolioPage.chooseAccount.searchInput.fill(searchQuery);
      await expectElementToContainText(app.portfolioPage.chooseAccount.accountNames, [searchQuery]);

      await app.portfolioPage.chooseAccount.searchInput.fill("");
      await expectElementToHaveText(app.portfolioPage.chooseAccount.accountNames, accountGroups);

      await app.portfolioPage.chooseAccount.buttonClose.click();
      await expectElementVisibility(app.portfolioPage.chooseAccount.rootEl, false);
    });

    test("should display pagination component @criticalPath @jira(XRT-338)", async () => {
      await expectElementVisibility(app.portfolioPage.pagination.rootEl, true);
      await expectToHaveCount(app.portfolioPage.tableGroupHead.rootEl, 5);

      await app.portfolioPage.pagination.nextPageButton.click();
      await expectToHaveCount(app.portfolioPage.tableGroupHead.rootEl, 1);

      await app.portfolioPage.pagination.previousPageButton.click();
      await expectToHaveCount(app.portfolioPage.tableGroupHead.rootEl, 5);
    });

    test("should filter account groups @criticalPath @jira(XRT-339)", async () => {
      await app.portfolioPage.accountList.clickByText(ACCOUNT_GROUPS.DEMO);
      await app.portfolioPage.currencyFilter.clickByText("All Currencies");
      await expectToHaveCount(app.portfolioPage.tableGroupHead.rootEl, 1);
      await expectElementToHaveText(app.portfolioPage.tableGroupHead.accountName, ACCOUNT_GROUPS.DEMO);
    });
  });
});

_test.describe("Account Permissions", () => {
  userPersmissionsMap.forEach(({ jiraId, permissions, link }) => {
    _test(`should show/hide ${link} in the header @criticalPath ${jiraId}`, async ({ portfolioPage }) => {
      await expectElementVisibility(portfolioPage.header[link], false);

      await portfolioPage.mockUserPermissions(permissions);
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.header[link], true);
    });
  });

  fundsPersmissionsMap.forEach(({ jiraId, tab, permissions }) => {
    _test(`should show/hide ${tab} button/tab @criticalPath ${jiraId}`, async ({ portfolioPage, fundsPage }) => {
      await portfolioPage.goto();
      await portfolioPage.holdingList.clickCurrencyByText(CURRENCIES.BTC);
      await expectElementVisibility(portfolioPage.tradingButtons[tab].rootEl, true);

      await fundsPage.goto();
      await expectElementVisibility(fundsPage[tab].rootEl, true);

      await fundsPage.mockUserPermissions(permissions);
      await portfolioPage.goto();
      await portfolioPage.holdingList.clickCurrencyByText(CURRENCIES.BTC);
      await expectElementVisibility(portfolioPage.tradingButtons[tab].rootEl, false);

      await fundsPage.goto();
      await expectElementVisibility(fundsPage[tab].rootEl, false);
    });
  });
});
