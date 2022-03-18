import { Page, Locator } from "@playwright/test";
import { Api } from "../api/api";
import { Block } from "../components/settings/block.component";
import { SETTINGS_TABS, TIMEZONES, CURRENCIES, TWO_FA_SETTINGS } from "../../config";
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
    await this.tabs.locator(`a[href*=${tab}]`).click();
  }

  async selectBaseCurrency(currency: CURRENCIES): Promise<void> {
    await this.goto();
    await this.activeTab.baseCurrencyDropdown.selectByText(currency);
    await this.activeTab.saveButton.click();
  }

  async selectDefaultTimeZone(timezone: TIMEZONES): Promise<void> {
    await this.goto();
    await this.activeTab.timezoneDropdown.selectByText(timezone);
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
    return new Block(this.apiBlocks.el.nth(index));
  }

  getBlocksCount(): Promise<number> {
    return this.apiBlocks.el.count();
  }

  async verifyApiTabs(): Promise<void> {
    const apiBlockCount = await this.getBlocksCount();
    logger.debug(`There are ${apiBlockCount} API keys added`);
    await expectToHaveCount(this.apiBlocks.el, 6);

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
    await new Api(this.page).mockUser(config);
    await this.goto();
    await this.clickTab(SETTINGS_TABS.VERIFY);
  }
}
