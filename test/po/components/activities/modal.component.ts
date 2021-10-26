import { Locator, Page } from "@playwright/test";
import { Element } from "../basic/element";
import { Dropdown } from "../basic/dropdown";

export class Modal extends Element {
  readonly page: Page;

  readonly title: Locator;

  readonly status: Dropdown;

  readonly buttonConfirm: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.title = this.el.locator("p.anx-static-styles-idnggv-MuiTypography-root");
    this.status = new Dropdown(this.el.locator("#activities-filter-status"), this.page);
    this.buttonConfirm = this.el.locator("text='Confirm'");
  }

  async filterByStatus(option: string): Promise<void> {
    await this.status.click();
    await this.status.clickByText(option);
    await this.buttonConfirm.click();
  }
}
