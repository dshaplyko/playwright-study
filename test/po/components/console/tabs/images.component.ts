import { Locator, Page } from "@playwright/test";
import { Main } from "./main.component";

export class Images extends Main {
  readonly imageOptions: Locator;

  readonly uploadNewImageButton: Locator;

  readonly preview: Locator;

  readonly deleteButtons: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.imageOptions = this.rootEl.locator("[data-test-id='image-options'] div.MuiListItem-root");
    this.uploadNewImageButton = this.rootEl.locator("[data-test-id='upload-new-image']");
    this.preview = this.rootEl.locator("[data-test-id='preview']");
    this.deleteButtons = this.imageOptions.locator("button[data-test-id='revert-button']");
  }

  async revertImage(index: number): Promise<void> {
    return this.deleteButtons.nth(index).click();
  }

  selectImageOption(text: string): Promise<void> {
    return this.getImageOptionByText(text).click();
  }

  getImageOptionByText(text: string): Locator {
    return this.imageOptions.locator("p", { hasText: text });
  }
}
