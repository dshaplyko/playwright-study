import { Locator, Page } from "@playwright/test";
import { Main } from "./main.component";

export class SocialMedia extends Main {
  readonly socialMedia: Locator;

  readonly hyperlinkInput: Locator;

  readonly browseForImageButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.socialMedia = this.rootEl.locator("[data-test-id='social-media-icons']>div");
    this.hyperlinkInput = this.rootEl.locator("#hyperlink-input");
    this.browseForImageButton = this.rootEl.locator("button", { hasText: "Browse for Image" });
  }

  getSocialMedia(media: "twitter" | "facebook" | "youtube" | "qq"): Locator {
    return this.rootEl.locator(`[data-test-id='social-media-icon-${media}']`);
  }

  getItemTitle(index: number): Locator {
    return this.items.nth(index).locator("div[data-test-id^='link-item-text']>span");
  }
}
