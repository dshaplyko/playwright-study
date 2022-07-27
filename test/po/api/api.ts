import { Page } from "@playwright/test";
import { SG_CONFIG, SG_USER, SG_NEXT_STEPS, URLs, SG_CURRENT, ACCOUNTS } from "../../config";
import { Logger } from "../../logger/logger";
const logger = new Logger("API requests");

export class Api {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async useConfig<T>(config: T, url: URLs = URLs.CONFIG): Promise<void> {
    if (config !== null) {
      await this.page.route(url, (route) => {
        route.fulfill({
          body: JSON.stringify(config),
        });
      });
    }
  }

  async mockInitialUrl(url: string): Promise<void> {
    const mockData = JSON.parse(JSON.stringify(SG_CONFIG));
    mockData.site.user.initialUrl = url;
    logger.debug(JSON.stringify(mockData.site.user.initialUrl));
    await this.mockData(mockData, URLs.CONFIG);
  }

  async mockBasketData<T extends typeof SG_CONFIG.features.simpleTrade.basket.enabled>(option: T): Promise<void> {
    const mockData = { ...SG_CONFIG };
    mockData.features.simpleTrade.basket.enabled = option;
    logger.debug(JSON.stringify(mockData.features.simpleTrade.basket));
    await this.useConfig(mockData);
  }

  async mockSiteData<T extends typeof SG_CONFIG.site.siteMaintenance | typeof SG_CONFIG.site>(
    config: T
  ): Promise<void> {
    const mockData = { ...SG_CONFIG };
    mockData.site = {
      ...mockData.site,
      ...config,
    };
    logger.debug(JSON.stringify(mockData.site));
    await this.useConfig(mockData);
  }

  async mockVerifyData(config: { personalEnabled: boolean; companyEnabled: boolean }): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_CONFIG));

    body.features.verify = {
      ...body.features.verify,
      ...config,
    };

    logger.debug(JSON.stringify(body.features.verify));
    await this.useConfig(body);
  }

  async mock2FAData(config: { enabled: boolean; showDisableButton: boolean }): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_CONFIG));

    body.features.enforcement.twofa = { ...config };
    logger.debug(JSON.stringify(body.features.enforcement.twofa));
    await this.useConfig(body);
  }

  async mockMandatory2FA<T extends typeof SG_CONFIG.features.security.twoFactor.mandatory>(option: T): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_CONFIG));

    body.features.security.twoFactor.mandatory = option;
    logger.debug(JSON.stringify(body.features.security.twoFactor));
    await this.useConfig(body);
  }

  async mockSecurityOptions(isOtpEnabled: boolean, isYubikeyEnabled: boolean): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_CONFIG));

    body.features.settings.security.otp.enabled = isOtpEnabled;
    body.features.settings.security.yubikey.enabled = isYubikeyEnabled;
    logger.debug(JSON.stringify(body.features.settings.security));
    await this.useConfig(body);
  }

  async mockFeaturesSiteData(obj: {
    isEnabled: boolean;
    isMaitenanceBannerDisplayed: boolean;
    isDisplayedUnsettled: boolean;
  }): Promise<void> {
    const mockData = JSON.parse(JSON.stringify(SG_CONFIG)) as typeof SG_CONFIG;

    mockData.features.site.enabled = obj.isEnabled;
    mockData.features.site.maintenanceBanner.enabled = obj.isMaitenanceBannerDisplayed;
    mockData.features.site.displayUnsettled.enabled = obj.isDisplayedUnsettled;

    logger.debug(JSON.stringify(mockData.features.site));
    await this.useConfig(mockData);
  }

  async mockConfig(config: any): Promise<void> {
    const body = JSON.parse(JSON.stringify(SG_CONFIG));

    body.features = {
      ...body.features,
      ...config.features,
    };

    body.features.leverage = {
      ...body.features.leverage,
      ...config.leverage,
    };

    body.features.portfolio = {
      ...body.features.portfolio,
      ...config.portfolio,
    };

    logger.debug(JSON.stringify(body.features));
    await this.useConfig(body);
  }

  async mockUser<T>(config: T): Promise<void> {
    const body = { ...SG_USER };

    body.data = {
      ...body.data,
      ...config,
    };
    logger.debug(JSON.stringify(body.data));
    await this.useConfig(body, URLs.ACCOUNT);
  }

  async mockCurrent<T extends typeof SG_CURRENT.accountGroupsData.accountGroups>(
    config: T,
    numberOfGroups: number
  ): Promise<void> {
    const body = { ...SG_CURRENT };

    body.data = [ACCOUNTS];
    body.accountGroupsData.accountGroups = config;
    body.accountGroupsData.totalAccountGroups = numberOfGroups;
    logger.debug(JSON.stringify(body.accountGroupsData));
    await this.useConfig(body, URLs.CURRENT);
  }

  async mockNextSteps<T extends typeof SG_NEXT_STEPS.data.items>(config: T): Promise<void> {
    const body = { ...SG_NEXT_STEPS };
    body.data.items = config;
    logger.debug(JSON.stringify(body.data.items));
    await this.useConfig(body, URLs.NEXT_STEPS);
  }

  mockData<T>(config: T, url: URLs): Promise<void> {
    return this.useConfig(config, url);
  }

  async emulateNetworkError<T>(config: T, url: URLs, error = 400): Promise<void> {
    await this.page.route(url, (route) => {
      route.fulfill({
        status: error,
        body: JSON.stringify(config),
      });
    });
  }

  async unroute(url: URLs): Promise<void> {
    await this.page.unroute(url);
  }

  async unroutAll(): Promise<void> {
    for (const url in URLs) {
      if ({}.hasOwnProperty.call(url, URLs)) {
        await this.unroute(URLs[url]);
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
