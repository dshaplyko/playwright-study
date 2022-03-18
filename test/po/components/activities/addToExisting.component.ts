import { Locator, Page } from "@playwright/test";
import { Modal } from "../general/modals/modal.component";
import { ContactList } from "../contacts/contactList.component";

export class AddToExisting extends Modal {
  readonly inputSearch: Locator;

  readonly buttonCreateNewContact: Locator;

  readonly contactList: ContactList;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.inputSearch = this.el.locator("input[placeholder='Search']");
    this.buttonCreateNewContact = this.el.locator("a[data-test-id='create-new-contact-button']");
    this.contactList = new ContactList(this.el.locator("[data-test-id='contact-list']"));
  }
}
