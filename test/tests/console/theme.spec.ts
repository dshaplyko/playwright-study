import { test } from "../../po/pages";
import { CONSOLE_ITEMS, LIGHT_GREEN, MAIN_COLOR } from "../../config";
import {
  expectElementToContainText,
  expectElementToHaveText,
  expectElementVisibility,
  expectToHaveCount,
} from "../../utils";

test.describe("Console Page - Theme Tab @jira(UCP-144)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.THEMING);
  });

  test("should open theme tab @criticalPath @jira(XRT-442)", async ({ consolePage }) => {
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.THEMING).header, /Theme/);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.THEMING).saveButton, true);
    await expectToHaveCount(consolePage.getTab(CONSOLE_ITEMS.THEMING).colorOptions, 24);
  });

  test("should change color @criticalPath @jira(XRT-446)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.THEMING).primaryColor.fill(LIGHT_GREEN);
    await consolePage.getTab(CONSOLE_ITEMS.THEMING).saveButton.click();
    await consolePage.checkTooltip("Theme settings saved");
    await consolePage.getTab(CONSOLE_ITEMS.THEMING).primaryColor.fill(MAIN_COLOR);
    await consolePage.getTab(CONSOLE_ITEMS.THEMING).saveButton.click();
    await consolePage.checkTooltip("Theme settings saved");
  });

  test("should contain sample options @extended @jira(XRT-445)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.THEMING).sampleSelect.click();
    await expectElementToContainText(consolePage.getTab(CONSOLE_ITEMS.THEMING).sampleSelect.options, [
      "Home",
      "Activity",
      "Email",
      "Samples",
    ]);
  });

  test("should switch previews @extended @jira(XRT-447)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.THEMING).sampleSelect.clickByText("Email");
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.THEMING).confirmPaymentInButton, true);

    await consolePage.getTab(CONSOLE_ITEMS.THEMING).sampleSelect.clickByText("Samples");
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.THEMING).samplesButton, true);

    await consolePage.getTab(CONSOLE_ITEMS.THEMING).sampleSelect.clickByText("Activity");
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.THEMING).adcivitiesPreview, true);
  });
});
