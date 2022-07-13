import { test } from "../../po/pages";
import {
  expectElementVisibility,
  expectElementEquality,
  expectElementToHaveText,
  expectNumbersComparison,
  expectElementToHaveAttribute,
} from "../../utils";
import {
  transferFundsTabsMap,
  fundsTabViewMap,
  fundsCurrenciesMap,
  fundsTransactionsMap,
  fundsHelpModalsMap,
  ATTRIBUTES,
  FUNDS_FIAT_ERROR,
  FUNDS_ALERT_DIGITAL_ASSET,
  FUNDS_ERROR_SELECT_PAYMENT,
  CURRENCIES,
  COMPARE_CONDITIONS,
} from "../../config";
const digitalAssetCurrency = CURRENCIES.BTC;

test.describe("Transfer Funds Page: Payment In tab @jira(PWU-34)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
  });

  test("should render Transfer Funds Page @smoke @jira(XRT-170)", async ({ fundsPage }) => {
    await expectElementVisibility(fundsPage.quickTips.rootEl, true);
    await expectElementVisibility(fundsPage.paymentIn.rootEl, true);
    await expectElementVisibility(fundsPage.paymentOut.rootEl, true);
    await expectElementVisibility(fundsPage.transferFunds.rootEl, true);
    await expectElementVisibility(fundsPage.subAccountIndicator, true);
  });

  test("should expand/collapse Quick Tips @smoke @jira(XRT-171)", async ({ fundsPage }) => {
    expectElementEquality(await fundsPage.quickTips.isExpanded(), false);

    await fundsPage.expandQuckTipsButton.click();
    expectElementEquality(await fundsPage.quickTips.isExpanded(), true);

    await fundsPage.expandQuckTipsButton.click();
    expectElementEquality(await fundsPage.quickTips.isExpanded(), false);
  });

  transferFundsTabsMap.forEach(({ id, tab, name, text }) => {
    test(`should display ${name} tab @smoke ${id}`, async ({ fundsPage }) => {
      await expectElementToHaveText(await fundsPage[tab].name, name);
      await expectElementToHaveText(await fundsPage[tab].body, text);
    });
  });

  fundsTabViewMap.forEach((item) => {
    test(`${item.test}`, async ({ fundsPage }) => {
      await fundsPage[item.tab].click();
      await expectElementVisibility(fundsPage.menuBar.rootEl, true);
      await expectElementToHaveAttribute(fundsPage.menuBar.paymentIn.rootEl, ATTRIBUTES.SELECTED, item.paymentIn);
      await expectElementToHaveAttribute(fundsPage.menuBar.paymentOut.rootEl, ATTRIBUTES.SELECTED, item.paymentOut);
      await expectElementToHaveAttribute(
        fundsPage.menuBar.transferFunds.rootEl,
        ATTRIBUTES.SELECTED,
        item.transferFunds
      );
      await expectElementVisibility(fundsPage.currencyList.rootEl, true);
      await expectElementToHaveText(fundsPage.transactionsHeader, item.header);
    });
  });

  fundsCurrenciesMap.forEach(({ name, tab }) => {
    test(name, async ({ fundsPage }) => {
      await fundsPage[tab].click();
      const { fiatCurrencies, digitalAssets } = await fundsPage.currencyList.getCurrencies();
      expectNumbersComparison(fiatCurrencies.length, 0, COMPARE_CONDITIONS.MORE);
      expectNumbersComparison(digitalAssets.length, 0, COMPARE_CONDITIONS.MORE);
    });
  });

  test("should choose Fiat Currency from the Payment In Tab @criticalPath @jira(XRT-204)", async ({ fundsPage }) => {
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.EUR);
    await expectElementVisibility(fundsPage.fiatCard.rootEl, true);
    await expectElementVisibility(fundsPage.fiatCard.bankWireButton, true);
    await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment In Method");

    await fundsPage.fiatCard.bankWireButton.click();
    await expectElementVisibility(fundsPage.fiatCard.errorMessage, true);
    await expectElementToHaveText(fundsPage.fiatCard.errorMessage, FUNDS_FIAT_ERROR);
  });

  test("should choose Digital Assets value from the Payment In Tab @criticalPath @jira(XRT-205)", async ({
    fundsPage,
  }) => {
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await expectElementVisibility(fundsPage.selectedPayment.rootEl, true);
    await expectElementVisibility(fundsPage.selectedPayment.infoMessage, true);
    await expectElementVisibility(fundsPage.selectedPayment.qrCode, true);
    await expectElementVisibility(fundsPage.selectedPayment.createNewAddressButton, true);
    await expectElementVisibility(fundsPage.selectedPayment.destinationAddress, true);
    await expectElementToHaveText(fundsPage.selectedPayment.header, `Transfer In ${digitalAssetCurrency}`);
    await expectElementToHaveText(fundsPage.selectedPayment.alertMessage, FUNDS_ALERT_DIGITAL_ASSET);

    await fundsPage.selectedPayment.createNewAddressButton.click();
    await expectElementVisibility(fundsPage.selectedPayment.errorMessage, true);
    await expectElementToHaveText(fundsPage.selectedPayment.errorMessage, FUNDS_ERROR_SELECT_PAYMENT);
  });

  test("should open Fees Page after clicking 'here' link from the Quick Tips @extended @jira(XRT-179)", async ({
    fundsPage,
  }) => {
    await fundsPage.expandQuckTipsButton.click();
    await fundsPage.feesScheduleLink.click();
    await fundsPage.expectUrlContains(/fees/);
  });

  test("should open Activity Page after clicking 'Activity' link from the Quick Tips @extended @jira(XRT-178)", async ({
    fundsPage,
  }) => {
    await fundsPage.expandQuckTipsButton.click();
    await fundsPage.activityLink.click();
    await fundsPage.expectUrlContains(/activity/);
  });

  fundsHelpModalsMap.forEach(({ currency, type }) => {
    test(`should open Help Modal Window for ${type} @extended @jira(XRT-212) @jira(XRT-211)`, async ({ fundsPage }) => {
      await fundsPage.paymentIn.click();
      await fundsPage.currencyList.chooseCurrency(currency);
      await fundsPage.questionButton.click();
      await expectElementVisibility(fundsPage.modal.rootEl, true);
      await expectElementToHaveText(fundsPage.modal.title, /Payment In|Deposit/);
      await expectElementVisibility(fundsPage.modal.body, true);

      await fundsPage.modal.buttonClose.click();
      await expectElementVisibility(fundsPage.modal.rootEl, false);
    });
  });

  fundsTransactionsMap.forEach(({ name, tab, title }) => {
    test(`${name}`, async ({ fundsPage }) => {
      await fundsPage[tab].click();
      await fundsPage.recentTransactions.waitForVisible();
      await expectElementToHaveText(fundsPage.recentTransactions.title, title);
      await expectElementVisibility(fundsPage.recentTransactions.lines, true);
      expectNumbersComparison(await fundsPage.recentTransactions.lines.count(), 1, COMPARE_CONDITIONS.MORE);
    });
  });
});
