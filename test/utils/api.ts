import {
  BrowserContext, Page, FetchResponse,
} from "@playwright/test";
import {
  loginRequestBody, SG_CONFIG, SG_USER,
} from "../config";
const API_TIMEOUT = 10000;

export class Api {
  readonly context: BrowserContext;

  readonly page: Page;

  constructor(context: BrowserContext, page: Page) {
    this.context = context;
    this.page = page;
  }

  getCookie() {
    return this.context.cookies();
  }

  async loginViaApi(baseUrl: string) {
    await this.page.goto("/user");
    const response: FetchResponse = await this.page._request.post(`${baseUrl}/moon/v1/login`, {
      timeout: API_TIMEOUT,
      data: JSON.stringify(loginRequestBody),
    });
    const json: any = await response.json();
    await this.page.evaluate(`window.localStorage.setItem('authToken', '${json.authToken}')`);
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
