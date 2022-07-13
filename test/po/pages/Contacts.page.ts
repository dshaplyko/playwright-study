import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { ContactCard } from "../components/contacts/contactCard.component";
import { ContactList } from "../components/contacts/contactList.component";
import { ConfirmationModal } from "../components/general/modals/confirmationModal.component";
import { CONTACTS_DATA, CONTACTS_DATA_EMPTY, DELETE_CONTACT_SUCCESS, URLs } from "../../config";
import { Logger } from "../../logger/logger";
const logger = new Logger("Contacts Page");

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

  async mockContactData(data: "full" | "empty"): Promise<void> {
    const contactsData = data === "full" ? CONTACTS_DATA : CONTACTS_DATA_EMPTY;

    await this.api.mockData(contactsData, URLs.CONTACT);
    await this.goto();
  }

  async mockDeleteContact(): Promise<void> {
    await this.api.mockData(DELETE_CONTACT_SUCCESS, URLs.REMOVE_CONTACT);
  }

  async checkContacts(): Promise<void> {
    await this.goto();
    await this.contactList.waitForVisible();
    if (await this.noContactsIcon.isVisible()) {
      logger.info("Test Contact is being created");
      await this.contactList.addNewContactButton.click();
      await this.contactCard.fillContactCard({
        name: "Test Contact 1",
        reference: "Test Contact 1",
        assetAddress: "2NCufv57dMLUsvnpeMXpJwEDrWhqehML8fa",
        currency: "BTC",
      });
      await this.checkTooltip("New Contact has been saved.");
    }
  }
}
