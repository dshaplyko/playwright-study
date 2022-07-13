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
    this.name = this.rootEl.locator("[data-test-id*='plate-header'], span[data-test-id*='widget-title']");
    this.totalBalance = this.rootEl.locator("[data-test-id$='balance']");
    this.currency = this.rootEl.locator("[data-test-id$='plate-currency']");
    this.percentage = this.rootEl.locator("[data-test-id*='distribution']");
    this.body = this.rootEl.locator("div[data-test-id*='body']");
  }

  async getWidgetValue(value: "totalBalance" | "percentage"): Promise<number> {
    let result: string = await this[value].innerText();
    while (result === "0.0%" || result === "$0.00") {
      result = await this[value].innerText();
    }
    return getValueAsNumber(result);
  }
}
