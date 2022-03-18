import { test } from "../po/pages";
import {
  expectAllArrayItemsEqual,
  expectElementToHaveText,
  expectElementVisibility,
  expectReportValid,
  getDocAsJson,
  useState,
} from "../utils";
import { Logger } from "../logger/logger";
import { CURRENCIES, REPORT_FORM, reportsPageMap, NO_REPORT_MESSAGE } from "../config";
const logger = new Logger("Reports Page Test Suite");

test.describe.parallel("Reports Page @jira(PWU-263)", () => {
  useState("admin");
  test("should open Reports Page @smoke @jira(BCTGWEBPWU-977)", async ({ reportsPage }) => {
    await reportsPage.goto();
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRANSACTION).el, true);
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRADE).el, true);
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRANSFER_FUNDS).el, true);
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.BUY_SELL).el, true);
  });

  reportsPageMap.forEach(({ name, form, field, type }) => {
    test(name, async ({ reportsPage }) => {
      await reportsPage.goto();
      await reportsPage.getReportForm(form).dateFrom.selectPreviousDate("2015", "11");
      await reportsPage.getReportForm(form).dateTo.selectCurrentDay();
      await reportsPage.getReportForm(form).currencyList.selectByText(CURRENCIES.BTC);

      const report = await getDocAsJson(reportsPage.page, reportsPage.getReportForm(form).exportButton.click());
      logger.debug(`Report for ${REPORT_FORM}: ${JSON.stringify(report)}`);

      const currency: string[] = report.map((item) => item[field]);
      expectAllArrayItemsEqual(currency, CURRENCIES.BTC);
      expectReportValid(type, report);
    });
  });

  test("should display error message when there is no report @extended @jira(BCTGWEBPWU-982)", async ({
    reportsPage,
  }) => {
    await reportsPage.goto();
    await reportsPage.getReportForm(REPORT_FORM.TRANSACTION).dateFrom.selectCurrentDay();
    await reportsPage.getReportForm(REPORT_FORM.TRANSACTION).exportButton.click();
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRANSACTION).errorMessage, true);
    await expectElementToHaveText(reportsPage.getReportForm(REPORT_FORM.TRANSACTION).errorMessage, NO_REPORT_MESSAGE);
  });
});
