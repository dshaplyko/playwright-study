import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class TransactionActivity extends Element {
  readonly rows: Locator;

  readonly method: Locator;

  readonly statuses: Locator;

  readonly amount: Locator;

  readonly currency: Locator;

  readonly fee: Locator;

  readonly description: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.rows = this.el.locator("[data-test-id='transaction-list-row']");
    this.method = this.rows.locator("[data-test-id='transaction-list-row-method']");
    this.amount = this.rows.locator("[data-test-id='transaction-list-row-amount']");
    this.currency = this.rows.locator("[data-test-id='transaction-list-row-currency']");
    this.fee = this.rows.locator("[data-test-id='transaction-list-row-fee']");
    this.description = this.rows.locator("[data-test-id='transaction-list-row-description']");
    this.statuses = this.rows.locator("[data-test-id='transaction-list-row-status']");
  }

  async getStatusesText(): Promise<string[]> {
    await this.statuses.nth(1).waitFor();
    const textArray: string[] = await this.statuses.allInnerTexts();
    return textArray.filter(Boolean);
  }
}
