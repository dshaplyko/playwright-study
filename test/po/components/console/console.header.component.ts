import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../basic/dropdown";
import { Element } from "../basic/element";

export class ConsoleHeader extends Element {
  readonly page: Page;

  readonly accountSelector: Dropdown;

  readonly consoleLogo: Locator;

  readonly languageSelector: Dropdown;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.accountSelector = new Dropdown(this.rootEl.locator("[data-test-id='account-selector']"), this.page);
    this.consoleLogo = this.rootEl.locator("a[href*='admin']");
    this.languageSelector = new Dropdown(this.rootEl.locator("[data-test-id='language-selector']"), this.page);
  }
}
