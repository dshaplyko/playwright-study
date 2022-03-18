import { Locator, Page } from "@playwright/test";
import { Modal } from "./modal.component";
import { getValueAsNumber } from "../../../../utils";

export class ConfirmationModal extends Modal {
  readonly paymentOutButton: Locator;

  readonly deleteButton: Locator;

  readonly amount: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.paymentOutButton = this.el.locator("button[data-test-id='funds-confirmation-dialog-primary-button']");
    this.amount = this.el.locator("span[data-test-id='funds-confirmation-dialog-total-amount']");
    this.deleteButton = this.el.locator("button", { hasText: "Delete" });
  }

  async getBalance(): Promise<number> {
    return getValueAsNumber(await this.amount.innerText());
  }
}
