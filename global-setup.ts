import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "./test/po/pages/Login.page";

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({
    ignoreHTTPSErrors: true,
  });
  const loginPage = new LoginPage(page);

  await loginPage.loginAsTrader();
  await page.context().storageState({
    path: storageState as string,
  });
  await browser.close();
}

export default globalSetup;
