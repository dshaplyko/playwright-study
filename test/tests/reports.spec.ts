import { test } from "../po/pages";
import { expectElementToHaveText, expectElementVisibility } from "../utils";
import { CURRENCIES, REPORT_FORM, reportsPageMap, NO_REPORT_MESSAGE } from "../config";

test.describe.parallel("Reports Page @jira(PWU-263)", () => {
  test("should open Reports Page @smoke @jira(XRT-325)", async ({ reportsPage }) => {
    await reportsPage.goto();
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRANSACTION).rootEl, true);
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRADE).rootEl, true);
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRANSFER_FUNDS).rootEl, true);
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.BUY_SELL).rootEl, true);
  });

  reportsPageMap.forEach(({ name, form, field, type }) => {
    test(name, async ({ reportsPage }) => {
      await reportsPage.goto();
      await reportsPage.getReportForm(form).dateFrom.selectPreviousDate("2015", "11");
      await reportsPage.getReportForm(form).dateTo.selectCurrentDay();
      await reportsPage.getReportForm(form).currencyList.clickByText(CURRENCIES.BTC);
      await reportsPage.checkReport(reportsPage.getReportForm(form).exportButton.click(), field, type);
    });
  });

  test("should display error message when there is no report @extended @jira(XRT-329)", async ({ reportsPage }) => {
    await reportsPage.goto();
    await reportsPage.getReportForm(REPORT_FORM.TRANSFER_FUNDS).dateFrom.selectCurrentDay();
    await reportsPage.getReportForm(REPORT_FORM.TRANSFER_FUNDS).dateTo.selectCurrentDay();
    await reportsPage.getReportForm(REPORT_FORM.TRANSFER_FUNDS).exportButton.click();
    await expectElementVisibility(reportsPage.getReportForm(REPORT_FORM.TRANSFER_FUNDS).errorMessage, true);
    await expectElementToHaveText(
      reportsPage.getReportForm(REPORT_FORM.TRANSFER_FUNDS).errorMessage,
      NO_REPORT_MESSAGE
    );
  });

  test("should turn off reports feature @extended @jira(XRT-521)", async ({ reportsPage, portfolioPage }) => {
    await reportsPage.enablePage(false);
    await portfolioPage.goto();
    await portfolioPage.header.profileButton.click();
    await expectElementVisibility(portfolioPage.profile.reportsLink, false);
  });
});
