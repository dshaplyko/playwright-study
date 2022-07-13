import { test, Page, BrowserContext } from "@playwright/test";
import { TEST_USERS } from "../config";
import { Application } from "../po/pages";
import { expectElementVisibility, useState } from "../utils";
let context: BrowserContext;
let page: Page;
let app: Application;

test.describe("Digital Address Page @jira(PWU-92)", () => {
  useState("clean");
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    app = new Application(page);
    await app.loginPage.goto();
    await app.loginPage.login(TEST_USERS.TRADER);
    await app.contactsPage.checkContacts();
  });

  test.afterAll(async () => await page.close());
  test.beforeEach(async () => {
    await app.activitiesPage.searchForContacts();
  });

  test("should open Add Contact Modal @smoke @jira(XRT-238) @jira(XRT-134)", async () => {
    await expectElementVisibility(app.activitiesPage.addContactModal.rootEl, true);
    await expectElementVisibility(app.activitiesPage.addContactModal.buttonCreateNewContact, true);
    await expectElementVisibility(app.activitiesPage.addContactModal.buttonAddToExistingContact, true);
  });

  test("should Navigate to Create New Contact Page @criticalPath @jira(XRT-135)", async () => {
    await app.activitiesPage.addContactModal.buttonCreateNewContact.click();
    await app.activitiesPage.expectUrlContains(/contacts/);
  });

  test("should open Add To Existing Contact Modal Window @criticalPath @jira(XRT-241))", async () => {
    await app.activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await expectElementVisibility(app.activitiesPage.addToExistingContactModal.rootEl, true);
    await expectElementVisibility(app.activitiesPage.addToExistingContactModal.inputSearch, true);
    await expectElementVisibility(app.activitiesPage.addToExistingContactModal.contactList.rootEl, true);
    await expectElementVisibility(app.activitiesPage.addToExistingContactModal.buttonCancel, true);
  });

  test("should add to existing contact @criticalPath @jira(XRT-239)", async () => {
    await app.activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await expectElementVisibility(app.activitiesPage.addToExistingContactModal.rootEl, true);

    await app.activitiesPage.addToExistingContactModal.contactList.contacts.first().click();
    await app.activitiesPage.expectUrlContains(/contacts/);
  });

  test("should Cancel Adding To Existing Contact @criticalPath @jira(XRT-242))", async () => {
    await app.activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await app.activitiesPage.addToExistingContactModal.buttonCancel.click();
    await expectElementVisibility(app.activitiesPage.addToExistingContactModal.rootEl, false);
  });
});
