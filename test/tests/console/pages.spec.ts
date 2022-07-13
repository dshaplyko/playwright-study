import { test } from "../../po/pages";
import { COMPARE_CONDITIONS, CONSOLE_ITEMS } from "../../config";
import {
  expectArraySorted,
  expectElementToHaveText,
  expectElementVisibility,
  expectNumbersComparison,
  expectToHaveCount,
  generateRandomString,
} from "../../utils";

test.describe("Console Page - Pages @jira(UCP-118)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.PAGES);
  });

  test("should open Pages tab @criticalPath @jira(XRT-455) @jira(XRT-458)", async ({ consolePage }) => {
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).sort.rootEl, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).filter.rootEl, true);
    await expectToHaveCount(consolePage.getTab(CONSOLE_ITEMS.PAGES).items, 9);

    await consolePage.getTab(CONSOLE_ITEMS.PAGES).selectItem(0);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.rootEl, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.titleInput, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.saveAsDraftButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).publishButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.contentArea, true);
  });

  test("should publish a page @criticalPath @jira(XRT-459) ", async ({ consolePage, infoPage, portfolioPage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).changeAboutPageTitle("AboutTest");
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).publishButton.click();
    await consolePage.checkTooltip("Page published");

    await portfolioPage.goto();
    await portfolioPage.getQuickLink("about").click();
    await expectElementToHaveText(infoPage.body, /AboutTest/);

    await consolePage.openTab(CONSOLE_ITEMS.PAGES);
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).changeAboutPageTitle("About ");
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).publishButton.click();
    await consolePage.checkTooltip("Page published");

    await portfolioPage.goto();
    await portfolioPage.getQuickLink("about").click();
    await expectElementToHaveText(infoPage.body, /About /);
  });

  test("should publish with external links @criticalPath @jira(XRT-460) ", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).selectItem(0);
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.externalLink.check();

    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.contentArea, false);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.cancelButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.urlInput, true);
  });

  test("should filter pages @extended @jira(XRT-457)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).filter.clickByText("Outdated");
    const outdatedCount = await consolePage.getTab(CONSOLE_ITEMS.PAGES).items.count();

    await consolePage.getTab(CONSOLE_ITEMS.PAGES).filter.clickByText("Published");
    const publishedCount = await consolePage.getTab(CONSOLE_ITEMS.PAGES).items.count();

    expectNumbersComparison(publishedCount, outdatedCount, COMPARE_CONDITIONS.MORE);
  });

  test("should sort pages @extended @jira(XRT-456)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.PAGES).sort.clickByText("Title");
    const titles = await consolePage.getTab(CONSOLE_ITEMS.PAGES).items.allInnerTexts();
    expectArraySorted(titles);
  });

  test.describe("Saving as draft", async () => {
    test.afterEach(async ({ consolePage }) => {
      await consolePage.openTab(CONSOLE_ITEMS.PAGES);
      await consolePage.getTab(CONSOLE_ITEMS.PAGES).changeAboutPageTitle("About");
      await consolePage.getTab(CONSOLE_ITEMS.PAGES).publishButton.click();
    });
    test("should save as draft @criticalPath @jira(XRT-461) ", async ({ consolePage, infoPage, portfolioPage }) => {
      const randomPostFix = generateRandomString(5);

      await consolePage.getTab(CONSOLE_ITEMS.PAGES).changeAboutPageTitle(`About ${randomPostFix}`);
      await consolePage.getTab(CONSOLE_ITEMS.PAGES).editForm.saveAsDraftButton.click();
      await consolePage.checkTooltip("Page saved as draft");

      await portfolioPage.goto();
      await portfolioPage.getQuickLink("about").click();
      await expectElementToHaveText(infoPage.body, /About/);
    });
  });
});
