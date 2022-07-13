import { Page, Locator, test } from "@playwright/test";
import { BasePage } from "./Base.page";
import { TransactionActivity } from "../components/activities/transactionActivity.component";
import { Element } from "../components/basic/element";
import { ContactModal } from "../components/general/modals/contact.modal.component";
import {
  ACTIVITY_COLUMNS,
  ACTIVITY_COLUMNS_NAMES,
  CURRENCIES,
  TRANSACTION_FILTER_CURRENCIES,
  TRANSACTION_FILTER_TYPES,
  TRANSACTION_STATUSES,
} from "../../config";
import { ActivitiesModal } from "../components/general/modals/activities.modal.component";
import { expectElementToContainText } from "../../utils";

export class ActivitiesPage extends BasePage {
  readonly url: string;

  readonly buttonGetHistoricalReports: Locator;

  readonly buttonActivityFilter: Locator;

  readonly transactionActivity: TransactionActivity;

  readonly activityFilter: ActivitiesModal;

  readonly historicalReports: ActivitiesModal;

  readonly noResultsLabel: Element;

  readonly addContactModal: ContactModal;

  readonly addToExistingContactModal: ContactModal;

  constructor(page: Page, url = "/activity") {
    super(page);
    this.url = url;
    this.buttonGetHistoricalReports = this.page.locator("[data-test-id='button-historical-reports']");
    this.buttonActivityFilter = this.page.locator("[data-test-id='button-activity-filter']");
    this.transactionActivity = new TransactionActivity(this.page.locator("[data-test-id='transaction-list']"));
    this.activityFilter = new ActivitiesModal(this.page.locator("[data-test-id='modal-filter-form']"), this.page);
    this.historicalReports = new ActivitiesModal(
      this.page.locator("[data-test-id='modal-historical-reports-form']"),
      this.page
    );
    this.noResultsLabel = new Element(this.transactionActivity.rootEl.locator("text='No Filter Results Here'"));
    this.addContactModal = new ContactModal(
      this.page.locator("div[data-test-id='activities-add-to-contact']"),
      this.page
    );
    this.addToExistingContactModal = new ContactModal(
      this.page.locator("div[data-test-id='add-to-existing-contact-dialog']"),
      this.page
    );
  }

  async goto() {
    await super.goto(this.url);
  }

  async checkNoResultsLabel() {
    if (
      await this.noResultsLabel.isVisible({
        delay: true,
      })
    ) {
      test.skip();
    }
  }

  async checkTransactionTypes(typeToCheck: string): Promise<void> {
    const methodMap = {
      iRFQ: /RFQ (Order Filled|Trade Executed)/,
      "Payment Out": /Digital Asset Transfer|Payment Out|Bank Wire/,
      "Payment In": /Digital Asset Transfer|Payment In/,
      Trade: /Order Filled/,
    };
    await expectElementToContainText(this.transactionActivity.getColumn(ACTIVITY_COLUMNS_NAMES.METHOD), [
      methodMap[typeToCheck],
    ]);
  }

  async getFiltersFromResponse(action: Promise<void>): Promise<{
    types: string[];
    currencies: string[];
    statuses: string[];
  }> {
    const { types, statuses, currencies } = await this.api.getResponseBody("filters", action);
    return {
      types: types.map((item: string) => TRANSACTION_FILTER_TYPES[item]),
      currencies: currencies.map((item: string) => TRANSACTION_FILTER_CURRENCIES[item]),
      statuses: statuses.map((item: string) => TRANSACTION_STATUSES[item]),
    };
  }

  async searchForContacts(): Promise<void> {
    await this.goto();
    await this.buttonActivityFilter.click();
    await this.activityFilter.filterBy("currency", CURRENCIES.BTC);
    await this.activityFilter.filterBy("status", TRANSACTION_STATUSES.PENDING_LC_SUB_CHECKS);
    await this.activityFilter.buttonConfirm.click();
    await this.transactionActivity.selectContact(1).click();
  }

  async checkActivitiesColumnsVisibility(visibility: boolean): Promise<void> {
    const columns = Object.values(ACTIVITY_COLUMNS);

    for (const column of columns) {
      await this.transactionActivity.checkColumnVisibility(column, visibility);
    }
  }

  async hideFeatures(page: boolean, filter = true): Promise<void> {
    await this.api.mockConfig({
      features: {
        activity: {
          enabled: page,
          filterCashDeposits: false,
          filter: {
            enabled: filter,
          },
        },
      },
    });
  }
}
