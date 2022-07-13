import { test } from "../../po/pages";
import { CONSOLE_ITEMS, MEDIA } from "../../config";
import {
  expectElementToBeDisabled,
  expectElementToHaveText,
  expectElementVisibility,
  expectToHaveCount,
} from "../../utils";

test.describe("Console Page - Social Media @jira(UCP-53)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.SOCIAL_MEDIA);
  });

  test("should open social media tab @criticalPath @jira(XRT-479)", async ({ consolePage }) => {
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).header, /Social Media/);
    await expectToHaveCount(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).items, 6);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).publishButton, true);
    await expectElementToBeDisabled(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).publishButton);
    await expectToHaveCount(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).socialMedia, 15);
  });

  test.skip("should add/remove social media @criticalPath @jira(XRT-482) @jira(XRT-483)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).selectItem(1);
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).getSocialMedia(MEDIA.FACEBOOK).click();
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).hyperlinkInput.fill("https://www.test.com");
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).publishButton.click();
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).getItemTitle(1), "www.test.com");

    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).removeItem(1);
    await expectElementVisibility(consolePage.modal.rootEl, true);

    await consolePage.modal.okButton.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).getItemTitle(1), "Add New");
  });

  test("should display an error in case of missing hyperlink @extended @jira(XRT-485)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).selectItem(1);
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).getSocialMedia(MEDIA.TWITTER).click();
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).publishButton.click();
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).errorMessage, true);
    await expectElementToHaveText(
      consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).errorMessage,
      "Please enter the hyperlink for your social media."
    );
  });

  test("should have possibility to add QR Code for QQ @criticalPath @jira(XRT-481)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).selectItem(1);
    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).getSocialMedia(MEDIA.QQ).click();
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).browseForImageButton, true);
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).getItemTitle(1), "Add QR Code");

    await consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).removeItem(1);
    await consolePage.modal.okButton.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.SOCIAL_MEDIA).getItemTitle(1), "Add New");
  });
});
