import { TRANSACTION_FILTER_TYPES } from "../config";
import { test } from "../po/pages";
import { expectElementVisibility } from "../utils";

test.describe.parallel("Digital Address Page @jira(PWU-92)", () => {
  test.beforeEach(async ({ activitiesPage }) => {
    await activitiesPage.goto();
    await activitiesPage.buttonActivityFilter.click();
    // await activitiesPage.activityFilter.filterBy({
    //   option: "currency",
    //   item: CURRENCIES.BTC,
    // });
    await activitiesPage.activityFilter.filterBy({
      option: "type",
      item: TRANSACTION_FILTER_TYPES.Deposit,
    });
    await activitiesPage.activityFilter.buttonConfirm.click();
    await activitiesPage.transactionActivity.selectContact(1).click();
  });

  test("should open Add Contact Modal @smoke @jira(BCTGWEBPWU-214) @jira(BCTGWEBPWU-160))", async ({
    activitiesPage,
  }) => {
    await expectElementVisibility(activitiesPage.addContactModal.el, true);
    await expectElementVisibility(activitiesPage.addContactModal.buttonCreateNewContact, true);
    await expectElementVisibility(activitiesPage.addContactModal.buttonAddToExistingContact, true);
  });

  test("should Navigate to Create New Contact Page @criticalPath @jira(BCTGWEBPWU-XXX))", async ({
    activitiesPage,
  }) => {
    await activitiesPage.addContactModal.buttonCreateNewContact.click();
    await activitiesPage.expectUrlContains(/contacts/);
  });

  test("should open Add To Existing Contact Modal Window @criticalPath @jira(BCTGWEBPWU-217))", async ({
    activitiesPage,
  }) => {
    await activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await expectElementVisibility(activitiesPage.addToExistingContactModal.el, true);
    await expectElementVisibility(activitiesPage.addToExistingContactModal.inputSearch, true);
    await expectElementVisibility(activitiesPage.addToExistingContactModal.contactList.el, true);
    await expectElementVisibility(activitiesPage.addToExistingContactModal.buttonCancel, true);
  });

  test("should add to existing contact @criticalPath @jira(BCTGWEBPWU-215))", async ({ activitiesPage }) => {
    await activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await expectElementVisibility(activitiesPage.addToExistingContactModal.el, true);

    await activitiesPage.addToExistingContactModal.contactList.contacts.nth(0).click();
    await activitiesPage.expectUrlContains(/contacts/);
  });

  test("should Cancel Adding To Existing Contact @criticalPath @jira(BCTGWEBPWU-218))", async ({ activitiesPage }) => {
    await activitiesPage.addContactModal.buttonAddToExistingContact.click();
    await activitiesPage.addToExistingContactModal.buttonCancel.click();
    await expectElementVisibility(activitiesPage.addToExistingContactModal.el, false);
  });
});
