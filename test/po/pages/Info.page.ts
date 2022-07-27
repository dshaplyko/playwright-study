import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class InfoPage extends BasePage {
  readonly url: string;

  readonly body: Locator;

  readonly articleHeader: Locator;

  readonly articleBody: Locator;

  readonly articleMenuButtons: Locator;

  constructor(page: Page, url = "/info") {
    super(page);
    this.url = url;
    this.body = this.page.locator("header~div");
    this.articleHeader = this.body.locator("[data-test-id='story-header-label']");
    this.articleBody = this.body.locator("[data-test-id='story-body-text']");
    this.articleMenuButtons = this.body.locator("[data-test-id*='story-menu-button']");
  }
}
