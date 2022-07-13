import { test } from "../../po/pages";
import { CONSOLE_ITEMS } from "../../config";
import { expectElementToHaveText, expectElementVisibility } from "../../utils";

test.describe("Console Page - External Links @jira(UCP-54)", () => {
  test.beforeEach(async ({ portfolioPage, consolePage }) => {
    await consolePage.mockPDAX();
    await portfolioPage.goto();
    await consolePage.openTab(CONSOLE_ITEMS.EXTERNAL_LINKS);
  });

  test("should open external links tab @criticalPath @jira(XRT-486)", async ({ consolePage }) => {
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).sort.rootEl, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).filter.rootEl, true);
  });

  test("should open info modal @extended @jira(XRT-487)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).infoIcon.click();
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Information");
    await expectElementToHaveText(consolePage.modal.body, /Quick Publish Button/);

    await consolePage.modal.buttonClose.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });
});
