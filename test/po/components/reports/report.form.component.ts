import { Page, Locator } from "@playwright/test";
import { Dropdown } from "../basic/dropdown";
import { Element } from "../basic/element";
import { Calendar } from "../general/calendar.component";

export class ReportForm extends Element {
  readonly page: Page;

  readonly dateFrom: Calendar;

  readonly dateTo: Calendar;

  readonly currencyList: Dropdown;

  readonly exportButton: Locator;

  readonly errorMessage: Locator;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this.page = page;
    this.dateFrom = new Calendar(
      this.el.locator("div:has(> input[data-test-id='form-date-time-input'])").nth(0),
      this.page
    );
    this.dateTo = new Calendar(
      this.el.locator("div:has(> input[data-test-id='form-date-time-input'])").nth(1),
      this.page
    );
    this.currencyList = new Dropdown(this.el.locator("div[id*='monthly-reports-heading']"), this.page);
    this.exportButton = this.el.locator("button", { hasText: "Export" });
    this.errorMessage = this.el.locator("form~p");
  }
}
