import { test } from "../../po/pages";
import { COMPARE_CONDITIONS, CONSOLE_ITEMS } from "../../config";
import {
  expectElementToHaveText,
  expectElementVisibility,
  expectNumbersComparison,
  expectToHaveCount,
  generateRandomString,
} from "../../utils";

test.describe("Console Page - General Tab @jira(UCP-52)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.GENERAL);
  });

  test("should open tab @criticalPath @jira(XRT-475)", async ({ consolePage }) => {
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.GENERAL).header, /General Settings/);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.GENERAL).infoIcon, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.GENERAL).saveButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.GENERAL).defaultLanguage.rootEl, true);
    await expectToHaveCount(consolePage.getTab(CONSOLE_ITEMS.GENERAL).textInputs, 4);
  });

  test("should open info modal @criticalPath @jira(XRT-476)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.GENERAL).infoIcon.click();
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Information");
    await expectElementToHaveText(consolePage.modal.body, /Web Search Result Content/);
    await expectElementToHaveText(consolePage.modal.body, /Website Default Languages/);

    await consolePage.modal.buttonClose.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });

  test("should list default languages @extended @jira(XRT-477)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.GENERAL).defaultLanguage.click();
    expectNumbersComparison(
      await consolePage.getTab(CONSOLE_ITEMS.GENERAL).defaultLanguage.options.count(),
      1,
      COMPARE_CONDITIONS.MORE
    );
  });

  test("should update title value @criticalPath @jira(XRT-478)", async ({ consolePage, portfolioPage }) => {
    const defaultTitle = await consolePage.getTab(CONSOLE_ITEMS.GENERAL).titleInput.inputValue();
    const randomTitle = generateRandomString(7);

    await consolePage.getTab(CONSOLE_ITEMS.GENERAL).titleInput.fill(randomTitle);
    await consolePage.getTab(CONSOLE_ITEMS.GENERAL).saveButton.click();
    await consolePage.checkTooltip("Save successful!");
    await portfolioPage.goto();
    await portfolioPage.expectTitleContains(randomTitle);

    await consolePage.openTab(CONSOLE_ITEMS.GENERAL);
    await consolePage.getTab(CONSOLE_ITEMS.GENERAL).titleInput.fill(defaultTitle);
    await consolePage.getTab(CONSOLE_ITEMS.GENERAL).saveButton.click();
    await consolePage.checkTooltip("Save successful!");
    await portfolioPage.goto();
    await portfolioPage.expectTitleContains(defaultTitle);
  });
});
