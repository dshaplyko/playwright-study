import { Locator, Page } from "@playwright/test";
import { Element } from "../../basic/element";
import { Dropdown } from "../../basic/dropdown";
import { Calendar } from "../calendar.component";
import { CURRENCIES, REPORT_TYPES, TRANSACTION_FILTER_TYPES } from "../../../../config";

type ReportOption = "type" | "currency";

type Filter<T> = {
  option: ReportOption;
  item: T;
};

export class Modal extends Element {
  readonly page: Page;

  readonly title: Locator;

  readonly status: Dropdown;

  readonly type: Dropdown;

  readonly currency: Dropdown;

  readonly dateFrom: Calendar;

  readonly dateTo: Calendar;

  readonly amountFrom: Locator;

  readonly amountTo: Locator;

  readonly buttonConfirm: Locator;

  readonly buttonCancel: Locator;

  readonly buttonReset: Locator;

  readonly presetPeriodButtons: Locator;

  readonly body: Locator;

  readonly list: Locator;

  readonly additionalCryptoLabel: Locator;

  readonly buttonClose: Locator;

  readonly okButton: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.title = this.el.locator(
      "[data-test-id='dialogue-title'], [data-test-id$='dialog-title'], [data-test-id='modal-historical-reports-form-title'], [data-test-id='two-factor-mandatory-explanation']"
    );
    this.status = new Dropdown(this.el.locator("#activities-filter-status"), this.page);
    this.type = new Dropdown(
      this.el.locator("[data-test-id='category-type-menu'], #activities-filter-type"),
      this.page
    );
    this.currency = new Dropdown(
      this.el.locator("[data-test-id='currency-menu'], #activities-filter-currency"),
      this.page
    );
    this.dateFrom = new Calendar(
      this.el.locator("div:has(> input[data-test-id='form-date-time-input'])").nth(0),
      this.page
    );
    this.dateTo = new Calendar(
      this.el.locator("div:has(> input[data-test-id='form-date-time-input'])").nth(1),
      this.page
    );
    this.amountFrom = this.el.locator("input#activities-filter-amountLow");
    this.amountTo = this.el.locator("input#activities-filter-amountHigh");
    this.buttonConfirm = this.el.locator("button", { hasText: "Confirm" });
    this.buttonCancel = this.el.locator("button", { hasText: "Cancel" });
    this.buttonReset = this.el.locator("button", { hasText: "Reset" });
    this.presetPeriodButtons = this.el.locator("button[data-test-id*='pre-set-period']");
    this.body = this.el.locator("[data-test-id='dialogue-body']");
    this.list = this.el.locator("p>ul");
    this.additionalCryptoLabel = this.el.locator("[data-test-id='dialog-additional-crypto-label']");
    this.buttonClose = this.el.locator("button[data-test-id='dialogue-close']");
    this.okButton = this.el.locator("button", { hasText: "OK" });
  }

  filterBy({ option, item }: Filter<CURRENCIES | TRANSACTION_FILTER_TYPES | REPORT_TYPES>): Promise<void> {
    return this[option].selectByText(item);
  }
}
