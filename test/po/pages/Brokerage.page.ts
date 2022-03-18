import { Page, Locator } from "@playwright/test";
import { Dropdown } from "../components/basic/dropdown";
import { Instructions } from "../components/brokerage/instructions.component";
import { HoldingList } from "../components/portfolio/holdingList.component";
import { BasePage } from "./Base.page";

export class BrokeragePage extends BasePage {
  readonly url: string;

  readonly pageHeader: Locator;

  readonly instructions: Instructions;

  readonly holdingList: HoldingList;

  readonly digitalAssetsList: Dropdown;

  readonly buyBTCButton: Locator;

  readonly sellBTCButton: Locator;

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

  constructor(page: Page, url = "/buysell") {
    super(page);
    this.url = url;
    this.pageHeader = this.page.locator("div[data-test-id='irfq-page-title']");
    this.instructions = new Instructions(this.page.locator("[data-test-id='instructions']"));
    this.holdingList = new HoldingList(this.page.locator("[data-test-id='irfq-holding-list']"));
    this.digitalAssetsList = new Dropdown(this.page.locator("[data-test-id='irfq-digital-assets-list']"), this.page);
    this.buyBTCButton = this.page.locator("[data-test-id='irfq-buy-btc-button']");
    this.sellBTCButton = this.page.locator("[data-test-id='irfq-sell-btc-button']");
    this.tradePairList = new Dropdown(this.page.locator("[data-test-id='irfq-trade-pair']"), this.page);
    this.tradeAmount = this.page.locator("[data-test-id='irfq-trade-amount'] input");
    this.tradeCurrencyList = new Dropdown(this.page.locator("[data-test-id='irfq-trade-currency']"), this.page);
    this.quotePriceButton = this.page.locator("button", { hasText: "Quote Price" });
    this.nonVerifiedUserMessage = this.page.locator("[data-test-id='irfq-unverified-user-message']");
    this.confirmButton = this.page.locator("button", { hasText: "Confirm" });
    this.cancelButton = this.page.locator("button", { hasText: "Cancel" });
    this.progressBar = this.page.locator("span[role='progressbar']");
    this.successMessage = this.page.locator("form p");
    this.errorMessage = this.page.locator("form span", { hasText: "Less" });
  }

  async goto() {
    await super.goto(this.url);
  }
}
