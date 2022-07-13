/* eslint-disable require-await */
import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Header extends Element {
  readonly logo: Locator;

  readonly portfolioLink: Locator;

  readonly activitiesLink: Locator;

  readonly fundsLink: Locator;

  readonly tradeLink: Locator;

  readonly buySellLink: Locator;

  readonly notificationsButton: Locator;

  readonly profileButton: Locator;

  readonly loginButton: Locator;

  readonly registerButton: Locator;

  readonly blockchainExplorerLink: Locator;

  readonly languageSelector: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.logo = this.rootEl.locator("a[href='/']");
    this.portfolioLink = this.rootEl.locator("a[href*='portfolio']");
    this.activitiesLink = this.rootEl.locator("a[href*='activity']");
    this.fundsLink = this.rootEl.locator("a[href*='funds']");
    this.tradeLink = this.rootEl.locator("a[href*='trade']");
    this.buySellLink = this.rootEl.locator("a[href*='buysell']");
    this.notificationsButton = this.rootEl.locator("button[data-test-id='notifications-menu-item']");
    this.profileButton = this.rootEl.locator("button[data-test-id='button-profile']");
    this.loginButton = this.rootEl.locator("a[href*='signin']");
    this.registerButton = this.rootEl.locator("a[href*='register']");
    this.blockchainExplorerLink = this.rootEl.locator("a[href*='anxexplorer']");
    this.languageSelector = this.rootEl.locator("div[data-test-id='language-selector']");
  }
}
