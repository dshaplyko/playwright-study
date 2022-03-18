import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class FeatureHighlight extends Element {
  readonly name: Element;

  readonly goToConsoleButton: Locator;

  readonly enable2FButton: Locator;

  readonly verifyButton: Locator;

  readonly secondButton: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.name = new Element(this.el.locator("h4"));
    this.goToConsoleButton = this.el.locator("[data-test-id='go-to-console']");
    this.enable2FButton = this.el.locator("[data-test-id='enable-2fa']");
    this.verifyButton = this.el.locator("[data-test-id='verify']");
    this.secondButton = this.el.locator("a").nth(1);
  }
}
