import { test } from "../../po/pages";
import { configurationFundsMap } from "../../config";
import { expectElementVisibility } from "../../utils";

test.describe("Hidden Logic of Funds Page @jira(PWU-47)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
  });

  configurationFundsMap.forEach(({ testId, configOptions, accountOptions, tab }) => {
    test(`should disable the viewing of ${tab} tab @criticalPath @jira(BCTGWEBPWU-${testId})`, async ({
      api,
      fundsPage,
    }) => {
      await api.mockConfig(configOptions);
      await api.mockUser(accountOptions);
      await fundsPage.goto();
      await expectElementVisibility(fundsPage[tab].el, false);
    });
  });
});
