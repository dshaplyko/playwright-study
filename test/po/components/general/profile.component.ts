/* eslint-disable require-await */
import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Profile extends Element {
  readonly userEmail: Locator;

  readonly blockchainExplorerLink: Locator;

  readonly consoleLink: Locator;

  readonly stagingModeLink: Locator;

  readonly announcementsLink: Locator;

  readonly inThePressLink: Locator;

  readonly marketInsightsLink: Locator;

  readonly reportsLink: Locator;

  readonly settingsLink: Locator;

  readonly languageSelector: Locator;

  readonly logoutButton: Locator;

  readonly switchAccount: Locator;

  readonly digitalAssetAddressLink: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.userEmail = this.rootEl.locator("[data-testid='PersonIcon']");
    this.blockchainExplorerLink = this.rootEl.locator("button:has(> svg[data-testid='ExploreIcon'])");
    this.consoleLink = this.rootEl.locator("a[href*='console'], a[href*='admin']");
    this.stagingModeLink = this.rootEl.locator("button:has(> svg[data-testid='SendIcon'])");
    this.announcementsLink = this.rootEl.locator("a[href*=announcements]");
    this.inThePressLink = this.rootEl.locator("a[href*=press]");
    this.marketInsightsLink = this.rootEl.locator("a[href*=market]");
    this.reportsLink = this.rootEl.locator("a[href*=reports]");
    this.settingsLink = this.rootEl.locator("a[href*=settings]");
    this.languageSelector = this.rootEl.locator("[data-testid='LanguageIcon']");
    this.logoutButton = this.rootEl.locator("button", { hasText: "Logout" });
    this.switchAccount = this.rootEl.locator("button:has-text('Switch')");
    this.digitalAssetAddressLink = this.rootEl.locator("a[href='/contacts']");
  }
}
