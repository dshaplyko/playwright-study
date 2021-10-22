// playwright-dev-page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class ActivitiesPage extends BasePage {
  readonly url: string;

  readonly buttonGetHistoricalReports: Locator;

  readonly buttonActivityFilter: Locator;

  constructor(page: Page, url = "/activities") {
    super(page);
    this.url = url;
    this.buttonGetHistoricalReports = this.page.locator("text=Get Historical Reports");
    this.buttonActivityFilter = this.page.locator("text=Activity Filter");
  }

  async goto() {
    await super.goto(this.url);
  }
}
