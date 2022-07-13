import { test } from "../../po/pages";
import { COMPARE_CONDITIONS, CONSOLE_ITEMS } from "../../config";
import { expectElementToHaveText, expectElementVisibility, expectNumbersComparison } from "../../utils";

test.describe("Console Page - Media @jira(UCP-53)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.MEDIA);
  });

  test("should open media tab @criticalPath @jira(XRT-462)", async ({ consolePage }) => {
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.MEDIA).header, /Media/);
    expectNumbersComparison(await consolePage.getTab(CONSOLE_ITEMS.MEDIA).items.count(), 1, COMPARE_CONDITIONS.MORE);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.MEDIA).browseForImageButton, true);
  });

  test("should open media preview panel @criticalPath @jira(XRT-463) @jira(XRT-463)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.MEDIA).selectRandomItem();
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.MEDIA).uploadNewImageButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.MEDIA).image, true);

    await consolePage.getTab(CONSOLE_ITEMS.MEDIA).uploadNewImageButton.click();
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.MEDIA).browseForImageButton, true);
  });

  test("should open delete dialogue @criticalPath @jira(XRT-466)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.MEDIA).removeItem(1);
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Delete");
    await expectElementToHaveText(consolePage.modal.body, "Are you sure you want to delete this file ?");

    await consolePage.modal.buttonCancel.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });
});
