import { Locator, expect } from "@playwright/test";
import { Element } from "../basic/element";
import { PORTFOLIO_COLUMNS, ACTIVITY_COLUMNS } from "../../../config";

export class Table extends Element {
  readonly rows: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.rows = this.el.locator("tbody tr, [data-test-id='transaction-list-row'], li");
  }

  clickRow(index: number): Promise<void> {
    return this.rows.nth(index - 1).click();
  }

  async getRowsCount(): Promise<number> {
    await this.waitForVisible();
    return this.rows.count();
  }

  async checkColumnVisibility(column: PORTFOLIO_COLUMNS | ACTIVITY_COLUMNS, visibility: boolean): Promise<any> {
    const rowsCount: number = await this.getRowsCount();

    for (let i = 0; i < rowsCount; i++) {
      const assert = expect(this.rows.nth(i).locator(`[data-test-id$='${column}']`));
      if (visibility) {
        await assert.toBeVisible();
      } else {
        await assert.toBeHidden();
      }
    }
  }

  async getLineByText(text: string): Promise<string> {
    const allText = await this.rows.allTextContents();
    return allText.find((el) => el.includes(text));
  }
}
