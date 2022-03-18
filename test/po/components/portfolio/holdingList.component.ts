import { Locator, expect } from "@playwright/test";
import { Table } from "../general/table.component";
import { calculateSumFromTable, getValueAsNumber } from "../../../utils";

export class HoldingList extends Table {
  readonly currencyRows: Locator;

  readonly distributionRows: Locator;

  readonly totalRows: Locator;

  readonly totalRowsCurrency: Locator;

  readonly primaryRows: Locator;

  readonly exchangeRows: Locator;

  readonly brokerageRows: Locator;

  readonly qrCode: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.currencyRows = this.rows.locator("th[data-test-id='currency'] div, [data-test-id*='irfq-holidng-list-item']");
    this.totalRows = this.rows.locator("td[data-test-id='total'] div[class*='css-0']");
    this.totalRowsCurrency = this.rows.locator("td[data-test-id='total'] div[class*='80u1qc']");
    this.primaryRows = this.rows.locator("td[data-test-id='primary'] div[class*='css-0']");
    this.exchangeRows = this.rows.locator("td[data-test-id='exchange'] div[class*='css-0']");
    this.brokerageRows = this.rows.locator(
      "td[data-test-id='brokerage'] div[class*='css-0'], [data-test-id*='irfq-holidng-list-balance']"
    );
    this.distributionRows = this.rows.locator("td[data-test-id='distribution']");
    this.qrCode = this.currencyRows.locator("a[href*='BTC']");
  }

  getTotal(index: number) {
    return this.totalRows.nth(index).innerText();
  }

  getPrimary(index: number) {
    return this.primaryRows.nth(index).innerText();
  }

  getBrokerage(index: number) {
    return this.brokerageRows.nth(index).innerText();
  }

  getExchange(index: number) {
    return this.exchangeRows.nth(index).innerText();
  }

  getPercentage(index: number) {
    return this.distributionRows.nth(index - 1).innerText();
  }

  getCurrency(index: number) {
    return this.currencyRows.nth(index - 1).innerText();
  }

  async clickCurrencyByText(text: string): Promise<void> {
    return this.currencyRows.locator(`text=${text}`).click();
  }

  async getCurrencies(): Promise<string[]> {
    let currencies = await this.currencyRows.allTextContents();
    while (currencies.length === 0) {
      currencies = await this.currencyRows.allTextContents();
    }
    return currencies;
  }

  async getPercentages(): Promise<number[]> {
    await this.waitForVisible();
    const texts: string[] = await this.distributionRows.allInnerTexts();
    return texts.map((item) => getValueAsNumber(item));
  }

  async calculateTotalBalance(): Promise<number> {
    await this.waitForVisible();
    return calculateSumFromTable(await this.totalRowsCurrency.allInnerTexts());
  }

  async calculateTotalPercentage(): Promise<number> {
    await this.waitForVisible();
    return Math.ceil(calculateSumFromTable(await this.distributionRows.allInnerTexts()));
  }

  async checkSumOfEachColumn(): Promise<any> {
    const rowsCount: number = await this.getRowsCount();

    for (let i = 1; i < rowsCount; i++) {
      return expect(Math.trunc(getValueAsNumber(await this.getTotal(i)))).toEqual(
        Math.trunc(
          calculateSumFromTable([await this.getBrokerage(i), await this.getExchange(i), await this.getPrimary(i)])
        )
      );
    }
  }

  async getCurrencyIndex<T>(currency: T): Promise<number> {
    const currencies: string[] = await this.getCurrencies();
    return currencies.findIndex((cur: T | string) => cur === currency);
  }

  async getCurrencyAmount<T>(currency: T): Promise<number> {
    const index = await this.getCurrencyIndex(currency);
    return getValueAsNumber(await this.getBrokerage(index));
  }
}
