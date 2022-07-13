import { Locator, expect } from "@playwright/test";
import { Element } from "../basic/element";
import { PORTFOLIO_COLUMNS, ACTIVITY_COLUMNS } from "../../../config";

export class Table extends Element {
  readonly rows: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.rows = this.rootEl.locator(
      "[aria-label='Deposit Notification Table'] tr , [data-test-id^='table-row'], [data-test-id='transaction-list-row'], li.MuiListItem-gutters, [data-test-id^='translation-table-row']"
    );
  }

  clickRow(index: number): Promise<void> {
    return this.rows.nth(index - 1).click();
  }

  async getRowsCount(): Promise<number> {
    await this.waitForVisible();
    return this.rows.count();
  }

  async checkColumnVisibility(column: PORTFOLIO_COLUMNS | ACTIVITY_COLUMNS, visibility: boolean): Promise<void> {
    const assert = expect(
      this.rootEl
        .locator("[data-test-id='portfolio-table-head']>tr>th>span, [data-test-id^='transaction-list-header']", {
          hasText: column,
        })
        .nth(0)
    );

    if (visibility) {
      await assert.toBeVisible();
    } else {
      await assert.toBeHidden();
    }
  }

  async getLineByText(text: string): Promise<string> {
    const allText = await this.rows.allTextContents();
    return allText.find((el) => el.includes(text));
  }
}
