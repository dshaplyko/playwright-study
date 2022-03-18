import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { TransactionActivity } from "../components/activities/transactionActivity.component";
import { Modal } from "../components/general/modals/modal.component";
import { Pagination } from "../components/activities/pagination.component";
import { Tooltip } from "../components/general/tooltip.component";
import { Element } from "../components/basic/element";
import { AddContact } from "../components/activities/addContact.component";
import { AddToExisting } from "../components/activities/addToExisting.component";

export class ActivitiesPage extends BasePage {
  readonly url: string;

  readonly buttonGetHistoricalReports: Locator;

  readonly buttonActivityFilter: Locator;

  readonly transactionActivity: TransactionActivity;

  readonly activityFilter: Modal;

  readonly historicalReports: Modal;

  readonly pagination: Pagination;

  readonly textCopied: Tooltip;

  readonly noResultsLabel: Element;

  readonly addContactModal: AddContact;

  readonly addToExistingContactModal: AddToExisting;

  constructor(page: Page, url = "/activity") {
    super(page);
    this.url = url;
    this.buttonGetHistoricalReports = this.page.locator("[data-test-id='button-historical-reports']");
    this.buttonActivityFilter = this.page.locator("[data-test-id='button-activity-filter']");
    this.transactionActivity = new TransactionActivity(this.page.locator("[data-test-id='transaction-list']"));
    this.activityFilter = new Modal(this.page.locator("[data-test-id='modal-filter-form']"), this.page);
    this.historicalReports = new Modal(this.page.locator("[data-test-id='modal-historical-reports-form']"), this.page);
    this.pagination = new Pagination(this.page.locator("[data-test-id='transaction-list-pagination']"));
    this.textCopied = new Tooltip(this.page.locator("div[role='alert']"));
    this.noResultsLabel = new Element(this.transactionActivity.el.locator("text='No Filter Results Here'"));
    this.addContactModal = new AddContact(
      this.page.locator("div[data-test-id='activities-add-to-contact']"),
      this.page
    );
    this.addToExistingContactModal = new AddToExisting(
      this.page.locator("div[data-test-id='add-to-existing-contact-dialog']"),
      this.page
    );
  }

  async goto() {
    await super.goto(this.url);
  }
}
