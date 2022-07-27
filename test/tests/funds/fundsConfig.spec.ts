import { test } from "../../po/pages";
import { configurationFundsMap } from "../../config";
import { expectElementVisibility } from "../../utils";

test.describe("Hidden Logic of Funds Page @jira(PWU-47)", () => {
  configurationFundsMap.forEach(
    ({ testId, configOptions, isTradeRestricted, isWithdrawalRestricted, isDepositRestricted, tab }) => {
      test(`should hide ${tab} tab @criticalPath ${testId})`, async ({ fundsPage }) => {
        await fundsPage.api.mockConfig(configOptions);
        await fundsPage.blockFundsOptions(isWithdrawalRestricted, isDepositRestricted, isTradeRestricted);
        await fundsPage.goto();
        await expectElementVisibility(fundsPage[tab].rootEl, false);
      });
    }
  );
});
