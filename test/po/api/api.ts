import { Page } from "@playwright/test";
import { SG_CONFIG, SG_USER, SG_NEXT_STEPS, URLs, SG_CURRENT, ACCOUNTS } from "../../config";
import { Logger } from "../../logger/logger";
const logger = new Logger("API requests");

export class Api {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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

    body.features.simpleTrade.basket = {
      ...body.features.simpleTrade.basket,
      ...config.basket,
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

  async mockCurrent(config: any): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_CURRENT));

    body.accountGroupsData = {
      ...body.accountGroupsData,
      ...config,
    };
    body.data = [ACCOUNTS];
    logger.debug(JSON.stringify(body));
    await this.useConfig(body, URLs.CURRENT);
  }

  async mockNextSteps(config: any): Promise<void> {
    const body = { ...SG_NEXT_STEPS };

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

  async unrout(url: URLs): Promise<void> {
    await this.page.unroute(url);
  }

  async unroutAll(): Promise<void> {
    for (const url in URLs) {
      if ({}.hasOwnProperty.call(url, URLs)) {
        await this.page.unroute(URLs[url]);
      }
    }
  }

  async getResponseBody(request: string, action: Promise<void>): Promise<any> {
    try {
      const [response] = await Promise.all([
        this.page.waitForResponse((response) => response.url().includes(request), {
          timeout: 10000,
        }),
        action,
      ]);
      return response.json();
    } catch (e) {
      throw new Error(`The ${request} request has not been intercepted`);
    }
  }
}
