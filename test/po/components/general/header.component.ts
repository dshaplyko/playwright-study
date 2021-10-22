/* eslint-disable require-await */
import { Locator } from "@playwright/test";

export class Header {
  readonly locator: Locator;

  readonly portfolioLink: Locator;

  readonly profile: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
    this.portfolioLink = this.locator.locator("a[href*='portfolio']");
    this.profile = this.locator.locator("button[data-test-id='button-profile']");
  }
}
