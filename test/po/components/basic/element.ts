import { Locator } from "@playwright/test";
const DEFAULT_DELAY = 1000;

export class Element {
  readonly el: Locator;

  constructor(locator: Locator) {
    this.el = locator;
  }

  delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
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

  async click(delay?: number): Promise<void> {
    return this.el.click({
      delay: delay,
    });
  }

  typeText(text: string): Promise<void> {
    return this.el.type(text);
  }

  async convertValueToDate(): Promise<Date> {
    const currentValue: string = await this.el.inputValue();
    return new Date(currentValue);
  }

  async isVisible({ delay }: { delay?: boolean }): Promise<boolean> {
    if (delay) {
      await this.delay(DEFAULT_DELAY);
    }
    return this.el.isVisible();
  }

  async isExpanded(): Promise<boolean> {
    const attribute: string = await this.el.getAttribute("aria-expanded");
    return attribute === "true";
  }

  async getPlaceholder(): Promise<string> {
    return this.el.getAttribute("placeholder");
  }
}
