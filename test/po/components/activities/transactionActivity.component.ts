import { Locator } from "@playwright/test";
import { Table } from "../general/table.component";
import { Logger } from "../../../logger/logger";
import { ACTIVITY_COLUMNS } from "../../../config";
const logger = new Logger("Transaction Activity");

export class TransactionActivity extends Table {
  readonly method: Locator;

  readonly status: Locator;

  readonly amount: Locator;

  readonly currency: Locator;

  readonly fee: Locator;

  readonly description: Locator;

  readonly walletAddresses: Locator;

  readonly buttonAddToContact: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.method = this.rows.locator("[data-test-id='transaction-list-row-method']");
    this.amount = this.rows.locator("[data-test-id='transaction-list-row-amount']");
    this.currency = this.rows.locator("[data-test-id='transaction-list-row-currency']");
    this.fee = this.rows.locator("[data-test-id='transaction-list-row-fee']");
    this.description = this.rows.locator("[data-test-id='transaction-list-row-description']");
    this.status = this.rows.locator("[data-test-id='transaction-list-row-status']");
    this.walletAddresses = this.rows.locator("p[data-test-id='activities-wallet-address']");
    this.buttonAddToContact = this.rows.locator("button[aria-label*='Contact']");
  }

  async getColumnText(column: ACTIVITY_COLUMNS): Promise<string[]> {
    await this[column].nth(0).waitFor();
    const count = await this.rows.count();
    const textArr = [];
    for (let i = 0; i < count; i++) {
      textArr.push(await this[column].nth(i).innerText());
    }
    logger.debug(`${JSON.stringify(textArr, null, "\t")}`);
    return textArr;
  }

  selectWalletAddress(index: number): Locator {
    return this.walletAddresses.nth(index - 1);
  }

  selectContact(index: number): Locator {
    return this.buttonAddToContact.nth(index - 1);
  }
}
