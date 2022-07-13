import { Locator, Page } from "@playwright/test";
import { expectElementVisibility } from "../../../utils";
import { NOTIFICATION_OPTIONS } from "../../../config";
import { Dropdown } from "../basic/dropdown";
import { Element } from "../basic/element";
import { Logger } from "../../../logger/logger";
const logger = new Logger("Settings Tab");

export class Tab extends Element {
  readonly page: Page;

  readonly baseCurrencyDropdown: Dropdown;

  readonly timezoneDropdown: Dropdown;

  readonly versionNumber: Locator;

  readonly saveButton: Locator;

  readonly updateButton: Locator;

  readonly createButton: Locator;

  readonly currencyList: Dropdown;

  readonly limitInput: Locator;

  readonly deleteButton: Locator;

  readonly currentPasswordInput: Locator;

  readonly newPasswordInput: Locator;

  readonly reenterPaswordInput: Locator;

  readonly passwordInfoMessage: Locator;

  readonly errorMessage: Locator;

  readonly formStrength: Locator;

  readonly message: Locator;

  readonly verifyNowButton: Locator;

  readonly personalButton: Locator;

  readonly companyButton: Locator;

  readonly onboardingService: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.baseCurrencyDropdown = new Dropdown(
      this.rootEl.locator("[data-test-id='settings-cashCcy-select']"),
      this.page
    );
    this.timezoneDropdown = new Dropdown(this.rootEl.locator("[data-test-id='settings-time-zone-select']"), this.page);
    this.versionNumber = this.rootEl.locator("[data-test-id='settings-version']");
    this.saveButton = this.rootEl.locator("button", { hasText: "Save" });
    this.updateButton = this.rootEl.locator("button", { hasText: "Update" });
    this.createButton = this.rootEl.locator("button", { hasText: "Create" });
    this.currencyList = new Dropdown(this.rootEl.locator("#settings-transfer-out-ccy-select"), this.page);
    this.limitInput = this.rootEl.locator("#settings-transfer-out-dailyThresholdInCcy-input");
    this.deleteButton = this.rootEl.locator("button", { hasText: "Delete" });
    this.currentPasswordInput = this.rootEl.locator("input#existing");
    this.newPasswordInput = this.rootEl.locator("input#password");
    this.reenterPaswordInput = this.rootEl.locator("input#password2");
    this.passwordInfoMessage = this.rootEl.locator("[data-test-id='settings-password-form'] span");
    this.errorMessage = this.rootEl.locator("[data-test-id='settings-password-form-errors']");
    this.formStrength = this.rootEl.locator("[data-test-id='settings-password-form-strength'] p");
    this.message = this.rootEl.locator("p").first();
    this.verifyNowButton = this.rootEl.locator("button", { hasText: "Verify Now" });
    this.personalButton = this.rootEl.locator("button", { hasText: "Personal" });
    this.companyButton = this.rootEl.locator("button", { hasText: "Company" });
    this.onboardingService = this.rootEl.locator("#onboardingservice");
  }

  getNotificationOption(option: NOTIFICATION_OPTIONS): Locator {
    return this.rootEl.locator(`[data-test-id="settings-${option}-container"] input`);
  }

  async checkOptionsVisibility(): Promise<void> {
    Object.values(NOTIFICATION_OPTIONS).forEach(async (option) => {
      await expectElementVisibility(this.getNotificationOption(option), true);
    });
  }

  async selectRandomCurrency(): Promise<string> {
    const randomCurrency = await this.baseCurrencyDropdown.chooseAndRememberRandomOption();
    logger.info(`Chosen currency is: ${randomCurrency}`);
    return randomCurrency;
  }
}
