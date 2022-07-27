import { Page, Locator, test } from "@playwright/test";
import { Dropdown } from "../components/basic/dropdown";
import { Instructions } from "../components/brokerage/instructions.component";
import { HoldingList } from "../components/portfolio/holdingList.component";
import { BasePage } from "./Base.page";
import { Logger } from "../../logger/logger";
import { LIMIT_ROWS, URLs, quoteErrorData, timeToLiveData, quoteData, basketQuoteData } from "../../config";
import { Table } from "../components/general/table.component";
import { expectElementToContainText, expectElementToHaveText, convertNumberToString } from "../../utils";
const logger = new Logger("Brokerage Page");

export class BrokeragePage extends BasePage {
  readonly url: string;

  readonly pageHeader: Locator;

  readonly instructions: Instructions;

  readonly holdingList: HoldingList;

  readonly limitTable: Table;

  readonly digitalAssetsList: Dropdown;

  readonly buyButton: Locator;

  readonly sellButton: Locator;

  readonly tradePairList: Dropdown;

  readonly tradeAmount: Locator;

  readonly tradeCurrencyList: Dropdown;

  readonly quotePriceButton: Locator;

  readonly nonVerifiedUserMessage: Locator;

  readonly confirmButton: Locator;

  readonly cancelButton: Locator;

  readonly progressBar: Locator;

  readonly successMessage: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page, url = "/buysell?brokerageV1=true") {
    super(page);
    this.url = url;
    this.pageHeader = this.page.locator("div[data-test-id='irfq-page-title']");
    this.instructions = new Instructions(this.page.locator("[data-test-id='instructions']"));
    this.holdingList = new HoldingList(this.page.locator("[data-test-id='irfq-holding-list']"));
    this.limitTable = new Table(this.holdingList.rootEl.locator(".MuiTable-root"));
    this.digitalAssetsList = new Dropdown(this.page.locator("[data-test-id='irfq-digital-assets-list']"), this.page);
    this.buyButton = this.page.locator("[data-test-id='irfq-buy-btc-button']");
    this.sellButton = this.page.locator("[data-test-id='irfq-sell-btc-button']");
    this.tradePairList = new Dropdown(this.page.locator("[data-test-id='irfq-trade-pair']"), this.page);
    this.tradeAmount = this.page.locator("#brokerage-action-amount");
    this.tradeCurrencyList = new Dropdown(this.page.locator("[data-test-id='irfq-trade-currency']"), this.page);
    this.quotePriceButton = this.page.locator("button", { hasText: "Quote Price" });
    this.nonVerifiedUserMessage = this.page.locator("[data-test-id='irfq-unverified-user-message']");
    this.confirmButton = this.page.locator("button", { hasText: "Confirm" });
    this.cancelButton = this.page.locator("button", { hasText: "Cancel" });
    this.progressBar = this.page.locator("[role='progressbar']~div");
    this.successMessage = this.page.locator("form p", { hasText: "Thank you" });
    this.errorMessage = this.page.locator("[data-test-id='error-container'] , [data-test-id='form-error']");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  private async getBrokerageResponse(url: string, action: Promise<void>): Promise<string> {
    const { data } = await this.api.getResponseBody(url, action);
    return data.responseCode;
  }

  async checkQuoteSave() {
    const response = await this.getBrokerageResponse("quote/save", this.quotePriceButton.click());

    if (response === "CANNOT_PRICE") {
      logger.info(`Test skipped because of ${response}`);
      test.skip();
    }
  }

  async checkTradeSave() {
    const response = await this.getBrokerageResponse("trade/save", this.confirmButton.click());

    if (response === "INSUFFICIENT_LIQUIDITY") {
      logger.info(`Test skipped because of ${response}`);
      test.skip();
    }
  }

  getLimitRow(row: LIMIT_ROWS): Locator {
    return this.limitTable.rootEl.locator("td.MuiTableCell-body").nth(row);
  }

  async enableBasket(option: boolean): Promise<void> {
    await this.api.mockBasketData(option);
    await this.goto();
  }

  async mockSuccessfulQuotation(): Promise<void> {
    await this.api.mockData(quoteData, URLs.QUOTE);
  }

  async mockQuoteError(error: string): Promise<void> {
    const mockData = { ...quoteErrorData };
    mockData.data.responseCode = error;
    await this.api.mockData(mockData, URLs.QUOTE);
  }

  async mockRFQNetworkError(data: any, url: URLs, status: number): Promise<void> {
    await this.api.emulateNetworkError(data, url, status);
  }

  async mockTimeToLive(ttl: number): Promise<void> {
    const mockData = { ...timeToLiveData };
    mockData.data.timeToLive = ttl * 1000;
    await this.api.mockData(mockData, URLs.QUOTE);
  }

  async verifyLimitTable(limitData: any): Promise<void> {
    await expectElementToHaveText(this.getLimitRow(LIMIT_ROWS.TYPE), "Net Settlement");
    await expectElementToContainText(
      this.getLimitRow(LIMIT_ROWS.EXPOSURE),
      `${limitData.exposureCurrency} ${convertNumberToString(limitData.exposureAmount)}`
    );
    await expectElementToContainText(
      this.getLimitRow(LIMIT_ROWS.TOTAL),
      `${limitData.limitCurrency} ${convertNumberToString(limitData.limitAmount)}`
    );
    await expectElementToHaveText(this.getLimitRow(LIMIT_ROWS.USAGE), limitData.limitUtilisation);
  }

  async getTradingPair(): Promise<{ defaultFiat: string; defaultCoin: string }> {
    const { defaultFiat, defaultCoin } = await this.api.getResponseBody("defaultCurrencyPair", this.goto());
    return { defaultFiat, defaultCoin };
  }

  async mockBasketQuoteData(): Promise<void> {
    const mockData = { ...basketQuoteData };
    mockData.data.quoteResponses.splice(0, 2);
    await this.api.mockData(mockData, URLs.BASKET_QUOTE);
  }
}
