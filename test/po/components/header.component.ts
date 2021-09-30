import { expect, Locator, Page } from "@playwright/test";

export default class Header {
  readonly locator: Locator;

  constructor(page: Page, locator: string) {
    this.locator = page.locator(locator);
  }

  async getText(): Promise<string> {
    return this.locator.innerText();
  }
}
