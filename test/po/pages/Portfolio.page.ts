// playwright-dev-page.ts
import {
  Page, Locator, expect,
} from "@playwright/test";
import { BasePage } from "./Base.page";
import { Widget } from "../components/portfolio/widget.component";
import { HoldingList } from "../components/portfolio/holdingList.component";
import { FeatureHighlight } from "../components/portfolio/featureHighlight.component";
import { Chart } from "../components/portfolio/chart.component";
import { Card } from "../components/portfolio/card.component";
import { TradingButtons } from "../components/portfolio/tradingButtons.component";
import { EnumWidget, DECIMAL_PART } from "../../config";

export class PortfolioPage extends BasePage {
  readonly url: string;

  readonly totalBalance: Locator;

  readonly holdingList: HoldingList;

  readonly quickTips: Locator;

  readonly quickTipsLink: Locator;

  readonly quickLinks: Locator;

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
    this.quickTipsLink = this.quickTips.locator("a[href*=funds]");
    this.quickLinks = this.page.locator("ol.anx-static-styles-4pdmu4-MuiBreadcrumbs-ol");
    this.cards = this.page.locator("[data-test-id='card-row']");
  }

  async getCardsCount(): Promise<number> {
    await this.getCard(0).waitForVisible();
    return this.cards.count();
  }

  getCard(index: number): Card {
    return new Card(this.cards.nth(index));
  }

  getWidget(widget: EnumWidget): Widget {
    switch (widget) {
      case "your portfolio":
        return new Widget(this.page.locator("div[data-test-id='your-portfolio']"));
      case "digital assets":
        return new Widget(this.page.locator("div[data-test-id='digital-assets']"));
      case "fiat currencies":
        return new Widget(this.page.locator("div[data-test-id='fiat-currencies']"));
      case "feature highlight":
    }
  }

  getFeatureHighlight(item: string): FeatureHighlight {
    switch (item) {
      case "your console":
        return new FeatureHighlight(this.page.locator("[data-test-id='your-console']"));
      case "upgrade your account":
        return new FeatureHighlight(this.page.locator("[data-test-id='upgrade-your-account']"));
      case "account box":
        return new FeatureHighlight(this.page.locator("[data-test-id='get-premium']"));
    }
  }

  getQuickLink(link: string): Locator {
    link = link.split(" ")[0];
    return this.quickLinks.locator(`a[href*=${link}]`);
  }

  async calculateTotalBalance(): Promise<number> {
    const digitalAssets: number = await this.getWidget(EnumWidget.DIGITAL_ASSETS).getTotalBalance();
    const fiatCurrencies: number = await this.getWidget(EnumWidget.FIAT_CURRENCIES).getTotalBalance();
    const sum: number = digitalAssets + fiatCurrencies;
    return parseFloat(sum.toFixed(DECIMAL_PART));
  }

  async checkTradingAndChartConjuction(count: number): Promise<void> {
    for (let i: number = 1; i <= count; i++) {
      await this.holdingList.clickRow(i);

      const rowPercentage: string = await this.holdingList.getPercentage(i);
      const rowCurrency: string = await this.holdingList.getCurrency(i);
      const tradingPercentage: string = await this.chart.percentage.textContent();
      const tradingCurrency: string = await this.chart.currency.textContent();

      expect(rowPercentage).toEqual(tradingPercentage);
      expect(rowCurrency).toEqual(tradingCurrency);
    }
  }

  async checkCardsAndChartConjuction(count: number): Promise<void> {
    for (let i: number = 0; i < count; i++) {
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
