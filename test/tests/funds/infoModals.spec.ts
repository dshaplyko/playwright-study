import { expectElementVisibility, expectElementToHaveText } from "../../utils";
import { test } from "../../po/pages";
import {
  BANK_DATA_MODALS,
  URLs,
  paymentOutModalMap,
  paymentInModalDigitalAssetMap,
  paymentInModalFiatMap,
  CURRENCIES,
} from "../../config";

test.describe("Info Modals", () => {
  test.describe("Payment In @jira(PWU-447)", () => {
    test.beforeEach(async ({ fundsPage }) => {
      await fundsPage.goto();
      await fundsPage.paymentIn.click();
    });

    paymentInModalFiatMap.forEach(({ name, currency, expectedMessage }) => {
      test(name, async ({ fundsPage }) => {
        await fundsPage.currencyList.chooseCurrency(currency);
        await fundsPage.questionButton.click();
        await expectElementVisibility(fundsPage.modal.el, true);
        await expectElementToHaveText(fundsPage.modal.title, "Payment In");
        await expectElementToHaveText(fundsPage.modal.body, new RegExp(expectedMessage));
      });
    });

    paymentInModalDigitalAssetMap.forEach(({ name, currency, expectedMessage, isAdditionalLabelVisible }) => {
      test(name, async ({ fundsPage }) => {
        await fundsPage.currencyList.chooseCurrency(currency);
        await fundsPage.questionButton.click();
        await expectElementVisibility(fundsPage.modal.el, true);
        await expectElementToHaveText(fundsPage.modal.title, "Payment In");
        await expectElementToHaveText(fundsPage.modal.body, new RegExp(expectedMessage));
        await expectElementVisibility(fundsPage.modal.additionalCryptoLabel, isAdditionalLabelVisible);
      });
    });
  });

  test.describe("Payment Out @jira(PWU-446)", () => {
    test.beforeEach(async ({ api, fundsPage }) => {
      await api.mockData(BANK_DATA_MODALS, URLs.BANK_INFO);
      await fundsPage.goto();
      await fundsPage.paymentOut.click();
    });

    paymentOutModalMap.forEach(({ name, currency, expectedMessage }) => {
      test(name, async ({ fundsPage }) => {
        await fundsPage.currencyList.chooseCurrency(currency);
        await expectElementVisibility(fundsPage.questionButton, false);

        await fundsPage.fiatCard.bankTransferButton.click();
        await expectElementVisibility(fundsPage.questionButton, true);

        await fundsPage.bankAccountsForm.getBankCard(0).click();
        await fundsPage.questionButton.click();
        await expectElementVisibility(fundsPage.modal.el, true);
        await expectElementToHaveText(fundsPage.modal.title, "Payment Out");
        await expectElementToHaveText(fundsPage.modal.list, new RegExp(expectedMessage));
      });
    });

    test("should not display help button for Digital Assets @criticalPath @jira(BCTGWEBPWU-744)", async ({
      fundsPage,
    }) => {
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      await expectElementVisibility(fundsPage.questionButton, false);

      await fundsPage.digitalCard.transferOutButton.click();
      await expectElementVisibility(fundsPage.questionButton, false);
    });
  });
});
