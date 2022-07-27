import { Locator, Page } from "@playwright/test";
import { Element } from "../basic/element";

export class PairedDevices extends Element {
  readonly devicesCount: Locator;

  readonly devices: Locator;

  readonly unpairButton: Locator;

  readonly page: Page;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.devicesCount = this.rootEl.locator("[data-test-id='paired-section-title']").locator("span").nth(1);
    this.devices = this.rootEl.locator("[data-test-id='paired-item']");
    this.unpairButton = this.page.locator("#fade-menu li");
  }

  async parseDevicesCount(): Promise<number> {
    const count = await this.devicesCount.innerText();
    return parseInt(count.match(/(\d){1,2}/)[0]);
  }

  async unpairDevice(index: number): Promise<void> {
    await this.devices.nth(index).hover();
    await this.devices.nth(index).locator("button[aria-label='delete']").click();
    await this.unpairButton.click();
  }
}
