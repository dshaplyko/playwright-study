import { test } from "../../po/pages";
import { CONSOLE_ITEMS } from "../../config";
import { expectElementToHaveText, expectElementVisibility, expectNumbersComparison } from "../../utils";

test.describe("Console Page - My Account @jira(PWU-403)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.ACCOUNT);
  });

  test("should open tab @smoke @jira(XRT-415) @jira(XRT-416)", async ({ consolePage }) => {
    await expectElementVisibility(consolePage.navigationMenu.rootEl, true);
    await expectElementVisibility(consolePage.consoleHeader.rootEl, true);
    await expectElementVisibility(consolePage.consoleHeader.consoleLogo, true);
    await expectElementVisibility(consolePage.consoleHeader.accountSelector.rootEl, true);
    await expectElementVisibility(consolePage.consoleHeader.languageSelector.rootEl, true);
    await expectElementVisibility(consolePage.navigationMenu.rootEl, true);
    await expectElementVisibility(consolePage.mainTab.accountCard, true);
  });

  test("should open Account Tab after clicking logo @criticalPath @jira(XRT-420)", async ({ consolePage }) => {
    await consolePage.navigationMenu.chooseItem(CONSOLE_ITEMS.FEATURES);
    await consolePage.consoleHeader.consoleLogo.click();
    await expectElementVisibility(consolePage.mainTab.accountCard, true);
  });

  test("account selector should contain proper options @extended @jira(XRT-417)", async ({ consolePage }) => {
    await consolePage.consoleHeader.accountSelector.click();
    expectElementToHaveText(consolePage.consoleHeader.accountSelector.options, ["My Account", "Logout"]);
  });

  test("language selector should contain proper options @extended @jira(XRT-418)", async ({ consolePage }) => {
    await consolePage.consoleHeader.languageSelector.click();
    expectNumbersComparison(await consolePage.consoleHeader.languageSelector.options.count(), 1, "MORE_THAN");
  });
});
