import { test } from "../po/pages";
import { Logger } from "../logger/logger";
import {
  ACTIVITY_COLUMNS,
  COMPARE_CONDITIONS,
  reportDownloadMap,
  currenciesMap,
  presetDatesMap,
  REPORT_TYPES,
  TRANSACTION_FILTER_TYPES,
  CURRENCIES,
} from "../config";
import {
  expectElementVisibility,
  expectAllArrayItemsEqual,
  getDocAsJson,
  expectReportValid,
  expectElementToHaveText,
  expectElementEquality,
  expectNumbersComparison,
  expectGreaterThan,
  expectToBeGreaterOrEqual,
  calculateDateDifference,
  expectEnumContains,
  useState,
} from "../utils";
const logger = new Logger("Activities Test Suite");

test.describe.parallel("Activities Page @jira(PWU-25)", () => {
  useState("admin");
  test.beforeEach(async ({ activitiesPage }) => {
    await activitiesPage.goto();
    await activitiesPage.closeVerifyDialog();
  });

  test("should contain all needed elements @smoke @jira(BCTGWEBPWU-8) @jira(BCTGWEBPWU-11)", async ({
    activitiesPage,
  }) => {
    await expectElementVisibility(activitiesPage.buttonActivityFilter, true);
    await expectElementVisibility(activitiesPage.buttonGetHistoricalReports, true);
    await expectElementVisibility(activitiesPage.transactionActivity.el, true);
    await expectElementVisibility(activitiesPage.pagination.el, true);
  });

  test("Transaction Activity list should display all needed columns @smoke @jira(BCTGWEBPWU-9)", async ({
    activitiesPage,
  }) => {
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.METHOD, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.AMOUNT, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.CURRENCY, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.ACCOUNT_GROUP, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.GROUP_OWNER, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.FEE, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.DESCRIPTION, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.STATUS, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.INITIATED, true);
    await activitiesPage.transactionActivity.checkColumnVisibility(ACTIVITY_COLUMNS.INITIATED_BY, true);
  });

  test.describe("Historical Reports", () => {
    test("should open Get Historical Reports Modal @smoke @jira(BCTGWEBPWU-10)", async ({ activitiesPage }) => {
      await activitiesPage.buttonGetHistoricalReports.click();
      await expectElementVisibility(activitiesPage.historicalReports.el, true);
      await expectElementToHaveText(activitiesPage.historicalReports.title, "Get Historical Reports");
      await expectElementVisibility(activitiesPage.historicalReports.type.el, true);
      await expectElementVisibility(activitiesPage.historicalReports.currency.el, true);
      await expectElementVisibility(activitiesPage.historicalReports.buttonConfirm, true);
      await expectElementVisibility(activitiesPage.historicalReports.buttonCancel, true);
    });

    test("should contain proper Types for Historical Reports @criticalPath @jira(BCTGWEBPWU-12)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonGetHistoricalReports.click();
      await activitiesPage.historicalReports.type.click();
      const typeOptions: string[] = await activitiesPage.historicalReports.type.getOptionsText();
      expectEnumContains(typeOptions, REPORT_TYPES);
    });

    currenciesMap.forEach(({ id, type }) => {
      test(`should contain proper Currencies when Type = ${type} @criticalPath ${id} @jira(BCTGWEBPWU-13)`, async ({
        activitiesPage,
      }) => {
        await activitiesPage.buttonGetHistoricalReports.click();
        await activitiesPage.historicalReports.filterBy({
          option: "type",
          item: type,
        });
        await activitiesPage.historicalReports.currency.click();
        const currencyOptions: string[] = await activitiesPage.historicalReports.currency.getOptionsText();
        expectGreaterThan(currencyOptions.length, 1);
      });
    });

    test("should be able to close Historical Reports Modal @criticalPath @jira(BCTGWEBPWU-17)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonGetHistoricalReports.click();
      await activitiesPage.historicalReports.buttonCancel.click();
      await expectElementVisibility(activitiesPage.historicalReports.el, false);
    });

    reportDownloadMap.forEach(({ testId, type, field }) => {
      test(`should be able to download a report for ${type} @criticalPath ${testId}`, async ({ activitiesPage }) => {
        await activitiesPage.buttonGetHistoricalReports.click();
        await activitiesPage.historicalReports.dateFrom.selectPreviousDate("2015", "11");
        await activitiesPage.historicalReports.filterBy({
          option: "type",
          item: type,
        });
        await activitiesPage.historicalReports.filterBy({
          option: "currency",
          item: CURRENCIES.BTC,
        });

        const report = await getDocAsJson(activitiesPage.page, activitiesPage.historicalReports.buttonConfirm.click());
        const currency: string[] = report.map((item) => item[field]);
        expectAllArrayItemsEqual(currency, CURRENCIES.BTC);
        expectReportValid(type, report);
      });
    });
  });

  test.describe("Activity Filter", () => {
    test("should open Activity Filter @smoke @jira(BCTGWEBPWU-21)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, true);
      await expectElementToHaveText(activitiesPage.activityFilter.title, /Activity Filter/);
      await expectElementVisibility(activitiesPage.activityFilter.type.el, true);
      await expectElementVisibility(activitiesPage.activityFilter.currency.el, true);
      await expectElementVisibility(activitiesPage.activityFilter.status.el, true);
      await expectElementVisibility(activitiesPage.activityFilter.amountFrom, true);
      await expectElementVisibility(activitiesPage.activityFilter.amountTo, true);
      await expectElementVisibility(activitiesPage.activityFilter.dateFrom.el, true);
      await expectElementVisibility(activitiesPage.activityFilter.dateTo.el, true);
      await expectElementVisibility(activitiesPage.activityFilter.buttonCancel, true);
      await expectElementVisibility(activitiesPage.activityFilter.buttonConfirm, true);
      await expectElementVisibility(activitiesPage.activityFilter.buttonReset, true);
    });

    test("should reset data in the Activity filter @criticalPath @jira(BCTGWEBPWU-22)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      const randomType: string = await activitiesPage.activityFilter.type.chooseAndRememberRandomOption();
      const randomCurrency: string = await activitiesPage.activityFilter.currency.chooseAndRememberRandomOption();
      const randomStatus: string = await activitiesPage.activityFilter.status.chooseAndRememberRandomOption();
      logger.info(`Selected type is: ${randomType}`);
      logger.info(`Selected currency is: ${randomCurrency}`);
      logger.info(`Selected status is: ${randomStatus}`);
      await expectElementToHaveText(activitiesPage.activityFilter.type.el, randomType);
      await expectElementToHaveText(activitiesPage.activityFilter.currency.el, randomCurrency);
      await expectElementToHaveText(activitiesPage.activityFilter.status.el, randomStatus);

      await activitiesPage.activityFilter.buttonReset.click();
      await expectElementToHaveText(activitiesPage.activityFilter.type.el, "All");
      await expectElementToHaveText(activitiesPage.activityFilter.currency.el, "All");
      await expectElementToHaveText(activitiesPage.activityFilter.status.el, "All");
    });

    test("should be able to close Activity filter by clicking Cancel button @criticalPath @jira(BCTGWEBPWU-23)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonActivityFilter.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, true);

      await activitiesPage.activityFilter.buttonCancel.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, false);
    });

    test("should be able to close Activity filter by clicking Confirm button @criticalPath @jira(BCTGWEBPWU-24)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonActivityFilter.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, true);

      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, false);
    });

    test("Type/Currency/Status Filters should have proper options in Activity Filter @criticalPath @jira(BCTGWEBPWU-25) @jira(BCTGWEBPWU-26) @jira(BCTGWEBPWU-27)", async ({
      api,
      activitiesPage,
    }) => {
      const { types, currencies, statuses } = await api.getFiltersFromResponse(
        activitiesPage.buttonActivityFilter.click()
      );

      await activitiesPage.activityFilter.type.click();
      expectElementEquality(await activitiesPage.activityFilter.type.getOptionsText(), types);

      await activitiesPage.pressEscape();
      await activitiesPage.activityFilter.currency.click();
      expectElementEquality(await activitiesPage.activityFilter.currency.getOptionsText(), currencies);

      await activitiesPage.pressEscape();
      await activitiesPage.activityFilter.status.click();
      expectElementEquality(await activitiesPage.activityFilter.status.getOptionsText(), statuses);
    });

    test("should be able to filter by Currency @criticalPath @jira(BCTGWEBPWU-28)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      const randomCurrency: string = await activitiesPage.activityFilter.currency.chooseAndRememberRandomOption();
      logger.info(`Selected currency is: ${randomCurrency}`);
      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, false);

      const currencies: string[] = await activitiesPage.transactionActivity.getColumnText(ACTIVITY_COLUMNS.CURRENCY);
      expectAllArrayItemsEqual(currencies, randomCurrency);
    });

    test("should be able to filter by Status @criticalPath @jira(BCTGWEBPWU-29)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      await activitiesPage.activityFilter.status.selectByText("Processed");
      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, false);

      const statuses: string[] = await activitiesPage.transactionActivity.getColumnText(ACTIVITY_COLUMNS.STATUS);
      expectAllArrayItemsEqual(statuses, "Processed");
    });

    test("should be able to filter by Type @criticalPath @jira(BCTGWEBPWU-30)", async ({ activitiesPage }) => {
      const methodMap = {
        iRFQ: ["RFQ Order Filled"],
        "Payment Out": ["Digital Asset Transfer", "Payment Out"],
        "Payment In": ["Digital Asset Transfer", "Payment In"],
        Trade: ["Order Filled"],
      };
      await activitiesPage.buttonActivityFilter.click();
      const randomType: string = await activitiesPage.activityFilter.type.chooseAndRememberRandomOption();
      logger.info(`Selected type is: ${randomType}`);
      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.el, false);
      if (
        await activitiesPage.noResultsLabel.isVisible({
          delay: true,
        })
      ) {
        test.skip();
      }
      const methods: string[] = await activitiesPage.transactionActivity.getColumnText(ACTIVITY_COLUMNS.METHOD);
      expectAllArrayItemsEqual(methods, methodMap[randomType][0]);
    });

    test("should be able to filter by Amount @criticalPath @jira(BCTGWEBPWU-31)", async ({ activitiesPage }) => {
      const amountFrom = 1;
      const amountTo = 10;

      await activitiesPage.buttonActivityFilter.click();
      await activitiesPage.activityFilter.amountFrom.type(amountFrom.toString());
      await activitiesPage.activityFilter.amountTo.type(amountTo.toString());
      await activitiesPage.activityFilter.buttonConfirm.click();
      const amount: string[] = await activitiesPage.transactionActivity.getColumnText(ACTIVITY_COLUMNS.AMOUNT);
      expectNumbersComparison(amount, amountFrom, COMPARE_CONDITIONS.MORE);
      expectNumbersComparison(amount, amountTo, COMPARE_CONDITIONS.LESS);
    });

    presetDatesMap.forEach(({ period, option, difference }) => {
      test(`should pre-set report period properly for ${period} @extended @jira(BCTGWEBPWU-32)`, async ({
        activitiesPage,
      }) => {
        await activitiesPage.buttonActivityFilter.click();
        await activitiesPage.activityFilter.presetPeriodButtons.nth(option).click();
        const dateFrom = await activitiesPage.activityFilter.dateFrom.input.convertValueToDate();
        const dateTo = await activitiesPage.activityFilter.dateTo.input.convertValueToDate();
        expectToBeGreaterOrEqual(calculateDateDifference(dateFrom, dateTo), difference);
      });
    });

    test("should copy Wallet Address to the clipboard @criticalPath @jira(BCTGWEBPWU-33)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.allowClipboardPermissions();
      await activitiesPage.buttonActivityFilter.click();
      await activitiesPage.activityFilter.filterBy({
        option: "type",
        item: TRANSACTION_FILTER_TYPES.Deposit,
      });
      await activitiesPage.activityFilter.buttonConfirm.click();
      await activitiesPage.transactionActivity.selectWalletAddress(1).click();
      await expectElementVisibility(activitiesPage.textCopied.el, true);

      const walletAddress: string = await activitiesPage.transactionActivity.selectWalletAddress(1).innerText();
      expectElementEquality(walletAddress, await activitiesPage.getClipboardText());
    });
  });
});
