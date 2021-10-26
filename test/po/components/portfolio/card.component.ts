import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Card extends Element {
  readonly percentage: Locator;

  readonly currency: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.percentage = this.el.locator("[data-test-id='card-row-distribution'] span").nth(1);
    this.currency = this.el.locator("[data-test-id='card-row-currency']");
  }

  clickCard() {
    return this.el.click();
  }

  getPercentage() {
    return this.percentage.innerText();
  }

  getCurrency() {
    return this.currency.innerText();
  }
}
