import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./Base.page";
import { Widget } from "../components/general/widget.component";
import { HoldingList } from "../components/portfolio/holdingList.component";
import { FeatureHighlight } from "../components/portfolio/featureHighlight.component";
import { Chart } from "../components/portfolio/chart.component";
import { Card } from "../components/portfolio/card.component";
import { TradingButtons } from "../components/portfolio/tradingButtons.component";
import { WIDGETS, FEATURE_HIGHLIGHT, DECIMAL_PART } from "../../config";
import { Logger } from "../../logger/logger";
const logger = new Logger("Portfolio Page");

export class PortfolioPage extends BasePage {
  readonly url: string;

  readonly totalBalance: Locator;

  readonly holdingList: HoldingList;

  readonly quickTips: Locator;

  readonly quickTipsLink: Locator;

  readonly chart: Chart;

  readonly tradingButtons: TradingButtons;

  readonly cards: Locator;

  constructor(page: Page, url = "/portfolio") {
    super(page);
    this.url = url;
    this.holdingList = new HoldingList(this.page.locator("table[data-test-id='holding-list']"));
    this.chart = new Chart(this.page.locator(".recharts-wrapper"));
    this.tradingButtons = new TradingButtons(this.page.locator("div[data-test-id='trading-related-area']"));
    this.quickTips = this.page.locator("div[data-test-id='quick-tips']");
    this.quickTipsLink = this.quickTips.locator("a[href*=funds]").nth(0);
    this.cards = this.page.locator("[data-test-id='card-row']");
  }

  async getCardsCount(): Promise<number> {
    await this.getCard(0).waitForVisible();
    return this.cards.count();
  }

  getCard(index: number): Card {
    return new Card(this.cards.nth(index));
  }

  getWidget(widget: WIDGETS): Widget {
    return new Widget(this.page.locator(`div[data-test-id='${widget}']`));
  }

  getFeatureHighlight(item: FEATURE_HIGHLIGHT): FeatureHighlight {
    return new FeatureHighlight(this.page.locator(`div[data-test-id*='${item}']`));
  }

  async calculateTotalBalance(): Promise<number> {
    const digitalAssets: number = await this.getWidget(WIDGETS.DIGITAL_ASSETS).getTotalBalance();
    const fiatCurrencies: number = await this.getWidget(WIDGETS.FIAT_CURRENCIES).getTotalBalance();
    const sum: number = parseFloat((digitalAssets + fiatCurrencies).toFixed(DECIMAL_PART));
    logger.debug(`Digital Assets Balance: ${digitalAssets}`);
    logger.debug(`Fiat Currencies Balance: ${fiatCurrencies}`);
    logger.debug(`Sum: ${sum}`);
    return sum;
  }

  async checkTradingAndChartConjuction(): Promise<void> {
    const count: number = await this.holdingList.getRowsCount();
    for (let i = 1; i <= count; i++) {
      await this.holdingList.clickRow(i);

      const rowPercentage: string = await this.holdingList.getPercentage(i);
      const rowCurrency: string = await this.holdingList.getCurrency(i);
      const tradingPercentage: string = await this.chart.percentage.textContent();
      const tradingCurrency: string = await this.chart.currency.textContent();

      expect(rowPercentage).toEqual(tradingPercentage);
      expect(rowCurrency).toEqual(tradingCurrency);
    }
  }

  async checkCardsAndChartConjuction(): Promise<void> {
    const count: number = await this.getCardsCount();
    for (let i = 0; i < count; i++) {
      await this.getCard(i).clickCard();

      const cardPercentage: string = await this.getCard(i).getPercentage();
      const cardCurrency: string = await this.getCard(i).getCurrency();
      const tradingPercentage: string = await this.chart.percentage.textContent();
      const tradingCurrency: string = await this.chart.currency.textContent();

      expect(cardPercentage).toEqual(tradingPercentage);
      expect(cardCurrency).toEqual(tradingCurrency);
    }
  }

  async goto() {
    await super.goto(this.url);
  }
}
