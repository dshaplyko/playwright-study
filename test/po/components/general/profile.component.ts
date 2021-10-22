/* eslint-disable require-await */
import { Locator } from "@playwright/test";

export class Profile {
  readonly locator: Locator;

  readonly logout: Locator;

  readonly profile: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
    this.logout = this.locator.locator("button:has-text('Logout')");
  }
}
