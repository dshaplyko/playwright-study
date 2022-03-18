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

  constructor(locator: Locator) {
    super(locator);
    this.userEmail = this.el.locator("[data-testid='PersonIcon']");
    this.blockchainExplorerLink = this.el.locator("button:has(> svg[data-testid='ExploreOutlinedIcon'])");
    this.consoleLink = this.el.locator("a[href*='console'], a[href*='admin']");
    this.stagingModeLink = this.el.locator("button:has(> svg[data-testid='TelegramIcon'])");
    this.announcementsLink = this.el.locator("a[href*=announcements]");
    this.inThePressLink = this.el.locator("a[href*=press]");
    this.marketInsightsLink = this.el.locator("a[href*=market]");
    this.reportsLink = this.el.locator("a[href*=reports]");
    this.settingsLink = this.el.locator("a[href*=settings]");
    this.languageSelector = this.el.locator("[data-testid='LanguageIcon']");
    this.logoutButton = this.el.locator("button", { hasText: "Logout" });
    this.switchAccount = this.el.locator("a>svg[data-testid='SyncIcon']");
  }
}
