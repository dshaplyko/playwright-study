import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class LandingPage extends BasePage {
  readonly url: string;

  readonly footer: Locator;

  readonly orderBook: Locator;

  readonly marketInsights: Locator;

  readonly announcements: Locator;

  readonly contactUs: Locator;

  readonly maintenanceBanner: Locator;

  constructor(page: Page, url = "/") {
    super(page);
    this.url = url;
    this.footer = this.page.locator("div[data-test-id='home-footer']");
    this.orderBook = this.page.locator("div[data-test-id='order-book']");
    this.marketInsights = this.page.locator("div[data-test-id='home-market-insights']");
    this.announcements = this.page.locator("div[data-test-id='home-announcements']");
    this.contactUs = this.page.locator("div[data-test-id='home-contact-us']");
    this.maintenanceBanner = this.page.locator("div:has(>svg[data-testid='ErrorIcon']~span)");
  }

  getDisclaimer(name: string): Locator {
    return this.footer.locator(`text=${name}`);
  }

  getColumn(name: string): Locator {
    return this.footer.locator(`text=${name}`);
  }

  async goto() {
    await super.goto(this.url);
  }
}
