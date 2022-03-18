import { Locator, Page } from "@playwright/test";
import { ACCOUNT_GROUPS } from "../../../../config";
import { Modal } from "./modal.component";

export class AccountModal extends Modal {
  readonly accountButtons: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.accountButtons = this.el.locator("button.MuiButton-text");
  }

  async clickButtonByText(text: ACCOUNT_GROUPS): Promise<void> {
    return this.accountButtons.locator(`text=${text}`).click();
  }
}
