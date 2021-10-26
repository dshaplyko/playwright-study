import { Page } from "@playwright/test";
import {
  loginRequestBody, SG_CONFIG, SG_USER,
} from "../config";

export class Api {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginViaApi(baseUrl: string) {
    await this.page.goto("/user");
    const response: any = await this.page.request.post(`${baseUrl}/moon/v1/login`, {
      data: JSON.stringify(loginRequestBody),
    });
    const json: any = await response.json();
    await this.page.request.post(`${baseUrl}/moon/v1/login`, {
      data: JSON.stringify(loginRequestBody),
    });
    await this.page.evaluate(`window.localStorage.setItem('authToken', '${json.authToken}')`);
    await this.page.goto("/portfolio");
    await this.page.waitForURL(/portfolio/, {
      waitUntil: "domcontentloaded",
    });
  }

  async mockConfig(config: any): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_CONFIG));

    body.features = {
      ...body.features,
      ...config.features,
    };

    body.features.portfolio = {
      ...body.features.portfolio,
      ...config.portfolio,
    };

    body.features.leverage = {
      ...body.features.leverage,
      ...config.leverage,
    };

    await this.page.route("**/config*", route => {
      route.fulfill({
        body: JSON.stringify(body),
      });
    });
  }

  async mockUser(config: any): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_USER));

    body.data = {
      ...body.data,
      ...config,
    };

    await this.page.route("**/account*", route => {
      route.fulfill({
        body: JSON.stringify(body),
      });
    });
  }
}
