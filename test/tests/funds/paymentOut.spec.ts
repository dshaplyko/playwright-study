import { test } from "../../po/pages";
import {
  expectElementVisibility,
  expectElementEquality,
  expectElementToHaveText,
  expectElementToHaveValue,
  expectElementToBeDisabled,
} from "../../utils";
import {
  WALLET_ADDRESS,
  URLs,
  SG_TRANSACTION_METADATA,
  SG_SUBMIT_MAX_ERROR,
  SG_SUBMIT_MIN_ERROR,
  BANK_DATA,
  BANK_DATA_EMPTY,
  WITHDRAWAL_DATA,
  CURRENCIES,
} from "../../config";
const digitalAssetCurrency = CURRENCIES.BTC;
const fiatCurrency = CURRENCIES.EUR;

test.describe("Transfer Funds Page: Payment Out @jira(PWU-34)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
    await fundsPage.paymentOut.click();
  });

  test.afterEach(async ({ api }) => await api.unroutAll());

  test("should choose Fiat Currency from the Payment Out Tab @criticalPath @jira(BCTGWEBPWU-109)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await expectElementVisibility(fundsPage.placeholder, false);
    await expectElementVisibility(fundsPage.fiatCard.el, true);
    await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment Out Method");
    await expectElementVisibility(fundsPage.fiatCard.balance, true);
    await expectElementVisibility(fundsPage.fiatCard.bankTransferButton, true);
  });

  test("should choose Digital Asset from the Payment Out Tab @criticalPath @jira(BCTGWEBPWU-110)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.getRandomDigitalAsset();
    await expectElementVisibility(fundsPage.placeholder, false);
    await expectElementVisibility(fundsPage.digitalCard.el, true);
    await expectElementToHaveText(fundsPage.digitalCard.header, "Payment Out Method");
    await expectElementVisibility(fundsPage.digitalCard.balance, true);
    await expectElementVisibility(fundsPage.digitalCard.transferOutButton, true);
  });

  test("should calculate Balance for Digital Assets on Payment Out @extended @jira(BCTGWEBPWU-234)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.balance.click();
    await expectElementVisibility(fundsPage.digitalCard.networkFee, true);
    await expectElementVisibility(fundsPage.digitalCard.maximumFee, true);

    const totalBalance = await fundsPage.digitalCard.getTotalBalance();
    const calculatedBalance = await fundsPage.digitalCard.calculateFeesSum();
    expectElementEquality(calculatedBalance, totalBalance);
  });

  test("should display Payment Out Tab for Digital Assets transfer @criticalPath @jira(BCTGWEBPWU-400)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.el, true);
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

  test("should calculate Maximum for Digital Assets in Payment Out @extended @jira(BCTGWEBPWU-204)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.el, true);

    const totalBalance = await fundsPage.digitalCard.balance.innerText();
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await expectElementToHaveValue(fundsPage.transferOutToWalletForm.totalTransferOutFromWalletInput, totalBalance);
  });

  test("should display Confirmation Modal on Payment Out Tab @extended @jira(BCTGWEBPWU-402)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await expectElementToBeDisabled(fundsPage.transferOutToWalletForm.paymentOutButton, false);

    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.el, true);
    await expectElementVisibility(fundsPage.confirmationModal.amount, true);
    expectElementEquality(
      parseFloat(await fundsPage.confirmationModal.amount.innerText()),
      parseFloat(await fundsPage.digitalCard.balance.innerText())
    );
    await fundsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(fundsPage.confirmationModal.el, false);
  });

  test("should open Bank Accounts Form on the Payment Out Tab @smoke @jira(BCTGWEBPWU-412) @jira(BCTGWEBPWU-429)", async ({
    api,
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await api.mockData(BANK_DATA, URLs.BANK_INFO);
    await fundsPage.fiatCard.bankTransferButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.el, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.addBankButton, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.bankCards, true);
    await fundsPage.bankAccountsForm.verifyBankCards();
  });

  test("should open Empty Bank Accounts Form on the Payment Out Tab @criticalPath @jira(BCTGWEBPWU-430)", async ({
    api,
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await api.mockData(BANK_DATA_EMPTY, URLs.BANK_INFO);
    await fundsPage.fiatCard.bankTransferButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.el, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.addBankButton, true);
    await expectElementVisibility(fundsPage.bankAccountsForm.noBankAccountsMessage, true);
    await expectElementToHaveText(
      fundsPage.bankAccountsForm.noBankAccountsMessage,
      /There are no bank accounts linked to your account yet./
    );
  });

  test("should cancel Adding Bank on the Payment Out Tab @extended @jira(BCTGWEBPWU-414)", async ({ fundsPage }) => {
    await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    await fundsPage.fiatCard.bankTransferButton.click();
    await fundsPage.bankAccountsForm.addBankButton.click();
    await expectElementVisibility(fundsPage.addBankForm.el, true);

    await fundsPage.addBankForm.cancelButton.click();
    await expectElementVisibility(fundsPage.bankAccountsForm.el, true);
  });

  test("should make Transfer Out To Wallet from Payment Out tab @criticalPath @jira(BCTGWEBPWU-397)", async ({
    api,
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await api.mockData(SG_TRANSACTION_METADATA, URLs.SUBMIT_COIN_WITHDRAWAL);
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.confirmationModal.el, false);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.successMessage, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.doneButton, true);

    await fundsPage.transferOutToWalletForm.doneButton.click();
    await expectElementVisibility(fundsPage.recentTransactions.lines, true);
  });

  test("should open Transfer Out To Wallet form on the Payment Out tab @smoke @jira(BCTGWEBPWU-427)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.el, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.amountToBeSentInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.equivalentAmountInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.totalTransferOutFromWalletInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.percentControls, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.maximumButton, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.walletAddressInput, true);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.paymentOutButton, true);
  });

  test("should close Confirmation Modal on the Payment Out tab @extended @jira(BCTGWEBPWU-417)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await fundsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(fundsPage.confirmationModal.el, false);
    await expectElementVisibility(fundsPage.transferOutToWalletForm.el, true);
  });

  test("should not make Transfer Out To Wallet when address is invalid @extended @jira(BCTGWEBPWU-419)", async ({
    fundsPage,
  }) => {
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await fundsPage.digitalCard.transferOutButton.click();
    await fundsPage.transferOutToWalletForm.walletAddressInput.type(WALLET_ADDRESS);
    await fundsPage.transferOutToWalletForm.maximumButton.click();
    await fundsPage.transferOutToWalletForm.paymentOutButton.click();
    await fundsPage.confirmationModal.paymentOutButton.click();
    await expectElementVisibility(fundsPage.transferOutToWalletForm.errorInvalidAddress, true);
    await expectElementToHaveText(fundsPage.transferOutToWalletForm.errorInvalidAddress, "Invalid Address");
  });

  test.describe("Bank Transferring", async () => {
    test.beforeEach(async ({ api, fundsPage }) => {
      await api.mockData(WITHDRAWAL_DATA, URLs.WITHDRAWAL_METADATA);
      await api.mockData(BANK_DATA, URLs.BANK_INFO);
      await fundsPage.goto();
      await fundsPage.paymentOut.click();
      await fundsPage.currencyList.chooseCurrency(fiatCurrency);
    });
    test("should open Bank Transfer Form on the Payment Out tab @smoke @jira(BCTGWEBPWU-431)", async ({
      fundsPage,
    }) => {
      await fundsPage.fiatCard.bankTransferButton.click();
      await fundsPage.bankAccountsForm.getBankCard(1).click();
      await expectElementVisibility(fundsPage.bankAccountForm.el, true);
      await expectElementVisibility(fundsPage.bankAccountForm.continueButton, true);
      await expectElementVisibility(fundsPage.bankAccountForm.deleteButton, true);

      await fundsPage.bankAccountForm.continueButton.click();
      await expectElementVisibility(fundsPage.bankTransferForm.el, true);
      await expectElementVisibility(fundsPage.bankTransferForm.currency, true);
      await expectElementToHaveText(fundsPage.bankTransferForm.currency, fiatCurrency);
      await expectElementVisibility(fundsPage.bankTransferForm.amountField.el, true);
      await expectElementVisibility(fundsPage.bankTransferForm.percentControls, true);
      await expectElementVisibility(fundsPage.bankTransferForm.bankMethod, true);
      await expectElementVisibility(fundsPage.bankTransferForm.bankName, true);
      await expectElementVisibility(fundsPage.bankTransferForm.maximumButton, true);
      await expectElementVisibility(fundsPage.bankTransferForm.paymentOutButton, true);
    });

    test("should make Bank Transfer Transaction on the Payment Out Tab @criticalPath @jira(BCTGWEBPWU-420)", async ({
      api,
      fundsPage,
    }) => {
      await api.mockData(SG_TRANSACTION_METADATA, URLs.SUBMIT_CASH_WITHDRAWAL);
      await fundsPage.fiatCard.bankTransferButton.click();
      await fundsPage.bankAccountsForm.getBankCard(1).click();
      await fundsPage.bankAccountForm.continueButton.click();
      await fundsPage.bankTransferForm.amountField.typeText("1");
      await fundsPage.bankTransferForm.paymentOutButton.click();
      await fundsPage.confirmationModal.paymentOutButton.click();
      await expectElementVisibility(fundsPage.confirmationModal.el, false);
      await expectElementVisibility(fundsPage.bankTransferForm.successMessage, true);
      await expectElementVisibility(fundsPage.bankTransferForm.doneButton, true);

      await fundsPage.bankTransferForm.doneButton.click();
      await expectElementVisibility(fundsPage.recentTransactions.lines, true);
    });

    test("should not make Bank Transfer Transaction if amount is less than minimum @extended @jira(BCTGWEBPWU-432)", async ({
      api,
      fundsPage,
    }) => {
      await api.emulateNetworkError(SG_SUBMIT_MIN_ERROR, URLs.SUBMIT_CASH_WITHDRAWAL);
      await fundsPage.fiatCard.bankTransferButton.click();
      await fundsPage.bankAccountsForm.getBankCard(1).click();
      await fundsPage.bankAccountForm.continueButton.click();
      await fundsPage.bankTransferForm.amountField.typeText("79");
      await fundsPage.bankTransferForm.paymentOutButton.click();
      await fundsPage.confirmationModal.paymentOutButton.click();
      await expectElementVisibility(fundsPage.bankTransferForm.errorInsufficientAmount, true);
      await expectElementToHaveText(fundsPage.bankTransferForm.errorInsufficientAmount, "Insufficient amount");
    });

    test("should not make Bank Transfer Transaction if amount is more than maximum @extended @jira(BCTGWEBPWU-432)", async ({
      api,
      fundsPage,
    }) => {
      await api.emulateNetworkError(SG_SUBMIT_MAX_ERROR, URLs.SUBMIT_CASH_WITHDRAWAL);
      await fundsPage.fiatCard.bankTransferButton.click();
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

    test("should cancel bank deletion on Payment Out tab @extended @jira(BCTGWEBPWU-202)", async ({ fundsPage }) => {
      await fundsPage.fiatCard.bankTransferButton.click();
      await fundsPage.bankAccountsForm.getBankCard(1).click();
      await fundsPage.bankAccountForm.deleteButton.click();
      await expectElementVisibility(fundsPage.confirmationModal.el, true);
      await expectElementVisibility(fundsPage.confirmationModal.buttonCancel, true);
      await expectElementVisibility(fundsPage.confirmationModal.deleteButton, true);

      await fundsPage.confirmationModal.buttonCancel.click();
      await expectElementVisibility(fundsPage.confirmationModal.el, false);
      await expectElementVisibility(fundsPage.bankAccountForm.el, true);
      await expectElementVisibility(fundsPage.bankAccountForm.continueButton, true);
      await expectElementVisibility(fundsPage.bankAccountForm.deleteButton, true);
    });

    test("should delete a bank on the Payment Out form @extended @jira(BCTGWEBPWU-201)", async ({ fundsPage }) => {
      await fundsPage.fiatCard.bankTransferButton.click();
      await fundsPage.bankAccountsForm.getBankCard(1).click();
      await fundsPage.bankAccountForm.deleteButton.click();
      await expectElementVisibility(fundsPage.confirmationModal.el, true);
      await expectElementVisibility(fundsPage.confirmationModal.buttonCancel, true);
      await expectElementVisibility(fundsPage.confirmationModal.deleteButton, true);

      await fundsPage.confirmationModal.deleteButton.click();
      await expectElementVisibility(fundsPage.bankAccountsForm.el, false);
    });
  });
});
