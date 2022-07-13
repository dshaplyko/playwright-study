import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Bar extends Element {
  readonly paymentIn: Element;

  readonly paymentOut: Element;

  readonly transferFunds: Element;

  constructor(locator: Locator) {
    super(locator);
    this.paymentIn = new Element(
      this.rootEl.locator("button[data-test-id$='payment-in'], button[data-test-id$='deposit']")
    );
    this.paymentOut = new Element(
      this.rootEl.locator("button[data-test-id$='payment-out'], button[data-test-id$='withdrawal']")
    );
    this.transferFunds = new Element(this.rootEl.locator("button[data-test-id$='funds']"));
  }
}
