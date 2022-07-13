import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Transaction extends Element {
  readonly title: Locator;

  readonly lines: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.title = this.rootEl.locator("span[data-test-id$='recent-transactions-title']");
    this.lines = this.rootEl.locator("div[data-test-id$='recent-transactions-records']>div");
  }

  getTransaction(index: number): Locator {
    return this.lines.nth(index - 1);
  }
}
