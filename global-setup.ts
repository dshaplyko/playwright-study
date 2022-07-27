import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "./test/po/pages/Login.page";

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage({
    ignoreHTTPSErrors: true,
  });
  const loginPage = new LoginPage(page);

  await loginPage.loginAsTrader();
  await page.context().storageState({
    path: storageState as string,
  });
  await loginPage.page.context().clearCookies();
  await loginPage.loginAsUser();
  await page.context().storageState({
    path: "./test/config/states/trader.json",
  });
  await browser.close();
}

export default globalSetup;
