import { Locator } from "@playwright/test";
import { Element } from "../basic/element";
import { getValueAsNumber } from "../../../utils";

export class Widget extends Element {
  readonly name: Locator;

  readonly totalBalance: Locator;

  readonly currency: Locator;

  readonly percentage: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.name = this.el.locator("h5, span.anx-static-styles-1x81xoi-MuiTypography-root");
    this.totalBalance = this.el.locator(
      "[data-test-id='your-portfolio-balance'], [data-test-id='digital-assets-balance'], [data-test-id='fiat-currencies-balance']",
    );
    this.currency = this.el.locator(
      "div.anx-static-styles-gg4vpm h6:nth-child(2), span.anx-static-styles-2hunwp-MuiTypography-root",
    );
    this.percentage = this.el.locator(
      "[data-test-id='digital-assets-distribution'], [data-test-id='fiat-currencies-distribution']",
    );
  }

  async getTotalBalance(): Promise<number> {
    const totalBalance: string = await this.totalBalance.innerText();
    return getValueAsNumber(totalBalance);
  }

  async getPercentage(): Promise<number> {
    const percentage: string = await this.percentage.innerText();
    return getValueAsNumber(percentage);
  }
}
