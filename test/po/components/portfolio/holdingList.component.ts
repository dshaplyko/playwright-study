import { Locator, expect } from "@playwright/test";
import { Table } from "../general/table.component";
import { calculateSumFromTable, getValueAsNumber } from "../../../utils";

export class HoldingList extends Table {
  readonly currencyRows: Locator;

  readonly totalRows: Locator;

  readonly totalRowsCurrency: Locator;

  readonly primaryRows: Locator;

  readonly exchangeRows: Locator;

  readonly brokerageRows: Locator;

  readonly qrCode: Locator;

  readonly currencyImages: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.currencyRows = this.rows.locator("td[data-test-id^='currency'] div, [data-test-id*='irfq-holidng-list-item']");
    this.totalRows = this.rows.locator("td[data-test-id^='total'] [data-test-id^='originalCcy']");
    this.totalRowsCurrency = this.rows.locator("td[data-test-id^='total'] span[data-test-id*='userCcy']");
    this.primaryRows = this.rows.locator("td[data-test-id^='primary'] [data-test-id^='originalCcy']");
    this.exchangeRows = this.rows.locator("td[data-test-id^='exchange'] [data-test-id^='originalCcy']");
    this.brokerageRows = this.rows.locator(
      "td[data-test-id^='brokerage'] [data-test-id^='originalCcy'], [data-test-id*='irfq-holidng-list-balance']"
    );
    this.qrCode = this.currencyRows.locator("a[href*='BTC']");
    this.currencyImages = this.currencyRows.locator("img");
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

  getCurrency(index: number) {
    return this.currencyRows.nth(index - 1).innerText();
  }

  async clickCurrencyByText(text: string): Promise<void> {
    return this.currencyRows.locator(`text=${text}`).first().click();
  }

  async getCurrencies(): Promise<string[]> {
    let currencies = await this.currencyRows.allTextContents();
    while (currencies.length === 0) {
      currencies = await this.currencyRows.allTextContents();
    }
    return currencies;
  }

  async calculateTotalBalance(): Promise<number> {
    await this.waitForVisible();
    return calculateSumFromTable(await this.totalRowsCurrency.allInnerTexts());
  }

  async checkSumOfEachColumn(): Promise<any> {
    const rowsCount: number = await this.getRowsCount();

    for (let i = 0; i < rowsCount; i++) {
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

  async checkImagesVisibility(): Promise<void> {
    const rowsCount: number = await this.getRowsCount();

    for (let i = 0; i < rowsCount; i++) {
      await expect(this.currencyImages.nth(i)).toBeVisible();
    }
  }
}
