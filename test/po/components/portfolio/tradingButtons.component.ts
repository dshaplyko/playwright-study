import { Locator, expect } from "@playwright/test";
import { Element } from "../basic/element";
import { State } from "../../../config";

export class TradingButtons extends Element {
  readonly buttons: Locator;

  readonly paymentIn: Locator;

  readonly paymentOut: Locator;

  readonly transferFunds: Locator;

  readonly exchange: Locator;

  readonly leverage: Locator;

  readonly IRFQ: Locator;

  readonly buy: Locator;

  readonly cashOut: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.buttons = this.el.locator("a");
    this.paymentIn = this.el.locator("[data-test-id='payment-in']");
    this.paymentOut = this.el.locator("[data-test-id='payment-out']");
    this.transferFunds = this.el.locator("[data-test-id='transfer-funds']");
    this.exchange = this.el.locator("[data-test-id='exchange']");
    this.leverage = this.el.locator("[data-test-id='leverage']");
    this.IRFQ = this.el.locator("[data-test-id='irfq']");
    this.buy = this.el.locator("[data-test-id='buy']");
    this.cashOut = this.el.locator("[data-test-id='cash-out']");
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
