import { Locator, Page } from "@playwright/test";
import { Element } from "./element";

export class Dropdown extends Element {
  readonly page: Page;

  readonly options: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.options = this.page.locator("ul[role='listbox']");
  }

  clickByText(text: string): Promise<void> {
    return this.options.locator(`text=${text}`).click();
  }
}
