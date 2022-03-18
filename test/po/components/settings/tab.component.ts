import { Locator, Page } from "@playwright/test";
import { expectElementVisibility } from "../../../utils";
import { NOTIFICATION_OPTIONS } from "../../../config";
import { Dropdown } from "../basic/dropdown";
import { Element } from "../basic/element";

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
    this.baseCurrencyDropdown = new Dropdown(this.el.locator("[data-test-id='settings-cashCcy-select']"), this.page);
    this.timezoneDropdown = new Dropdown(this.el.locator("[data-test-id='settings-time-zone-select']"), this.page);
    this.versionNumber = this.el.locator("[data-test-id='settings-version']");
    this.saveButton = this.el.locator("button", { hasText: "Save" });
    this.updateButton = this.el.locator("button", { hasText: "Update" });
    this.createButton = this.el.locator("button", { hasText: "Create" });
    this.currencyList = new Dropdown(this.el.locator("#settings-transfer-out-ccy-select"), this.page);
    this.limitInput = this.el.locator("#settings-transfer-out-dailyThresholdInCcy-input");
    this.deleteButton = this.el.locator("button", { hasText: "Delete" });
    this.currentPasswordInput = this.el.locator("input#existing");
    this.newPasswordInput = this.el.locator("input#password");
    this.reenterPaswordInput = this.el.locator("input#password2");
    this.passwordInfoMessage = this.el.locator("[data-test-id='settings-password-form'] span");
    this.errorMessage = this.el.locator("[data-test-id='settings-password-form-errors']");
    this.formStrength = this.el.locator("[data-test-id='settings-password-form-strength'] p");
    this.message = this.el.locator("p").nth(0);
    this.verifyNowButton = this.el.locator("button", { hasText: "Verify Now" });
    this.personalButton = this.el.locator("button", { hasText: "Personal" });
    this.companyButton = this.el.locator("button", { hasText: "Company" });
    this.onboardingService = this.el.locator("#onboardingservice");
  }

  getNotificationOption(option: NOTIFICATION_OPTIONS): Locator {
    return this.el.locator(`[data-test-id="settings-${option}-container"] input`);
  }

  async checkOptionsVisibility(): Promise<void> {
    Object.values(NOTIFICATION_OPTIONS).forEach(async (option) => {
      await expectElementVisibility(this.getNotificationOption(option), true);
    });
  }
}
