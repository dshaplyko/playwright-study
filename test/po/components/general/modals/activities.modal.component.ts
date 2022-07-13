import { Locator, Page } from "@playwright/test";
import { Modal } from "./modal.component";
import { Logger } from "../../../../logger/logger";
import { CURRENCIES, REPORT_TYPES, TRANSACTION_FILTER_TYPES, TRANSACTION_STATUSES } from "../../../../config";
import { Dropdown } from "../../basic/dropdown";
import { Calendar } from "../calendar.component";
const logger = new Logger("Activity Filter");

type ReportOption = "type" | "currency" | "status";
type Filter = CURRENCIES | TRANSACTION_FILTER_TYPES | REPORT_TYPES | TRANSACTION_STATUSES;

export class ActivitiesModal extends Modal {
  readonly amountFrom: Locator;

  readonly amountTo: Locator;

  readonly presetPeriodButtons: Locator;

  readonly currency: Dropdown;

  readonly status: Dropdown;

  readonly type: Dropdown;

  readonly dateFrom: Calendar;

  readonly dateTo: Calendar;

  readonly activitiesModalError: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator, page);
    this.amountFrom = this.rootEl.locator("input#activities-filter-amountLow");
    this.amountTo = this.rootEl.locator("input#activities-filter-amountHigh");
    this.presetPeriodButtons = this.rootEl.locator("button[data-test-id*='pre-set-period']");
    this.currency = new Dropdown(
      this.rootEl.locator("[data-test-id='currency-menu'], #activities-filter-currency"),
      this.page
    );
    this.status = new Dropdown(this.rootEl.locator("#activities-filter-status"), this.page);
    this.type = new Dropdown(
      this.rootEl.locator("[data-test-id='category-type-menu'], #activities-filter-type"),
      this.page
    );
    this.dateFrom = new Calendar(
      this.rootEl.locator("div:has(> input[data-test-id='form-date-time-input'])").nth(0),
      this.page
    );
    this.dateTo = new Calendar(
      this.rootEl.locator("div:has(> input[data-test-id='form-date-time-input'])").nth(1),
      this.page
    );
    this.activitiesModalError = this.rootEl.locator("span[data-test-id='activity-historical-report-error']");
  }

  filterBy(option: ReportOption, item: Filter): Promise<void> {
    return this[option].clickByText(item);
  }

  async chooseRandomOptions(
    type?: "type",
    currency?: "currency",
    status?: "status"
  ): Promise<{
    randomType: string;
    randomCurrency: string;
    randomStatus: string;
  }> {
    let randomType: string;
    let randomCurrency: string;
    let randomStatus: string;

    if (type) {
      randomType = await this.type.chooseAndRememberRandomOption();
      logger.info(`Selected type is: ${randomType}`);
    }
    if (currency) {
      randomCurrency = await this.currency.chooseAndRememberRandomOption();
      logger.info(`Selected currency is: ${randomCurrency}`);
    }
    if (status) {
      randomStatus = await this.status.chooseAndRememberRandomOption();
      logger.info(`Selected status is: ${randomStatus}`);
    }

    return { randomType, randomCurrency, randomStatus };
  }
}
