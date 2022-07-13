import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Chart extends Element {
  readonly currency: Locator;

  readonly percentage: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.currency = this.rootEl.locator("text[dominant-baseline='text-after-edge'] tspan");
    this.percentage = this.rootEl.locator("text[dominant-baseline='hanging'] tspan");
  }
}
