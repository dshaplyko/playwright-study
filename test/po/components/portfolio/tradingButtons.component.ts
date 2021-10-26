import { Locator, expect } from "@playwright/test";
import { Element } from "../basic/element";
import { State } from "../../../config";

export class TradingButtons extends Element {
  readonly buttons: Locator;

  readonly paymentIn: Element;

  readonly paymentOut: Element;

  readonly transferFunds: Element;

  readonly exchange: Element;

  readonly leverage: Element;

  readonly IRFQ: Element;

  readonly buy: Element;

  readonly cashOut: Element;

  constructor(locator: Locator) {
    super(locator);
    this.buttons = this.el.locator("a");
    this.paymentIn = new Element(this.el.locator("[data-test-id='payment-in']"));
    this.paymentOut = new Element(this.el.locator("[data-test-id='payment-out']"));
    this.transferFunds = new Element(this.el.locator("[data-test-id='transfer-funds']"));
    this.exchange = new Element(this.el.locator("[data-test-id='exchange']"));
    this.leverage = new Element(this.el.locator("[data-test-id='leverage']"));
    this.IRFQ = new Element(this.el.locator("[data-test-id='irfq']"));
    this.buy = new Element(this.el.locator("[data-test-id='buy']"));
    this.cashOut = new Element(this.el.locator("[data-test-id='cash-out']"));
  }

  async checkButtonsState(state: State): Promise<void> {
    const buttonsCount: number = await this.buttons.count();
    for (let i = 0; i < buttonsCount; i++) {
      let assert = expect(this.buttons.nth(i));
      if (state === "enabled") {
        assert = assert.not;
      }
      await assert.toHaveAttribute("aria-disabled", "true");
    }
  }
}
