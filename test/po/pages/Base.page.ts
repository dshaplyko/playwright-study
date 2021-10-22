// playwright-dev-page.ts
import { Page } from "@playwright/test";
import { Header } from "../components/general/header.component";
import { Profile } from "../components/general/profile.component";

export class BasePage {
  readonly page: Page;

  readonly header: Header;

  readonly profile: Profile;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(this.page.locator("header"));
    this.profile = new Profile(this.page.locator("[data-test-id='profile'] ul"));
  }

  async goto(url: string) {
    await this.page.goto(url);
    await this.page.waitForURL(url, {
      waitUntil: "domcontentloaded",
    });
  }
}
