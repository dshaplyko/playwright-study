import { test } from "../../po/pages";
import { configurationFundsMap } from "../../config";
import { expectElementVisibility } from "../../utils";

test.describe("Hidden Logic of Funds Page @jira(PWU-47)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
  });

  configurationFundsMap.forEach(({ testId, configOptions, accountOptions, tab }) => {
    test(`should disable the viewing of ${tab} tab @criticalPath ${testId})`, async ({ fundsPage }) => {
      await fundsPage.mockConfig(configOptions, accountOptions);
      await expectElementVisibility(fundsPage[tab].rootEl, false);
    });
  });
});
