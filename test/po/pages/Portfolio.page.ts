// playwright-dev-page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class Portfolio extends BasePage {
  readonly url: string;

  readonly totalBalance: Locator;

  constructor(page: Page, url = "/user") {
    super(page);
    this.url = url;
    this.totalBalance = this.page.locator(".total-balance-3");
  }

  async goto() {
    await super.goto(this.url);
  }
}
