// playwright-dev-page.ts
import {
  expect, Locator, Page,
} from "@playwright/test";
import Header from "../components/header.component";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get header() {
    return new Header(this.page, ".initial-view");
  }

  async goto() {
    await this.page.goto("/");
  }
}
