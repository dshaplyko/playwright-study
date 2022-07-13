import { chromium, FullConfig } from "@playwright/test";
import { FundsPage } from "./test/po/pages/Funds.page";

async function globalTeardown(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({
    ignoreHTTPSErrors: true,
    storageState: storageState,
  });
  const fundsPage = new FundsPage(page);
  await fundsPage.makeTransferBTC(25);
  await browser.close();
}

export default globalTeardown;
