import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../../basic/dropdown";
import { Main } from "./main.component";

export class Theming extends Main {
  readonly colorOptions: Locator;

  readonly primaryColor: Locator;

  readonly sampleSelect: Dropdown;

  readonly confirmPaymentInButton: Locator;

  readonly samplesButton: Locator;

  readonly adcivitiesPreview: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.colorOptions = this.rootEl.locator("input[name*='color']");
    this.primaryColor = this.rootEl.locator("input[name='color-primary']");
    this.sampleSelect = new Dropdown(this.rootEl.locator("#sample-select"), this.page);
    this.confirmPaymentInButton = this.rootEl.locator("button", { hasText: "Confirm Payment Out" });
    this.samplesButton = this.rootEl.locator("button", { hasText: "Button without any color" });
    this.adcivitiesPreview = this.rootEl.locator(".MuiTableHead-root");
  }
}
