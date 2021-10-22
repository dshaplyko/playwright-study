import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class FeatureHighlight extends Element {
  readonly name: Element;

  constructor(locator: Locator) {
    super(locator);
    this.name = new Element(this.el.locator("h4"));
  }
}
