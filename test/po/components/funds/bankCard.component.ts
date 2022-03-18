import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class BankCard extends Element {
  readonly name: Locator;

  readonly transferMethod: Locator;

  readonly alias: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.name = this.el.locator("div[data-test-id='list-item-name']");
    this.transferMethod = this.el.locator("div[data-test-id='list-item-method']");
    this.alias = this.el.locator("div[data-test-id='list-item-alias']");
  }
}
