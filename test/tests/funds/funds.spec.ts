import { test } from "../../po/pages";
import { Logger } from "../../logger/logger";
import {
  expectElementVisibility,
  expectElementEquality,
  expectElementToHaveText,
  expectItemToContainText,
  expectElementsState,
  expectGreaterThan,
} from "../../utils";
import {
  transferFundsTabsMap,
  fundsTabViewMap,
  fundsCurrenciesMap,
  fundsTransactionsMap,
  fundsHelpModalsMap,
  STATES,
  FUNDS_FIAT_ERROR,
  FUNDS_ALERT_DIGITAL_ASSET,
  FUNDS_ERROR_SELECT_PAYMENT,
  SG_DEPOSIT_METADATA,
  URLs,
  TIMEZONES,
  CURRENCIES,
} from "../../config";
const logger = new Logger("Funds Test Suite");
const digitalAssetCurrency = CURRENCIES.BTC;
const fiatCurrency = CURRENCIES.EUR;

test.describe("Transfer Funds Page @jira(PWU-34)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
  });

  test("should render Transfer Funds Page @smoke @jira(BCTGWEBPWU-91)", async ({ fundsPage }) => {
    await expectElementVisibility(fundsPage.quickTips.el, true);
    await expectElementVisibility(fundsPage.paymentIn.el, true);
    await expectElementVisibility(fundsPage.paymentOut.el, true);
    await expectElementVisibility(fundsPage.transferFunds.el, true);
  });

  test("should expand/collapse Quick Tips @smoke @jira(BCTGWEBPWU-94)", async ({ fundsPage }) => {
    expectElementEquality(await fundsPage.quickTips.isExpanded(), false);

    await fundsPage.expandQuckTipsButton.click();
    expectElementEquality(await fundsPage.quickTips.isExpanded(), true);

    await fundsPage.expandQuckTipsButton.click();
    expectElementEquality(await fundsPage.quickTips.isExpanded(), false);
  });

  transferFundsTabsMap.forEach(({ id, tab, name, text }) => {
    test(`should display ${name} tab @smoke @jira(BCTGWEBPWU-${id})`, async ({ fundsPage }) => {
      await expectElementToHaveText(await fundsPage[tab].name, name);
      await expectElementToHaveText(await fundsPage[tab].body, text);
    });
  });

  fundsTabViewMap.forEach((item) => {
    test(`${item.test}`, async ({ fundsPage }) => {
      await fundsPage[item.tab].click();
      await expectElementVisibility(fundsPage.menuBar.el, true);
      await expectElementsState(fundsPage.menuBar.paymentIn.el, STATES.SELECTED, item.paymentIn);
      await expectElementsState(fundsPage.menuBar.paymentOut.el, STATES.SELECTED, item.paymentOut);
      await expectElementsState(fundsPage.menuBar.transferFunds.el, STATES.SELECTED, item.transferFunds);
      await expectElementVisibility(fundsPage.currencyList.el, true);
      await expectElementToHaveText(fundsPage.transactionsHeader, item.header);
    });
  });

  fundsCurrenciesMap.forEach(({ name, tab }) => {
    test(name, async ({ fundsPage }) => {
      await fundsPage[tab].click();
      const { fiatCurrencies, digitalAssets } = await fundsPage.currencyList.getCurrencies();
      expectGreaterThan(fiatCurrencies.length, 0);
      expectGreaterThan(digitalAssets.length, 0);
    });
  });

  test("should choose Fiat Currency from the Payment In Tab @criticalPath @jira(BCTGWEBPWU-108)", async ({
    fundsPage,
  }) => {
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.EUR);
    await expectElementVisibility(fundsPage.fiatCard.el, true);
    await expectElementVisibility(fundsPage.fiatCard.bankWireButton, true);
    await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment In Method");

    await fundsPage.fiatCard.bankWireButton.click();
    await expectElementVisibility(fundsPage.fiatCard.errorMessage, true);
    await expectElementToHaveText(fundsPage.fiatCard.errorMessage, FUNDS_FIAT_ERROR);
  });

  test("should choose Digital Assets value from the Payment In Tab @criticalPath @jira(BCTGWEBPWU-107)", async ({
    fundsPage,
  }) => {
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await expectElementVisibility(fundsPage.selectedPayment.el, true);
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

  test("should open Fees Page after clicking 'here' link from the Quick Tips @extended @jira(BCTGWEBPWU-164)", async ({
    fundsPage,
  }) => {
    await fundsPage.expandQuckTipsButton.click();
    await fundsPage.feesScheduleLink.click();
    await fundsPage.expectUrlContains(/fees/);
  });

  test("should open Activity Page after clicking 'Activity' link from the Quick Tips @extended @jira(BCTGWEBPWU-163)", async ({
    fundsPage,
  }) => {
    await fundsPage.expandQuckTipsButton.click();
    await fundsPage.activityLink.click();
    await fundsPage.expectUrlContains(/activity/);
  });

  fundsHelpModalsMap.forEach(({ currency, type }) => {
    test(`should open Help Modal Window for ${type} @extended @jira(BCTGWEBPWU-166) @jira(BCTGWEBPWU-165)`, async ({
      fundsPage,
    }) => {
      await fundsPage.paymentIn.click();
      await fundsPage.currencyList.chooseCurrency(currency);
      await fundsPage.questionButton.click();
      await expectElementVisibility(fundsPage.modal.el, true);
      await expectElementToHaveText(fundsPage.modal.title, /Payment In|Deposit/);
      await expectElementVisibility(fundsPage.modal.body, true);

      await fundsPage.modal.buttonClose.click();
      await expectElementVisibility(fundsPage.modal.el, false);
    });
  });

  // TODO: Commented last steps since they are flaky ones
  test("should make Bank Wire Transaction @criticalPath @jira(BCTGWEBPWU-290) @jira(BCTGWEBPWU-770)", async ({
    settingsPage,
    fundsPage,
  }) => {
    const currency = CURRENCIES.USD;
    const amount = "51,200";

    await settingsPage.selectDefaultTimeZone(TIMEZONES.HK);
    await fundsPage.goto();
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(currency);
    await fundsPage.fiatCard.bankWireButton.click();
    await expectElementVisibility(fundsPage.paymentInForm.el, true);
    await expectElementVisibility(fundsPage.paymentInForm.amountField.el, true);
    await expectElementVisibility(fundsPage.paymentInForm.paymentInButton, true);

    await fundsPage.fiatCard.amountField.typeText(amount);
    await fundsPage.fiatCard.paymentInButton.click();
    await expectElementVisibility(fundsPage.fiatCard.bankWireNotification.el, true);

    const amountLine = await fundsPage.fiatCard.bankWireNotification.getLineByText("Amount");
    expectItemToContainText(amountLine, currency);
    expectItemToContainText(amountLine, amount);

    // await fundsPage.header.notificationsButton.click();
    // const transactions = await fundsPage.notifications.transactionDates.count();
    // await expectToHaveCount(fundsPage.notifications.transactionDates, transactions + 1);
  });

  test("should not make Bank Wire Transaction if fee is less than minimum @extended @jira(BCTGWEBPWU-291)", async ({
    api,
    fundsPage,
  }) => {
    await api.mockData(SG_DEPOSIT_METADATA, URLs.DEPOSIT_METADATA);
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.EUR);
    await fundsPage.fiatCard.bankWireButton.click();
    await fundsPage.paymentInForm.amountField.typeText("10");
    await fundsPage.paymentInForm.paymentInButton.click();
    await expectElementVisibility(fundsPage.paymentInForm.errorMessage, true);
    await expectElementToHaveText(fundsPage.paymentInForm.errorMessage, /Less than the minimum size/);
  });

  test("should not make Bank Wire Transaction if fee is more than maximum @extended @jira(BCTGWEBPWU-292)", async ({
    api,
    fundsPage,
  }) => {
    await api.mockData(SG_DEPOSIT_METADATA, URLs.DEPOSIT_METADATA);
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.EUR);
    await fundsPage.fiatCard.bankWireButton.click();
    await fundsPage.paymentInForm.amountField.typeText("100000000");
    await fundsPage.paymentInForm.paymentInButton.click();
    await expectElementVisibility(fundsPage.paymentInForm.errorMessage, true);
    await expectElementToHaveText(fundsPage.paymentInForm.errorMessage, /Exceeds maximum value/);
  });

  fundsTransactionsMap.forEach(({ name, tab, title }) => {
    test(`${name}`, async ({ fundsPage }) => {
      await fundsPage[tab].click();
      await fundsPage.recentTransactions.waitForVisible();
      await expectElementToHaveText(fundsPage.recentTransactions.title, title);
      await expectElementVisibility(fundsPage.recentTransactions.lines, true);
      expectElementEquality(await fundsPage.recentTransactions.lines.count(), 6);
    });
  });

  test("should display Transfer Funds for Digital Asset @criticalPath @jira(BCTGWEBPWU-112)", async ({ fundsPage }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await expectElementVisibility(fundsPage.transferFundsForm.el, true);
    await expectElementToHaveText(fundsPage.transferFundsForm.currency, digitalAssetCurrency);
    await expectElementVisibility(fundsPage.transferFundsForm.primaryBalance, true);
    // await expectElementVisibility(fundsPage.transferFundsForm.exchangeBalance, true);
    await expectElementVisibility(fundsPage.transferFundsForm.brokerageBalance, true);
    await expectElementVisibility(fundsPage.transferFundsForm.transferFrom.el, true);
    await expectElementVisibility(fundsPage.transferFundsForm.transferTo.el, true);
    await expectElementVisibility(fundsPage.transferFundsForm.transferTo.el, true);
    await expectElementVisibility(fundsPage.transferFundsForm.percentControls, true);
    expectElementEquality(await fundsPage.transferFundsForm.percentControls.count(), 4);
  });

  test("should make Transfer Funds Payment @criticalPath @jira(BCTGWEBPWU-172) @jira(BCTGWEBPWU-173)", async ({
    fundsPage,
  }) => {
    const currency = CURRENCIES.EUR;
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(currency);
    await expectElementVisibility(fundsPage.transferFundsForm.el, true);
    await expectElementToHaveText(fundsPage.transferFundsForm.currency, currency);

    const balanceFrom = await fundsPage.transferFundsForm.findNonZeroBalance();
    await fundsPage.transferFundsForm.makeTransferFrom(balanceFrom);

    const balanceTo = await fundsPage.transferFundsForm.chooseTransferTo(balanceFrom);
    logger.info(`We make a transfer from ${balanceFrom} to ${balanceTo}`);
    await fundsPage.transferFundsForm.choosePercentControl(25);
    await fundsPage.transferFundsForm.transferFundsButton.click();
    await expectElementVisibility(fundsPage.transferFundsForm.successMessage, true);
  });

  test("should populate the placeholder on the Transfer Funds tab @extended @jira(BCTGWEBPWU-364)", async ({
    fundsPage,
  }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.AUD);
    await fundsPage.transferFundsForm.makeTransferFrom("Primary");
    expectItemToContainText(
      await fundsPage.transferFundsForm.amountField.getPlaceholder(),
      await fundsPage.transferFundsForm.primaryBalance.textContent()
    );

    await fundsPage.transferFundsForm.makeTransferFrom("Exchange");
    expectItemToContainText(
      await fundsPage.transferFundsForm.amountField.getPlaceholder(),
      await fundsPage.transferFundsForm.exchangeBalance.textContent()
    );

    await fundsPage.transferFundsForm.makeTransferFrom("Brokerage");
    expectItemToContainText(
      await fundsPage.transferFundsForm.amountField.getPlaceholder(),
      await fundsPage.transferFundsForm.brokerageBalance.textContent()
    );
  });

  test.describe("Clicking Trading Related buttons", async () => {
    test.beforeEach(async ({ portfolioPage }) => {
      await portfolioPage.goto();
    });

    test("should redirect from Portfolio to Funds page after clicking Payment In button @criticalPath @jira(BCTGWEBPWU-433)", async ({
      portfolioPage,
      fundsPage,
    }) => {
      await portfolioPage.holdingList.clickCurrencyByText(fiatCurrency);
      await portfolioPage.tradingButtons.paymentIn.click();
      await fundsPage.expectUrlContains(/funds/);
      await expectElementVisibility(fundsPage.fiatCard.el, true);
      await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment In Method");
    });

    test("should redirect from Portfolio to Funds page after clicking Payment Out button @criticalPath @jira(BCTGWEBPWU-433)", async ({
      portfolioPage,
      fundsPage,
    }) => {
      await portfolioPage.holdingList.clickCurrencyByText(fiatCurrency);
      await portfolioPage.tradingButtons.paymentOut.click();
      await fundsPage.expectUrlContains(/funds/);
      await expectElementVisibility(fundsPage.fiatCard.el, true);
      await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment Out Method");
    });

    test("should redirect from Portfolio to Funds page after clicking Transfer Funds button @criticalPath @jira(BCTGWEBPWU-433)", async ({
      portfolioPage,
      fundsPage,
    }) => {
      await portfolioPage.holdingList.clickCurrencyByText(fiatCurrency);
      await portfolioPage.tradingButtons.transferFunds.click();
      await fundsPage.expectUrlContains(/funds/);
      await expectElementVisibility(fundsPage.transferFundsForm.el, true);
      await expectElementToHaveText(fundsPage.transferFundsForm.currency, fiatCurrency);
    });
  });
});
