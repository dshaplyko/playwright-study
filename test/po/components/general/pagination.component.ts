import { Locator } from "@playwright/test";
import { Element } from "../basic/element";
import { Logger } from "../../../logger/logger";
const logger = new Logger("Pagination component");

export class Pagination extends Element {
  readonly pageButton: Locator;

  readonly nextPageButton: Locator;

  readonly previousPageButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.pageButton = this.rootEl.locator("button.MuiPaginationItem-page");
    this.nextPageButton = this.rootEl.locator("button[aria-label='Go to next page']");
    this.previousPageButton = this.rootEl.locator("button[aria-label='Go to previous page']");
  }

  async getPageCount(): Promise<number> {
    const pageCount: number = await this.rootEl.count();
    logger.debug(pageCount);
    return pageCount;
  }

  clickPage(index: number): Promise<void> {
    return this.pageButton.nth(index - 1).click();
  }
}
