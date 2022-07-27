import { expectElementVisibility } from "../utils/expect";
import { test } from "../po/pages";
import { COLUMN_NAMES } from "../config/enums";

test.describe.parallel("Fees page", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });

  test("should have Payment Out fees table columns and rows @extended @jira(XRT-285)", async ({
    portfolioPage,
    feesPage,
  }) => {
    await portfolioPage.getQuickLink("fees").click();
    await expectElementVisibility(feesPage.getColumnByName("Payment Out Fee", COLUMN_NAMES.CURRENCY), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment Out Fee", COLUMN_NAMES.PAYMENT_OUT_VIA), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment Out Fee", COLUMN_NAMES.FEE), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment Out Fee", COLUMN_NAMES.MIN_PAYMENT_OUT), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment Out Fee", COLUMN_NAMES.MAX_PAYMENT_OUT), true);
    await expectElementVisibility(feesPage.getRowByName("Payment Out Fee", "Unverified"), true);
    await expectElementVisibility(feesPage.getRowByName("Payment Out Fee", "Verified"), true);
  });

  test("should have Payment In fees table columns and rows @extended @jira(XRT-284)", async ({
    portfolioPage,
    feesPage,
  }) => {
    await portfolioPage.getQuickLink("fees").click();
    await expectElementVisibility(feesPage.getColumnByName("Payment In Fee", COLUMN_NAMES.CURRENCY), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment In Fee", COLUMN_NAMES.PAYMENT_OUT_VIA), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment In Fee", COLUMN_NAMES.FEE), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment In Fee", COLUMN_NAMES.MIN_PAYMENT_OUT), true);
    await expectElementVisibility(feesPage.getColumnByName("Payment In Fee", COLUMN_NAMES.MAX_PAYMENT_OUT), true);
    await expectElementVisibility(feesPage.getRowByName("Payment In Fee", "Unverified"), true);
    await expectElementVisibility(feesPage.getRowByName("Payment In Fee", "Verified"), true);
  });
});
