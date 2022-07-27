import { test } from "../../po/pages";
import { CONSOLE_ITEMS } from "../../config";
import {
  expectArraySorted,
  expectElementToContainText,
  expectElementToHaveText,
  expectElementVisibility,
  expectNumbersComparison,
  expectToHaveCount,
  generateRandomString,
} from "../../utils";

test.describe("Console Page - Posts @jira(UCP-49)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.POSTS);
  });

  test("should open posts tab @criticalPath @jira(XRT-433)", async ({ consolePage }) => {
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.POSTS).header, /Posts/);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.POSTS).infoIcon, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.POSTS).sort.rootEl, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.POSTS).postsFilter.rootEl, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.POSTS).filter.rootEl, true);
    expectNumbersComparison(await consolePage.getTab(CONSOLE_ITEMS.POSTS).items.count(), 1, "MORE_THAN");
  });

  test("should open empty posts tab @criticalPath @jira(XRT-434)", async ({ consolePage }) => {
    await consolePage.mockEmptyItems("POSTS");
    await expectToHaveCount(consolePage.getTab(CONSOLE_ITEMS.POSTS).items, 0);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.POSTS).noItemsMessage, true);
    await expectElementToHaveText(consolePage.getTab(CONSOLE_ITEMS.POSTS).noItemsMessage, "No posts available yet");
  });

  test("should open info modal @criticalPath @jira(XRT-435)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).infoIcon.click();
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Information");

    await consolePage.modal.buttonClose.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });

  test("should sort posts @extended @jira(XRT-436)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).sort.clickByText("Title");
    const titles = await consolePage.getTab(CONSOLE_ITEMS.POSTS).items.allInnerTexts();
    expectArraySorted(titles);
  });

  test("should filter posts @extended @jira(XRT-437)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).waitForItems();
    const defaultCount = await consolePage.getTab(CONSOLE_ITEMS.POSTS).items.count();

    await consolePage.getTab(CONSOLE_ITEMS.POSTS).filter.clickByText("Outdated");
    const outdatedCount = await consolePage.getTab(CONSOLE_ITEMS.POSTS).items.count();

    expectNumbersComparison(defaultCount, outdatedCount, "MORE_THAN");
  });

  test("should save/delete a post @criticalPath @jira(XRT-439), @jira(XRT-440), @jira(XRT-441)", async ({
    consolePage,
  }) => {
    const randomTitle = generateRandomString(6);

    await consolePage.getTab(CONSOLE_ITEMS.POSTS).plusIcon.click(2000);
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).editForm.titleInput.fill(randomTitle);
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).editForm.startDate.selectCurrentDay();
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).editForm.endDate.selectCurrentDay();
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).editForm.saveAsDraftButton.click();
    await consolePage.checkTooltip("Post saved as Draft");
    await expectElementToContainText(consolePage.getTab(CONSOLE_ITEMS.POSTS).titles, [randomTitle]);

    await consolePage.getTab(CONSOLE_ITEMS.POSTS).publishButton.click();
    await consolePage.checkTooltip("Post published");

    await consolePage.getTab(CONSOLE_ITEMS.POSTS).selectItemByText(randomTitle);
    await consolePage.getTab(CONSOLE_ITEMS.POSTS).editForm.deleteButton.click();
    await expectElementVisibility(consolePage.modal.rootEl, true);

    await consolePage.modal.okButton.click();
    await consolePage.checkTooltip("Post deleted");
    await expectElementToContainText(consolePage.getTab(CONSOLE_ITEMS.POSTS).titles, [randomTitle], false);
  });
});
