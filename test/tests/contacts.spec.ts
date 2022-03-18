import { Application } from "../po/pages";
import { test, Page, BrowserContext } from "@playwright/test";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectAllArrayItemsEqual,
  expectToHaveCount,
} from "../utils";
import { CONTACTS_DATA, CONTACTS_DATA_EMPTY, DELETE_CONTACT_SUCCESS, URLs, TEST_CONTACT } from "../config";

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
    await app.api.mockData(CONTACTS_DATA, URLs.CONTACT);
    await app.contactsPage.goto();
  });

  test.afterAll(async () => await page.close());

  test("should open Contacts Page @smoke @jira(BCTGWEBPWU-178)", async () => {
    await expectElementVisibility(app.contactsPage.contactCard.el, true);
    await expectElementVisibility(app.contactsPage.contactCard.contactIcon, true);
    await expectElementVisibility(app.contactsPage.contactCard.editButton, true);
    await expectElementVisibility(app.contactsPage.contactCard.transferOutDigitalAssetButton, true);
    await expectElementVisibility(app.contactsPage.contactList.el, true);
    await expectElementVisibility(app.contactsPage.contactList.searchBar, true);
    await expectElementVisibility(app.contactsPage.contactList.addNewContactButton, true);
    await expectElementVisibility(app.contactsPage.contactsPageHeader, true);
    await expectElementToHaveText(app.contactsPage.contactsPageHeader, "Digital Asset Address");
  });

  test("should open Empty Contacts Page @criticalPath @jira(BCTGWEBPWU-731)", async () => {
    await app.api.mockData(CONTACTS_DATA_EMPTY, URLs.CONTACT);
    await app.contactsPage.goto();
    await expectElementVisibility(app.contactsPage.noContactsIcon, true);
    await expectElementVisibility(app.contactsPage.createNewContactButton, true);
  });

  test("should search contacts @criticalPath @jira(BCTGWEBPWU-176)", async () => {
    const searchQuery = "atest1";
    await app.contactsPage.contactList.searchBar.fill(searchQuery);
    expectAllArrayItemsEqual(await app.contactsPage.contactList.getContactsText(), searchQuery);
  });

  test("should create a new contact @criticalPath @jira(BCTGWEBPWU-177)", async () => {
    await app.contactsPage.contactList.addNewContactButton.click();
    await app.contactsPage.contactCard.fillContactCard(TEST_CONTACT);
    await expectElementVisibility(app.contactsPage.tooltip, true);
    await expectElementToHaveText(app.contactsPage.tooltip, "New Contact has been saved.");
  });

  test("should delete a contact @criticalPath @jira(BCTGWEBPWU-211)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.deleteContactButton.click();
    await app.api.mockData(DELETE_CONTACT_SUCCESS, URLs.REMOVE_CONTACT);
    await expectElementVisibility(app.contactsPage.deleteConfirmationModal.el, true);

    await app.contactsPage.deleteConfirmationModal.deleteButton.click();
    await expectElementVisibility(app.contactsPage.deleteConfirmationModal.el, false);
    await expectElementVisibility(app.contactsPage.tooltip, true);
    await expectElementToHaveText(app.contactsPage.tooltip, "Contact has been deleted.");
  });

  test("should cancel deleting of a contact @criticalPath @jira(BCTGWEBPWU-212)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.deleteContactButton.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.el, true);

    await app.contactsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.el, false);
    await expectElementVisibility(app.contactsPage.tooltip, false);
    await expectElementVisibility(app.contactsPage.contactCard.cancelButton, true);
    await expectElementVisibility(app.contactsPage.contactCard.saveButton, true);
    await expectElementVisibility(app.contactsPage.contactCard.deleteContactButton, true);
  });

  test("should add/delete additional address @criticalPath @jira(BCTGWEBPWU-179)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.addNewAddressButton.click();
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 2);

    await app.contactsPage.contactCard.deleteAddress(2);
    await expectElementVisibility(app.contactsPage.confirmationModal.el, true);

    await app.contactsPage.confirmationModal.deleteButton.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.el, false);
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 1);
  });

  test("should cancel deleting of an additional address @criticalPath @jira(BCTGWEBPWU-207)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.addNewAddressButton.click();
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 2);

    await app.contactsPage.contactCard.deleteAddress(2);
    await expectElementVisibility(app.contactsPage.confirmationModal.el, true);

    await app.contactsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(app.contactsPage.confirmationModal.el, false);
    await expectToHaveCount(app.contactsPage.contactCard.referenceNameInput, 2);
  });

  test("should cancel adding of new contact @criticalPath @jira(BCTGWEBPWU-208)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.cancelButton.click();
    await expectElementVisibility(app.contactsPage.contactCard.cancelButton, false);
    await expectElementVisibility(app.contactsPage.contactCard.saveButton, false);
    await expectElementVisibility(app.contactsPage.contactCard.deleteContactButton, false);
  });

  test("should display warning about unsaved changes @criticalPath @jira(BCTGWEBPWU-732)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.addNewAddressButton.click();
    await app.contactsPage.header.portfolioLink.click();
    await expectElementVisibility(app.contactsPage.unsavedChangesModal.el, true);
  });

  test("should edit a contact @criticalPath @jira(BCTGWEBPWU-210)", async () => {
    await app.contactsPage.contactCard.editButton.click();
    await app.contactsPage.contactCard.referenceNameInput.fill("test");
    await app.contactsPage.contactCard.saveButton.click();
    await expectElementVisibility(app.contactsPage.tooltip, true);
    await expectElementToHaveText(app.contactsPage.tooltip, "Contact has been updated.");
  });

  test("should redirect to Funds Page after clicking Transfer Out button @criticalPath @jira(BCTGWEBPWU-206)", async () => {
    await app.contactsPage.contactCard.transferOutDigitalAssetButton.click();
    await app.fundsPage.expectUrlContains(new RegExp(app.fundsPage.url));
  });
});
