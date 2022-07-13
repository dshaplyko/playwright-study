import { test } from "../../po/pages";
import { Logger } from "../../logger/logger";
import { CONSOLE_ITEMS, WIDGETS } from "../../config";
import {
  expectArrayIncludes,
  expectElementToContainText,
  expectElementToHaveText,
  expectElementVisibility,
  generateRandomString,
} from "../../utils";
const logger = new Logger("Console Test Suite");

test.describe("Console Page - Translations @jira(PWU-403)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.TRANSLATION);
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).translationTable.waitForVisible();
  });

  test("should open Translations tab @criticalPath @jira(XRT-421)", async ({ consolePage }) => {
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).environments.rootEl, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).category.rootEl, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).languagesButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).promoteButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).infoButton, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).searchInput, true);
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).translationTable.rootEl, true);
  });

  test("should search items in translation table @criticalPath @jira(XRT-427)", async ({ consolePage }) => {
    const searchQuery = "main";

    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).category.clickByText("home page");
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).searchInput.fill(searchQuery);
    await expectElementToContainText(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).keys, [searchQuery]);
  });

  test("should change category @criticalPath @jira(XRT-428)", async ({ consolePage }) => {
    const initialKeys = await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).keys.allInnerTexts();
    const key = await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).category.chooseAndRememberRandomOption();

    logger.info(`Selected key is: ${key}`);
    await expectElementToContainText(consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).keys, initialKeys, false);
  });

  test("should manage languages through modal window @criticalPath @jira(XRT-422) @jira(XRT-424) @jira(XRT-425)", async ({
    consolePage,
  }) => {
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).languagesButton.click();
    await expectElementVisibility(consolePage.manageLanguagesModal.rootEl, true);
    await expectElementVisibility(consolePage.manageLanguagesModal.langSelector, true);

    const addedLanguage = await consolePage.manageLanguagesModal.addAndRememberAvailableLang(1);
    const { enabledLangs, availableLangs } = await consolePage.manageLanguagesModal.getLanguages();
    logger.info(`Selected key is: ${addedLanguage}`);

    expectArrayIncludes(enabledLangs, [addedLanguage]);
    expectArrayIncludes(availableLangs, [addedLanguage], false);

    await consolePage.manageLanguagesModal.removeLanguageFromEnabled(addedLanguage);
    const { enabledLangs: newEnabled, availableLangs: newAvailable } =
      await consolePage.manageLanguagesModal.getLanguages();

    expectArrayIncludes(newEnabled, [addedLanguage], false);
    expectArrayIncludes(newAvailable, [addedLanguage]);

    await consolePage.manageLanguagesModal.buttonClose.click();
    await expectElementVisibility(consolePage.manageLanguagesModal.rootEl, false);
  });

  test("should open/close Promote dialog @criticalPath @jira(XRT-423) @jira(XRT-431)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).promoteItem(0);
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Promote");
    await expectElementToHaveText(consolePage.modal.body, /Are you sure you want to promote/);
    await expectElementVisibility(consolePage.modal.buttonCancel, true);
    await expectElementVisibility(consolePage.modal.okButton, true);

    await consolePage.modal.buttonCancel.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });

  test("should open/close Info dialog @criticalPath @jira(XRT-426)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).infoButton.click();
    await expectElementVisibility(consolePage.modal.rootEl, true);
    await expectElementToHaveText(consolePage.modal.title, "Information");

    await consolePage.modal.buttonClose.click();
    await expectElementVisibility(consolePage.modal.rootEl, false);
  });

  test("should edit translation @criticalPath @jira(XRT-429) @jira(XRT-430) @jira(XRT-432)", async ({
    consolePage,
    portfolioPage,
  }) => {
    test.setTimeout(120000);
    const name: string = generateRandomString(7);
    logger.info(`Random Name is ${name}`);

    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).category.clickByText("portfolio page");
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).editItem(1);
    await expectElementVisibility(consolePage.translationModal.rootEl, true);

    await consolePage.translationModal.englishKey.fill(name);
    await consolePage.translationModal.saveButton.click();
    await expectElementVisibility(consolePage.translationModal.rootEl, false);

    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).promoteItem(1);
    await consolePage.modal.okButton.click();
    await portfolioPage.goto();
    await expectElementToHaveText(portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).name, name);

    await consolePage.openTab(CONSOLE_ITEMS.TRANSLATION);
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).translationTable.waitForVisible();
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).category.clickByText("portfolio page");
    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).editItem(1);
    await expectElementVisibility(consolePage.translationModal.rootEl, true);

    await consolePage.translationModal.englishKey.fill("YOUR PORTFOLIO");
    await consolePage.translationModal.saveButton.click();
    await expectElementVisibility(consolePage.translationModal.rootEl, false);

    await consolePage.getTab(CONSOLE_ITEMS.TRANSLATION).promoteItem(1);
    await consolePage.modal.okButton.click();
    await portfolioPage.goto();
    await expectElementToHaveText(portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).name, "YOUR PORTFOLIO");
  });
});
