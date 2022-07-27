import { Locator, Page } from "@playwright/test";
import { Main } from "./main.component";

export class Media extends Main {
  readonly browseForImageButton: Locator;

  readonly image: Locator;

  readonly uploadNewImageButton: Locator;
  readonly allImages: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.browseForImageButton = this.rootEl.locator("button", { hasText: "Browse for Image" });
    this.image = this.rootEl.locator("img.MuiCardMedia-img");
    this.uploadNewImageButton = this.rootEl.locator("button", { hasText: "Upload new Image" });
    this.allImages = this.rootEl.locator("ul img");
  }
}
