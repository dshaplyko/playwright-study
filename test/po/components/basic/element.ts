import { Locator } from "@playwright/test";

export class Element {
  readonly el: Locator;

  constructor(locator: Locator) {
    this.el = locator;
  }

  async waitForVisible() {
    try {
      await this.el.elementHandle();
    } catch (err) {
      throw err;
    }
  }

  getText(): Promise<string> {
    return this.el.innerText();
  }
}
