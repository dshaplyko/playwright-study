import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class BankCard extends Element {
  readonly name: Locator;

  readonly transferMethod: Locator;

  readonly alias: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.name = this.rootEl.locator("div[data-test-id='list-item-name'] div");
    this.transferMethod = this.rootEl.locator("div[data-test-id='list-item-method']");
    this.alias = this.rootEl.locator("div[data-test-id='list-item-alias']");
  }
}
