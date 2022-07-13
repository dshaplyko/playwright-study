import { Locator } from "@playwright/test";
const DEFAULT_DELAY = 1000;

export class Element {
  readonly rootEl: Locator;

  constructor(locator: Locator) {
    this.rootEl = locator;
  }

  delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async waitForVisible() {
    try {
      await this.rootEl.waitFor();
    } catch (err) {
      throw err;
    }
  }

  getText(): Promise<string> {
    return this.rootEl.innerText();
  }

  getValue(): Promise<string> {
    return this.rootEl.inputValue();
  }

  async click(delay?: number): Promise<void> {
    return this.rootEl.click({
      delay: delay,
    });
  }

  async hover(): Promise<void> {
    await this.rootEl.hover();
    await this.delay(500);
  }

  typeText(text: string): Promise<void> {
    return this.rootEl.type(text);
  }

  async convertValueToDate(): Promise<Date> {
    const currentValue: string = await this.rootEl.inputValue();
    return new Date(currentValue);
  }

  async isVisible({ delay }: { delay?: boolean }): Promise<boolean> {
    if (delay) {
      await this.delay(DEFAULT_DELAY);
    }
    return this.rootEl.isVisible();
  }

  async isExpanded(): Promise<boolean> {
    const attribute: string = await this.rootEl.getAttribute("aria-expanded");
    return attribute === "true";
  }

  async getPlaceholder(): Promise<string> {
    return this.rootEl.getAttribute("placeholder");
  }
}
