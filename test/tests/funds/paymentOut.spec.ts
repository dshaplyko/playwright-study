import { test } from "../../po/pages";
import {
  expectElementVisibility,
  expectElementEquality,
  expectElementToHaveText,
  expectElementToHaveValue,
  expectElementToBeDisabled,
  expectItemToContainText,
  expectArrayIncludes,
} from "../../utils";
import {
  BTC_WALLET_ADDRESS,
  USDT_WALLET_ADDRESS,
  CURRENCIES,
  TRANSACTION_FILTER_TYPES,
  TRANSACTION_STATUSES,
} from "../../config";
const digitalAssetCurrency = CURRENCIES.BTC;
const fiatCurrency = CURRENCIES.EUR;

test.describe("Transfer Funds Page: Payment Out @jira(PWU-34)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
    await fundsPage.paymentOut.click();
  });

  test("should choose Fiat Currency from the Payment Out Tab @criticalPath @jira(XRT-488)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await expectElementVisibility(fundsPage.placeholder, false);
    await expectElementVisibility(fundsPage.fiatCard.rootEl, true);
    await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment Out Method");
    await expectElementVisibility(fundsPage.fiatCard.balance, true);
    await expectElementVisibility(fundsPage.fiatCard.bankTransferButton, true);
  });

  test("should choose Digital Asset from the Payment Out Tab @criticalPath @jira(XRT-489)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await expectElementVisibility(fundsPage.placeholder, false);
    await expectElementVisibility(fundsPage.digitalCard.rootEl, true);
    await expectElementToHaveText(fundsPage.digitalCard.header, "Payment Out Method");
    await expectElementVisibility(fundsPage.digitalCard.balance, true);
    await expectElementVisibility(fundsPage.digitalCard.transferOutButton, true);

    await fundsPage.digitalCard.transferOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.rootEl, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.walletAddressInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.amountToBeSentInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.equivalentAmountInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.totalTransferOutFromWalletInput, true);
    await expectElementToBeDisabled(fundsPage.transferOutToWalletForm.totalTransferOutFromWalletInput);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.percentControls, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.maximumButton, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.paymentOutButton, true);
    await expectElementToBeDisabled(fundsPage.transferOutToWalletForm.paymentOutButton);
  });

  test("should calculate Balance for Digital Assets on Payment Out @extended @jira(XRT-155)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.balance.click();
    await expectElementVisibility(fundsPage.digitalCard.networkFee, true);
    await expectElementVisibility(fundsPage.digitalCard.maximumFee, true);

    const totalBalance = await fundsPage.digitalCard.getTotalBalance();
    const calculatedBalance = await fundsPage.digitalCard.calculateFeesSum();
    expectElementEquality(calculatedBalance, totalBalance);
  });

  test("should show/hide utilized balance @extended @jira(XRT-527)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.balance.click();
    await expectElementVisibility(fundsPage.digitalCard.utilizedBalance, true);

    await fundsPage.showUtilizedBalance(false);
    await fundsPage.goto();
    await fundsPage.paymentOut.click();
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.balance.click();
    await expectElementVisibility(fundsPage.digitalCard.utilizedBalance, false);
  });

  test("should calculate Maximum for Digital Assets in Payment Out @extended @jira(XRT-153)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.rootEl, true);

    const totalBalance = await fundsPage.digitalCard.balance.innerText();
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await expectElementToHaveValue(fundsPage.transferOutToWalletForm.totalTransferOutFromWalletInput, totalBalance);
  });

  test("should display Confirmation Modal on Payment Out Tab @extended @jira(XRT-138)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(BTC_WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await expectElementToBeDisabled(fundsPage.transferOutToWalletForm.paymentOutButton, false);

    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, true);
    await expectElementVisibility(fundsPage.confirmationModal.amount, true);
    expectElementEquality(
      parseFloat(await fundsPage.confirmationModal.amount.innerText()),
      parseFloat(await fundsPage.digitalCard.balance.innerText())
    );
    await fundsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, false);
  });

  test("should open Bank Accounts Form on the Payment Out Tab @smoke @jira(XRT-139) @jira(XRT-150)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await fundsPage.mockBankInfo("full");
    await fundsPage.fiatCard.bankTransferButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.rootEl, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.addBankButton, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.bankCards, true);
    await fundsPage.bankAccountsForm.verifyBankCards();
  });

  test("should open Empty Bank Accounts Form on the Payment Out Tab @criticalPath @jira(XRT-149)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await fundsPage.mockBankInfo("empty");
    await fundsPage.fiatCard.bankTransferButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.rootEl, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.addBankButton, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.noBankAccountsMessage, true);
    await expectElementToHaveText(
      fundsPage.bankAccountsForm.noBankAccountsMessage,
      /There are no bank accounts linked to your account yet./
    );
  });

  test("should cancel Adding Bank on the Payment Out Tab @extended @jira(XRT-141)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await fundsPage.fiatCard.bankTransferButton.click();
    await fundsPage.bankAccountsForm.addBankButton.click();
    await expectElementVisibility(fundsPage.addBankForm.rootEl, true);

    await fundsPage.addBankForm.cancelButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.rootEl, true);
  });

  test("should make Transfer Out To Wallet from Payment Out tab @smoke @jira(XRT-136)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(BTC_WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await fundsPage.mockSuccessfulTransaction("coin");
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.successMessage, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.doneButton, true);

    await fundsPage.transferOutToWalletForm.doneButton.click();
    await expectElementVisibility(fundsPage.recentTransactions.lines, true);
  });

  test("should make Transfer Out using USDT @criticalPath @jira(XRT-531)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USDT_ERC20);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(USDT_WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.amountToBeSentInput.fill("30");
    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.successMessage, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.doneButton, true);

    await fundsPage.transferOutToWalletForm.doneButton.click();
    await expectElementVisibility(fundsPage.recentTransactions.lines, true);
  });

  test("should open Transfer Out To Wallet form on the Payment Out tab @smoke @jira(XRT-148)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.rootEl, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.amountToBeSentInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.equivalentAmountInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.totalTransferOutFromWalletInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.percentControls, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.maximumButton, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.walletAddressInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.paymentOutButton, true);
  });

  test("should close Confirmation Modal on the Payment Out tab @extended @jira(XRT-144)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(BTC_WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await fundsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(fundsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.rootEl, true);
  });

  test("should not make Transfer Out To Wallet when address is invalid @extended @jira(XRT-146)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(BTC_WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.errorInvalidAddress, true);
    await expectElementToHaveText(fundsPage.transferOutToWalletForm.errorInvalidAddress, "Invalid Address");
  });

  test("should add and delete a bank @criticalPath @jira(XRT-156)", async ({ fundsPage }) => {
    const bankName: string = await fundsPage.createBankWithRandomName();
    await fundsPage.addBankForm.submitButton.click();
    expectArrayIncludes(await fundsPage.bankAccountsForm.getBankNames(), [bankName]);

    await fundsPage.bankAccountsForm.openBankByName(bankName);
    await fundsPage.bankAccountForm.deleteButton.click();
    await fundsPage.confirmationModal.deleteButton.click();
    expectArrayIncludes(await fundsPage.bankAccountsForm.getBankNames(), [bankName], false);
  });

  test("should not add a bank when intermediary band data is expanded @extended @jira(XRT-494)", async ({
    fundsPage,
  }) => {
    await fundsPage.createBankWithRandomName();
    await fundsPage.addBankForm.addIntermediaryBankButton.click();
    await fundsPage.addBankForm.submitButton.click();
    await expectElementVisibility(fundsPage.addBankForm.rootEl, true);
    await expectElementVisibility(fundsPage.addBankForm.intermediaryBankNameError, true);
  });

  test("should make a signet transfer payment @criticalPath @jira(XRT-157)", async ({ fundsPage, activitiesPage }) => {
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
    await fundsPage.fiatCard.bankTransferButton.click();
    await fundsPage.bankAccountsForm.getBankCard(0).click();
    await fundsPage.bankAccountForm.continueButton.click();
    await fundsPage.checkIfBalanceIsEnough();
    await fundsPage.bankTransferForm.amountField.typeText("100");
    await fundsPage.bankTransferForm.paymentOutButton.click();
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.bankTransferForm.successMessage, true);

    await fundsPage.bankTransferForm.doneButton.click();
    await activitiesPage.goto();
    await activitiesPage.buttonActivityFilter.click();
    await activitiesPage.activityFilter.filterBy("type", TRANSACTION_FILTER_TYPES.Withdrawal);
    await activitiesPage.activityFilter.filterBy("currency", CURRENCIES.USD);
    await activitiesPage.activityFilter.filterBy("status", TRANSACTION_STATUSES.PROCESSED);
    await activitiesPage.activityFilter.buttonConfirm.click();
    expectItemToContainText(await activitiesPage.transactionActivity.getTextFromLine(0), [CURRENCIES.USD, "100"]);

    await fundsPage.goto();
    await fundsPage.paymentOut.click();
    const expectedString = new RegExp(`100.*${CURRENCIES.USD}`);
    await expectElementToHaveText(fundsPage.recentTransactions.getTransaction(1), expectedString);
  });

  test("should hide Add Bank button @criticalPath @jira(XRT-520)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
    await fundsPage.fiatCard.bankTransferButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.addBankButton, true);

    await fundsPage.hideAddBankButton(true);
    await fundsPage.goto();
    await fundsPage.paymentOut.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
    await fundsPage.fiatCard.bankTransferButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.addBankButton, false);
  });
});
