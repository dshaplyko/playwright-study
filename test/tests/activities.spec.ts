import { test } from "../po/pages";
import {
  ACTIVITY_COLUMNS_NAMES,
  COMPARE_CONDITIONS,
  reportDownloadMap,
  currenciesMap,
  presetDatesMap,
  REPORT_TYPES,
  TRANSACTION_FILTER_TYPES,
  CURRENCIES,
  NO_REPORT_MESSAGE,
} from "../config";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectNumbersComparison,
  calculateDateDifference,
  expectElementToContainText,
} from "../utils";

test.describe.parallel("Activities Page @jira(PWU-25)", () => {
  test.beforeEach(async ({ activitiesPage }) => {
    await activitiesPage.goto();
  });

  test("should contain all needed elements @smoke @jira(XRT-106) @jira(XRT-109)", async ({ activitiesPage }) => {
    await expectElementVisibility(activitiesPage.buttonActivityFilter, true);
    await expectElementVisibility(activitiesPage.buttonGetHistoricalReports, true);
    await expectElementVisibility(activitiesPage.transactionActivity.rootEl, true);
    await expectElementVisibility(activitiesPage.pagination.rootEl, true);
  });

  test("Transaction Activity list should display all needed columns @smoke @jira(XRT-107)", async ({
    activitiesPage,
  }) => {
    await activitiesPage.checkActivitiesColumnsVisibility(true);
  });

  test.describe("Historical Reports", () => {
    test("should open Get Historical Reports Modal @smoke @jira(XRT-108)", async ({ activitiesPage }) => {
      await activitiesPage.buttonGetHistoricalReports.click();
      await expectElementVisibility(activitiesPage.historicalReports.rootEl, true);
      await expectElementToHaveText(activitiesPage.historicalReports.title, "Get Historical Reports");
      await expectElementVisibility(activitiesPage.historicalReports.type.rootEl, true);
      await expectElementVisibility(activitiesPage.historicalReports.currency.rootEl, true);
      await expectElementVisibility(activitiesPage.historicalReports.buttonConfirm, true);
      await expectElementVisibility(activitiesPage.historicalReports.buttonCancel, true);
    });

    test("should contain proper Types for Historical Reports @criticalPath @jira(XRT-110)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonGetHistoricalReports.click();
      await activitiesPage.historicalReports.type.click();
      await expectElementToContainText(activitiesPage.historicalReports.type.options, ["Transaction", "Trade", "iRFQ"]);
    });

    currenciesMap.forEach(({ id, type }) => {
      test(`should contain proper Currencies when Type = ${type} @criticalPath ${id} @jira(XRT-111)`, async ({
        activitiesPage,
      }) => {
        await activitiesPage.buttonGetHistoricalReports.click();
        await activitiesPage.historicalReports.filterBy("type", type);
        await activitiesPage.historicalReports.currency.click();
        const currencyOptions = await activitiesPage.historicalReports.currency.options.count();
        expectNumbersComparison(currencyOptions, 1, COMPARE_CONDITIONS.MORE);
      });
    });

    test("should be able to close Historical Reports Modal @criticalPath @jira(XRT-115)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonGetHistoricalReports.click();
      await activitiesPage.historicalReports.buttonCancel.click();
      await expectElementVisibility(activitiesPage.historicalReports.rootEl, false);
    });

    reportDownloadMap.forEach(({ testId, type, field }) => {
      test(`should be able to download a report for ${type} @criticalPath ${testId}`, async ({ activitiesPage }) => {
        await activitiesPage.buttonGetHistoricalReports.click();
        await activitiesPage.historicalReports.dateFrom.selectPreviousDate("2015", "11");
        await activitiesPage.historicalReports.filterBy("type", type);
        await activitiesPage.historicalReports.filterBy("currency", CURRENCIES.BTC);
        await activitiesPage.checkReport(activitiesPage.historicalReports.buttonConfirm.click(), field, type);
      });
    });

    test("should display a message when there is no data to report @extended @jira(XRT-528)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonGetHistoricalReports.click();
      await activitiesPage.historicalReports.dateFrom.selectPreviousDate("2015", "11");
      await activitiesPage.historicalReports.dateTo.selectPreviousDate("2016", "11");
      await activitiesPage.historicalReports.filterBy("type", REPORT_TYPES.TRANSACTION);
      await activitiesPage.historicalReports.filterBy("currency", CURRENCIES.BTC);
      await activitiesPage.historicalReports.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.historicalReports.activitiesModalError, true);
      await expectElementToHaveText(activitiesPage.historicalReports.activitiesModalError, NO_REPORT_MESSAGE);
    });
  });

  test.describe("Activity Filter", () => {
    test("should open Activity Filter @smoke @jira(XRT-119)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, true);
      await expectElementToHaveText(activitiesPage.activityFilter.title, /Activity Filter/);
      await expectElementVisibility(activitiesPage.activityFilter.type.rootEl, true);
      await expectElementVisibility(activitiesPage.activityFilter.currency.rootEl, true);
      await expectElementVisibility(activitiesPage.activityFilter.status.rootEl, true);
      await expectElementVisibility(activitiesPage.activityFilter.amountFrom, true);
      await expectElementVisibility(activitiesPage.activityFilter.amountTo, true);
      await expectElementVisibility(activitiesPage.activityFilter.dateFrom.rootEl, true);
      await expectElementVisibility(activitiesPage.activityFilter.dateTo.rootEl, true);
      await expectElementVisibility(activitiesPage.activityFilter.buttonCancel, true);
      await expectElementVisibility(activitiesPage.activityFilter.buttonConfirm, true);
      await expectElementVisibility(activitiesPage.activityFilter.buttonReset, true);
    });

    test("should reset data in the Activity filter @criticalPath @jira(XRT-120)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      const { randomType, randomCurrency, randomStatus } = await activitiesPage.activityFilter.chooseRandomOptions(
        "type",
        "currency",
        "status"
      );
      await expectElementToHaveText(activitiesPage.activityFilter.type.rootEl, randomType);
      await expectElementToHaveText(activitiesPage.activityFilter.currency.rootEl, randomCurrency);
      await expectElementToHaveText(activitiesPage.activityFilter.status.rootEl, randomStatus);

      await activitiesPage.activityFilter.buttonReset.click();
      await expectElementToHaveText(activitiesPage.activityFilter.type.rootEl, "All");
      await expectElementToHaveText(activitiesPage.activityFilter.currency.rootEl, "All");
      await expectElementToHaveText(activitiesPage.activityFilter.status.rootEl, "All");
    });

    test("should be able to close Activity filter by clicking Cancel button @criticalPath @jira(XRT-121)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonActivityFilter.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, true);

      await activitiesPage.activityFilter.buttonCancel.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, false);
    });

    test("should be able to close Activity filter by clicking Confirm button @criticalPath @jira(XRT-122)", async ({
      activitiesPage,
    }) => {
      await activitiesPage.buttonActivityFilter.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, true);

      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, false);
    });

    test("Type/Currency/Status Filters should have proper options in Activity Filter @criticalPath @jira(XRT-123) @jira(XRT-124) @jira(XRT-125)", async ({
      activitiesPage,
    }) => {
      const { types, currencies, statuses } = await activitiesPage.getFiltersFromResponse(
        activitiesPage.buttonActivityFilter.click()
      );

      await activitiesPage.activityFilter.type.click();
      await expectElementToContainText(activitiesPage.activityFilter.type.options, types);

      await activitiesPage.pressEscape();
      await activitiesPage.activityFilter.currency.click();
      await expectElementToContainText(activitiesPage.activityFilter.currency.options, currencies);

      await activitiesPage.pressEscape();
      await activitiesPage.activityFilter.status.click();
      await expectElementToContainText(activitiesPage.activityFilter.status.options, statuses);
    });

    test("should be able to filter by Currency @criticalPath @jira(XRT-126)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      const { randomCurrency } = await activitiesPage.activityFilter.chooseRandomOptions(null, "currency", null);
      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, false);
      await expectElementToContainText(activitiesPage.transactionActivity.getColumn(ACTIVITY_COLUMNS_NAMES.CURRENCY), [
        randomCurrency,
      ]);
    });

    test("should be able to filter by Status @criticalPath @jira(XRT-127)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      await activitiesPage.activityFilter.status.clickByText("Processed");
      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, false);
      await expectElementToContainText(activitiesPage.transactionActivity.getColumn(ACTIVITY_COLUMNS_NAMES.STATUS), [
        "Processed",
      ]);
    });

    test("should be able to filter by Type @criticalPath @jira(XRT-128)", async ({ activitiesPage }) => {
      await activitiesPage.buttonActivityFilter.click();
      const { randomType } = await activitiesPage.activityFilter.chooseRandomOptions("type", null, null);

      await activitiesPage.activityFilter.buttonConfirm.click();
      await expectElementVisibility(activitiesPage.activityFilter.rootEl, false);

      await activitiesPage.checkNoResultsLabel();
      await activitiesPage.checkTransactionTypes(randomType);
    });

    test("should be able to filter by Amount @criticalPath @jira(XRT-129)", async ({ activitiesPage }) => {
      const amountFrom = 1;
      const amountTo = 10;

      await activitiesPage.buttonActivityFilter.click();
      await activitiesPage.activityFilter.amountFrom.type(amountFrom.toString());
      await activitiesPage.activityFilter.amountTo.type(amountTo.toString());
      await activitiesPage.activityFilter.buttonConfirm.click();
      const amount: string[] = await activitiesPage.transactionActivity.getColumnText(ACTIVITY_COLUMNS_NAMES.AMOUNT);
      expectNumbersComparison(amount, amountFrom, COMPARE_CONDITIONS.MORE_OR_EQUAL);
      expectNumbersComparison(amount, amountTo, COMPARE_CONDITIONS.LESS);
    });

    presetDatesMap.forEach(({ period, option, difference }) => {
      test(`should pre-set report period properly for ${period} @extended @jira(XRT-130)`, async ({
        activitiesPage,
      }) => {
        await activitiesPage.buttonActivityFilter.click();
        await activitiesPage.activityFilter.presetPeriodButtons.nth(option).click();
        const dateFrom = await activitiesPage.activityFilter.dateFrom.input.convertValueToDate();
        const dateTo = await activitiesPage.activityFilter.dateTo.input.convertValueToDate();
        expectNumbersComparison(
          calculateDateDifference(dateFrom, dateTo),
          difference,
          COMPARE_CONDITIONS.MORE_OR_EQUAL
        );
      });
    });

    test("should copy Wallet Address to the clipboard @criticalPath @jira(XRT-131)", async ({ activitiesPage }) => {
      await activitiesPage.allowClipboardPermissions();
      await activitiesPage.buttonActivityFilter.click();
      await activitiesPage.activityFilter.filterBy("type", TRANSACTION_FILTER_TYPES.Deposit);
      await activitiesPage.activityFilter.buttonConfirm.click();
      await activitiesPage.transactionActivity.selectWalletAddress(1).click();
      await activitiesPage.checkTooltip();
      await expectElementToHaveText(
        activitiesPage.transactionActivity.selectWalletAddress(1),
        await activitiesPage.getClipboardText()
      );
    });

    test("should hide activities page @extended @jira(XRT-522)", async ({ portfolioPage, activitiesPage }) => {
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.header.activitiesLink, true);

      await activitiesPage.hideFeatures(false);
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.header.activitiesLink, false);
    });

    test("should hide activity filter @extended @jira(XRT-523)", async ({ activitiesPage }) => {
      await activitiesPage.goto();
      await expectElementVisibility(activitiesPage.buttonActivityFilter, true);

      await activitiesPage.hideFeatures(true, false);
      await activitiesPage.goto();
      await expectElementVisibility(activitiesPage.buttonActivityFilter, false);
    });
  });
});
