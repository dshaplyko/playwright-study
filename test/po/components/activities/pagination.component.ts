import { Locator } from "@playwright/test";
import { Element } from "../basic/element";
import { Logger } from "../../../logger/logger";
const logger = new Logger("Pagination component");

export class Pagination extends Element {
  readonly pageButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.pageButton = this.el.locator("button");
  }

  async getPageCount(): Promise<number> {
    const pageCount: number = await this.el.count();
    logger.debug(pageCount);
    return pageCount;
  }

  clickPage(index: number): Promise<void> {
    return this.pageButton.nth(index - 1).click();
  }
}
