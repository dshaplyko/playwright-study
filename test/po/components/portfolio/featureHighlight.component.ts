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
    this.name = new Element(this.rootEl.locator("h4"));
    this.goToConsoleButton = this.rootEl.locator("[data-test-id='go-to-console']");
    this.enable2FButton = this.rootEl.locator("[data-test-id='enable-2fa']");
    this.verifyButton = this.rootEl.locator("[data-test-id='verify']");
    this.secondButton = this.rootEl.locator("a").nth(1);
  }
}
