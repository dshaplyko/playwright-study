import {
  expect, Locator, Page,
} from "@playwright/test";

export default class LeftPanel {
  readonly locator: Locator;

  constructor(page: Page, locator: string) {
    this.locator = page.locator(locator);
  }

  async getSectionTexts(): Promise<number> {
    return this.locator.locator(".drop-header__title").count();
  }
}
