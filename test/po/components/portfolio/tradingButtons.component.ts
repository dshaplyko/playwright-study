import { Locator } from "@playwright/test";
import { Element } from "../basic/element";
import { ATTRIBUTES } from "../../../config";
import { expectElementToHaveAttribute } from "../../../utils";

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
    this.buttons = this.rootEl.locator("a");
    this.paymentIn = new Element(this.rootEl.locator("[data-test-id='payment-in']"));
    this.paymentOut = new Element(this.rootEl.locator("[data-test-id='payment-out']"));
    this.transferFunds = new Element(this.rootEl.locator("[data-test-id='transfer-funds']"));
    this.exchange = new Element(this.rootEl.locator("[data-test-id='exchange']"));
    this.leverage = new Element(this.rootEl.locator("[data-test-id='leverage']"));
    this.IRFQ = new Element(this.rootEl.locator("[data-test-id='irfq']"));
    this.buy = new Element(this.rootEl.locator("[data-test-id='buy']"));
    this.cashOut = new Element(this.rootEl.locator("[data-test-id='cash-out']"));
  }

  async checkButtonsState(state: ATTRIBUTES): Promise<void> {
    const buttonsCount: number = await this.buttons.count();
    for (let i = 0; i < buttonsCount; i++) {
      await expectElementToHaveAttribute(this.buttons.nth(i), state, "true");
    }
  }
}
