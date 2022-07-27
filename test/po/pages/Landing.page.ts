import { Page, Locator } from "@playwright/test";
import { SG_CONFIG } from "../../config";
import { generateMaintenancePeriod } from "../../utils";
import { BasePage } from "./Base.page";

export class LandingPage extends BasePage {
  readonly url: string;

  readonly orderBook: Locator;

  readonly marketInsights: Locator;

  readonly announcements: Locator;

  readonly contactUs: Locator;

  constructor(page: Page, url = "/") {
    super(page);
    this.url = url;
    this.orderBook = this.page.locator("div[data-test-id='order-book']");
    this.marketInsights = this.page.locator("div[data-test-id='home-market-insights']");
    this.announcements = this.page.locator("div[data-test-id='home-announcements']");
    this.contactUs = this.page.locator("div[data-test-id='home-contact-us']");
  }

  getDisclaimer(name: string): Locator {
    return this.footer.locator(`text=${name}`);
  }

  getFooterLink(name: "about" | "faq" | "security" | "terms" | "privacy"): Locator {
    return this.footer.locator("a", {
      hasText: name,
    });
  }

  async goto() {
    await super.goto(this.url);
  }

  async disableOrderBook(): Promise<void> {
    await this.api.mockConfig({
      features: {
        trade: {
          enabled: false,
        },
        orderBook: false,
      },
    });
    await this.goto();
  }

  async mockMaintenancePeriod(): Promise<void> {
    const { timeFrom, timeTo } = generateMaintenancePeriod();

    await this.api.mockSiteData({
      maintenanceStartTime: timeFrom,
      maintenanceEndTime: timeTo,
    });
    await this.goto();
  }

  async mockLandingPage(obj: any): Promise<void> {
    const mockData = { ...SG_CONFIG };
    mockData.features.footer.aboutUs = obj.aboutUs;
    mockData.features.footer.contacts = obj.contacts;
    mockData.features.footer.faq = obj.faq;
    mockData.features.footer.security = obj.security;
    mockData.features.footer.privacyPolicy = obj.privacy;
    mockData.features.footer.termsOfUse = obj.terms;
    mockData.features.marketInsight = obj.marketInsight;
    mockData.features.announcements = obj.announcements;
    mockData.features.newsStories = obj.announcements;
    mockData.i18n.en_US["footer.label.disclaimer"] = obj.disclaimer;

    await this.api.mockConfig(mockData);
    await this.goto();
  }
}
