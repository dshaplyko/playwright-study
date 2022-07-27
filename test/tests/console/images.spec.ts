import { test } from "../../po/pages";
import { CONSOLE_ITEMS } from "../../config";
import { expectElementToHaveText, expectElementVisibility, expectToHaveCount } from "../../utils";

test.describe("Console Page - Images @jira(UCP-131)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.IMAGES);
  });

  test("should open Images tab @criticalPath @jira(XRT-448)", async ({ consolePage }) => {
    await expectToHaveCount(consolePage.getTab(CONSOLE_ITEMS.IMAGES).imageOptions, 7);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.IMAGES).uploadNewImageButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.IMAGES).preview, true);
  });

  test("should open Info Modal @criticalPath @jira(XRT-449)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.IMAGES).infoIcon.click();
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Information");

    await consolePage.modal.buttonClose.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });

  test("should open Revert Image Modal @criticalPath @jira(XRT-450) @jira(XRT-451)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.IMAGES).revertImage(0);
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Delete");

    await consolePage.modal.buttonCancel.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });

  test("should be able to upload a new image @criticalPath @jira(XRT-452)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.IMAGES).selectImageOption("Banner Image 3");
    await consolePage.getTab(CONSOLE_ITEMS.IMAGES).uploadFile("newbg.jpg");
    await consolePage.getTab(CONSOLE_ITEMS.IMAGES).uploadThisImageButton.click();
    await consolePage.checkTooltip(/Page Banner (.*) Upload Success/);

    await consolePage.getTab(CONSOLE_ITEMS.IMAGES).revertImage(2);
    await consolePage.modal.okButton.click();
    await consolePage.checkTooltip("Image reverted");
  });
});
