import { Locator } from "@playwright/test";

export class Element {
  readonly locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  clickMe() {
    return this.locator.click();
  }
}
