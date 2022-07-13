import { Locator, Page } from "@playwright/test";
import { ContactList } from "../../contacts/contactList.component";
import { Modal } from "./modal.component";

export class ContactModal extends Modal {
  readonly buttonCreateNewContact: Locator;

  readonly buttonAddToExistingContact: Locator;

  readonly inputSearch: Locator;

  readonly contactList: ContactList;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.buttonCreateNewContact = this.rootEl.locator("a[data-test-id^='create-new-contact']");
    this.buttonAddToExistingContact = this.rootEl.locator("button[data-test-id='add-to-existing-contact']");
    this.inputSearch = this.rootEl.locator("input[placeholder='Search']");
    this.contactList = new ContactList(this.rootEl.locator("[data-test-id='contact-list']"));
  }
}
