import { expectElementVisibility, expectElementToHaveText } from "../../utils";
import { test } from "../../po/pages";
import { paymentOutModalMap, CURRENCIES } from "../../config";

test.describe("Info Modals", () => {
  test.describe("Payment In @jira(PWU-447)", () => {
    test.beforeEach(async ({ fundsPage }) => {
      await fundsPage.goto();
      await fundsPage.paymentIn.click();
    });

    test("should display for All Fiat (Except of CHF) currencies @criticalPath @jira(XRT-198)", async ({
      fundsPage,
    }) => {
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
      await fundsPage.questionButton.click();
      await expectElementVisibility(fundsPage.modal.rootEl, true);
      await expectElementToHaveText(fundsPage.modal.title, "Payment In");
      await expectElementToHaveText(
        fundsPage.modal.body,
        /Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:/
      );
    });

    test("should display for All Digital Assets (Except of XRP) @criticalPath @jira(XRT-200)", async ({
      fundsPage,
    }) => {
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      await fundsPage.questionButton.click();
      await expectElementVisibility(fundsPage.modal.rootEl, true);
      await expectElementToHaveText(fundsPage.modal.title, "Payment In");
      await expectElementToHaveText(
        fundsPage.modal.body,
        /Please supply the intended amount of your Payment In. The following screen will provide the payment details. Please also note the following:/
      );
      await expectElementVisibility(fundsPage.modal.additionalCryptoLabel, true);
    });
  });

  test.describe("Payment Out @jira(PWU-446)", () => {
    test.beforeEach(async ({ fundsPage }) => {
      await fundsPage.mockModalData();
    });

    paymentOutModalMap.forEach(({ name, currency, expectedMessage }) => {
      test(name, async ({ fundsPage }) => {
        await fundsPage.currencyList.chooseCurrency(currency);
        await expectElementVisibility(fundsPage.questionButton, false);

        await fundsPage.fiatCard.bankTransferButton.click();
        await expectElementVisibility(fundsPage.questionButton, true);

        await fundsPage.bankAccountsForm.getBankCard(0).click();
        await fundsPage.questionButton.click();
        await expectElementVisibility(fundsPage.modal.rootEl, true);
        await expectElementToHaveText(fundsPage.modal.title, "Payment Out");
        await expectElementToHaveText(fundsPage.modal.list, expectedMessage);
      });
    });

    test("should not display help button for Digital Assets @criticalPath @jira(XRT-197)", async ({ fundsPage }) => {
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      await expectElementVisibility(fundsPage.questionButton, false);

      await fundsPage.digitalCard.transferOutButton.click();
      await expectElementVisibility(fundsPage.questionButton, false);
    });
  });
});
