import { Application } from "../po/pages";
import { test, Page, BrowserContext } from "@playwright/test";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectToHaveCount,
  expectElementToContainText,
} from "../utils";
import { TEST_CONTACT } from "../config";

let context: BrowserContext;
let page: Page;
let app: Application;

test.describe("Contacts Page @jira(PWU-92)", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    app = new Application(page);
  });
  test.beforeEach(async () => {
    await app.contactsPage.mockContactData("full");
  });

  test.afterAll(async () => await page.close());

  test("should open Contacts Page @smoke @jira(XRT-231)", async () => {
    await expectElementVisibility(app.contactsPage.contactCard.rootEl, true);
    await expectElementVisibility(app.contactsPage.contactCard.contactIcon, true);
    await expectElementVisibility(app.contactsPage.contactCard.editButton, true);
    await expectElementVisibility(app.contactsPage.contactList.rootEl, true);
    await expectElementVisibility(app.contactsPage.contactList.searchBar, true);
    await expectElementVisibility(app.contactsPage.contactList.addNewContactButton, true);
    await expectElementVisibility(app.contactsPage.contactsPageHeader, true);
    await expectElementToHaveText(app.contactsPage.contactsPageHeader, "Digital Asset Address");
  });

  test("should open Empty Contacts Page @criticalPath @jira(XRT-245)", async () => {
    await app.contactsPage.mockContactData("empty");
    await expectElementVisibility(app.contactsPage.noContactsIcon, true);
    await expectElementVisibility(app.contactsPage.createNewContactButton, true);
  });

  test("should search contacts @criticalPath @jira(XRT-228)", async () => {
    const searchQuery = "atest1";
    await app.contactsPage.contactList.searchBar.fill(searchQuery);
    await expectElementToContainText(app.contactsPage.contactList.names, [searchQuery]);
  });

  test("should create a new contact @criticalPath @jira(XRT-229)", async () => {
    await app.contactsPage.contactList.addNewContactButton.click();
    await app.contactsPage.contactCard.fillContactCard(TEST_CONTACT);
    await app.contactsPage.checkTooltip("New Contact has been saved.");
  });

  test("should delete a contact @criticalPath @jira(XRT-237)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.deleteContactButton.click();
    await app.contactsPage.mockDeleteContact();
    await expectElementVisibility(app.contactsPage.deleteConfirmationModal.rootEl, true);

    await app.contactsPage.deleteConfirmationModal.deleteButton.click();
    await expectElementVisibility(app.contactsPage.deleteConfirmationModal.rootEl, false);
    await app.contactsPage.checkTooltip("Contact has been deleted.");
  });

  test("should cancel deleting of a contact @criticalPath @jira(XRT-235)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.deleteContactButton.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.rootEl, true);

    await app.contactsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(app.contactsPage.contactCard.cancelButton, true);
    await expectElementVisibility(app.contactsPage.contactCard.saveButton, true);
    await expectElementVisibility(app.contactsPage.contactCard.deleteContactButton, true);
    await app.contactsPage.checkTooltip(null, false);
  });

  test("should add/delete additional address @criticalPath @jira(XRT-230)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.addNewAddressButton.click();
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 2);

    await app.contactsPage.contactCard.deleteAddress(2);
    await expectElementVisibility(app.contactsPage.confirmationModal.rootEl, true);

    await app.contactsPage.confirmationModal.deleteButton.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.rootEl, false);
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 1);
  });

  test("should cancel deleting of an additional address @criticalPath @jira(XRT-233)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.addNewAddressButton.click();
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 2);

    await app.contactsPage.contactCard.deleteAddress(2);
    await expectElementVisibility(app.contactsPage.confirmationModal.rootEl, true);

    await app.contactsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.rootEl, false);
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 2);
  });

  test("should cancel adding of new contact @criticalPath @jira(XRT-234)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.cancelButton.click();
    await expectElementVisibility(app.contactsPage.contactCard.cancelButton, false);
    await expectElementVisibility(app.contactsPage.contactCard.saveButton, false);
    await expectElementVisibility(app.contactsPage.contactCard.deleteContactButton, false);
  });

  test("should display warning about unsaved changes @criticalPath @jira(XRT-246)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.addNewAddressButton.click();
    await app.contactsPage.header.portfolioLink.click();
    await expectElementVisibility(app.contactsPage.unsavedChangesModal.rootEl, true);
  });

  test("should edit a contact @criticalPath @jira(XRT-236)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.referenceNameInput.fill("test");
    await app.contactsPage.contactCard.saveButton.click();
    await app.contactsPage.checkTooltip("Contact has been updated.");
  });

  test("should redirect to Funds Page after clicking Transfer Out button @criticalPath @jira(XRT-232)", async () => {
    await app.contactsPage.contactCard.transferOutDigitalAssetButton.click();
    await app.fundsPage.expectUrlContains(new RegExp(app.fundsPage.url));
  });
});
