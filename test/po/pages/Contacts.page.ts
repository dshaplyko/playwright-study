import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { ContactCard } from "../components/contacts/contactCard.component";
import { ContactList } from "../components/contacts/contactList.component";
import { ConfirmationModal } from "../components/general/modals/confirmationModal.component";

export class ContactsPage extends BasePage {
  readonly url: string;

  readonly footer: Locator;

  readonly aboutUs: Locator;

  readonly createNewContactButton: Locator;

  readonly noContactsIcon: Locator;

  readonly contactCard: ContactCard;

  readonly contactList: ContactList;

  readonly contactsPageHeader: Locator;

  readonly confirmationModal: ConfirmationModal;

  readonly deleteConfirmationModal: ConfirmationModal;

  readonly unsavedChangesModal: ConfirmationModal;

  constructor(page: Page, url = "/contacts") {
    super(page);
    this.url = url;
    this.noContactsIcon = this.page.locator("[data-test-id='no-contacts-icon']");
    this.createNewContactButton = this.page.locator("button", { hasText: "Create New Contact" });
    this.contactCard = new ContactCard(this.page.locator("[data-test-id='digital-asset-contact-card']"), this.page);
    this.contactList = new ContactList(this.page.locator("[data-test-id='contact-list']"));
    this.contactsPageHeader = this.page.locator("header[data-test-id='digital-asset-header']");
    this.confirmationModal = new ConfirmationModal(this.page.locator("div[role='presentation']"), this.page);
    this.deleteConfirmationModal = new ConfirmationModal(
      this.page.locator("[data-test-id='contact-delete-modal']"),
      this.page
    );
    this.unsavedChangesModal = new ConfirmationModal(this.page.locator("[aria-labelledby='block-dialog']"), this.page);
  }

  async goto() {
    await super.goto(this.url);
  }
}
