import { Page } from "@playwright/test";
import {
  loginRequestBody,
  SG_CONFIG,
  SG_USER,
  SG_NEXT_STEPS,
  BASE_URL,
  TRANSACTION_FILTER_TYPES,
  TRANSACTION_STATUSES,
  URLs,
  TWO_FA_DATA,
} from "../../config";
import { Logger } from "../../logger/logger";
const logger = new Logger("API requests");

export class Api {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginViaApi() {
    await this.page.goto("/user");
    const response: any = await this.page.request.post(`${BASE_URL}/moon/v1/login`, {
      data: JSON.stringify(loginRequestBody),
    });
    const { authToken }: any = await response.json();
    logger.debug(authToken);
    await this.page.request.post(`${BASE_URL}/moon/v1/login`, {
      data: JSON.stringify(loginRequestBody),
    });
    await this.page.evaluate(`window.localStorage.setItem('authToken', '${authToken}')`);
    await this.page.goto("/portfolio");
    await this.page.waitForURL(/portfolio/, {
      waitUntil: "domcontentloaded",
    });
  }

  async useConfig(config: any, url: URLs = URLs.CONFIG): Promise<void> {
    if (config !== null) {
      await this.page.route(url, (route) => {
        route.fulfill({
          body: JSON.stringify(config),
        });
      });
    }
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

    body.features.site = {
      ...body.features.site,
      ...config.site,
    };

    body.features.verify = {
      ...body.features.verify,
      ...config.verify,
    };

    body.site = {
      ...body.site,
      ...config.site,
    };

    body.features.settings.security = {
      ...body.features.settings.security,
      ...config.security,
    };

    body.features.security.twoFactor = {
      ...body.features.security.twoFactor,
      ...config.twoFactor,
    };

    body.features.enforcement.twofa = {
      ...body.features.enforcement.twofa,
      ...config.twofa,
    };

    logger.debug(JSON.stringify(body));
    await this.useConfig(body);
  }

  async mockUser(config: any): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_USER));

    body.data = {
      ...body.data,
      ...config,
    };
    logger.debug(JSON.stringify(body));
    await this.useConfig(body, URLs.ACCOUNT);
  }

  async mockNextSteps(config: any): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_NEXT_STEPS));

    body.data = {
      ...body.data,
      ...config,
    };
    logger.debug(JSON.stringify(body));
    await this.useConfig(body, URLs.NEXT_STEPS);
  }

  mockData(config: any, url: URLs): Promise<void> {
    return this.useConfig(config, url);
  }

  async emulateNetworkError(config: any, url: URLs, error = 400): Promise<void> {
    await this.page.route(url, (route) => {
      route.fulfill({
        status: error,
        body: JSON.stringify(config),
      });
    });
  }

  async mock2FAresponse(config: any): Promise<void> {
    const body = JSON.parse(JSON.stringify(TWO_FA_DATA));

    body.twoFactor.actions = config;
    await this.page.route(URLs.LOGIN, (route) => {
      route.fulfill({
        status: 401,
        body: JSON.stringify(body),
      });
    });
  }

  async showTwoFA(enabled: boolean, showDisableButton = true): Promise<void> {
    const data = {
      twofa: {
        enabled,
        showDisableButton,
      },
    };

    return this.mockConfig(data);
  }

  async unrout(url: URLs): Promise<void> {
    await this.page.unroute(url);
  }

  async unroutAll(): Promise<void> {
    Object.values(URLs).forEach(async (value) => {
      await this.page.unroute(value);
    });
  }

  async getResponseBody(request: string, action: Promise<void>): Promise<any> {
    try {
      const [Response] = await Promise.all([
        this.page.waitForResponse((response) => response.url().includes(request), {
          timeout: 10000,
        }),
        action,
      ]);
      return Response.json();
    } catch (e) {
      throw new Error(`The ${request} request has not been intercepted`);
    }
  }

  async getFiltersFromResponse(action: Promise<void>): Promise<{
    types: string[];
    currencies: string[];
    statuses: string[];
  }> {
    const { types, statuses, currencies } = await this.getResponseBody("filters", action);
    logger.debug(
      JSON.stringify({
        types,
        statuses,
        currencies,
      })
    );
    return {
      types: types.map((item: string) => TRANSACTION_FILTER_TYPES[item]),
      currencies,
      statuses: statuses.map((item: string) => TRANSACTION_STATUSES[item]),
    };
  }
}
