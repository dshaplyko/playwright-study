import { Locator } from "@playwright/test";
import { Element } from "../basic/element";
import { CONSOLE_ITEMS } from "../../../config";

export class NavigationMenu extends Element {
  constructor(locator: Locator) {
    super(locator);
  }

  chooseItem(item: CONSOLE_ITEMS): Promise<void> {
    return this.rootEl.locator("p, span", { hasText: item }).first().click();
  }
}
