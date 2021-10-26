// playwright-dev-page.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { TransactionActivity } from "../components/activities/transactionActivity.component";
import { Modal } from "../components/activities/modal.component";

export class ActivitiesPage extends BasePage {
  readonly url: string;

  readonly buttonGetHistoricalReports: Locator;

  readonly buttonActivityFilter: Locator;

  readonly transactionActivity: TransactionActivity;

  readonly activityFilter: Modal;

  constructor(page: Page, url = "/activities") {
    super(page);
    this.url = url;
    this.buttonGetHistoricalReports = this.page.locator("[data-test-id='button-historical-reports']");
    this.buttonActivityFilter = this.page.locator("[data-test-id='button-activity-filter']");
    this.transactionActivity = new TransactionActivity(this.page.locator("[data-test-id='transaction-list']"));
    this.activityFilter = new Modal(this.page.locator("[data-test-id='modal-filter-form']"), this.page);
  }

  async goto() {
    await super.goto(this.url);
  }
}
