import { test } from "../po/pages/";
import { expectElementVisibility, useState } from "../utils";

test.describe("Digital Address Page @jira(PWU-92)", () => {
  useState("trader");

  test.beforeEach(async ({ activitiesPage }) => {
    await activitiesPage.searchForContacts();
  });

  test("should open Add Contact Modal @smoke @jira(XRT-238) @jira(XRT-134)", async ({ activitiesPage }) => {
    await expectElementVisibility(activitiesPage.addContactModal.rootEl, true);
    await expectElementVisibility(activitiesPage.addContactModal.buttonCreateNewContact, true);
    await expectElementVisibility(activitiesPage.addContactModal.buttonAddToExistingContact, true);
  });

  test("should Navigate to Create New Contact Page @criticalPath @jira(XRT-135)", async ({ activitiesPage }) => {
    await activitiesPage.addContactModal.buttonCreateNewContact.click();
    await activitiesPage.expectUrlContains(/contacts/);
  });

  test("should open Add To Existing Contact Modal Window @criticalPath @jira(XRT-241))", async ({ activitiesPage }) => {
    await activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await expectElementVisibility(activitiesPage.addToExistingContactModal.rootEl, true);
    await expectElementVisibility(activitiesPage.addToExistingContactModal.inputSearch, true);
    await expectElementVisibility(activitiesPage.addToExistingContactModal.contactList.rootEl, true);
    await expectElementVisibility(activitiesPage.addToExistingContactModal.buttonCancel, true);
  });

  test("should add to existing contact @criticalPath @jira(XRT-239)", async ({ activitiesPage }) => {
    await activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await expectElementVisibility(activitiesPage.addToExistingContactModal.rootEl, true);

    await activitiesPage.addToExistingContactModal.contactList.contacts.first().click();
    await activitiesPage.expectUrlContains(/contacts/);
  });

  test("should Cancel Adding To Existing Contact @criticalPath @jira(XRT-242))", async ({ activitiesPage }) => {
    await activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await activitiesPage.addToExistingContactModal.buttonCancel.click();
    await expectElementVisibility(activitiesPage.addToExistingContactModal.rootEl, false);
  });
});
