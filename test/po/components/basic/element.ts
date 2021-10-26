import { Locator, expect } from "@playwright/test";

export class Element {
  readonly el: Locator;

  constructor(locator: Locator) {
    this.el = locator;
  }

  async waitForVisible() {
    try {
      await this.el.waitFor();
    } catch (err) {
      throw err;
    }
  }

  getText(): Promise<string> {
    return this.el.innerText();
  }

  async toBeDisabled(state: boolean = true): Promise<void> {
    let assert = expect(this.el);
    if (!state) {
      assert = assert.not;
    }
    await assert.toHaveAttribute("aria-disabled", "true");
  }

  click(): Promise<void> {
    return this.el.click();
  }
}
