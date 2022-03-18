import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class ContactList extends Element {
  readonly searchBar: Locator;

  readonly addNewContactButton: Locator;

  readonly contacts: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.searchBar = this.el.locator("#seacrh-contact");
    this.addNewContactButton = this.el.locator("[data-test-id='button-add-new-contact']");
    this.contacts = this.el.locator("[data-test-id*='addresses-list-row-address']");
  }

  getContactsText(): Promise<string[]> {
    return this.contacts.locator("p").allTextContents();
  }
}
