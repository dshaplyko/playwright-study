import { Locator, expect } from "@playwright/test";
import { Element } from "../basic/element";
import { calculateSumFromTable } from "../../../utils";
import { PortfolioColumns } from "../../../config";

export class HoldingList extends Element {
  readonly rows: Locator;

  readonly currencyRows: Locator;

  readonly distributionRows: Locator;

  readonly totalRows: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.rows = this.el.locator("tbody tr[data-test-id='table-row']");
    this.currencyRows = this.rows.locator("th[data-test-id='currency'] div");
    this.totalRows = this.rows.locator("td[data-test-id='total'] div.anx-static-styles-80u1qc");
    this.distributionRows = this.rows.locator("td[data-test-id='distribution']");
  }

  async getRowsCount(): Promise<number> {
    await this.waitForVisible();
    return this.rows.count();
  }

  async getCurrencies(): Promise<string[]> {
    await this.waitForVisible();
    return this.currencyRows.allInnerTexts();
  }

  clickRow(index: number) {
    return this.rows.nth(index - 1).click();
  }

  async calculateTotalBalance(): Promise<number> {
    await this.waitForVisible();
    return calculateSumFromTable(await this.totalRows.allInnerTexts());
  }

  async calculateTotalPercentage(): Promise<number> {
    await this.waitForVisible();
    return calculateSumFromTable(await this.distributionRows.allInnerTexts());
  }

  getPercentage(index: number) {
    return this.distributionRows.nth(index - 1).innerText();
  }

  getCurrency(index: number) {
    return this.currencyRows.nth(index - 1).innerText();
  }

  async checkColumnVisibility(column: PortfolioColumns, visibility: boolean): Promise<any> {
    const rowsCount: number = await this.getRowsCount();

    for (let i = 0; i < rowsCount; i++) {
      const assert = expect(this.rows.nth(i).locator(`[data-test-id='${column}']`));
      if (visibility) {
        await assert.toBeVisible();
      } else {
        await assert.toBeHidden();
      }
    }
  }
}
