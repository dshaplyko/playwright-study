import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class Instructions extends Element {
  readonly expandCollapseButton: Locator;

  readonly contentArea: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.expandCollapseButton = this.rootEl.locator("button");
    this.contentArea = this.rootEl.locator("div.MuiCollapse-root.MuiCollapse-vertical");
  }

  async isExpanded(): Promise<boolean> {
    const classAttr = await this.contentArea.getAttribute("class");
    return classAttr.includes("MuiCollapse-entered");
  }
}
