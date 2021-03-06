import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText, expectElementToContainText } from "../../utils";
import { bankFormsMap, JAPAN_ACCOUNT_TYPES } from "../../config";

test.describe.parallel("Payment Out Bank Forms @jira(PWU-34)", () => {
  bankFormsMap.forEach((testData) => {
    test(`should open ${testData.name} Form @smoke ${testData.id}`, async ({ fundsPage }) => {
      if (testData.needMock) await fundsPage.mockBankData(testData.mockData);
      await fundsPage.goto();
      await fundsPage.paymentOut.click();
      await fundsPage.chooseBankTransferForm(testData.currency, testData.form);
      await expectElementVisibility(fundsPage.addBankForm.rootEl, true);
      await expectElementVisibility(fundsPage.addBankForm.method.rootEl, true);
      await expectElementVisibility(fundsPage.addBankForm.submitButton, true);
      await expectElementVisibility(fundsPage.addBankForm.cancelButton, true);

      if (testData.name === "Bank Wire") {
        await fundsPage.addBankForm.addIntermediaryBankButton.click();
        await expectElementVisibility(fundsPage.addBankForm.intermediaryBankNameInput, true);
        await expectElementVisibility(fundsPage.addBankForm.intermediaryBankSwiftCodeInput, true);
        await expectElementVisibility(fundsPage.addBankForm.intermediaryBankAccountNumberInput, true);
        await expectElementVisibility(fundsPage.addBankForm.intermediaryBankAddressInput, true);
        await expectElementVisibility(fundsPage.addBankForm.intermediaryBankOptionalReferenceInput, true);
      }

      if (testData.name !== "Japan Bank Transfer") {
        await expectElementToHaveText(fundsPage.addBankForm.formInstructions, testData.instruction);
      }

      await expectElementToHaveText(fundsPage.addBankForm.currencyInput, testData.currency);
      await expectElementVisibility(fundsPage.addBankForm.bsbInput, testData.bsbInput);
      await expectElementVisibility(fundsPage.addBankForm.bankNameInput, testData.bankNameInput);
      await expectElementVisibility(fundsPage.addBankForm.bankClearingNumberInput, testData.bankClearingNumberInput);
      await expectElementVisibility(fundsPage.addBankForm.accountNumberInput, testData.accountNumberInput);
      await expectElementVisibility(fundsPage.addBankForm.accountNameInput, testData.accountNameInput);
      await expectElementVisibility(fundsPage.addBankForm.accountTypeInput, testData.accountTypeInput);
      await expectElementVisibility(fundsPage.addBankForm.bankNicknameInput, testData.bankNicknameInput);
      await expectElementVisibility(fundsPage.addBankForm.bankAddressInput, testData.bankAddressInput);
      await expectElementVisibility(fundsPage.addBankForm.swiftCodeInput, testData.swiftCodeInput);
      await expectElementVisibility(fundsPage.addBankForm.branchNameInput, testData.branchNameInput);
      await expectElementVisibility(fundsPage.addBankForm.walletAddressInput, testData.walletAddressInput);
      await expectElementVisibility(fundsPage.addBankForm.optionalReferenceInput, testData.optionalReferenceInput);
      await expectElementVisibility(fundsPage.addBankForm.beneficiaryBankNameInput, testData.beneficiaryBankNameInput);
      await expectElementVisibility(fundsPage.addBankForm.beneficiaryNameInput, testData.beneficiaryNameInput);
      await expectElementVisibility(fundsPage.addBankForm.abaBankNumberInput, testData.abaBankNumberInput);
      await expectElementVisibility(fundsPage.addBankForm.beneficiaryBankAddress, testData.beneficiaryBankAddress);

      if (testData.name === "Japan Bank Transfer") {
        await fundsPage.addBankForm.accountType.click();
        await expectElementToContainText(fundsPage.addBankForm.accountType.options, JAPAN_ACCOUNT_TYPES);
      }
    });
  });
});
