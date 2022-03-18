import { ACCOUNT_GROUPS, CURRENCIES } from "../config";
import { test } from "../po/pages";
import { expectElementVisibility, expectElementEquality } from "../utils";

test.describe("User Groups Selection", () => {
  test.describe("Funds Page @jira(PWU-719) @jira(BCTGWEBPWU-1046)", () => {
    test("should update payment out tab @criticalPath @jira(BCTGWEBPWU-1051)", async ({ fundsPage }) => {
      await fundsPage.goto();
      await fundsPage.paymentOut.click();

      const { digitalAssets } = await fundsPage.currencyList.getCurrencies();
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.JPY);
      const defaultBalance = await fundsPage.fiatCard.getFiatBalance();

      await fundsPage.switchUserAccount(ACCOUNT_GROUPS.ACCOUNT_GROUP_2);
      await expectElementVisibility(fundsPage.recentTransactions.el, false);
      const { digitalAssets: newAssets } = await fundsPage.currencyList.getCurrencies();
      const userGroupBalance = await fundsPage.fiatCard.getFiatBalance();

      expectElementEquality(digitalAssets, newAssets, false);
      expectElementEquality(defaultBalance, userGroupBalance, false);
    });

    test("should update transfer funds tab @criticalPath @jira(BCTGWEBPWU-1051)", async ({ fundsPage }) => {
      await fundsPage.goto();
      await fundsPage.transferFunds.click();

      const { digitalAssets } = await fundsPage.currencyList.getCurrencies();
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.JPY);
      const defaultBalance = await fundsPage.transferFundsForm.primaryBalance.innerText();

      await fundsPage.switchUserAccount(ACCOUNT_GROUPS.ACCOUNT_GROUP_2);
      await expectElementVisibility(fundsPage.recentTransactions.el, false);
      const { digitalAssets: newAssets } = await fundsPage.currencyList.getCurrencies();
      const userGroupBalance = await fundsPage.transferFundsForm.primaryBalance.innerText();

      expectElementEquality(digitalAssets, newAssets, false);
      expectElementEquality(defaultBalance, userGroupBalance, false);
    });
  });
});
