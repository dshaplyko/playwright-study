import { Locator, Page } from "@playwright/test";
import { Modal } from "../general/modals/modal.component";

export class AddContact extends Modal {
  readonly buttonCreateNewContact: Locator;

  readonly buttonAddToExistingContact: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.buttonCreateNewContact = this.el.locator("a[data-test-id='create-new-contact']");
    this.buttonAddToExistingContact = this.el.locator("button[data-test-id='add-to-existing-contact']");
  }
}
