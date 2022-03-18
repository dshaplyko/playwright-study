import { Locator, Page } from "@playwright/test";
import { Element } from "../basic/element";

export class Notifications extends Element {
  readonly page: Page;

  readonly list: Locator;

  readonly transactionDates: Locator;

  readonly latestTransactionTime: Locator;

  readonly removeIcons: Locator;

  readonly placeholder: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.list = this.el.locator("[data-test-id='notifications-list']");
    this.transactionDates = this.list.locator("[data-test-id='notifications-transaction-date']");
    this.latestTransactionTime = this.transactionDates.nth(0);
    this.removeIcons = this.el.locator("[data-testid='RemoveCircleOutlineIcon']");
    this.placeholder = this.el.locator("[data-test-id='notifications-placeholder']");
  }

  async getAllDates(): Promise<string[]> {
    return this.transactionDates.allInnerTexts();
  }
}
