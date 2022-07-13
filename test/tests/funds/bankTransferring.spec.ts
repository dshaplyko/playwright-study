import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";
import { CURRENCIES } from "../../config";
const fiatCurrency = CURRENCIES.EUR;

test.describe("Bank Transferring on the Payment Out tab", async () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.mockTransferData();
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
  });
  test("should open Bank Transfer Form @smoke @jira(XRT-151) @jira(XRT-142)", async ({ fundsPage }) => {
    await fundsPage.fiatCard.bankTransferButton.click();
    await fundsPage.bankAccountsForm.getBankCard(1).click();
    await expectElementVisibility(fundsPage.bankAccountForm.rootEl, true);
    await expectElementVisibility(fundsPage.bankAccountForm.continueButton, true);
    await expectElementVisibility(fundsPage.bankAccountForm.deleteButton, true);

    await fundsPage.bankAccountForm.continueButton.click();
    await expectElementVisibility(fundsPage.bankTransferForm.rootEl, true);
    await expectElementVisibility(fundsPage.bankTransferForm.currency, true);
    await expectElementToHaveText(fundsPage.bankTransferForm.currency, fiatCurrency);
    await expectElementVisibility(fundsPage.bankTransferForm.amountField.rootEl, true);
    await expectElementVisibility(fundsPage.bankTransferForm.percentControls, true);
    await expectElementVisibility(fundsPage.bankTransferForm.bankMethod, true);
    await expectElementVisibility(fundsPage.bankTransferForm.bankName, true);
    await expectElementVisibility(fundsPage.bankTransferForm.maximumButton, true);
    await expectElementVisibility(fundsPage.bankTransferForm.paymentOutButton, true);
  });

  test("should make Bank Transfer Transaction @smoke @jira(XRT-147)", async ({ fundsPage }) => {
    await fundsPage.mockSuccessfulTransaction("cash");
    await fundsPage.fiatCard.bankTransferButton.click();
    await fundsPage.bankAccountsForm.getBankCard(1).click();
    await fundsPage.bankAccountForm.continueButton.click();
    await fundsPage.bankTransferForm.amountField.typeText("1");
    await fundsPage.bankTransferForm.paymentOutButton.click();
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(fundsPage.bankTransferForm.successMessage, true);
    await expectElementVisibility(fundsPage.bankTransferForm.doneButton, true);
    await fundsPage.bankTransferForm.doneButton.click();
    await expectElementVisibility(fundsPage.recentTransactions.lines, true);
  });

  test("should not make Bank Transfer Transaction if amount is less than minimum @extended @jira(XRT-162)", async ({
    fundsPage,
  }) => {
    await fundsPage.emulateTransferError("min");
    await fundsPage.bankAccountsForm.getBankCard(1).click();
    await fundsPage.bankAccountForm.continueButton.click();
    await fundsPage.bankTransferForm.amountField.typeText("79");
    await fundsPage.bankTransferForm.paymentOutButton.click();
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.bankTransferForm.errorInsufficientAmount, true);
    await expectElementToHaveText(fundsPage.bankTransferForm.errorInsufficientAmount, "Insufficient amount");
  });

  test("should not make Bank Transfer Transaction if amount is more than maximum @extended @jira(XRT-162)", async ({
    fundsPage,
  }) => {
    await fundsPage.emulateTransferError("max");
    await fundsPage.bankAccountsForm.getBankCard(1).click();
    await fundsPage.bankAccountForm.continueButton.click();
    await fundsPage.bankTransferForm.amountField.typeText("1000000");
    await fundsPage.bankTransferForm.paymentOutButton.click();
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.bankTransferForm.errorInsufficientAmount, true);
    await expectElementToHaveText(
      fundsPage.bankTransferForm.errorInsufficientAmount,
      "Exceeds maximum payment out limit"
    );
  });

  test("should cancel bank deletion @extended @jira(XRT-159)", async ({ fundsPage }) => {
    await fundsPage.fiatCard.bankTransferButton.click();
    await fundsPage.bankAccountsForm.getBankCard(1).click();
    await fundsPage.bankAccountForm.deleteButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, true);
    await expectElementVisibility(fundsPage.confirmationModal.buttonCancel, true);
    await expectElementVisibility(fundsPage.confirmationModal.deleteButton, true);

    await fundsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(fundsPage.bankAccountForm.rootEl, true);
    await expectElementVisibility(fundsPage.bankAccountForm.continueButton, true);
    await expectElementVisibility(fundsPage.bankAccountForm.deleteButton, true);
  });

  test("should delete a bank @extended @jira(XRT-158)", async ({ fundsPage }) => {
    await fundsPage.fiatCard.bankTransferButton.click();
    await fundsPage.bankAccountsForm.getBankCard(1).click();
    await fundsPage.bankAccountForm.deleteButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, true);
    await expectElementVisibility(fundsPage.confirmationModal.buttonCancel, true);
    await expectElementVisibility(fundsPage.confirmationModal.deleteButton, true);

    await fundsPage.confirmationModal.deleteButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.rootEl, false);
  });
});
