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

  readonly digitalAssetAddressLink: Locator;

  readonly notificationsButton: Locator;

  readonly profileButton: Locator;

  readonly loginButton: Locator;

  readonly registerButton: Locator;

  readonly blockchainExplorerLink: Locator;

  readonly languageSelector: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.logo = this.el.locator("a[href='/']");
    this.portfolioLink = this.el.locator("a[href*='portfolio']");
    this.activitiesLink = this.el.locator("a[href*='activity']");
    this.fundsLink = this.el.locator("a[href*='funds']");
    this.tradeLink = this.el.locator("a[href*='trade']");
    this.buySellLink = this.el.locator("a[href*='buysell']");
    this.digitalAssetAddressLink = this.el.locator("a[href*='contacts']");
    this.notificationsButton = this.el.locator("button[data-test-id='notifications-menu-item']");
    this.profileButton = this.el.locator("button[data-test-id='button-profile']");
    this.loginButton = this.el.locator("a[href*='signin']");
    this.registerButton = this.el.locator("a[href*='register']");
    this.blockchainExplorerLink = this.el.locator("a[href*='anxexplorer']");
    this.languageSelector = this.el.locator("div[data-test-id='language-selector']");
  }
}
