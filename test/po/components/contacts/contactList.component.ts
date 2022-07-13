import { Locator } from "@playwright/test";
import { Element } from "../basic/element";

export class ContactList extends Element {
  readonly searchBar: Locator;

  readonly addNewContactButton: Locator;

  readonly contacts: Locator;

  readonly names: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.searchBar = this.rootEl.locator("#seacrh-contact");
    this.addNewContactButton = this.rootEl.locator("[data-test-id='button-add-new-contact']");
    this.contacts = this.rootEl.locator("[data-test-id*='addresses-list-row-address']");
    this.names = this.contacts.locator("p");
  }

  getContactsCount(): Promise<number> {
    return this.contacts.count();
  }
}
