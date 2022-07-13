import { Page, Locator } from "@playwright/test";
import { PAGES } from "../../config";
import { BasePage } from "./Base.page";

export class InfoPage extends BasePage {
  readonly url: string;

  readonly body: Locator;

  constructor(page: Page, url = "/info") {
    super(page);
    this.url = url;
    this.body = this.page.locator("header~div");
  }

  async open(url: PAGES) {
    await super.goto(`/pages/${url}`);
  }
}
