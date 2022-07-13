import { Locator, Page } from "@playwright/test";
import { ACCOUNT_GROUPS } from "../../../../config";
import { Modal } from "./modal.component";

export class AccountModal extends Modal {
  readonly accountButtons: Locator;

  readonly searchInput: Locator;

  readonly accountNames: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.accountButtons = this.rootEl.locator("div.MuiButtonBase-root");
    this.searchInput = this.rootEl.locator("#search-account-group");
    this.accountNames = this.accountButtons.locator("span.MuiTypography-BODY_REGULAR");
  }

  async clickButtonByText(text: ACCOUNT_GROUPS): Promise<void> {
    return this.accountButtons.locator(`text=${text}`).first().click();
  }
}
