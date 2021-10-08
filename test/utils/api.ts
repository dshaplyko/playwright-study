import { BrowserContext, Page, FetchResponse } from "@playwright/test";
import { loginRequestBody } from "../config/constants";

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

  async loginViaApi() {
    await this.page.goto("/user");
    const response: FetchResponse = await this.page._request.post("", {
      timeout: 10000,
      data: JSON.stringify(loginRequestBody),
    });
    await this.page._request.post("", {
      timeout: 10000,
      data: JSON.stringify(loginRequestBody),
    });
    const json: any = await response.json();
    await this.page.evaluate(`window.localStorage.setItem('authToken', '${json.authToken}')`);
  }
}
