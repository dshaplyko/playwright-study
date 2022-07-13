import { Page, Locator } from "@playwright/test";
import { Block } from "../components/settings/block.component";
import {
  SETTINGS_TABS,
  TIMEZONES,
  CURRENCIES,
  TWO_FA_SETTINGS,
  NON_EMPTY_API,
  URLs,
  CHANGE_PASSWORD,
  EMPTY_TRANSFER_OUT,
  CURRENCY_ADDED,
  DELETE_SUCCESS,
  USER_VERIFICATION_STATE,
  OTP_KEYS,
  NEW_OTP,
  SG_CONFIG,
} from "../../config";
import { Tab } from "../components/settings/tab.component";
import { BasePage } from "./Base.page";
import { TwoFactorModal } from "../components/settings/twoFactorModal.component";
import { ConfirmationModal } from "../components/general/modals/confirmationModal.component";
import { expectElementVisibility, expectToHaveCount, waitSeveralSec } from "../../utils";
import { Logger } from "../../logger/logger";
const logger = new Logger("Settings Page");

export class SettingsPage extends BasePage {
  readonly url: string;

  readonly tabs: Locator;

  readonly tabHeader: Locator;

  readonly activeTab: Tab;

  readonly addTwoFactorModal: TwoFactorModal;

  readonly confirmationModal: ConfirmationModal;

  readonly apiBlocks: Block;

  constructor(page: Page, url = "/settings") {
    super(page);
    this.url = url;
    this.tabs = this.page.locator("div[data-test-id='settings-tabs']");
    this.tabHeader = this.page.locator("[data-test-id='settings-tab-header']");
    this.activeTab = new Tab(this.page.locator("[data-test-id='settings-active-tab']"), this.page);
    this.addTwoFactorModal = new TwoFactorModal(
      this.page.locator("form[data-test-id='add-two-factor-form']"),
      this.page
    );
    this.confirmationModal = new ConfirmationModal(
      this.page.locator(
        "[aria-labelledby='delete-key-dialog'], [aria-labelledby='settings-tab-two-factor-mandatory-dialog']"
      ),
      this.page
    );
    this.apiBlocks = new Block(this.page.locator("div[data-test-id='settings-api-key-container']>div"));
  }

  async clickTab(tab: SETTINGS_TABS): Promise<void> {
    await this.getTab(tab).click();
  }

  getTab(tab: SETTINGS_TABS) {
    return this.tabs.locator(`a[href*=${tab}]`);
  }

  async selectBaseCurrency(currency: CURRENCIES): Promise<void> {
    await this.goto();
    await this.activeTab.baseCurrencyDropdown.clickByText(currency);
    await this.activeTab.saveButton.click();
    logger.info("Selecting Base Currency");
  }

  async selectDefaultTimeZone(timezone: TIMEZONES): Promise<void> {
    await this.goto();
    await this.activeTab.timezoneDropdown.clickByText(timezone);
    await this.activeTab.saveButton.click();
  }

  async goto() {
    await super.goto(this.url);
  }

  getTwoFactorBlock(twoFAmethods: TWO_FA_SETTINGS): Block {
    return new Block(
      this.page.locator("div[data-test-id='two-factor-method-block']", {
        has: this.page.locator("span[data-test-id='method-block-heading-text']", { hasText: twoFAmethods }),
      })
    );
  }

  getApiBlock(index: number): Block {
    return new Block(this.apiBlocks.rootEl.nth(index));
  }

  getBlocksCount(): Promise<number> {
    return this.apiBlocks.rootEl.count();
  }

  async verifyApiTabs(): Promise<void> {
    const apiBlockCount = await this.getBlocksCount();
    logger.debug(`There are ${apiBlockCount} API keys added`);
    await expectToHaveCount(this.apiBlocks.rootEl, 6);

    for (let i = 0; i < apiBlockCount; i++) {
      await expectElementVisibility(this.getApiBlock(i).apiKey, true);
      await expectElementVisibility(this.getApiBlock(i).saveButton, true);
      await expectElementVisibility(this.getApiBlock(i).resetSecretButton, true);
      await expectElementVisibility(this.getApiBlock(i).deleteButton, true);
      await expectElementVisibility(this.getApiBlock(i).accountGroup, true);
    }
  }

  async deleteAllApiKeys(): Promise<void> {
    await this.goto();
    await this.clickTab(SETTINGS_TABS.API);

    await waitSeveralSec(1000);
    const apiBlockCount = await this.getBlocksCount();
    logger.info(`There are ${apiBlockCount} API keys added`);

    if (apiBlockCount > 0) {
      for (let i = 0; i < apiBlockCount; i++) {
        await this.getApiBlock(0).deleteButton.click();
        await waitSeveralSec(1000);
      }
    }
  }

  async mockVerifyTab(config: any): Promise<void> {
    await this.api.mockUser(config);
    await this.goto();
    await this.clickTab(SETTINGS_TABS.VERIFY);
  }

  async mockApiTab(): Promise<void> {
    await this.api.mockData(NON_EMPTY_API, URLs.API);
    await this.goto();
  }

  async mockPasswordChange(): Promise<void> {
    await this.api.mockData(CHANGE_PASSWORD, URLs.PASSWORD);
    await this.activeTab.saveButton.click();
  }

  async mockTransferOutData(): Promise<void> {
    await this.api.mockData(EMPTY_TRANSFER_OUT, URLs.SETTINGS);
    await this.goto();
  }

  async mockTransferOutCurrencyAdding(): Promise<void> {
    await this.api.mockData(CURRENCY_ADDED, URLs.SETTINGS);
    await this.activeTab.createButton.click();
  }

  async mockTransferOutCurrencyDeletion(): Promise<void> {
    await this.mockTransferOutCurrencyAdding();
    await this.api.mockData(DELETE_SUCCESS, URLs.SETTINGS);
    await this.activeTab.deleteButton.click();
  }

  async mockUnverifiedUser(): Promise<void> {
    await this.api.mockUser({
      verificationState: USER_VERIFICATION_STATE.UNVERIFIED,
    });
  }

  async disableSecuritySetting(otp: boolean, yubikey: boolean): Promise<void> {
    await this.api.mockConfig({
      security: {
        otp: {
          enabled: otp,
        },
        yubikey: {
          enabled: yubikey,
        },
      },
    });
    await this.goto();
  }

  async mockSecurityKeys(keys = OTP_KEYS): Promise<void> {
    await this.api.mockData(keys, URLs.SECURITY);
    await this.goto();
  }

  async mockMandatory2FA(): Promise<void> {
    await this.api.mockConfig({
      twoFactor: {
        mandatory: true,
      },
    });
  }

  async mockAddingOTP(): Promise<void> {
    await this.api.mockData(NEW_OTP, URLs.OTP);
    await this.addTwoFactorModal.buttonConfirm.click();
  }

  async mockVerifyConfig(personal: boolean, company: boolean): Promise<void> {
    await this.api.mockConfig({
      verify: {
        personalEnabled: personal,
        companyEnabled: company,
      },
    });
    await this.goto();
  }

  async enableApiTab(option: boolean): Promise<void> {
    await this.api.mockConfig({
      features: {
        api: {
          enabled: option,
          moreInfoLink: true,
          reference: {
            enabled: true,
          },
        },
      },
    });
  }

  async disableBaseCurrency(option: boolean): Promise<void> {
    const config = JSON.parse(JSON.stringify(SG_CONFIG));
    config.features.settings.noBaseCurrencySelection = option;
    await this.api.mockConfig(config);
  }
}
