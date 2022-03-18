import { Locator } from "@playwright/test";
import { Element } from "../basic/element";
import { getValueAsNumber } from "../../../utils";

export class Widget extends Element {
  readonly name: Locator;

  readonly totalBalance: Locator;

  readonly currency: Locator;

  readonly percentage: Locator;

  readonly body: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.name = this.el.locator("[data-test-id*='plate-header'], span[data-test-id*='widget-title']");
    this.totalBalance = this.el.locator("[data-test-id$='balance']");
    this.currency = this.el.locator("[data-test-id$='plate-currency']");
    this.percentage = this.el.locator("[data-test-id*='distribution']");
    this.body = this.el.locator("div[data-test-id*='body']");
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
